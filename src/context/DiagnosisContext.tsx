import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiagnosisEntry, diagnoseProblem } from '@/constants/diagnosisData';

export interface DiagnosisHistoryEntry {
  id: string;
  plantId: string;
  date: string; // ISO String
  photoUri: string | null;
  selectedSymptoms: string[];
  diagnosisResultId: string; // ID of the highest match
  matchPercentage: number;
}

interface DiagnosisContextType {
  history: DiagnosisHistoryEntry[];
  loading: boolean;
  addDiagnosis: (entry: Omit<DiagnosisHistoryEntry, 'id'>) => Promise<string>;
  getDiagnosesForPlant: (plantId: string) => DiagnosisHistoryEntry[];
  deleteDiagnosis: (id: string) => Promise<void>;
  clearHistoryForPlant: (plantId: string) => Promise<void>;
}

const DiagnosisContext = createContext<DiagnosisContextType | undefined>(undefined);
const STORAGE_KEY = '@gardening_diagnosis_history';

export function DiagnosisProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<DiagnosisHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setHistory(JSON.parse(stored));
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error('Error loading diagnosis history:', error);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const saveHistory = async (newHistory: DiagnosisHistoryEntry[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Error saving diagnosis history:', error);
    }
  };

  const addDiagnosis = async (entryData: Omit<DiagnosisHistoryEntry, 'id'>) => {
    const newId = Date.now().toString();
    const newEntry: DiagnosisHistoryEntry = {
      ...entryData,
      id: newId,
    };
    const newHistory = [newEntry, ...history];
    await saveHistory(newHistory);
    return newId;
  };

  const getDiagnosesForPlant = (plantId: string) => {
    return history.filter(h => h.plantId === plantId);
  };

  const deleteDiagnosis = async (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    await saveHistory(newHistory);
  };

  const clearHistoryForPlant = async (plantId: string) => {
    const newHistory = history.filter(h => h.plantId !== plantId);
    await saveHistory(newHistory);
  };

  return (
    <DiagnosisContext.Provider value={{
      history,
      loading,
      addDiagnosis,
      getDiagnosesForPlant,
      deleteDiagnosis,
      clearHistoryForPlant
    }}>
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const context = useContext(DiagnosisContext);
  if (context === undefined) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
}
