import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, useColorScheme, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { MOCK_REMINDERS, Reminder } from '@/constants/mockData';

export default function RemindersScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(item => 
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const getTaskIcon = (type: Reminder['taskType']) => {
    switch (type) {
      case 'Riego':
        return { name: 'water', color: colors.info };
      case 'Poda':
        return { name: 'cut', color: colors.warning };
      case 'Abono':
        return { name: 'leaf', color: colors.secondary };
      case 'Trasplante':
        return { name: 'trending-up', color: colors.primary };
      case 'Limpieza':
        return { name: 'sparkles', color: '#00BCD4' };
      default:
        return { name: 'notifications', color: colors.textSecondary };
    }
  };

  const filteredReminders = reminders.filter(item => 
    activeTab === 'pending' ? !item.done : item.done
  );

  const renderReminderItem = ({ item }: { item: Reminder }) => {
    const iconInfo = getTaskIcon(item.taskType);
    return (
      <View 
        style={[
          styles.card, 
          { 
            backgroundColor: colors.surface, 
            borderColor: colors.border,
            opacity: item.done ? 0.7 : 1
          }
        ]}
      >
        <Pressable 
          onPress={() => toggleReminder(item.id)} 
          style={styles.checkboxContainer}
        >
          <Ionicons 
            name={item.done ? "checkbox" : "square-outline"} 
            size={24} 
            color={item.done ? colors.primary : colors.textSecondary} 
          />
        </Pressable>

        <View style={styles.contentContainer}>
          <View style={styles.textDetails}>
            <Text 
              style={[
                styles.plantName, 
                { 
                  color: colors.text,
                  textDecorationLine: item.done ? 'line-through' : 'none'
                }
              ]}
            >
              {item.plantName}
            </Text>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
              <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                {item.relativeDate} • {item.time}
              </Text>
            </View>
          </View>

          <View style={[styles.taskBadge, { backgroundColor: iconInfo.color + '15' }]}>
            <Ionicons name={iconInfo.name as any} size={12} color={iconInfo.color} />
            <Text style={[styles.taskText, { color: iconInfo.color }]}>
              {item.taskType}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Tabs */}
      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        <Pressable 
          onPress={() => setActiveTab('pending')}
          style={[
            styles.tab, 
            activeTab === 'pending' && { borderBottomColor: colors.primary }
          ]}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'pending' ? colors.primary : colors.textSecondary },
              activeTab === 'pending' && styles.tabTextActive
            ]}
          >
            Pendientes ({reminders.filter(r => !r.done).length})
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => setActiveTab('completed')}
          style={[
            styles.tab, 
            activeTab === 'completed' && { borderBottomColor: colors.primary }
          ]}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'completed' ? colors.primary : colors.textSecondary },
              activeTab === 'completed' && styles.tabTextActive
            ]}
          >
            Completados ({reminders.filter(r => r.done).length})
          </Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={filteredReminders}
        keyExtractor={(item) => item.id}
        renderItem={renderReminderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons 
              name={activeTab === 'pending' ? "checkmark-circle-outline" : "list-outline"} 
              size={64} 
              color={colors.textSecondary + '66'} 
            />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {activeTab === 'pending' 
                ? "¡Todo al día! No tienes tareas pendientes."
                : "No has completado ninguna tarea todavía."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  checkboxContainer: {
    marginRight: 12,
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDetails: {
    flex: 1,
    gap: 4,
  },
  plantName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
  },
  taskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  taskText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '80%',
  },
});
