import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export interface Reminder {
  id: string;
  plantId: string;
  plantName: string;
  taskType: string;
  frequencyDays: number;
  nextDate: string; // ISO format string "YYYY-MM-DD"
  time: string; // "HH:mm"
  notificationId?: string;
  done: boolean;
}

interface RemindersContextType {
  reminders: Reminder[];
  loading: boolean;
  addReminder: (reminderData: Omit<Reminder, 'id' | 'notificationId' | 'done'>) => Promise<void>;
  updateReminder: (id: string, data: Partial<Reminder>) => Promise<void>;
  completeReminder: (id: string) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
}

const RemindersContext = createContext<RemindersContextType | undefined>(undefined);
const STORAGE_KEY = '@gardening_user_reminders';

// Set up Notifications behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  } as any),
});

export function RemindersProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReminders() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setReminders(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading reminders:', error);
      } finally {
        setLoading(false);
      }
    }
    loadReminders();
    
    // Request permissions for notifications
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted');
      }
    };
    requestPermissions();
  }, []);

  const saveReminders = async (updated: Reminder[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setReminders(updated);
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  };

  const scheduleNotification = async (reminder: Reminder) => {
    const dateParts = reminder.nextDate.split('-');
    const timeParts = reminder.time.split(':');
    
    const trigger = new Date();
    trigger.setFullYear(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    trigger.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);

    // If time is already passed today, we don't schedule a past notification
    if (trigger.getTime() < Date.now()) {
        return undefined;
    }

    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Es hora de cuidar tu ${reminder.plantName} 🌿`,
          body: `Tarea pendiente: ${reminder.taskType}`,
          data: { plantId: reminder.plantId, taskId: reminder.id },
        },
        trigger: trigger as any,
      });
      return id;
    } catch (e) {
      console.error("Error scheduling notification", e);
      return undefined;
    }
  };

  const cancelNotification = async (notificationId?: string) => {
    if (notificationId) {
      try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
      } catch(e) {
        console.error("Error canceling notification", e);
      }
    }
  };

  const addReminder = async (data: Omit<Reminder, 'id' | 'notificationId' | 'done'>) => {
    const newReminder: Reminder = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      done: false,
    };
    
    const notifId = await scheduleNotification(newReminder);
    newReminder.notificationId = notifId;

    const updated = [...reminders, newReminder];
    await saveReminders(updated);
  };

  const updateReminder = async (id: string, data: Partial<Reminder>) => {
    const updated = await Promise.all(reminders.map(async (rem) => {
      if (rem.id === id) {
        const updatedRem = { ...rem, ...data };
        
        // If date or time changed, reschedule
        if (data.nextDate || data.time) {
          await cancelNotification(rem.notificationId);
          updatedRem.notificationId = await scheduleNotification(updatedRem);
        }
        return updatedRem;
      }
      return rem;
    }));
    await saveReminders(updated);
  };

  const completeReminder = async (id: string) => {
    const updated = await Promise.all(reminders.map(async (rem) => {
      if (rem.id === id) {
        await cancelNotification(rem.notificationId);
        
        // Calculate next date based on frequencyDays
        const nextDateObj = new Date();
        nextDateObj.setDate(nextDateObj.getDate() + rem.frequencyDays);
        const newNextDate = nextDateObj.toISOString().split('T')[0];
        
        const updatedRem = {
          ...rem,
          nextDate: newNextDate,
          done: false, // it goes back to pending for the new date
        };
        
        updatedRem.notificationId = await scheduleNotification(updatedRem);
        return updatedRem;
      }
      return rem;
    }));
    await saveReminders(updated);
  };

  const deleteReminder = async (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      await cancelNotification(reminder.notificationId);
    }
    const updated = reminders.filter((rem) => rem.id !== id);
    await saveReminders(updated);
  };

  return (
    <RemindersContext.Provider value={{ reminders, loading, addReminder, updateReminder, completeReminder, deleteReminder }}>
      {children}
    </RemindersContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(RemindersContext);
  if (context === undefined) {
    throw new Error('useReminders debe ser utilizado dentro de un RemindersProvider');
  }
  return context;
}
