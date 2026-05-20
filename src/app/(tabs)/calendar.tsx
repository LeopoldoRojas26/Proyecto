import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useColorScheme, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { MOCK_CALENDAR_EVENTS, CalendarEvent } from '@/constants/mockData';

export default function CalendarScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  // Set default selected date to May 19th, 2026 (matching mock data date)
  const [selectedDate, setSelectedDate] = useState<string>('2026-05-19');

  // Month info: May 2026
  // May 1st, 2026 is a Friday.
  // Weeks start on Monday. Friday is index 4 (0: Mon, 1: Tue, 2: Wed, 3: Thu, 4: Fri, 5: Sat, 6: Sun)
  const daysInMonth = 31;
  const startOffset = 4; // 4 empty slots for Mon, Tue, Wed, Thu
  const totalSlots = daysInMonth + startOffset;

  // Generate days array
  const calendarSlots = [];
  for (let i = 0; i < startOffset; i++) {
    calendarSlots.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarSlots.push(i);
  }

  // Group events by date for easy lookup in calendar cells
  const getEventsForDay = (day: number) => {
    const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
    return MOCK_CALENDAR_EVENTS.filter(event => event.date === dateStr);
  };

  const getDayString = (day: number) => {
    return `2026-05-${day.toString().padStart(2, '0')}`;
  };

  const selectedDayEvents = MOCK_CALENDAR_EVENTS.filter(event => event.date === selectedDate);
  const selectedDayNum = parseInt(selectedDate.split('-')[2]);

  // Helper to format Spanish dates
  const formatFriendlyDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    const day = parseInt(parts[2]);
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${day} de ${months[4]} de ${parts[0]}`;
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'Siembra': return 'leaf';
      case 'Poda': return 'cut';
      case 'Trasplante': return 'trending-up';
      case 'Abono': return 'flask';
      case 'Riego': return 'water';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Calendar Card */}
        <View style={[styles.calendarCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Calendar Header */}
          <View style={styles.calendarHeader}>
            <Pressable style={styles.arrowBtn}>
              <Ionicons name="chevron-back" size={20} color={colors.text} />
            </Pressable>
            <Text style={[styles.monthTitle, { color: colors.text }]}>Mayo 2026</Text>
            <Pressable style={styles.arrowBtn}>
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            </Pressable>
          </View>

          {/* Weekday headers */}
          <View style={styles.weekdaysContainer}>
            {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((day, index) => (
              <Text key={index} style={[styles.weekdayText, { color: colors.textSecondary }]}>
                {day}
              </Text>
            ))}
          </View>

          {/* Days Grid */}
          <View style={styles.daysGrid}>
            {calendarSlots.map((day, index) => {
              if (day === null) {
                return <View key={`empty-${index}`} style={styles.dayCell} />;
              }

              const dateStr = getDayString(day);
              const isSelected = selectedDate === dateStr;
              const isToday = day === 19; // Simulate May 19 as today
              const dayEvents = getEventsForDay(day);

              return (
                <Pressable
                  key={`day-${day}`}
                  onPress={() => setSelectedDate(dateStr)}
                  style={[
                    styles.dayCell,
                    isToday && !isSelected && [styles.todayCell, { borderColor: colors.primary }],
                    isSelected && [styles.selectedCell, { backgroundColor: colors.primary }],
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      { color: colors.text },
                      isSelected && { color: '#FFFFFF', fontWeight: 'bold' },
                      isToday && !isSelected && { color: colors.primary, fontWeight: 'bold' }
                    ]}
                  >
                    {day}
                  </Text>
                  
                  {/* Event Dots */}
                  <View style={styles.dotsContainer}>
                    {dayEvents.map((event, idx) => (
                      <View 
                        key={idx} 
                        style={[
                          styles.dot, 
                          { backgroundColor: isSelected ? '#FFFFFF' : event.color }
                        ]} 
                      />
                    ))}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Selected Day Agenda */}
        <View style={styles.agendaSection}>
          <Text style={[styles.agendaTitle, { color: colors.text }]}>
            Tareas del {formatFriendlyDate(selectedDate)}
          </Text>

          {selectedDayEvents.length > 0 ? (
            selectedDayEvents.map((event) => {
              return (
                <View 
                  key={event.id} 
                  style={[
                    styles.eventCard, 
                    { 
                      backgroundColor: colors.surface, 
                      borderColor: colors.border,
                      borderLeftColor: event.color
                    }
                  ]}
                >
                  <View style={[styles.iconBox, { backgroundColor: event.color + '15' }]}>
                    <Ionicons name={getEventIcon(event.type) as any} size={20} color={event.color} />
                  </View>
                  
                  <View style={styles.eventDetails}>
                    <View style={styles.eventHeaderRow}>
                      <Text style={[styles.eventPlant, { color: colors.text }]}>{event.plantName}</Text>
                      <View style={[styles.typeBadge, { backgroundColor: event.color + '15' }]}>
                        <Text style={[styles.typeBadgeText, { color: event.color }]}>{event.type}</Text>
                      </View>
                    </View>
                    <Text style={[styles.eventNotes, { color: colors.textSecondary }]}>{event.notes}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={[styles.noEventsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="happy-outline" size={36} color={colors.textSecondary} />
              <Text style={[styles.noEventsText, { color: colors.textSecondary }]}>
                No hay tareas programadas para este día. ¡Tus plantas están al día!
              </Text>
            </View>
          )}

          {/* Monthly Summary Box */}
          <Text style={[styles.agendaSubtitle, { color: colors.text, marginTop: 16 }]}>
            Resumen del Mes (Mayo)
          </Text>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Siembra: 2</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#FFA000' }]} />
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Poda: 1</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#0288D1' }]} />
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Trasplante: 1</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#8D6E63' }]} />
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Abono: 1</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  calendarCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowBtn: {
    padding: 8,
    borderRadius: 12,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 2,
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  todayCell: {
    borderWidth: 1.5,
    borderRadius: 12,
  },
  selectedCell: {
    borderRadius: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 4,
    gap: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  agendaSection: {
    gap: 12,
  },
  agendaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  agendaSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 6,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDetails: {
    flex: 1,
    gap: 4,
  },
  eventHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventPlant: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventNotes: {
    fontSize: 12,
    lineHeight: 16,
  },
  noEventsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  noEventsText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: '80%',
  },
  summaryCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    justifyContent: 'space-between',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '45%',
    marginVertical: 4,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
