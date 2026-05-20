import React from 'react';
import { StyleSheet, Text, View, FlatList, useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_PLANTS } from '@/constants/mockData';
import PlantCard from '@/components/PlantCard';
import { Ionicons } from '@expo/vector-icons';

export default function MyPlantsScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  const totalPlants = MOCK_PLANTS.length;
  const needsAttention = MOCK_PLANTS.filter(
    (p) => p.healthStatus.text.toLowerCase().includes('atención') || p.healthStatus.text.toLowerCase().includes('hojas')
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
          <Text style={[styles.statNum, { color: colors.text }]}>2</Text>
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
        data={MOCK_PLANTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlantCard plant={item} />}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
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
});
