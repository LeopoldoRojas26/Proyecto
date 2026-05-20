import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Pressable, useColorScheme, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { EXPLORE_LIBRARY, Plant } from '@/constants/mockData';
import PlantCard from '@/components/PlantCard';

type CategoryFilter = 'Todas' | 'Interior' | 'Exterior' | 'Suculentas' | 'Huerto';
type LightFilter = 'Todos' | 'Sombra' | 'Semisombra' | 'Sol directo';
type DifficultyFilter = 'Todos' | 'Fácil' | 'Medio' | 'Difícil';

export default function ExploreScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todas');
  const [selectedLight, setSelectedLight] = useState<LightFilter>('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('Todos');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Categories list
  const categories: CategoryFilter[] = ['Todas', 'Interior', 'Exterior', 'Suculentas', 'Huerto'];
  const lights: LightFilter[] = ['Todos', 'Sombra', 'Semisombra', 'Sol directo'];
  const difficulties: DifficultyFilter[] = ['Todos', 'Fácil', 'Medio', 'Difícil'];

  // Filtered plants list
  const filteredPlants = useMemo(() => {
    return EXPLORE_LIBRARY.filter((plant) => {
      // Search filter
      const matchesSearch = 
        plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        selectedCategory === 'Todas' || plant.category === selectedCategory;

      // Light filter
      const matchesLight = 
        selectedLight === 'Todos' || plant.light === selectedLight;

      // Difficulty filter
      const matchesDifficulty = 
        selectedDifficulty === 'Todos' || plant.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesLight && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedLight, selectedDifficulty]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
    setSelectedLight('Todos');
    setSelectedDifficulty('Todos');
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Search Input Row */}
      <View style={styles.searchRow}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar por nombre común o científico..."
            placeholderTextColor={colors.textSecondary + 'AA'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
        <Pressable 
          onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
          style={[
            styles.filterToggleBtn, 
            { 
              backgroundColor: showAdvancedFilters ? colors.primary : colors.surface,
              borderColor: colors.border 
            }
          ]}
        >
          <Ionicons 
            name="funnel-outline" 
            size={20} 
            color={showAdvancedFilters ? '#FFFFFF' : colors.text} 
          />
        </Pressable>
      </View>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <View style={[styles.advancedPanel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Light Requirement Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>Exposición Solar</Text>
            <View style={styles.chipRow}>
              {lights.map((l) => (
                <Pressable
                  key={l}
                  onPress={() => setSelectedLight(l)}
                  style={[
                    styles.filterChip,
                    { backgroundColor: colors.background, borderColor: colors.border },
                    selectedLight === l && [styles.filterChipActive, { backgroundColor: colors.primary }]
                  ]}
                >
                  <Text 
                    style={[
                      styles.chipText, 
                      { color: colors.text },
                      selectedLight === l && styles.chipTextActive
                    ]}
                  >
                    {l}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Difficulty Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>Dificultad de Cuidado</Text>
            <View style={styles.chipRow}>
              {difficulties.map((d) => (
                <Pressable
                  key={d}
                  onPress={() => setSelectedDifficulty(d)}
                  style={[
                    styles.filterChip,
                    { backgroundColor: colors.background, borderColor: colors.border },
                    selectedDifficulty === d && [styles.filterChipActive, { backgroundColor: colors.primary }]
                  ]}
                >
                  <Text 
                    style={[
                      styles.chipText, 
                      { color: colors.text },
                      selectedDifficulty === d && styles.chipTextActive
                    ]}
                  >
                    {d}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Reset Filters button */}
          {(selectedLight !== 'Todos' || selectedDifficulty !== 'Todos') && (
            <Pressable onPress={clearFilters} style={styles.panelClearBtn}>
              <Text style={{ color: colors.notification, fontSize: 12, fontWeight: 'bold' }}>
                Restablecer Filtros
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Category horizontal scrolling bar */}
      <View style={styles.categoryBar}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = selectedCategory === item;
            return (
              <Pressable
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryChip,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  isActive && [styles.categoryChipActive, { backgroundColor: colors.primary }]
                ]}
              >
                <Text 
                  style={[
                    styles.categoryChipText, 
                    { color: colors.text },
                    isActive && styles.categoryChipTextActive
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          }}
          contentContainerStyle={styles.categoryListContent}
        />
      </View>

      {/* Results summary */}
      <View style={styles.resultsSummaryRow}>
        <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
          {filteredPlants.length} {filteredPlants.length === 1 ? 'planta encontrada' : 'plantas encontradas'}
        </Text>
        {(searchQuery.length > 0 || selectedCategory !== 'Todas' || selectedLight !== 'Todos' || selectedDifficulty !== 'Todos') && (
          <Pressable onPress={clearFilters}>
            <Text style={[styles.clearAllLink, { color: colors.primary }]}>Limpiar filtros</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerTitle: 'Biblioteca Botánica 🔍',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlantCard plant={item} />}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={colors.textSecondary + '66'} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No se encontraron plantas</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Prueba modificando tus términos de búsqueda o filtros.
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
  listContent: {
    padding: 8,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
    padding: 0,
  },
  clearBtn: {
    padding: 4,
  },
  filterToggleBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  advancedPanel: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  filterSection: {
    gap: 8,
  },
  filterTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  filterChipActive: {
    borderColor: 'transparent',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  panelClearBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
  },
  categoryBar: {
    marginVertical: 4,
  },
  categoryListContent: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  categoryChipActive: {
    borderColor: 'transparent',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  resultsSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  clearAllLink: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 18,
  },
});
