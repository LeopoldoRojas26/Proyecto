import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme, Pressable, Alert, Modal, TextInput } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { usePlants, DiaryEntry } from '@/context/PlantsContext';
import { EXPLORE_LIBRARY } from '@/constants/mockData';

const DIARY_PRESET_IMAGES = [
  { id: 'dp1', name: 'Semilla/Brote', url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'dp2', name: 'Plántula', url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80' },
  { id: 'dp3', name: 'Crecimiento', url: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&auto=format&fit=crop&q=80' },
  { id: 'dp4', name: 'Madura', url: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop&q=80' },
  { id: 'dp5', name: 'Floración', url: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&auto=format&fit=crop&q=80' },
  { id: 'dp6', name: 'Frutos', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&auto=format&fit=crop&q=80' }
];

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

  // Active Tab
  const [activeTab, setActiveTab] = useState<'detail' | 'diary'>('detail');

  // Modal Visibility States
  const [addEntryModalVisible, setAddEntryModalVisible] = useState(false);
  const [graphsModalVisible, setGraphsModalVisible] = useState(false);
  const [timelapseModalVisible, setTimelapseModalVisible] = useState(false);
  const [compareModalVisible, setCompareModalVisible] = useState(false);

  // New Entry Form States
  const [entryDate, setEntryDate] = useState('');
  const [entryHeight, setEntryHeight] = useState('');
  const [entryLeavesCount, setEntryLeavesCount] = useState('');
  const [entryNotes, setEntryNotes] = useState('');
  const [entryMood, setEntryMood] = useState<'happy' | 'neutral' | 'sad'>('happy');
  const [entryImage, setEntryImage] = useState('');

  // Timelapse States
  const [timelapsePlaying, setTimelapsePlaying] = useState(false);
  const [timelapseIndex, setTimelapseIndex] = useState(0);
  const [timelapseSpeed, setTimelapseSpeed] = useState(600); // ms per frame

  // Comparison States
  const [compareAId, setCompareAId] = useState('');
  const [compareBId, setCompareBId] = useState('');

  // Evolution Graph Type State
  const [chartType, setChartType] = useState<'height' | 'leaves'>('height');

  // Fill default values for New Entry Form
  useEffect(() => {
    if (addEntryModalVisible) {
      setEntryDate(new Date().toISOString().split('T')[0]);
      setEntryImage(plant?.image || '');
      setEntryHeight('');
      setEntryLeavesCount('');
      setEntryNotes('');
      setEntryMood('happy');
    }
  }, [addEntryModalVisible, plant]);

  // Chronological diary calculations
  const sortedDiary = useMemo(() => {
    if (!userPlant || !userPlant.diary) return [];
    return [...userPlant.diary].sort((a, b) => b.date.localeCompare(a.date));
  }, [userPlant?.diary]);

  const chronologicalDiary = useMemo(() => {
    if (!userPlant || !userPlant.diary) return [];
    return [...userPlant.diary].sort((a, b) => a.date.localeCompare(b.date));
  }, [userPlant?.diary]);

  const latestEntry = sortedDiary[0];

  const averageStats = useMemo(() => {
    if (!sortedDiary.length) return { currentHeight: '---', currentLeaves: '---', latestMood: '🌿', count: 0 };
    const latestHeight = latestEntry.height;
    const latestLeaves = latestEntry.leavesCount;
    const latestMood = latestEntry.mood === 'happy' ? '😊 💚' : latestEntry.mood === 'neutral' ? '😐 💛' : '😢 ❤️';
    return {
      currentHeight: `${latestHeight} cm`,
      currentLeaves: `${latestLeaves} uds`,
      latestMood,
      count: sortedDiary.length
    };
  }, [sortedDiary, latestEntry]);

  // Setup Timelapse Play Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timelapsePlaying && chronologicalDiary.length > 1) {
      interval = setInterval(() => {
        setTimelapseIndex((prev) => (prev >= chronologicalDiary.length - 1 ? 0 : prev + 1));
      }, timelapseSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timelapsePlaying, chronologicalDiary, timelapseSpeed]);

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

  const handleSaveEntry = async () => {
    if (!entryHeight.trim() || !entryLeavesCount.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa la altura y cantidad de hojas.');
      return;
    }
    const heightNum = parseFloat(entryHeight);
    const leavesNum = parseInt(entryLeavesCount);

    if (isNaN(heightNum) || isNaN(leavesNum)) {
      Alert.alert('Valor inválido', 'Altura y Hojas deben ser números válidos.');
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: entryDate.trim() || new Date().toISOString().split('T')[0],
      image: entryImage || plant.image,
      height: heightNum,
      leavesCount: leavesNum,
      notes: entryNotes.trim(),
      mood: entryMood
    };

    const updatedDiary = [...(userPlant?.diary || []), newEntry];
    try {
      await updatePlant(plant.id, { diary: updatedDiary });
      Alert.alert('Guardado', '¡Entrada del diario agregada con éxito!');
      setAddEntryModalVisible(false);
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la entrada en el diario.');
    }
  };

  // Custom visual Chart Render
  const renderChart = () => {
    const data = sortedDiary;
    if (data.length === 0) {
      return (
        <View style={styles.chartEmpty}>
          <Ionicons name="stats-chart-outline" size={48} color={colors.textSecondary + '44'} />
          <Text style={[styles.chartEmptyText, { color: colors.textSecondary }]}>Registra al menos una entrada para ver las gráficas.</Text>
        </View>
      );
    }

    // Chronological for graph lines
    const cData = [...data].sort((a, b) => a.date.localeCompare(b.date));
    const valueKey = chartType === 'height' ? 'height' : 'leavesCount';
    const values = cData.map(d => Number(d[valueKey]));
    const maxVal = Math.max(...values, 1);

    return (
      <View style={styles.chartContent}>
        <View style={styles.chartGrid}>
          {cData.map((item) => {
            const val = Number(item[valueKey]);
            const barHeight = maxVal > 0 ? (val / maxVal) * 160 : 10;
            return (
              <View key={item.id} style={styles.chartCol}>
                <View style={[styles.chartBarTooltip, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.chartTooltipVal, { color: colors.primary }]}>{val}{chartType === 'height' ? 'cm' : ''}</Text>
                </View>
                <View style={styles.chartBarWrapper}>
                  <View 
                    style={[
                      styles.chartBarFill, 
                      { 
                        height: Math.max(12, barHeight), 
                        backgroundColor: chartType === 'height' ? colors.primary : colors.warning 
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.chartBarLabel, { color: colors.textSecondary }]} numberOfLines={1}>
                  {item.date.substring(5)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
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

          {/* Premium custom Tab Selector */}
          {isUserPlant && (
            <View style={[styles.tabSelector, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Pressable 
                onPress={() => setActiveTab('detail')}
                style={[styles.tabItem, activeTab === 'detail' && [styles.tabItemActive, { backgroundColor: colors.surface }]]}
              >
                <Ionicons name="information-circle-outline" size={18} color={activeTab === 'detail' ? colors.primary : colors.textSecondary} />
                <Text style={[styles.tabText, { color: activeTab === 'detail' ? colors.text : colors.textSecondary }]}>Detalles</Text>
              </Pressable>
              
              <Pressable 
                onPress={() => setActiveTab('diary')}
                style={[styles.tabItem, activeTab === 'diary' && [styles.tabItemActive, { backgroundColor: colors.surface }]]}
              >
                <Ionicons name="book-outline" size={18} color={activeTab === 'diary' ? colors.primary : colors.textSecondary} />
                <Text style={[styles.tabText, { color: activeTab === 'diary' ? colors.text : colors.textSecondary }]}>Diario</Text>
              </Pressable>
            </View>
          )}

          {/* Tab content conditional rendering */}
          {(!isUserPlant || activeTab === 'detail') ? (
            <>
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
            </>
          ) : (
            /* ========================================================================= */
            /*                          GROWTH DIARY TAB CONTENT                         */
            /* ========================================================================= */
            <View style={styles.diaryTabContent}>
              
              {/* 1. Growth Metrics Dashboard */}
              <View style={styles.metricsRow}>
                <View style={[styles.metricCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Ionicons name="resize-outline" size={18} color={colors.primary} />
                  <Text style={[styles.metricVal, { color: colors.text }]}>{averageStats.currentHeight}</Text>
                  <Text style={styles.metricLabel}>Última Altura</Text>
                </View>
                <View style={[styles.metricCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Ionicons name="flower-outline" size={18} color={colors.warning} />
                  <Text style={[styles.metricVal, { color: colors.text }]}>{averageStats.currentLeaves}</Text>
                  <Text style={styles.metricLabel}>Hojas/Flores</Text>
                </View>
                <View style={[styles.metricCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Ionicons name="happy-outline" size={18} color={colors.success} />
                  <Text style={[styles.metricVal, { color: colors.text }]}>{averageStats.latestMood}</Text>
                  <Text style={styles.metricLabel}>Estado de Ánimo</Text>
                </View>
              </View>

              {/* 2. Actions Hub Panel */}
              <View style={styles.actionsContainer}>
                <Pressable 
                  onPress={() => setAddEntryModalVisible(true)} 
                  style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                >
                  <Ionicons name="add-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.actionBtnText}>Registrar</Text>
                </Pressable>

                <Pressable 
                  onPress={() => setGraphsModalVisible(true)} 
                  style={[styles.actionBtnSecondary, { borderColor: colors.primary, backgroundColor: colors.primaryLight }]}
                >
                  <Ionicons name="stats-chart" size={18} color={colors.primary} />
                  <Text style={[styles.actionBtnSecText, { color: colors.primary }]}>Gráficas</Text>
                </Pressable>

                <Pressable 
                  onPress={() => {
                    if (chronologicalDiary.length < 2) {
                      Alert.alert('Fotos insuficientes', 'Se necesitan al menos 2 entradas en el diario para reproducir el timelapse.');
                      return;
                    }
                    setTimelapseIndex(0);
                    setTimelapsePlaying(false);
                    setTimelapseModalVisible(true);
                  }} 
                  style={[styles.actionBtnSecondary, { borderColor: colors.primary, backgroundColor: colors.primaryLight }]}
                >
                  <Ionicons name="videocam" size={18} color={colors.primary} />
                  <Text style={[styles.actionBtnSecText, { color: colors.primary }]}>Timelapse</Text>
                </Pressable>

                <Pressable 
                  onPress={() => {
                    if (sortedDiary.length < 2) {
                      Alert.alert('Datos insuficientes', 'Se necesitan al menos 2 entradas en el diario para poder compararlas.');
                      return;
                    }
                    setCompareAId(sortedDiary[1].id);
                    setCompareBId(sortedDiary[0].id);
                    setCompareModalVisible(true);
                  }} 
                  style={[styles.actionBtnSecondary, { borderColor: colors.primary, backgroundColor: colors.primaryLight }]}
                >
                  <Ionicons name="swap-horizontal" size={18} color={colors.primary} />
                  <Text style={[styles.actionBtnSecText, { color: colors.primary }]}>Comparar</Text>
                </Pressable>
              </View>

              {/* 3. Chronological visual Timeline */}
              <View style={styles.timelineSection}>
                <Text style={[styles.timelineTitle, { color: colors.text }]}>Historial de Crecimiento</Text>
                
                {sortedDiary.length === 0 ? (
                  <View style={[styles.emptyDiaryCard, { borderColor: colors.border }]}>
                    <Ionicons name="journal-outline" size={48} color={colors.textSecondary + '55'} />
                    <Text style={[styles.emptyDiaryText, { color: colors.text }]}>Tu diario de crecimiento está vacío.</Text>
                    <Text style={[styles.emptyDiarySubtext, { color: colors.textSecondary }]}>Crea una nueva entrada para empezar a monitorear la altura, hojas y fotos de tu planta.</Text>
                    <Pressable 
                      onPress={() => setAddEntryModalVisible(true)} 
                      style={[styles.emptyDiaryBtn, { backgroundColor: colors.primary }]}
                    >
                      <Text style={styles.emptyDiaryBtnText}>Nueva Entrada</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.timelineList}>
                    {sortedDiary.map((entry, index) => {
                      const moodEmoji = entry.mood === 'happy' ? '😊' : entry.mood === 'neutral' ? '😐' : '😢';
                      const moodColor = entry.mood === 'happy' ? colors.success : entry.mood === 'neutral' ? colors.warning : colors.notification;
                      
                      return (
                        <View key={entry.id} style={styles.timelineItem}>
                          {/* Timeline node line connectors */}
                          <View style={styles.timelineLeftColumn}>
                            <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />
                            {index !== sortedDiary.length - 1 && <View style={[styles.timelineConnector, { backgroundColor: colors.border }]} />}
                          </View>

                          {/* Entry card */}
                          <View style={[styles.timelineCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <View style={styles.timelineCardHeader}>
                              <Text style={[styles.entryDateText, { color: colors.text }]}>{entry.date}</Text>
                              <View style={[styles.entryMoodBadge, { backgroundColor: moodColor + '22' }]}>
                                <Text style={{ fontSize: 13 }}>{moodEmoji}</Text>
                              </View>
                            </View>

                            <View style={styles.timelineCardBody}>
                              <View style={styles.entryMetricsGrid}>
                                <View style={styles.entryMetricSubItem}>
                                  <Ionicons name="resize-outline" size={13} color={colors.primary} />
                                  <Text style={[styles.entryMetricSubVal, { color: colors.text }]}>{entry.height} cm</Text>
                                </View>
                                <View style={styles.entryMetricSubItem}>
                                  <Ionicons name="flower-outline" size={13} color={colors.warning} />
                                  <Text style={[styles.entryMetricSubVal, { color: colors.text }]}>{entry.leavesCount} uds</Text>
                                </View>
                              </View>

                              {entry.notes ? (
                                <Text style={[styles.entryNotesText, { color: colors.textSecondary }]}>{entry.notes}</Text>
                              ) : null}

                              {entry.image ? (
                                <Image source={{ uri: entry.image }} style={styles.entryImageThumb} contentFit="cover" />
                              ) : null}
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ========================================================================= */}
      {/*                           ADD DIARY ENTRY MODAL                           */}
      {/* ========================================================================= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addEntryModalVisible}
        onRequestClose={() => setAddEntryModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.surface }]}>
            
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitleText, { color: colors.text }]}>Nueva Entrada de Diario</Text>
              <Pressable onPress={() => setAddEntryModalVisible(false)} style={styles.closeModalBtn}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollContent}>
              {/* Form Input fields */}
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Fecha del registro</Text>
                <TextInput 
                  value={entryDate}
                  onChangeText={setEntryDate}
                  placeholder="AAAA-MM-DD"
                  placeholderTextColor={colors.textSecondary + '77'}
                  style={[styles.modalInput, { color: colors.text, borderColor: colors.border }]}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={[styles.formLabel, { color: colors.text }]}>Altura (cm)</Text>
                  <TextInput 
                    value={entryHeight}
                    onChangeText={setEntryHeight}
                    placeholder="Ej. 25"
                    keyboardType="numeric"
                    placeholderTextColor={colors.textSecondary + '77'}
                    style={[styles.modalInput, { color: colors.text, borderColor: colors.border }]}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 12 }]}>
                  <Text style={[styles.formLabel, { color: colors.text }]}>Cant. Hojas/Flores</Text>
                  <TextInput 
                    value={entryLeavesCount}
                    onChangeText={setEntryLeavesCount}
                    placeholder="Ej. 8"
                    keyboardType="numeric"
                    placeholderTextColor={colors.textSecondary + '77'}
                    style={[styles.modalInput, { color: colors.text, borderColor: colors.border }]}
                  />
                </View>
              </View>

              {/* Mood picker emoji buttons */}
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Estado de Ánimo de la Planta</Text>
                <View style={styles.moodBtnContainer}>
                  <Pressable 
                    onPress={() => setEntryMood('happy')} 
                    style={[
                      styles.moodOptionBtn, 
                      { borderColor: colors.border },
                      entryMood === 'happy' && [styles.moodOptionBtnActive, { borderColor: colors.success, backgroundColor: colors.success + '15' }]
                    ]}
                  >
                    <Text style={styles.moodOptionEmoji}>😊</Text>
                    <Text style={[styles.moodOptionLabel, { color: colors.text }, entryMood === 'happy' && { color: colors.success, fontWeight: 'bold' }]}>Feliz</Text>
                  </Pressable>

                  <Pressable 
                    onPress={() => setEntryMood('neutral')} 
                    style={[
                      styles.moodOptionBtn, 
                      { borderColor: colors.border },
                      entryMood === 'neutral' && [styles.moodOptionBtnActive, { borderColor: colors.warning, backgroundColor: colors.warning + '15' }]
                    ]}
                  >
                    <Text style={styles.moodOptionEmoji}>😐</Text>
                    <Text style={[styles.moodOptionLabel, { color: colors.text }, entryMood === 'neutral' && { color: colors.warning, fontWeight: 'bold' }]}>Neutral</Text>
                  </Pressable>

                  <Pressable 
                    onPress={() => setEntryMood('sad')} 
                    style={[
                      styles.moodOptionBtn, 
                      { borderColor: colors.border },
                      entryMood === 'sad' && [styles.moodOptionBtnActive, { borderColor: colors.notification, backgroundColor: colors.notification + '15' }]
                    ]}
                  >
                    <Text style={styles.moodOptionEmoji}>😢</Text>
                    <Text style={[styles.moodOptionLabel, { color: colors.text }, entryMood === 'sad' && { color: colors.notification, fontWeight: 'bold' }]}>Triste</Text>
                  </Pressable>
                </View>
              </View>

              {/* Personal Growth Notes */}
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Notas de crecimiento / Observaciones</Text>
                <TextInput 
                  value={entryNotes}
                  onChangeText={setEntryNotes}
                  placeholder="Ej. Noto un nuevo brote saliendo. La tierra retiene bien la humedad..."
                  placeholderTextColor={colors.textSecondary + '77'}
                  multiline={true}
                  numberOfLines={4}
                  style={[styles.modalInputLarge, { color: colors.text, borderColor: colors.border }]}
                />
              </View>

              {/* Entry Photo Selector */}
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Foto del registro</Text>
                <View style={styles.imageSelectorContainer}>
                  <Image source={{ uri: entryImage }} style={styles.imageSelectorPreview} contentFit="cover" />
                  <View style={styles.imageSelectorInputGroup}>
                    <Text style={[styles.imageSelectorInstruction, { color: colors.textSecondary }]}>Ingresa URL personalizada o selecciona una etapa de crecimiento:</Text>
                    <TextInput 
                      value={entryImage}
                      onChangeText={setEntryImage}
                      placeholder="Pegar URL de foto..."
                      placeholderTextColor={colors.textSecondary + '77'}
                      style={[styles.modalInputMini, { color: colors.text, borderColor: colors.border }]}
                    />
                  </View>
                </View>

                {/* Preset image grid selectors */}
                <View style={styles.imageGridPresets}>
                  {DIARY_PRESET_IMAGES.map((preset) => {
                    const isSelected = entryImage === preset.url;
                    return (
                      <Pressable 
                        key={preset.id} 
                        onPress={() => setEntryImage(preset.url)} 
                        style={[
                          styles.presetImageBtn, 
                          { borderColor: colors.border },
                          isSelected && { borderColor: colors.primary, borderWidth: 2 }
                        ]}
                      >
                        <Image source={{ uri: preset.url }} style={styles.presetImageThumb} contentFit="cover" />
                        <Text style={[styles.presetImageName, { color: colors.text }]} numberOfLines={1}>{preset.name}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
              <Pressable 
                onPress={() => setAddEntryModalVisible(false)} 
                style={[styles.modalFooterBtn, styles.modalFooterBtnCancel, { borderColor: colors.border }]}
              >
                <Text style={[styles.modalFooterBtnText, { color: colors.text }]}>Cancelar</Text>
              </Pressable>
              
              <Pressable 
                onPress={handleSaveEntry} 
                style={[styles.modalFooterBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.modalFooterBtnTextWhite}>Guardar</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/*                            GROWTH GRAPHS MODAL                            */}
      {/* ========================================================================= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={graphsModalVisible}
        onRequestClose={() => setGraphsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.surface }]}>
            
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitleText, { color: colors.text }]}>Gráficas de Evolución</Text>
              <Pressable onPress={() => setGraphsModalVisible(false)} style={styles.closeModalBtn}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollContent}>
              {/* Visual Graph Toggle buttons */}
              <View style={[styles.tabSelectorMini, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Pressable 
                  onPress={() => setChartType('height')}
                  style={[styles.tabItemMini, chartType === 'height' && [styles.tabItemActiveMini, { backgroundColor: colors.surface }]]}
                >
                  <Ionicons name="resize-outline" size={14} color={chartType === 'height' ? colors.primary : colors.textSecondary} />
                  <Text style={[styles.tabTextMini, { color: chartType === 'height' ? colors.text : colors.textSecondary }]}>Altura (cm)</Text>
                </Pressable>
                
                <Pressable 
                  onPress={() => setChartType('leaves')}
                  style={[styles.tabItemMini, chartType === 'leaves' && [styles.tabItemActiveMini, { backgroundColor: colors.surface }]]}
                >
                  <Ionicons name="flower-outline" size={14} color={chartType === 'leaves' ? colors.primary : colors.textSecondary} />
                  <Text style={[styles.tabTextMini, { color: chartType === 'leaves' ? colors.text : colors.textSecondary }]}>Hojas / Flores</Text>
                </Pressable>
              </View>

              {renderChart()}
            </ScrollView>

            <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
              <Pressable 
                onPress={() => setGraphsModalVisible(false)} 
                style={[styles.modalFooterBtnLarge, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.modalFooterBtnTextWhite}>Cerrar</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/*                           TIMELAPSE PLAYER MODAL                          */}
      {/* ========================================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={timelapseModalVisible}
        onRequestClose={() => {
          setTimelapsePlaying(false);
          setTimelapseModalVisible(false);
        }}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.surface, maxHeight: '80%' }]}>
            
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitleText, { color: colors.text }]}>Timelapse Automático 🎬</Text>
              <Pressable 
                onPress={() => {
                  setTimelapsePlaying(false);
                  setTimelapseModalVisible(false);
                }} 
                style={styles.closeModalBtn}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            {chronologicalDiary.length > 0 ? (
              <View style={styles.timelapseContent}>
                
                {/* Active Frame Large Image */}
                <View style={[styles.timelapseFrameContainer, { borderColor: colors.border }]}>
                  <Image 
                    source={{ uri: chronologicalDiary[timelapseIndex]?.image }} 
                    style={styles.timelapseImage} 
                    contentFit="cover" 
                  />
                  <View style={styles.timelapseDateBadge}>
                    <Text style={styles.timelapseDateText}>{chronologicalDiary[timelapseIndex]?.date}</Text>
                  </View>
                </View>

                {/* Frame Status Index indicators */}
                <View style={styles.timelapseFrameStats}>
                  <Text style={[styles.timelapseFrameIndex, { color: colors.text }]}>
                    Foto {timelapseIndex + 1} de {chronologicalDiary.length}
                  </Text>
                  <Text style={[styles.timelapseFrameDetails, { color: colors.textSecondary }]}>
                    Altura: {chronologicalDiary[timelapseIndex]?.height} cm | Hojas: {chronologicalDiary[timelapseIndex]?.leavesCount} uds
                  </Text>
                </View>

                {/* Scrubber indicator slots */}
                <View style={styles.scrubberContainer}>
                  {chronologicalDiary.map((item, idx) => {
                    const isActive = idx === timelapseIndex;
                    return (
                      <Pressable 
                        key={item.id} 
                        onPress={() => {
                          setTimelapsePlaying(false);
                          setTimelapseIndex(idx);
                        }}
                        style={[
                          styles.scrubberBar, 
                          { backgroundColor: colors.border },
                          isActive && { backgroundColor: colors.primary }
                        ]}
                      />
                    );
                  })}
                </View>

                {/* Media Control Toolbar */}
                <View style={styles.timelapseControlsRow}>
                  <Pressable 
                    onPress={() => {
                      setTimelapsePlaying(false);
                      setTimelapseIndex(prev => (prev === 0 ? chronologicalDiary.length - 1 : prev - 1));
                    }}
                    style={[styles.mediaBtn, { backgroundColor: colors.background }]}
                  >
                    <Ionicons name="play-back" size={20} color={colors.text} />
                  </Pressable>

                  <Pressable 
                    onPress={() => setTimelapsePlaying(!timelapsePlaying)}
                    style={[styles.mediaBtnMain, { backgroundColor: colors.primary }]}
                  >
                    <Ionicons name={timelapsePlaying ? "pause" : "play"} size={26} color="#FFFFFF" />
                  </Pressable>

                  <Pressable 
                    onPress={() => {
                      setTimelapsePlaying(false);
                      setTimelapseIndex(prev => (prev === chronologicalDiary.length - 1 ? 0 : prev + 1));
                    }}
                    style={[styles.mediaBtn, { backgroundColor: colors.background }]}
                  >
                    <Ionicons name="play-forward" size={20} color={colors.text} />
                  </Pressable>
                </View>

                {/* Velocity Speed Selectors */}
                <View style={styles.speedPanel}>
                  <Text style={[styles.speedPanelLabel, { color: colors.textSecondary }]}>Velocidad:</Text>
                  <View style={styles.speedRow}>
                    <Pressable 
                      onPress={() => setTimelapseSpeed(1000)}
                      style={[styles.speedTab, timelapseSpeed === 1000 && [styles.speedTabActive, { backgroundColor: colors.primary }]]}
                    >
                      <Text style={[styles.speedText, timelapseSpeed === 1000 && { color: '#FFFFFF' }]}>1s</Text>
                    </Pressable>
                    <Pressable 
                      onPress={() => setTimelapseSpeed(600)}
                      style={[styles.speedTab, timelapseSpeed === 600 && [styles.speedTabActive, { backgroundColor: colors.primary }]]}
                    >
                      <Text style={[styles.speedText, timelapseSpeed === 600 && { color: '#FFFFFF' }]}>0.6s</Text>
                    </Pressable>
                    <Pressable 
                      onPress={() => setTimelapseSpeed(300)}
                      style={[styles.speedTab, timelapseSpeed === 300 && [styles.speedTabActive, { backgroundColor: colors.primary }]]}
                    >
                      <Text style={[styles.speedText, timelapseSpeed === 300 && { color: '#FFFFFF' }]}>0.3s</Text>
                    </Pressable>
                  </View>
                </View>

              </View>
            ) : null}

          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/*                             COMPARISON MODAL                              */}
      {/* ========================================================================= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={compareModalVisible}
        onRequestClose={() => setCompareModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.surface, maxHeight: '90%' }]}>
            
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitleText, { color: colors.text }]}>Comparador de Crecimiento</Text>
              <Pressable onPress={() => setCompareModalVisible(false)} style={styles.closeModalBtn}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollContent}>
              {/* Selectors rows for Choice A and Choice B */}
              <View style={styles.selectorSection}>
                <Text style={[styles.selectLabel, { color: colors.text }]}>Selecciona la primera fecha (A):</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalChipsRow}>
                  {sortedDiary.map((item) => {
                    const isSelected = item.id === compareAId;
                    return (
                      <Pressable 
                        key={item.id} 
                        onPress={() => setCompareAId(item.id)}
                        style={[
                          styles.horizontalChip, 
                          { backgroundColor: colors.background, borderColor: colors.border },
                          isSelected && [styles.horizontalChipActive, { backgroundColor: colors.primary, borderColor: colors.primary }]
                        ]}
                      >
                        <Text style={[styles.chipLabelText, { color: colors.text }, isSelected && { color: '#FFFFFF' }]}>{item.date}</Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              <View style={styles.selectorSection}>
                <Text style={[styles.selectLabel, { color: colors.text }]}>Selecciona la segunda fecha (B):</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalChipsRow}>
                  {sortedDiary.map((item) => {
                    const isSelected = item.id === compareBId;
                    return (
                      <Pressable 
                        key={item.id} 
                        onPress={() => setCompareBId(item.id)}
                        style={[
                          styles.horizontalChip, 
                          { backgroundColor: colors.background, borderColor: colors.border },
                          isSelected && [styles.horizontalChipActive, { backgroundColor: colors.primary, borderColor: colors.primary }]
                        ]}
                      >
                        <Text style={[styles.chipLabelText, { color: colors.text }, isSelected && { color: '#FFFFFF' }]}>{item.date}</Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Side by side rendering block */}
              {compareAId && compareBId && compareAId !== compareBId ? (() => {
                const entryA = sortedDiary.find(e => e.id === compareAId);
                const entryB = sortedDiary.find(e => e.id === compareBId);

                if (!entryA || !entryB) return null;

                const heightDiff = entryB.height - entryA.height;
                const leavesDiff = entryB.leavesCount - entryA.leavesCount;

                return (
                  <View style={styles.comparisonsBlock}>
                    <View style={styles.comparisonGrid}>
                      
                      {/* Column A */}
                      <View style={[styles.compareCol, { backgroundColor: colors.background, borderColor: colors.border }]}>
                        <Text style={[styles.compareColHeader, { color: colors.primary }]}>Registro A</Text>
                        <Text style={[styles.compareColDate, { color: colors.text }]}>{entryA.date}</Text>
                        <Image source={{ uri: entryA.image }} style={styles.compareColImage} contentFit="cover" />
                        
                        <View style={styles.compareColStats}>
                          <View style={styles.compareStatItemRow}>
                            <Text style={[styles.compareStatText, { color: colors.text }]}>{entryA.height} cm</Text>
                          </View>
                          <View style={styles.compareStatItemRow}>
                            <Text style={[styles.compareStatText, { color: colors.text }]}>{entryA.leavesCount} hojas</Text>
                          </View>
                          <View style={styles.compareStatItemRow}>
                            <Text style={styles.compareStatEmojiText}>
                              {entryA.mood === 'happy' ? '😊' : entryA.mood === 'neutral' ? '😐' : '😢'}
                            </Text>
                          </View>
                        </View>
                        {entryA.notes ? (
                          <Text style={[styles.compareColNotesText, { color: colors.textSecondary }]} numberOfLines={3}>
                            "{entryA.notes}"
                          </Text>
                        ) : null}
                      </View>

                      {/* Column B */}
                      <View style={[styles.compareCol, { backgroundColor: colors.background, borderColor: colors.border }]}>
                        <Text style={[styles.compareColHeader, { color: colors.primary }]}>Registro B</Text>
                        <Text style={[styles.compareColDate, { color: colors.text }]}>{entryB.date}</Text>
                        <Image source={{ uri: entryB.image }} style={styles.compareColImage} contentFit="cover" />
                        
                        <View style={styles.compareColStats}>
                          <View style={styles.compareStatItemRow}>
                            <Text style={[styles.compareStatText, { color: colors.text }]}>{entryB.height} cm</Text>
                            <Text style={[
                              styles.deltaIndicatorText, 
                              { color: heightDiff >= 0 ? colors.success : colors.notification }
                            ]}>
                              ({heightDiff >= 0 ? '+' : ''}{heightDiff} cm)
                            </Text>
                          </View>
                          
                          <View style={styles.compareStatItemRow}>
                            <Text style={[styles.compareStatText, { color: colors.text }]}>{entryB.leavesCount} hojas</Text>
                            <Text style={[
                              styles.deltaIndicatorText, 
                              { color: leavesDiff >= 0 ? colors.success : colors.notification }
                            ]}>
                              ({leavesDiff >= 0 ? '+' : ''}{leavesDiff} uds)
                            </Text>
                          </View>
                          
                          <View style={styles.compareStatItemRow}>
                            <Text style={styles.compareStatEmojiText}>
                              {entryB.mood === 'happy' ? '😊' : entryB.mood === 'neutral' ? '😐' : '😢'}
                            </Text>
                          </View>
                        </View>
                        {entryB.notes ? (
                          <Text style={[styles.compareColNotesText, { color: colors.textSecondary }]} numberOfLines={3}>
                            "{entryB.notes}"
                          </Text>
                        ) : null}
                      </View>

                    </View>
                  </View>
                );
              })() : (
                <View style={styles.comparisonSelectionWarning}>
                  <Ionicons name="swap-horizontal-outline" size={48} color={colors.textSecondary + '44'} />
                  <Text style={[styles.compareWarningText, { color: colors.textSecondary }]}>
                    Por favor selecciona dos fechas distintas arriba para ver la comparación lado a lado con las diferencias.
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
              <Pressable 
                onPress={() => setCompareModalVisible(false)} 
                style={[styles.modalFooterBtnLarge, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.modalFooterBtnTextWhite}>Cerrar</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>

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

  /* TAB SELECTION STYLES */
  tabSelector: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabItemActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },

  /* DIARY STYLES */
  diaryTabContent: {
    gap: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1,
    gap: 4,
  },
  metricVal: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 9,
    color: '#90A4AE',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionBtn: {
    flex: 1.2,
    minWidth: 100,
    flexDirection: 'row',
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionBtnSecondary: {
    flex: 1,
    minWidth: 80,
    flexDirection: 'row',
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    gap: 6,
  },
  actionBtnSecText: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  timelineSection: {
    marginTop: 8,
    gap: 12,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  emptyDiaryCard: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 16,
    gap: 8,
  },
  emptyDiaryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyDiarySubtext: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
  },
  emptyDiaryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emptyDiaryBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  /* TIMELINE TIMELINE */
  timelineList: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 110,
  },
  timelineLeftColumn: {
    width: 24,
    alignItems: 'center',
    position: 'relative',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 18,
    zIndex: 10,
  },
  timelineConnector: {
    position: 'absolute',
    top: 24,
    bottom: 0,
    width: 2,
    zIndex: 1,
  },
  timelineCard: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  timelineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDateText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  entryMoodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timelineCardBody: {
    gap: 8,
  },
  entryMetricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  entryMetricSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  entryMetricSubVal: {
    fontSize: 11,
    fontWeight: '600',
  },
  entryNotesText: {
    fontSize: 12,
    lineHeight: 16,
  },
  entryImageThumb: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginTop: 4,
  },

  /* MODALS GLOBAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalBox: {
    width: '100%',
    maxHeight: '90%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
  },
  modalTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  closeModalBtn: {
    padding: 4,
  },
  modalScrollContent: {
    padding: 18,
    gap: 16,
  },
  formGroup: {
    gap: 6,
  },
  formRow: {
    flexDirection: 'row',
  },
  formLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  modalInputLarge: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    textAlignVertical: 'top',
  },
  modalInputMini: {
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 11,
  },

  /* MOOD BTN OPTIONS */
  moodBtnContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  moodOptionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  moodOptionBtnActive: {
    borderWidth: 1.5,
  },
  moodOptionEmoji: {
    fontSize: 22,
  },
  moodOptionLabel: {
    fontSize: 11,
  },

  /* IMAGE SELECTOR STYLES */
  imageSelectorContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  imageSelectorPreview: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  imageSelectorInputGroup: {
    flex: 1,
    gap: 6,
  },
  imageSelectorInstruction: {
    fontSize: 10,
    lineHeight: 14,
  },
  imageGridPresets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  presetImageBtn: {
    width: '31%',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 4,
  },
  presetImageThumb: {
    width: '100%',
    height: 48,
  },
  presetImageName: {
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 4,
    paddingHorizontal: 2,
  },

  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  modalFooterBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalFooterBtnCancel: {
    borderWidth: 1,
  },
  modalFooterBtnLarge: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalFooterBtnText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalFooterBtnTextWhite: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  /* CUSTOM CHART STYLES */
  tabSelectorMini: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    marginBottom: 16,
  },
  tabItemMini: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  tabItemActiveMini: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabTextMini: {
    fontSize: 11,
    fontWeight: '600',
  },
  chartEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  chartEmptyText: {
    fontSize: 12,
    textAlign: 'center',
  },
  chartContent: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  chartGrid: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    height: 220,
    paddingBottom: 24,
  },
  chartCol: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  chartBarTooltip: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  chartTooltipVal: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  chartBarWrapper: {
    height: 160,
    justifyContent: 'flex-end',
    width: 14,
    backgroundColor: '#00000008',
    borderRadius: 7,
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 7,
  },
  chartBarLabel: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 4,
  },

  /* TIMELAPSE MODAL PLAYER STYLES */
  timelapseContent: {
    gap: 16,
    alignItems: 'center',
    padding: 16,
  },
  timelapseFrameContainer: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  timelapseImage: {
    width: '100%',
    height: '100%',
  },
  timelapseDateBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timelapseDateText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timelapseFrameStats: {
    alignItems: 'center',
    gap: 2,
  },
  timelapseFrameIndex: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  timelapseFrameDetails: {
    fontSize: 10,
  },
  scrubberContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 6,
    gap: 3,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scrubberBar: {
    flex: 1,
    height: '100%',
  },
  timelapseControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  mediaBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaBtnMain: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  speedPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  speedPanelLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  speedRow: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00000010',
    overflow: 'hidden',
  },
  speedTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'transparent',
  },
  speedTabActive: {
    // inherits colors.primary background
  },
  speedText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  /* COMPARISON STYLES */
  selectorSection: {
    gap: 6,
    marginBottom: 8,
  },
  selectLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  horizontalChipsRow: {
    paddingVertical: 4,
    gap: 6,
  },
  horizontalChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  horizontalChipActive: {
    // sets colors.primary in code
  },
  chipLabelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  comparisonsBlock: {
    marginTop: 16,
  },
  comparisonGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  compareCol: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    gap: 8,
  },
  compareColHeader: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  compareColDate: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -4,
  },
  compareColImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  compareColStats: {
    width: '100%',
    gap: 4,
  },
  compareStatItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  compareStatText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  compareStatEmojiText: {
    fontSize: 16,
  },
  deltaIndicatorText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  compareColNotesText: {
    fontSize: 9,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 12,
  },
  comparisonSelectionWarning: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  compareWarningText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 20,
  },
});

