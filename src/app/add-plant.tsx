import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, useColorScheme, Alert } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { usePlants, UserPlant } from '@/context/PlantsContext';
import { useReminders } from '@/context/RemindersContext';
import { EXPLORE_LIBRARY } from '@/constants/mockData';
import { resolveImageSource } from '@/utils/imageResolver';

const PRESET_IMAGES = [
  { id: 'img1', name: 'Monstera', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80' },
  { id: 'img2', name: 'Sansevieria', url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80' },
  { id: 'img3', name: 'Suculenta', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80' },
  { id: 'img4', name: 'Lavanda', url: 'https://images.unsplash.com/photo-1528826722302-d60843d71269?w=400&auto=format&fit=crop&q=80' },
  { id: 'img5', name: 'Rosal', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80' },
  { id: 'img6', name: 'Teléfono (Pothos)', url: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80' }
];

const LOCATIONS = ['Sala de Estar', 'Balcón', 'Cocina', 'Dormitorio', 'Jardín Exterior', 'Oficina'];

export default function AddPlantScreen() {
  const { editId, libraryPlantId } = useLocalSearchParams<{ editId?: string; libraryPlantId?: string }>();
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  const { plants, addPlant, updatePlant } = usePlants();
  const { addReminder } = useReminders();

  // Form Fields
  const [nickname, setNickname] = useState('');
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState('Sala de Estar');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [waterFrequency, setWaterFrequency] = useState('Cada 7 días');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [category, setCategory] = useState<'Interior' | 'Exterior' | 'Suculentas' | 'Huerto'>('Interior');
  const [light, setLight] = useState<'Sombra' | 'Semisombra' | 'Sol directo'>('Semisombra');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Medio' | 'Difícil'>('Fácil');
  
  // Custom manual metadata
  const [isFromLibrary, setIsFromLibrary] = useState(false);
  const [libraryRef, setLibraryRef] = useState<any>(null);

  // Load date on mount
  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    setAcquisitionDate(formattedToday);
  }, []);

  // Handle Edit/Pre-fill Mode
  useEffect(() => {
    if (editId) {
      const existingPlant = plants.find((p) => p.id === editId);
      if (existingPlant) {
        setNickname(existingPlant.nickname);
        setSpecies(existingPlant.scientificName);
        setLocation(existingPlant.location);
        setAcquisitionDate(existingPlant.acquisitionDate);
        setWaterFrequency(existingPlant.waterFrequency);
        setSelectedImage(existingPlant.image);
        setCategory(existingPlant.category);
        setLight(existingPlant.light);
        setDifficulty(existingPlant.difficulty);
      }
    } else if (libraryPlantId) {
      const libPlant = EXPLORE_LIBRARY.find((p) => p.id === libraryPlantId);
      if (libPlant) {
        setIsFromLibrary(true);
        setLibraryRef(libPlant);
        setSpecies(libPlant.commonName);
        setWaterFrequency(libPlant.waterFrequency);
        setSelectedImage(libPlant.image);
        setCategory(libPlant.category);
        setLight(libPlant.light);
        setDifficulty(libPlant.difficulty);
      }
    }
  }, [editId, libraryPlantId, plants]);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa un nombre para tu planta.');
      return;
    }
    if (!species.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa la especie/tipo de planta.');
      return;
    }

    const plantPayload = {
      nickname: nickname.trim(),
      commonName: isFromLibrary && libraryRef ? libraryRef.commonName : nickname.trim(),
      scientificName: species.trim(),
      image: selectedImage,
      healthStatus: editId 
        ? (plants.find(p => p.id === editId)?.healthStatus || { emoji: '🌿', text: 'Saludable', color: '#81C784' })
        : { emoji: '🌿', text: 'Saludable', color: '#81C784' },
      nextWatering: 'En 3 días', // Simulado
      nextWateringDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      waterFrequency: waterFrequency,
      light: light,
      difficulty: difficulty,
      category: category,
      lastWatered: 'Hoy',
      humidity: isFromLibrary && libraryRef ? libraryRef.humidity : '40-60%',
      temperature: isFromLibrary && libraryRef ? libraryRef.temperature : '18-24°C',
      description: isFromLibrary && libraryRef 
        ? libraryRef.description 
        : 'Planta registrada manualmente en tu colección.',
      careInstructions: isFromLibrary && libraryRef 
        ? libraryRef.careInstructions 
        : ['Riega la planta según la frecuencia indicada.', 'Asegúrate de que reciba la luz adecuada.'],
      location: location,
      acquisitionDate: acquisitionDate,
    };

    try {
      if (editId) {
        await updatePlant(editId, plantPayload);
        Alert.alert('Éxito', 'Planta actualizada correctamente.');
      } else {
        const newPlantId = await addPlant(plantPayload);
        
        let waterDays = 7;
        const match = waterFrequency.match(/\d+/);
        if (match) waterDays = parseInt(match[0]);
        
        const nextWateringDate = new Date(Date.now() + waterDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        await addReminder({
          plantId: newPlantId,
          plantName: plantPayload.nickname || plantPayload.commonName,
          taskType: 'Riego',
          frequencyDays: waterDays,
          nextDate: nextWateringDate,
          time: '08:00',
        });

        const nextFertilizerDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        await addReminder({
          plantId: newPlantId,
          plantName: plantPayload.nickname || plantPayload.commonName,
          taskType: 'Abono',
          frequencyDays: 30,
          nextDate: nextFertilizerDate,
          time: '09:00',
        });

        Alert.alert('Éxito', 'Planta y recordatorios añadidos a tu jardín.');
      }
      router.dismissAll(); // Close the modal and return
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar la planta.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerTitle: editId ? 'Editar Planta' : 'Nueva Planta',
        }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Form Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          
          {/* Apodo */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Apodo / Nombre</Text>
            <TextInput
              placeholder="Ej. Mi Monsty, El Helecho de la sala..."
              placeholderTextColor={colors.textSecondary + 'AA'}
              value={nickname}
              onChangeText={setNickname}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />
          </View>

          {/* Especie */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Especie o Tipo de Planta</Text>
            <TextInput
              placeholder="Ej. Monstera Deliciosa, Ficus, Lavanda..."
              placeholderTextColor={colors.textSecondary + 'AA'}
              value={species}
              onChangeText={setSpecies}
              editable={!isFromLibrary}
              style={[
                styles.input, 
                { color: colors.text, borderColor: colors.border },
                isFromLibrary && { backgroundColor: colors.background, color: colors.textSecondary }
              ]}
            />
          </View>

          {/* Ubicación */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Ubicación en casa</Text>
            <View style={styles.chipRow}>
              {LOCATIONS.map((loc) => (
                <Pressable
                  key={loc}
                  onPress={() => setLocation(loc)}
                  style={[
                    styles.chip,
                    { backgroundColor: colors.background, borderColor: colors.border },
                    location === loc && [styles.chipActive, { backgroundColor: colors.primary }]
                  ]}
                >
                  <Text style={[styles.chipText, { color: colors.text }, location === loc && { color: '#FFFFFF' }]}>
                    {loc}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Fecha Adquisición */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Fecha de adquisición</Text>
            <TextInput
              placeholder="AAAA-MM-DD"
              placeholderTextColor={colors.textSecondary + 'AA'}
              value={acquisitionDate}
              onChangeText={setAcquisitionDate}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />
          </View>

          {/* Riego */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Frecuencia de Riego</Text>
            <TextInput
              placeholder="Ej. Cada 7 días, Cada 2 días..."
              placeholderTextColor={colors.textSecondary + 'AA'}
              value={waterFrequency}
              onChangeText={setWaterFrequency}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            />
          </View>

          {/* Categoría (si no es de biblioteca) */}
          {!isFromLibrary && (
            <>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Categoría</Text>
                <View style={styles.chipRow}>
                  {['Interior', 'Exterior', 'Suculentas', 'Huerto'].map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat as any)}
                      style={[
                        styles.chip,
                        { backgroundColor: colors.background, borderColor: colors.border },
                        category === cat && [styles.chipActive, { backgroundColor: colors.primary }]
                      ]}
                    >
                      <Text style={[styles.chipText, { color: colors.text }, category === cat && { color: '#FFFFFF' }]}>
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Exposición Solar</Text>
                <View style={styles.chipRow}>
                  {['Sombra', 'Semisombra', 'Sol directo'].map((lt) => (
                    <Pressable
                      key={lt}
                      onPress={() => setLight(lt as any)}
                      style={[
                        styles.chip,
                        { backgroundColor: colors.background, borderColor: colors.border },
                        light === lt && [styles.chipActive, { backgroundColor: colors.primary }]
                      ]}
                    >
                      <Text style={[styles.chipText, { color: colors.text }, light === lt && { color: '#FFFFFF' }]}>
                        {lt}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Image Picker preset */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Foto de la planta</Text>
            <View style={styles.imagePreviewContainer}>
              <Image source={resolveImageSource(selectedImage)} style={styles.mainPreviewImage} contentFit="cover" />
            </View>
            {!isFromLibrary && (
              <View style={styles.imagesGrid}>
                {PRESET_IMAGES.map((img) => {
                  const isSelected = selectedImage === img.url;
                  return (
                    <Pressable
                      key={img.id}
                      onPress={() => setSelectedImage(img.url)}
                      style={[
                        styles.thumbContainer,
                        { borderColor: colors.border },
                        isSelected && { borderColor: colors.primary, borderWidth: 2 }
                      ]}
                    >
                      <Image source={{ uri: img.url }} style={styles.thumbImage} contentFit="cover" />
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

        </View>

        {/* Submit Button */}
        <Pressable 
          onPress={handleSubmit} 
          style={[styles.submitBtn, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />
          <Text style={styles.submitBtnText}>
            {editId ? 'Guardar Cambios' : 'Añadir a mi Jardín'}
          </Text>
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  chipActive: {
    borderColor: 'transparent',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  imagePreviewContainer: {
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
  },
  mainPreviewImage: {
    width: '100%',
    height: '100%',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  thumbContainer: {
    width: '30%',
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  submitBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
