import React from 'react';
import { StyleSheet, Text, View, FlatList, useColorScheme, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { usePlants } from '@/context/PlantsContext';
import PlantCard from '@/components/PlantCard';
import { Ionicons } from '@expo/vector-icons';

export default function MyPlantsScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  const { plants, loading } = usePlants();

  const totalPlants = plants.length;
  const needsAttention = plants.filter(
    (p) => 
      p.healthStatus.text.toLowerCase().includes('atención') || 
      p.healthStatus.text.toLowerCase().includes('alerta') ||
      p.healthStatus.text.toLowerCase().includes('enferma')
  ).length;

  const riegosHoy = plants.filter(
    (p) => p.nextWatering.toLowerCase().includes('hoy')
  ).length;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.welcomeRow}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Tu jardín personal</Text>
          <Text style={[styles.titleText, { color: colors.text }]}>¡Hola, Jardinero! 👋</Text>
        </View>
        <View style={[styles.avatarBadge, { backgroundColor: colors.primary }]}>
          <Ionicons name="person" size={20} color="#FFFFFF" />
        </View>
      </View>

      {/* Quick Action Chips Bar */}
      <View style={styles.actionChipsBar}>
        <Pressable 
          onPress={() => router.push('/explore')} 
          style={[styles.actionChip, { backgroundColor: colors.primaryLight, borderColor: colors.primary + '22' }]}
        >
          <Ionicons name="search" size={16} color={colors.primary} />
          <Text style={[styles.actionChipText, { color: colors.primary }]}>Biblioteca Botánica</Text>
        </Pressable>

        <Pressable 
          onPress={() => router.push('/chat')} 
          style={[styles.actionChip, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary + '22' }]}
        >
          <Ionicons name="chatbubbles-outline" size={16} color={colors.secondary} />
          <Text style={[styles.actionChipText, { color: colors.secondary }]}>Chat con Greeny</Text>
        </Pressable>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="leaf" size={24} color={colors.primary} />
          <Text style={[styles.statNum, { color: colors.text }]}>{totalPlants}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Plantas</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="warning" size={24} color={colors.notification} />
          <Text style={[styles.statNum, { color: colors.text }]}>{needsAttention}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>En Alerta</Text>
        </View>
        
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="water" size={24} color={colors.info} />
          <Text style={[styles.statNum, { color: colors.text }]}>{riegosHoy}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Riegos Hoy</Text>
        </View>
      </View>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Mis Plantas</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlantCard plant={item} />}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="leaf-outline" size={64} color={colors.textSecondary + '66'} style={{ marginBottom: 12 }} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Tu jardín está vacío</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Comienza añadiendo una planta con el botón + o elige una de la biblioteca en "Explorar".
            </Text>
            <Pressable 
              onPress={() => router.push('/add-plant')} 
              style={[styles.emptyBtn, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
              <Text style={styles.emptyBtnText}>Añadir Planta</Text>
            </Pressable>
          </View>
        }
      />

      {/* Floating Action Button (FAB) */}
      <Pressable 
        onPress={() => router.push('/add-plant')} 
        style={[styles.fab, { backgroundColor: colors.primary }]}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  listContent: {
    padding: 8,
    paddingBottom: 80, // Space for FAB
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statNum: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  emptyBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  actionChipsBar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  actionChipText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});
