import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '@/constants/mockData';

export interface UserPlant extends Plant {
  nickname: string;
  location: string;
  acquisitionDate: string;
}

interface PlantsContextType {
  plants: UserPlant[];
  loading: boolean;
  addPlant: (plantData: Omit<UserPlant, 'id'>) => Promise<string>;
  updatePlant: (id: string, plantData: Partial<UserPlant>) => Promise<void>;
  deletePlant: (id: string) => Promise<void>;
}

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

const STORAGE_KEY = '@gardening_user_plants';

export function PlantsProvider({ children }: { children: React.ReactNode }) {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [loading, setLoading] = useState(true);

  // Load plants from AsyncStorage on mount
  useEffect(() => {
    async function loadPlants() {
      try {
        const storedPlants = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedPlants) {
          setPlants(JSON.parse(storedPlants));
        } else {
          // Optional: Initial empty list
          setPlants([]);
        }
      } catch (error) {
        console.error('Error al cargar plantas de AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPlants();
  }, []);

  // Save plants helper
  const savePlants = async (updatedPlants: UserPlant[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
    } catch (error) {
      console.error('Error al guardar plantas en AsyncStorage:', error);
    }
  };

  const addPlant = async (plantData: Omit<UserPlant, 'id'>) => {
    const newId = Date.now().toString();
    const newPlant: UserPlant = {
      ...plantData,
      id: newId,
    };
    const updatedPlants = [...plants, newPlant];
    await savePlants(updatedPlants);
    return newId;
  };

  const updatePlant = async (id: string, plantData: Partial<UserPlant>) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        return { ...plant, ...plantData };
      }
      return plant;
    });
    await savePlants(updatedPlants);
  };

  const deletePlant = async (id: string) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    await savePlants(updatedPlants);
  };

  return (
    <PlantsContext.Provider value={{ plants, loading, addPlant, updatePlant, deletePlant }}>
      {children}
    </PlantsContext.Provider>
  );
}

export function usePlants() {
  const context = useContext(PlantsContext);
  if (context === undefined) {
    throw new Error('usePlants debe ser utilizado dentro de un PlantsProvider');
  }
  return context;
}
