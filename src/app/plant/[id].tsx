import React from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { usePlants } from '@/context/PlantsContext';
import { EXPLORE_LIBRARY } from '@/constants/mockData';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  
  const { plants, deletePlant, updatePlant } = usePlants();

  // 1. Search in user's plants
  const userPlant = plants.find((p) => p.id === id);
  // 2. Search in explore library catalog
  const libraryPlant = EXPLORE_LIBRARY.find((p) => p.id === id);

  const plant = userPlant || libraryPlant;
  const isUserPlant = !!userPlant;

  if (!plant) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Ionicons name="alert-circle-outline" size={64} color={colors.notification} />
        <Text style={[styles.errorText, { color: colors.text }]}>Planta no encontrada</Text>
        <Pressable 
          onPress={() => router.back()} 
          style={[styles.backBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.backBtnText}>Volver al Jardín</Text>
        </Pressable>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      '¿Eliminar planta?',
      `¿Estás seguro de que deseas eliminar a ${userPlant?.nickname} de tu jardín? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            await deletePlant(plant.id);
            router.back();
          }
        }
      ]
    );
  };

  const handleWater = async () => {
    if (!isUserPlant) return;
    try {
      await updatePlant(plant.id, {
        lastWatered: 'Hoy',
        nextWatering: 'En 7 días' // Simulated reset
      });
      Alert.alert('¡Regada!', `${userPlant.nickname} ha sido marcada como regada.`);
    } catch (e) {
      Alert.alert('Error', 'No se pudo registrar el riego.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerTitle: isUserPlant ? userPlant.nickname : plant.commonName,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerRight: () => (
            isUserPlant ? (
              <Pressable 
                onPress={() => router.push({ pathname: '/add-plant', params: { editId: plant.id } })} 
                style={{ marginRight: 8 }}
              >
                <Ionicons name="pencil-outline" size={22} color="#FFFFFF" />
              </Pressable>
            ) : null
          ),
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: plant.image }} 
            style={styles.image}
            contentFit="cover"
          />
          <View style={[styles.categoryBadge, { backgroundColor: colors.surface }]}>
            <Text style={[styles.categoryText, { color: colors.primary }]}>{plant.category}</Text>
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.commonName, { color: colors.text }]}>
                {isUserPlant ? userPlant.nickname : plant.commonName}
              </Text>
              {isUserPlant && (
                <Text style={[styles.speciesName, { color: colors.textSecondary }]}>
                  Especie: {plant.scientificName}
                </Text>
              )}
              {!isUserPlant && (
                <Text style={[styles.scientificName, { color: colors.textSecondary }]}>
                  {plant.scientificName}
                </Text>
              )}
            </View>
            <View style={[styles.healthBadge, { backgroundColor: plant.healthStatus.color + '22' }]}>
              <Text style={[styles.healthText, { color: plant.healthStatus.color }]}>
                {plant.healthStatus.emoji} {plant.healthStatus.text}
              </Text>
            </View>
          </View>

          {/* User Plant Custom Metadata Row */}
          {isUserPlant && (
            <View style={[styles.metaRow, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <View style={styles.metaCol}>
                <Ionicons name="location-outline" size={16} color={colors.primary} />
                <Text style={[styles.metaValue, { color: colors.text }]}>{userPlant.location}</Text>
                <Text style={styles.metaLabel}>Ubicación</Text>
              </View>
              <View style={[styles.metaDivider, { backgroundColor: colors.border }]} />
              <View style={styles.metaCol}>
                <Ionicons name="calendar-outline" size={16} color={colors.primary} />
                <Text style={[styles.metaValue, { color: colors.text }]}>{userPlant.acquisitionDate}</Text>
                <Text style={styles.metaLabel}>Adquirida</Text>
              </View>
            </View>
          )}

          {/* Quick stats grid */}
          <View style={[styles.statsGrid, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
            <View style={styles.statItem}>
              <Ionicons name="sunny-outline" size={20} color={colors.warning} />
              <Text style={[styles.statValue, { color: colors.text }]}>{plant.light}</Text>
              <Text style={styles.statLabel}>Luz</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="construct-outline" size={20} color={colors.secondary} />
              <Text style={[styles.statValue, { color: colors.text }]}>{plant.difficulty}</Text>
              <Text style={styles.statLabel}>Dificultad</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="water-outline" size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>{plant.waterFrequency}</Text>
              <Text style={styles.statLabel}>Frecuencia</Text>
            </View>
          </View>

          {/* Detailed attributes */}
          <View style={styles.attributeRow}>
            <View style={styles.attributeItem}>
              <Ionicons name="thermometer-outline" size={18} color={colors.notification} />
              <View>
                <Text style={styles.attributeLabel}>Temperatura</Text>
                <Text style={[styles.attributeValue, { color: colors.text }]}>{plant.temperature}</Text>
              </View>
            </View>
            <View style={styles.attributeItem}>
              <Ionicons name="cloud-outline" size={18} color={colors.info} />
              <View>
                <Text style={styles.attributeLabel}>Humedad Ideal</Text>
                <Text style={[styles.attributeValue, { color: colors.text }]}>{plant.humidity}</Text>
              </View>
            </View>
          </View>

          {/* Watering log status / CTA button */}
          {isUserPlant ? (
            <View style={[styles.wateringStatus, { backgroundColor: colors.primaryLight }]}>
              <View style={styles.wateringStatusText}>
                <Text style={[styles.wateringStatusTitle, { color: colors.primary }]}>Próximo Riego</Text>
                <Text style={[styles.wateringStatusDesc, { color: colors.text }]}>Programado: {userPlant.nextWatering}</Text>
              </View>
              <Pressable onPress={handleWater} style={[styles.waterActionBtn, { backgroundColor: colors.primary }]}>
                <Ionicons name="water" size={18} color="#FFFFFF" />
                <Text style={styles.waterActionText}>Regar</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable 
              onPress={() => router.push({ pathname: '/add-plant', params: { libraryPlantId: plant.id } })} 
              style={[styles.addBtnLarge, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="add-circle" size={22} color="#FFFFFF" />
              <Text style={styles.addBtnLargeText}>Añadir a mi Jardín</Text>
            </Pressable>
          )}

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Descripción</Text>
            <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>{plant.description}</Text>
          </View>

          {/* Care Tips */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Guía de Cuidados</Text>
            {plant.careInstructions.map((instruction, index) => (
              <View key={index} style={styles.careRow}>
                <View style={[styles.careNumber, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.careNumberText, { color: colors.primary }]}>{index + 1}</Text>
                </View>
                <Text style={[styles.careText, { color: colors.textSecondary }]}>{instruction}</Text>
              </View>
            ))}
          </View>

          {/* Delete Button for User Plants */}
          {isUserPlant && (
            <Pressable 
              onPress={handleDelete} 
              style={[styles.deleteBtn, { borderColor: colors.notification }]}
            >
              <Ionicons name="trash-outline" size={18} color={colors.notification} />
              <Text style={[styles.deleteBtnText, { color: colors.notification }]}>Eliminar de mi Jardín</Text>
            </Pressable>
          )}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoCard: {
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 20,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  commonName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  speciesName: {
    fontSize: 12,
    marginTop: 2,
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 2,
  },
  healthBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  healthText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  metaRow: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  metaCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  metaDivider: {
    width: 1,
    height: '80%',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  metaLabel: {
    fontSize: 9,
    color: '#90A4AE',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#90A4AE',
    fontWeight: '600',
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  attributeItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  attributeLabel: {
    fontSize: 10,
    color: '#90A4AE',
    fontWeight: '600',
  },
  attributeValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  wateringStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  wateringStatusText: {
    flex: 1,
    gap: 2,
  },
  wateringStatusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  wateringStatusDesc: {
    fontSize: 12,
    fontWeight: '500',
  },
  waterActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  waterActionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addBtnLarge: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addBtnLargeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  careRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  careNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  careNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  careText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  deleteBtn: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
