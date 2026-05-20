import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, useColorScheme, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useReminders, Reminder } from '@/context/RemindersContext';
import { router } from 'expo-router';

export default function RemindersScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  const { reminders, completeReminder, deleteReminder } = useReminders();
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  const getTaskIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'riego':
        return { name: 'water', color: colors.info || '#2196F3' };
      case 'poda':
        return { name: 'cut', color: colors.warning || '#FF9800' };
      case 'abono':
        return { name: 'leaf', color: colors.secondary || '#4CAF50' };
      case 'trasplante':
        return { name: 'trending-up', color: colors.primary };
      case 'limpieza':
        return { name: 'sparkles', color: '#00BCD4' };
      default:
        return { name: 'notifications', color: colors.textSecondary };
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const getUrgency = (dateStr: string) => {
    if (dateStr < todayStr) return { label: 'Vencido', color: colors.notification || '#ef4444' };
    if (dateStr === todayStr) return { label: 'Hoy', color: colors.warning || '#FF9800' };
    return { label: 'Próximo', color: colors.success || '#81C784' };
  };

  const handleToggle = async (id: string, currentlyDone: boolean) => {
    if (!currentlyDone) {
      await completeReminder(id);
    }
  };

  const filteredReminders = reminders
    .filter(item => activeTab === 'pending' ? !item.done : item.done)
    .sort((a, b) => {
      if (a.nextDate === b.nextDate) {
        return a.time.localeCompare(b.time);
      }
      return a.nextDate.localeCompare(b.nextDate);
    });

  const renderReminderItem = ({ item }: { item: Reminder }) => {
    const iconInfo = getTaskIcon(item.taskType);
    const urgency = getUrgency(item.nextDate);

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
          onPress={() => handleToggle(item.id, item.done)} 
          style={styles.checkboxContainer}
        >
          <Ionicons 
            name={item.done ? "checkmark-circle" : "ellipse-outline"} 
            size={28} 
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
              <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
              <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                {item.nextDate} • {item.time}
              </Text>
              {!item.done && (
                <Text style={[styles.urgencyText, { color: urgency.color }]}>
                  ({urgency.label})
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.taskBadge, { backgroundColor: iconInfo.color + '15' }]}>
            <Ionicons name={iconInfo.name as any} size={12} color={iconInfo.color} />
            <Text style={[styles.taskText, { color: iconInfo.color }]}>
              {item.taskType}
            </Text>
          </View>
        </View>
        
        {/* Delete button option */}
        <Pressable onPress={() => deleteReminder(item.id)} style={{ paddingLeft: 10 }}>
            <Ionicons name="trash-outline" size={18} color={colors.notification || '#ef4444'} />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with FAB equivalent */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Mis Tareas</Text>
        <Pressable onPress={() => router.push('/add-reminder')} style={[styles.addBtn, { backgroundColor: colors.primary }]}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Nuevo</Text>
        </Pressable>
      </View>

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
                : "No hay tareas completadas."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabText: { fontSize: 14, fontWeight: '500' },
  tabTextActive: { fontWeight: 'bold' },
  listContent: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  checkboxContainer: { marginRight: 12 },
  contentContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textDetails: { flex: 1, gap: 4 },
  plantName: { fontSize: 15, fontWeight: 'bold' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  timeText: { fontSize: 12 },
  urgencyText: { fontSize: 12, fontWeight: 'bold' },
  taskBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  taskText: { fontSize: 11, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14, textAlign: 'center', maxWidth: '80%' },
});
