import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useColorScheme, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import { resolveImageSource } from '@/utils/imageResolver';
import { usePlants } from '@/context/PlantsContext';
import { useDiagnosis } from '@/context/DiagnosisContext';
import { SYMPTOMS, diagnoseProblem, DiagnosisEntry } from '@/constants/diagnosisData';

const CLOROSIS_IMG = '@asset/clorosis';

const SAMPLE_PROBLEMS = [
  {
    id: 'prob1',
    label: 'Clorosis Férrica',
    image: CLOROSIS_IMG,
    result: {
      problemName: 'Clorosis Férrica (Deficiencia de Hierro)',
      confidence: '92% de coincidencia',
      cause: 'El sustrato tiene un pH demasiado alto (alcalino), lo que bloquea la absorción de hierro por las raíces, o se está regando con agua de grifo dura y muy calcárea.',
      treatment: [
        'Aplica quelato de hierro diluido en el agua de riego.',
        'Acidifica el agua de riego con unas gotas de limón o vinagre (pH ideal 5.5 - 6.5).',
        'Riega con agua de lluvia o filtrada siempre que sea posible.'
      ]
    }
  },
  {
    id: 'prob2',
    label: 'Manchas Secas',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    result: {
      problemName: 'Puntas Secas por Baja Humedad',
      confidence: '88% de coincidencia',
      cause: 'La humedad ambiental de la habitación es menor al 40%. Se agrava por calefacción, aire acondicionado o corrientes de aire directas.',
      treatment: [
        'Agrupa plantas tropicales para crear un microclima húmedo y natural.',
        'Pulveriza las hojas diariamente o coloca un plato inferior con piedras húmedas sin que toque la maceta.',
        'Aleja la planta de corrientes directas de aire de calefactores o ventiladores.'
      ]
    }
  },
  {
    id: 'prob3',
    label: 'Polvo Blanco',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    result: {
      problemName: 'Oídio / Mildiu Polvoriento',
      confidence: '95% de coincidencia',
      cause: 'Hongo fúngico favorecido por la combinación de alta humedad en la base, aire estancado y hojas mojadas durante la noche.',
      treatment: [
        'Poda inmediatamente las hojas afectadas y límpialas de la base para evitar la dispersión de esporas.',
        'Evita regar las hojas por encima; riega siempre directamente al sustrato.',
        'Aplica un fungicida orgánico a base de leche de vaca diluida (1 parte de leche por 9 de agua) o bicarbonato con jabón potásico.'
      ]
    }
  },
  {
    id: 'prob4',
    label: 'Hojas Blandas',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=600&auto=format&fit=crop&q=80',
    result: {
      problemName: 'Pudrición de Raíces por Exceso de Agua',
      confidence: '94% de coincidencia',
      cause: 'El sustrato retiene demasiada agua por falta de drenaje o riegos muy frecuentes, provocando asfixia radicular y proliferación de hongos patógenos.',
      treatment: [
        'Suspende el riego inmediatamente y retira las hojas basales que estén amarillas o translúcidas.',
        'Extrae la planta de la maceta y corta las raíces negras, blandas o con mal olor.',
        'Trasplanta a una maceta con agujero de drenaje usando un sustrato poroso (50% tierra, 50% perlita o arena de sílice).'
      ]
    }
  },
  {
    id: 'prob5',
    label: 'Quemadura Solar',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop&q=80',
    result: {
      problemName: 'Quemadura Solar Directa (Estrés Lumínico)',
      confidence: '89% de coincidencia',
      cause: 'Exposición a rayos solares intensos directos (especialmente en horas del mediodía) a través de una ventana que actúa como lupa, destruyendo la clorofila.',
      treatment: [
        'Mueve la planta a un lugar con luz indirecta brillante o coloca una cortina traslúcida para filtrar el sol.',
        'No cortes la hoja entera a menos que esté dañada en más del 70%; el resto sigue haciendo fotosíntesis.',
        'Evita pulverizar agua sobre las hojas mientras reciban sol directo para prevenir el efecto lupa.'
      ]
    }
  },
  {
    id: 'prob6',
    label: 'Araña Roja',
    image: 'https://images.unsplash.com/photo-1628352621029-805797bc4982?w=600&auto=format&fit=crop&q=80',
    result: {
      problemName: 'Infestación de Ácaros (Araña Roja)',
      confidence: '91% de coincidencia',
      cause: 'Plaga de diminutos ácaros que succionan la savia celular, favorecidos por ambientes muy secos, cálidos y con poca circulación de aire.',
      treatment: [
        'Lava la planta con agua a presión bajo el grifo para desalojar mecánicamente a los ácaros.',
        'Incrementa sustancialmente la humedad ambiental pulverizando el follaje con regularidad (la araña roja detesta la humedad).',
        'Aplica aceite de neem o jabón potásico diluido por el haz y el envés de todas las hojas cada 5 días durante 3 semanas.'
      ]
    }
  }
];

