import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useColorScheme, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useReminders } from '@/context/RemindersContext';
import { usePlants } from '@/context/PlantsContext';
import * as Location from 'expo-location';
import { ClimaticZone, determineZoneFromCoords, getOptimalPeriods } from '@/utils/climate';

export default function CalendarScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  
  const { reminders, completeReminder } = useReminders();
  const { plants } = usePlants();

  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [zone, setZone] = useState<ClimaticZone>('Norte');
  const [loadingZone, setLoadingZone] = useState(true);

  // Get location
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLoadingZone(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const detectedZone = determineZoneFromCoords(location.coords.latitude);
        setZone(detectedZone);
      } catch (error) {
        console.log("Error getting location", error);
      } finally {
        setLoadingZone(false);
      }
    })();
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    // JS days: 0=Sun, 1=Mon... we want Mon=0, Sun=6
    return day === 0 ? 6 : day - 1;
  };

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startOffset = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentMonthDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonthDate(new Date(year, month + 1, 1));

  const calendarSlots: (number | null)[] = Array.from({ length: startOffset }, () => null as number | null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const getDayString = (d: number) => {
    const y = year;
    const m = (month + 1).toString().padStart(2, '0');
    const day = d.toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const getTaskColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'riego': return colors.info || '#2196F3';
      case 'poda': return colors.warning || '#FF9800';
      case 'abono': return colors.secondary || '#4CAF50';
      case 'trasplante': return colors.primary;
      default: return colors.textSecondary;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'riego': return 'water';
      case 'poda': return 'cut';
      case 'abono': return 'leaf';
      case 'trasplante': return 'trending-up';
      default: return 'notifications';
    }
  };

  const getEventsForDate = (dateStr: string) => {
    return reminders.filter(r => r.nextDate === dateStr && !r.done);
  };

  const formatFriendlyMonth = (m: number, y: number) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[m]} ${y}`;
  };

  // Next 7 days tasks
  const next7DaysTasks = reminders.filter(r => {
    if (r.done) return false;
    const taskDate = new Date(r.nextDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).sort((a,b) => a.nextDate.localeCompare(b.nextDate));

  // Optimal periods for this month
  const currentMonthOptimal: {plant: string, task: string, desc: string}[] = [];
  plants.forEach(p => {
    const periods = getOptimalPeriods(zone, p.category);
    periods.forEach(per => {
      if (month >= per.startMonth && month <= per.endMonth) {
        currentMonthOptimal.push({ plant: p.nickname || p.commonName, task: per.type, desc: per.description });
      }
    });
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Zone Selector */}
        <View style={styles.zoneContainer}>
          <Text style={{color: colors.textSecondary, fontSize: 12}}>Zona Climática:</Text>
          <View style={styles.zoneButtons}>
            {['Norte', 'Tropical', 'Sur'].map(z => (
              <Pressable 
                key={z} 
                onPress={() => setZone(z as ClimaticZone)}
                style={[styles.zoneBtn, zone === z && { backgroundColor: colors.primary, borderColor: colors.primary }]}
              >
                <Text style={[styles.zoneBtnText, {color: colors.text}, zone === z && {color: '#FFF'}]}>{z}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Calendar Card */}
        <View style={[styles.calendarCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.calendarHeader}>
            <Pressable onPress={prevMonth} style={styles.arrowBtn}>
              <Ionicons name="chevron-back" size={20} color={colors.text} />
            </Pressable>
            <Text style={[styles.monthTitle, { color: colors.text }]}>{formatFriendlyMonth(month, year)}</Text>
            <Pressable onPress={nextMonth} style={styles.arrowBtn}>
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.weekdaysContainer}>
            {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((day, index) => (
              <Text key={index} style={[styles.weekdayText, { color: colors.textSecondary }]}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarSlots.map((day, index) => {
              if (day === null) return <View key={`empty-${index}`} style={styles.dayCell} />;
              const dateStr = getDayString(day);
              const isSelected = selectedDate === dateStr;
              const isToday = todayStr === dateStr;
              const dayEvents = getEventsForDate(dateStr);

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
                  <Text style={[styles.dayText, { color: colors.text }, isSelected && { color: '#FFFFFF', fontWeight: 'bold' }, isToday && !isSelected && { color: colors.primary, fontWeight: 'bold' }]}>
                    {day}
                  </Text>
                  
                  <View style={styles.dotsContainer}>
                    {dayEvents.slice(0, 3).map((event, idx) => (
                      <View key={idx} style={[styles.dot, { backgroundColor: isSelected ? '#FFFFFF' : getTaskColor(event.taskType) }]} />
                    ))}
                    {dayEvents.length > 3 && <View style={[styles.dot, {backgroundColor: colors.textSecondary}]} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Selected Day Agenda */}
        <View style={styles.agendaSection}>
          <Text style={[styles.agendaTitle, { color: colors.text }]}>Tareas del {selectedDate}</Text>
          
          {getEventsForDate(selectedDate).length > 0 ? (
            getEventsForDate(selectedDate).map((event) => (
              <View key={event.id} style={[styles.eventCard, { backgroundColor: colors.surface, borderColor: colors.border, borderLeftColor: getTaskColor(event.taskType) }]}>
                <Pressable onPress={() => completeReminder(event.id)}>
                   <Ionicons name="ellipse-outline" size={24} color={colors.textSecondary} />
                </Pressable>
                <View style={styles.eventDetails}>
                  <Text style={[styles.eventPlant, { color: colors.text }]}>{event.plantName} - {event.taskType}</Text>
                  <Text style={{fontSize: 12, color: colors.textSecondary}}>{event.time}</Text>
                </View>
              </View>
            ))
          ) : (
             <Text style={{color: colors.textSecondary, fontStyle: 'italic'}}>No hay tareas para este día.</Text>
          )}
        </View>

        {/* Next 7 days view */}
        <View style={styles.agendaSection}>
           <Text style={[styles.agendaTitle, { color: colors.text, marginTop: 12 }]}>Próximos 7 días</Text>
           {next7DaysTasks.length > 0 ? (
             next7DaysTasks.slice(0,5).map(event => (
               <View key={event.id} style={{flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6}}>
                 <View style={[styles.dot, {backgroundColor: getTaskColor(event.taskType), width: 8, height: 8, borderRadius: 4}]} />
                 <Text style={{color: colors.text, flex: 1}}>{event.plantName} ({event.taskType})</Text>
                 <Text style={{color: colors.textSecondary, fontSize: 12}}>{event.nextDate}</Text>
               </View>
             ))
           ) : (
             <Text style={{color: colors.textSecondary}}>No hay tareas en los próximos 7 días.</Text>
           )}
        </View>

        {/* Optimal Periods / Recomendaciones */}
        <View style={styles.agendaSection}>
           <Text style={[styles.agendaTitle, { color: colors.text, marginTop: 12 }]}>Recomendaciones del Mes ({formatFriendlyMonth(month, year)})</Text>
           {currentMonthOptimal.length > 0 ? (
             currentMonthOptimal.map((opt, idx) => (
               <View key={idx} style={[styles.eventCard, { backgroundColor: colors.surface, borderColor: colors.border, paddingVertical: 8 }]}>
                 <Ionicons name={getTaskIcon(opt.task) as any} size={20} color={getTaskColor(opt.task)} />
                 <View style={styles.eventDetails}>
                   <Text style={[styles.eventPlant, { color: colors.text, fontSize: 13 }]}>{opt.plant}: Época de {opt.task}</Text>
                   <Text style={{fontSize: 11, color: colors.textSecondary}}>{opt.desc}</Text>
                 </View>
               </View>
             ))
           ) : (
             <Text style={{color: colors.textSecondary}}>No hay tareas estacionales destacadas este mes para tus plantas.</Text>
           )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, gap: 16, paddingBottom: 40 },
  zoneContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: -4 },
  zoneButtons: { flexDirection: 'row', gap: 6 },
  zoneBtn: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  zoneBtnText: { fontSize: 11, fontWeight: 'bold' },
  calendarCard: { borderRadius: 20, borderWidth: 1, padding: 16, elevation: 2 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  arrowBtn: { padding: 8 },
  monthTitle: { fontSize: 16, fontWeight: 'bold' },
  weekdaysContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  weekdayText: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 'bold' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginVertical: 2 },
  dayText: { fontSize: 14, fontWeight: '500' },
  todayCell: { borderWidth: 1.5 },
  selectedCell: { borderRadius: 12 },
  dotsContainer: { flexDirection: 'row', position: 'absolute', bottom: 4, gap: 2 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  agendaSection: { gap: 8 },
  agendaTitle: { fontSize: 16, fontWeight: 'bold' },
  eventCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, borderLeftWidth: 6, padding: 12, gap: 12 },
  eventDetails: { flex: 1, gap: 2 },
  eventPlant: { fontSize: 14, fontWeight: 'bold' },
});
