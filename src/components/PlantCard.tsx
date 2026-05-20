import React from 'react';
import { StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Plant } from '@/constants/mockData';
import { Colors } from '@/constants/Colors';

import { resolveImageSource } from '@/utils/imageResolver';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  const handlePress = () => {
    router.push({
      pathname: '/plant/[id]',
      params: { id: plant.id }
    });
  };

  const displayName = 'nickname' in plant ? (plant as any).nickname : plant.commonName;
  const subLabel = 'location' in plant ? (plant as any).location : plant.scientificName;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={resolveImageSource(plant.image)}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <View 
          style={[
            styles.healthBadge, 
            { backgroundColor: plant.healthStatus.color + '22' } // 22 is ~13% opacity in hex for a subtle tint
          ]}
        >
          <Text style={[styles.healthText, { color: plant.healthStatus.color }]}>
            {plant.healthStatus.emoji} {plant.healthStatus.text}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={[styles.commonName, { color: colors.text }]} numberOfLines={1}>
          {displayName}
        </Text>
        <Text style={[styles.scientificName, { color: colors.textSecondary }]} numberOfLines={1}>
          {subLabel}
        </Text>
        
        <View style={[styles.wateringBadge, { backgroundColor: colors.primaryLight }]}>
          <Ionicons name="water" size={12} color={colors.primary} />
          <Text style={[styles.wateringText, { color: colors.primary }]}>
            Riego: {plant.nextWatering}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  healthBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  healthText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  details: {
    padding: 12,
    gap: 4,
  },
  commonName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scientificName: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  wateringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  wateringText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