export default function DiagnoseScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  const { plants } = usePlants();
  const { addDiagnosis } = useDiagnosis();

  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<typeof SAMPLE_PROBLEMS[0] | null>(null);
  
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [progressText, setProgressText] = useState('');
  
  const [diagnosisResult, setDiagnosisResult] = useState<{ entry: DiagnosisEntry, matchPercentage: number } | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedProblem(null);
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const pickImage = async () => {
    setSelectedProblem(null);
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

  const handleSelectSample = (problem: typeof SAMPLE_PROBLEMS[0]) => {
    setSelectedProblem(problem);
    setSelectedPhoto(problem.image);
    setSelectedPlantId(plants[0]?.id || 'default');
    
    let symptomsToSet: string[] = [];
    if (problem.id === 'prob1') symptomsToSet = ['hojas_amarillas'];
    else if (problem.id === 'prob2') symptomsToSet = ['hojas_secas'];
    else if (problem.id === 'prob3') symptomsToSet = ['polvo_blanco'];
    else if (problem.id === 'prob4') symptomsToSet = ['hojas_blandas'];
    else if (problem.id === 'prob5') symptomsToSet = ['manchas_marrones'];
    else if (problem.id === 'prob6') symptomsToSet = ['telarañas'];
    setSelectedSymptoms(symptomsToSet);
  };

  const handleAnalyze = () => {
    if (selectedProblem) {
      setStatus('analyzing');
      setProgressText('Subiendo imagen de muestra...');
      setTimeout(() => {
        setProgressText('Analizando patrón foliar...');
        setTimeout(() => {
          setDiagnosisResult({
            entry: {
              id: selectedProblem.id,
              name: selectedProblem.result.problemName,
              type: 'Enfermedad',
              severity: selectedProblem.id === 'prob4' ? 'Alto' : 'Medio',
              description: selectedProblem.result.cause,
              symptoms: [],
              organicTreatment: selectedProblem.result.treatment,
              chemicalTreatment: ['No aplica'],
              prevention: ['Riega adecuadamente', 'Mantén la iluminación recomendada.']
            },
            matchPercentage: parseInt(selectedProblem.result.confidence)
          });
          setStatus('completed');
        }, 1000);
      }, 1000);
      return;
    }

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
          setDiagnosisResult(null);
        }
        setStatus('completed');
      }, 1000);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedPhoto(null);
    setSelectedSymptoms([]);
    setSelectedProblem(null);
    setSelectedPlantId(null);
    setDiagnosisResult(null);
    setStatus('idle');
  };

  const severityColor = (severity: string) => {
    switch(severity) {
      case 'Bajo': return '#4ade80';
      case 'Medio': return '#fb923c';
      case 'Alto': return '#ef4444';
      default: return colors.primary;
    }
  };

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {status !== 'completed' && (
          <View style={styles.introHeader}>
            <Text style={[styles.title, { color: colors.text }]}>Diagnóstico Botánico</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Selecciona tu planta, sube una foto y marca los síntomas para obtener un plan de tratamiento.
            </Text>
          </View>
        )}

        {status === 'idle' && (
          <View style={styles.stepContainer}>
            
            {/* Plant Selector */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>1. ¿Qué planta está afectada?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plantsScroll}>
                {plants.map(plant => (
                  <Pressable
                    key={plant.id}
                    onPress={() => {
                      setSelectedPlantId(plant.id);
                      setSelectedProblem(null);
                    }}
                    style={[
                      styles.plantCard,
                      { backgroundColor: colors.surface, borderColor: selectedPlantId === plant.id ? colors.primary : colors.border }
                    ]}
                  >
                    <Image source={resolveImageSource(plant.image)} style={styles.plantThumb} contentFit="cover" />
                    <Text style={[styles.plantName, { color: selectedPlantId === plant.id ? colors.primary : colors.text }]} numberOfLines={1}>
                      {plant.nickname || plant.commonName}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Quick Samples Selection */}
            {!selectedPhoto && (
              <View style={styles.samplesSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>O selecciona un caso de ejemplo:</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={styles.sampleScroll}
                >
                  {SAMPLE_PROBLEMS.map((prob) => (
                    <Pressable
                      key={prob.id}
                      onPress={() => handleSelectSample(prob)}
                      style={[
                        styles.sampleCard,
                        { 
                          backgroundColor: colors.surface, 
                          borderColor: selectedProblem?.id === prob.id ? colors.primary : colors.border,
                          borderWidth: selectedProblem?.id === prob.id ? 2 : 1
                        }
                      ]}
                    >
                      <Image source={resolveImageSource(prob.image)} style={styles.sampleThumb} contentFit="cover" />
                      <Text style={[styles.sampleLabel, { color: colors.text }]} numberOfLines={1}>
                        {prob.label}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Upload Area */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Sube una foto del problema</Text>
              {selectedPhoto ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={resolveImageSource(selectedPhoto)} style={styles.previewImage} contentFit="cover" />
                  <Pressable 
                    onPress={() => {
                      setSelectedPhoto(null);
                      setSelectedProblem(null);
                    }} 
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
                { backgroundColor: (selectedPhoto && (selectedProblem || (selectedPlantId && selectedSymptoms.length > 0))) ? colors.primary : colors.border }
              ]}
              disabled={!selectedPhoto || (!selectedProblem && (!selectedPlantId || selectedSymptoms.length === 0))}
            >
              <Ionicons name="scan-outline" size={20} color="#FFFFFF" />
              <Text style={styles.actionBtnText}>Generar Diagnóstico</Text>
            </Pressable>
          </View>
        )}

        {status === 'analyzing' && (
          <View style={[styles.analyzingContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Image source={resolveImageSource(selectedPhoto)} style={styles.analyzingImage} contentFit="cover" />
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" style={{ marginBottom: 16 }} />
              <Text style={styles.analyzingText}>{progressText}</Text>
            </View>
          </View>
        )}

        {status === 'completed' && diagnosisResult && (
          <View style={styles.resultContainer}>
            <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              
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

              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Descripción</Text>
                <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
                  {diagnosisResult.entry.description}
                </Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: '#16a34a' }]}>🌿 Tratamiento Orgánico</Text>
                {diagnosisResult.entry.organicTreatment.map((step, idx) => (
                  <View key={`org-${idx}`} style={styles.listItem}>
                    <Text style={{ color: '#16a34a', marginRight: 8 }}>•</Text>
                    <Text style={[styles.treatmentText, { color: colors.textSecondary }]}>{step}</Text>
                  </View>
                ))}
              </View>

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

              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: colors.primary }]}>🛡️ Prevención Futura</Text>
                {diagnosisResult.entry.prevention.map((step, idx) => (
                  <View key={`prev-${idx}`} style={styles.listItem}>
                    <Ionicons name="checkmark" size={14} color={colors.primary} style={{ marginRight: 8, marginTop: 2 }} />
                    <Text style={[styles.treatmentText, { color: colors.textSecondary }]}>{step}</Text>
                  </View>
                ))}
              </View>

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
  samplesSection: {
    gap: 12,
    marginTop: 4,
  },
  sampleScroll: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  sampleCard: {
    width: 130,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 8,
  },
  sampleThumb: {
    width: '100%',
    height: 80,
    marginBottom: 6,
  },
  sampleLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 4,
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
