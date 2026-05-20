import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useColorScheme, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import { usePlants } from '@/context/PlantsContext';
import { useDiagnosis } from '@/context/DiagnosisContext';
import { SYMPTOMS, diagnoseProblem, DiagnosisEntry } from '@/constants/diagnosisData';

export default function DiagnoseScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  const { plants } = usePlants();
  const { addDiagnosis } = useDiagnosis();

  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [progressText, setProgressText] = useState('');
  
  const [diagnosisResult, setDiagnosisResult] = useState<{ entry: DiagnosisEntry, matchPercentage: number } | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedPhoto(result.assets[0].uri);
    }
  };

  const handleAnalyze = () => {
    if (!selectedPlantId) {
      Alert.alert('Planta requerida', 'Por favor, selecciona una planta de tu colección.');
      return;
    }
    if (!selectedPhoto) {
      Alert.alert('Foto requerida', 'Por favor, sube una foto del problema.');
      return;
    }
    if (selectedSymptoms.length === 0) {
      Alert.alert('Síntomas requeridos', 'Por favor, selecciona al menos un síntoma.');
      return;
    }

    setStatus('analyzing');
    setProgressText('Analizando síntomas...');

    setTimeout(() => {
      setProgressText('Cruzando datos con la base botánica...');
      setTimeout(async () => {
        const results = diagnoseProblem(selectedSymptoms);
        
        if (results.length > 0) {
          const topResult = results[0];
          setDiagnosisResult(topResult);
          
          // Save to history
          await addDiagnosis({
            plantId: selectedPlantId,
            date: new Date().toISOString(),
            photoUri: selectedPhoto,
            selectedSymptoms: selectedSymptoms,
            diagnosisResultId: topResult.entry.id,
            matchPercentage: topResult.matchPercentage
          });
        } else {
          setDiagnosisResult(null); // No clear match
        }
        setStatus('completed');
      }, 1000);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedPhoto(null);
    setSelectedSymptoms([]);
    setDiagnosisResult(null);
    setStatus('idle');
  };

  // If no plants
  if (plants.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <Ionicons name="leaf-outline" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Sin Plantas</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Para poder diagnosticar un problema, primero debes agregar la planta a tu colección en la pestaña "Explorar" o "Colección".
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const severityColor = (severity: string) => {
    switch(severity) {
      case 'Bajo': return '#4ade80';
      case 'Medio': return '#fb923c';
      case 'Alto': return '#ef4444';
      default: return colors.primary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        {status !== 'completed' && (
          <View style={styles.introHeader}>
            <Text style={[styles.title, { color: colors.text }]}>Diagnóstico Botánico</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Selecciona tu planta, sube una foto y marca los síntomas para obtener un plan de tratamiento.
            </Text>
          </View>
        )}

        {/* State 1: Idle (Show picker/upload/symptoms) */}
        {status === 'idle' && (
          <View style={styles.stepContainer}>
            
            {/* Plant Selector */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>1. ¿Qué planta está afectada?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plantsScroll}>
                {plants.map(plant => (
                  <Pressable
                    key={plant.id}
                    onPress={() => setSelectedPlantId(plant.id)}
                    style={[
                      styles.plantCard,
                      { backgroundColor: colors.surface, borderColor: selectedPlantId === plant.id ? colors.primary : colors.border }
                    ]}
                  >
                    <Image source={{ uri: plant.image }} style={styles.plantThumb} contentFit="cover" />
                    <Text style={[styles.plantName, { color: selectedPlantId === plant.id ? colors.primary : colors.text }]} numberOfLines={1}>
                      {plant.nickname || plant.commonName}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Upload Area */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Sube una foto del problema</Text>
              {selectedPhoto ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: selectedPhoto }} style={styles.previewImage} contentFit="cover" />
                  <Pressable 
                    onPress={() => setSelectedPhoto(null)} 
                    style={[styles.removeBtn, { backgroundColor: colors.notification }]}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
                  </Pressable>
                </View>
              ) : (
                <Pressable 
                  onPress={pickImage}
                  style={[styles.uploadBox, { backgroundColor: colors.surface, borderColor: colors.primary }]}
                >
                  <Ionicons name="image-outline" size={48} color={colors.primary} />
                  <Text style={[styles.uploadTitle, { color: colors.text }]}>Elegir Foto</Text>
                  <Text style={[styles.uploadSub, { color: colors.textSecondary }]}>Desde tu galería</Text>
                </Pressable>
              )}
            </View>

            {/* Symptoms List */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>3. ¿Qué síntomas observas?</Text>
              <View style={styles.symptomsGrid}>
                {SYMPTOMS.map(sym => {
                  const isSelected = selectedSymptoms.includes(sym.id);
                  return (
                    <Pressable
                      key={sym.id}
                      onPress={() => toggleSymptom(sym.id)}
                      style={[
                        styles.symptomChip,
                        { 
                          backgroundColor: isSelected ? colors.primary : colors.surface,
                          borderColor: isSelected ? colors.primary : colors.border
                        }
                      ]}
                    >
                      <Text style={[styles.symptomText, { color: isSelected ? '#FFFFFF' : colors.text }]}>
                        {sym.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Action button */}
            <Pressable 
              onPress={handleAnalyze} 
              style={[
                styles.actionBtn, 
                { backgroundColor: (selectedPlantId && selectedPhoto && selectedSymptoms.length > 0) ? colors.primary : colors.border }
              ]}
              disabled={!selectedPlantId || !selectedPhoto || selectedSymptoms.length === 0}
            >
              <Ionicons name="scan-outline" size={20} color="#FFFFFF" />
              <Text style={styles.actionBtnText}>Generar Diagnóstico</Text>
            </Pressable>
          </View>
        )}

        {/* State 2: Analyzing (Spinner + Progress) */}
        {status === 'analyzing' && (
          <View style={[styles.analyzingContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Image source={{ uri: selectedPhoto! }} style={styles.analyzingImage} contentFit="cover" />
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" style={{ marginBottom: 16 }} />
              <Text style={styles.analyzingText}>{progressText}</Text>
            </View>
          </View>
        )}

        {/* State 3: Completed (Show Diagnosis results) */}
        {status === 'completed' && diagnosisResult && (
          <View style={styles.resultContainer}>
            <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              
              {/* Header */}
              <View style={styles.resultHeader}>
                <View style={styles.resultSuccessIcon}>
                  <Ionicons name="warning-outline" size={40} color={severityColor(diagnosisResult.entry.severity)} />
                </View>
                <View style={styles.resultHeaderDetails}>
                  <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>DIAGNÓSTICO ({diagnosisResult.entry.type.toUpperCase()})</Text>
                  <Text style={[styles.resultTitle, { color: colors.text }]}>
                    {diagnosisResult.entry.name}
                  </Text>
                </View>
              </View>

              {/* Confidence and Severity */}
              <View style={styles.badgesRow}>
                <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                  <Ionicons name="analytics-outline" size={14} color={colors.primary} />
                  <Text style={[styles.badgeText, { color: colors.primary }]}>{diagnosisResult.matchPercentage}% coincidencia</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: severityColor(diagnosisResult.entry.severity) + '20' }]}>
                  <Ionicons name="alert-circle-outline" size={14} color={severityColor(diagnosisResult.entry.severity)} />
                  <Text style={[styles.badgeText, { color: severityColor(diagnosisResult.entry.severity) }]}>Gravedad: {diagnosisResult.entry.severity}</Text>
                </View>
              </View>

              {/* Description section */}
              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Descripción</Text>
                <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
                  {diagnosisResult.entry.description}
                </Text>
              </View>

              {/* Organic Treatment */}
              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: '#16a34a' }]}>🌿 Tratamiento Orgánico</Text>
                {diagnosisResult.entry.organicTreatment.map((step, idx) => (
                  <View key={`org-${idx}`} style={styles.listItem}>
                    <Text style={{ color: '#16a34a', marginRight: 8 }}>•</Text>
                    <Text style={[styles.treatmentText, { color: colors.textSecondary }]}>{step}</Text>
                  </View>
                ))}
              </View>

              {/* Chemical Treatment */}
              {diagnosisResult.entry.chemicalTreatment[0] !== 'No aplica' && diagnosisResult.entry.chemicalTreatment[0] !== 'Ninguno existe' && (
                <View style={styles.resultSection}>
                  <Text style={[styles.sectionTitle, { color: '#dc2626' }]}>🧪 Tratamiento Químico</Text>
                  {diagnosisResult.entry.chemicalTreatment.map((step, idx) => (
                    <View key={`chem-${idx}`} style={styles.listItem}>
                      <Text style={{ color: '#dc2626', marginRight: 8 }}>•</Text>
                      <Text style={[styles.treatmentText, { color: colors.textSecondary }]}>{step}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Prevention */}
              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: colors.primary }]}>🛡️ Prevención Futura</Text>
                {diagnosisResult.entry.prevention.map((step, idx) => (
                  <View key={`prev-${idx}`} style={styles.listItem}>
                    <Ionicons name="checkmark" size={14} color={colors.primary} style={{ marginRight: 8, marginTop: 2 }} />
                    <Text style={[styles.treatmentText, { color: colors.textSecondary }]}>{step}</Text>
                  </View>
                ))}
              </View>

              {/* Reset button */}
              <Pressable 
                onPress={handleReset} 
                style={[styles.resetBtn, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
                <Text style={styles.resetBtnText}>Realizar otro diagnóstico</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* State 3: Completed but NO MATCH */}
        {status === 'completed' && !diagnosisResult && (
          <View style={styles.emptyContainer}>
            <Ionicons name="help-circle-outline" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Sin Resultados</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No logramos encontrar una coincidencia exacta con los síntomas seleccionados. Intenta agregar más detalles o consulta a un especialista.
            </Text>
            <Pressable onPress={handleReset} style={[styles.resetBtn, { backgroundColor: colors.primary, marginTop: 20 }]}>
              <Text style={styles.resetBtnText}>Intentar de nuevo</Text>
            </Pressable>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  introHeader: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  stepContainer: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  plantsScroll: {
    gap: 12,
    paddingBottom: 4,
  },
  plantCard: {
    width: 100,
    borderRadius: 14,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 8,
  },
  plantThumb: {
    width: '100%',
    height: 80,
    marginBottom: 6,
  },
  plantName: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  uploadBox: {
    height: 140,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadSub: {
    fontSize: 12,
  },
  imagePreviewContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  symptomText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  analyzingContainer: {
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  analyzingImage: {
    width: '100%',
    height: '100%',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzingText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  resultContainer: {
    paddingBottom: 20,
  },
  resultCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultSuccessIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultHeaderDetails: {
    flex: 1,
    gap: 2,
  },
  resultSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  resultSection: {
    gap: 6,
    marginTop: 4,
  },

  sectionDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingRight: 10,
  },
  treatmentText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 10,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 12,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
