import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useColorScheme, ActivityIndicator, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface MockDiagnosisResult {
  problemName: string;
  confidence: string;
  cause: string;
  treatment: string[];
}

const SAMPLE_PROBLEMS = [
  {
    id: 'prob1',
    label: 'Hojas Amarillas (Clorosis)',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&auto=format&fit=crop&q=80', // Ficus
    result: {
      problemName: 'Clorosis Férrica (Falta de Hierro)',
      confidence: '92% de coincidencia',
      cause: 'Deficiencia de hierro disponible en el sustrato, comúnmente causada por regar con agua de grifo muy alcalina (con mucha cal).',
      treatment: [
        'Aplica quelato de hierro diluido en el agua de riego.',
        'Riega con agua de lluvia, destilada o reposada (mínimo 24h).',
        'Verifica que el pH del sustrato esté en un rango adecuado (entre 5.5 y 6.5).'
      ]
    }
  },
  {
    id: 'prob2',
    label: 'Manchas Secas (Falta de Humedad)',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80', // Monstera
    result: {
      problemName: 'Humedad Ambiental Baja / Quemadura',
      confidence: '88% de coincidencia',
      cause: 'El aire ambiental está excesivamente seco, agravado por exposición directa al sol o corrientes de aire caliente provenientes de calefactores.',
      treatment: [
        'Agrupa tus plantas para crear un microclima húmedo.',
        'Pulveriza agua templada en las hojas a diario o instala un humidificador.',
        'Aleja la planta de las ventanas con sol directo del mediodía.'
      ]
    }
  },
  {
    id: 'prob3',
    label: 'Polvo Blanco (Hongo Mildiu)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80', // Rosal
    result: {
      problemName: 'Mildiu Polvoriento (Oídio)',
      confidence: '95% de coincidencia',
      cause: 'Hongo que prolifera en condiciones de alta humedad en el suelo combinada con aire estancado y follaje permanentemente mojado.',
      treatment: [
        'Poda y desecha las hojas gravemente infectadas (no las uses para compost).',
        'Riega la base directamente; evita mojar las hojas.',
        'Aplica un fungicida orgánico de jabón potásico y bicarbonato de sodio.'
      ]
    }
  }
];

export default function DiagnoseScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
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
                <View style={styles.sampleGrid}>
                  {SAMPLE_PROBLEMS.map((prob) => (
                    <Pressable
                      key={prob.id}
                      onPress={() => handleSelectSample(prob)}
                      style={[
                        styles.sampleCard,
                        { backgroundColor: colors.surface, borderColor: colors.border }
                      ]}
                    >
                      <Image source={{ uri: prob.image }} style={styles.sampleThumb} contentFit="cover" />
                      <Text style={[styles.sampleLabel, { color: colors.text }]} numberOfLines={1}>
                        {prob.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
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
            <Image source={{ uri: selectedPhoto! }} style={styles.analyzingImage} contentFit="cover" />
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
                <Image source={{ uri: selectedPhoto! }} style={styles.resultThumb} contentFit="cover" />
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
  sampleGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  sampleCard: {
    flex: 1,
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
