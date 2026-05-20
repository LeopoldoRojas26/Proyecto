import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, useColorScheme, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { usePlants } from '@/context/PlantsContext';
import { useReminders } from '@/context/RemindersContext';

const TASK_TYPES = ['Riego', 'Abono', 'Poda', 'Trasplante', 'Limpieza', 'Otro'];

export default function AddReminderScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  const { plants } = usePlants();
  const { addReminder } = useReminders();

  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [taskType, setTaskType] = useState(TASK_TYPES[0]);
  const [customTaskType, setCustomTaskType] = useState('');
  const [frequencyDays, setFrequencyDays] = useState('7');
  const [nextDate, setNextDate] = useState('');
  const [time, setTime] = useState('09:00');

  useEffect(() => {
    const today = new Date();
    setNextDate(today.toISOString().split('T')[0]);
    if (plants.length > 0) {
      setSelectedPlant(plants[0].id);
    }
  }, [plants]);

  const handleSubmit = async () => {
    if (!selectedPlant) {
      Alert.alert('Error', 'Debes seleccionar una planta o agregar una primero.');
      return;
    }
    const freq = parseInt(frequencyDays);
    if (isNaN(freq) || freq <= 0) {
      Alert.alert('Error', 'La frecuencia debe ser un número mayor a 0.');
      return;
    }
    
    // Basic date validation YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(nextDate)) {
      Alert.alert('Error', 'Formato de fecha inválido. Usa AAAA-MM-DD.');
      return;
    }
    // Basic time validation HH:mm
    if (!/^\d{2}:\d{2}$/.test(time)) {
      Alert.alert('Error', 'Formato de hora inválido. Usa HH:MM.');
      return;
    }

    const plant = plants.find(p => p.id === selectedPlant);
    const finalTaskType = taskType === 'Otro' ? customTaskType : taskType;

    if (!finalTaskType.trim()) {
      Alert.alert('Error', 'Especifica el tipo de tarea.');
      return;
    }

    try {
      await addReminder({
        plantId: selectedPlant,
        plantName: plant?.nickname || plant?.commonName || 'Mi Planta',
        taskType: finalTaskType,
        frequencyDays: freq,
        nextDate: nextDate,
        time: time,
      });
      Alert.alert('Éxito', 'Recordatorio añadido.');
      router.back();
    } catch (e) {
      Alert.alert('Error', 'Hubo un problema al guardar el recordatorio.');
    }
  };

  if (plants.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
         <Stack.Screen options={{ headerTitle: 'Añadir Recordatorio' }} />
         <Text style={{ color: colors.text }}>No tienes plantas en tu jardín todavía.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerTitle: 'Añadir Recordatorio' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          
          {/* Planta */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Selecciona una Planta</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRowHorizontal}>
              {plants.map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => setSelectedPlant(p.id)}
                  style={[
                    styles.chip,
                    { backgroundColor: colors.background, borderColor: colors.border },
                    selectedPlant === p.id && [styles.chipActive, { backgroundColor: colors.primary }]
                  ]}
                >
                  <Text style={[styles.chipText, { color: colors.text }, selectedPlant === p.id && { color: '#FFFFFF' }]}>
                    {p.nickname || p.commonName}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Tipo de Tarea */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Tipo de Tarea</Text>
            <View style={styles.chipRow}>
              {TASK_TYPES.map((t) => (
                <Pressable
                  key={t}
                  onPress={() => setTaskType(t)}
                  style={[
                    styles.chip,
                    { backgroundColor: colors.background, borderColor: colors.border },
                    taskType === t && [styles.chipActive, { backgroundColor: colors.primary }]
                  ]}
                >
                  <Text style={[styles.chipText, { color: colors.text }, taskType === t && { color: '#FFFFFF' }]}>
                    {t}
                  </Text>
                </Pressable>
              ))}
            </View>
            {taskType === 'Otro' && (
              <TextInput
                placeholder="Describe la tarea..."
                placeholderTextColor={colors.textSecondary + 'AA'}
                value={customTaskType}
                onChangeText={setCustomTaskType}
                style={[styles.input, { color: colors.text, borderColor: colors.border, marginTop: 8 }]}
              />
            )}
          </View>

          {/* Frecuencia */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Frecuencia (cada cuántos días)</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="Ej. 7"
              placeholderTextColor={colors.textSecondary + 'AA'}
              value={frequencyDays}
              onChangeText={setFrequencyDays}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />
          </View>

          {/* Próxima fecha */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Fecha de Inicio (AAAA-MM-DD)</Text>
            <TextInput
              placeholder="AAAA-MM-DD"
              placeholderTextColor={colors.textSecondary + 'AA'}
              value={nextDate}
              onChangeText={setNextDate}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />
          </View>

          {/* Hora */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Hora del recordatorio (HH:MM)</Text>
            <TextInput
              placeholder="09:00"
              placeholderTextColor={colors.textSecondary + 'AA'}
              value={time}
              onChangeText={setTime}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />
          </View>

        </View>

        <Pressable 
          onPress={handleSubmit} 
          style={[styles.submitBtn, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
          <Text style={styles.submitBtnText}>Crear Recordatorio</Text>
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, gap: 16, paddingBottom: 40 },
  card: { borderRadius: 20, borderWidth: 1, padding: 16, gap: 16 },
  inputGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: 'bold' },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, fontSize: 14 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipRowHorizontal: { gap: 8, paddingBottom: 4 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
  chipActive: { borderColor: 'transparent' },
  chipText: { fontSize: 12, fontWeight: '600' },
  submitBtn: { flexDirection: 'row', height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 8 },
  submitBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});
