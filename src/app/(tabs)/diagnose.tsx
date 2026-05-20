import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useColorScheme, ActivityIndicator, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { resolveImageSource } from '@/utils/imageResolver';

const CLOROSIS_IMG = '@asset/clorosis';

interface MockDiagnosisResult {
  problemName: string;
  confidence: string;
  cause: string;
  treatment: string[];
}

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
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80', // Monstera
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
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80', // Rosal
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
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=600&auto=format&fit=crop&q=80', // Suculenta Echeveria
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
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop&q=80', // Poto
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
    image: 'https://images.unsplash.com/photo-1628352621029-805797bc4982?w=600&auto=format&fit=crop&q=80', // Araña Roja / Ácaros en tallo
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

  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [selectedProblem, setSelectedProblem] = useState<typeof SAMPLE_PROBLEMS[0] | null>(null);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [progressText, setProgressText] = useState('');

  const handleSelectSample = (problem: typeof SAMPLE_PROBLEMS[0]) => {
    setSelectedPhoto(problem.image);
    setSelectedProblem(problem);
    setStatus('idle');
  };

  const handleCustomUploadSimulate = () => {
    // Pick first problem as default custom simulate
    const randomProb = SAMPLE_PROBLEMS[Math.floor(Math.random() * SAMPLE_PROBLEMS.length)];
    setSelectedPhoto(randomProb.image);
    setSelectedProblem(randomProb);
    setStatus('idle');
  };

  const handleAnalyze = () => {
    if (!selectedPhoto) return;

    setStatus('analyzing');
    setProgressText('Subiendo imagen...');

    setTimeout(() => {
      setProgressText('Escaneando textura foliar...');
      setTimeout(() => {
        setProgressText('Identificando patógenos...');
        setTimeout(() => {
          setProgressText('Generando diagnóstico...');
          setTimeout(() => {
            setStatus('completed');
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleReset = () => {
    setSelectedPhoto(null);
    setSelectedProblem(null);
    setStatus('idle');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        {status !== 'completed' && (
          <View style={styles.introHeader}>
            <Text style={[styles.title, { color: colors.text }]}>¿Tu planta luce enferma?</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Toma una foto de sus hojas o selecciona uno de nuestros ejemplos para recibir un diagnóstico instantáneo y tratamiento.
            </Text>
          </View>
        )}

        {/* State 1: Idle (Show picker/upload) */}
        {status === 'idle' && (
          <View style={styles.stepContainer}>
            {/* Upload Area */}
            {selectedPhoto ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={resolveImageSource(selectedPhoto)} style={styles.previewImage} contentFit="cover" />
                <Pressable 
                  onPress={() => setSelectedPhoto(null)} 
                  style={[styles.removeBtn, { backgroundColor: colors.notification }]}
                >
                  <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
                </Pressable>
              </View>
            ) : (
              <Pressable 
                onPress={handleCustomUploadSimulate}
                style={[styles.uploadBox, { backgroundColor: colors.surface, borderColor: colors.primary }]}
              >
                <Ionicons name="camera-outline" size={48} color={colors.primary} />
                <Text style={[styles.uploadTitle, { color: colors.text }]}>Subir Foto de Planta</Text>
                <Text style={[styles.uploadSub, { color: colors.textSecondary }]}>Simula tomar o elegir foto</Text>
              </Pressable>
            )}

            {/* Quick Samples Selection */}
            {!selectedPhoto && (
              <View style={styles.samplesSection}>
                <Text style={[styles.samplesTitle, { color: colors.text }]}>O selecciona un caso de ejemplo:</Text>
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
                        { backgroundColor: colors.surface, borderColor: colors.border }
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

            {/* Action button */}
            {selectedPhoto && (
              <Pressable 
                onPress={handleAnalyze} 
                style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="scan-outline" size={20} color="#FFFFFF" />
                <Text style={styles.actionBtnText}>Analizar Planta</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* State 2: Analyzing (Spinner + Progress) */}
        {status === 'analyzing' && (
          <View style={[styles.analyzingContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Image source={resolveImageSource(selectedPhoto)} style={styles.analyzingImage} contentFit="cover" />
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" style={{ marginBottom: 16 }} />
              <Text style={styles.analyzingText}>{progressText}</Text>
            </View>
          </View>
        )}

        {/* State 3: Completed (Show Diagnosis results) */}
        {status === 'completed' && selectedProblem && (
          <View style={styles.resultContainer}>
            <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              
              {/* Header */}
              <View style={styles.resultHeader}>
                <View style={styles.resultSuccessIcon}>
                  <Ionicons name="checkmark-circle" size={48} color={colors.primary} />
                </View>
                <View style={styles.resultHeaderDetails}>
                  <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>DIAGNÓSTICO SIMULADO</Text>
                  <Text style={[styles.resultTitle, { color: colors.text }]}>
                    {selectedProblem.result.problemName}
                  </Text>
                </View>
              </View>

              {/* Image and confidence */}
              <View style={styles.resultImageRow}>
                <Image source={resolveImageSource(selectedPhoto)} style={styles.resultThumb} contentFit="cover" />
                <View style={[styles.confidenceBadge, { backgroundColor: colors.primaryLight }]}>
                  <Ionicons name="ribbon-outline" size={16} color={colors.primary} />
                  <Text style={[styles.confidenceText, { color: colors.primary }]}>
                    {selectedProblem.result.confidence}
                  </Text>
                </View>
              </View>

              {/* Cause section */}
              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Posible Causa</Text>
                <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
                  {selectedProblem.result.cause}
                </Text>
              </View>

              {/* Treatment list */}
              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Tratamiento Sugerido</Text>
                {selectedProblem.result.treatment.map((step, idx) => (
                  <View key={idx} style={styles.treatmentRow}>
                    <Ionicons name="checkbox" size={18} color={colors.primary} style={{ marginTop: 2 }} />
                    <Text style={[styles.treatmentText, { color: colors.textSecondary }]}>
                      {step}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Reset button */}
              <Pressable 
                onPress={handleReset} 
                style={[styles.resetBtn, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
                <Text style={styles.resetBtnText}>Analizar otra planta</Text>
              </Pressable>
            </View>
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
  uploadBox: {
    height: 180,
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
  },
  samplesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
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
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
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
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  resultThumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultSection: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  treatmentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  treatmentText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
    marginTop: 10,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
