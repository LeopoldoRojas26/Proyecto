import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '@/constants/mockData';

export interface DiaryEntry {
  id: string;
  date: string;
  image: string;
  height: number;
  leavesCount: number;
  notes: string;
  mood: 'happy' | 'neutral' | 'sad';
}

export interface UserPlant extends Plant {
  nickname: string;
  location: string;
  acquisitionDate: string;
  diary?: DiaryEntry[];
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
          // Pre-populate with beautiful mock data containing growth diaries
          const defaultPlants: UserPlant[] = [
            {
              id: '1',
              nickname: 'Monsty',
              commonName: 'Monstera Deliciosa',
              scientificName: 'Monstera deliciosa',
              image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
              healthStatus: { emoji: '🌿', text: 'Excelente', color: '#4CAF50' },
              nextWatering: 'Mañana',
              nextWateringDate: '2026-05-20',
              waterFrequency: 'Cada 7 días',
              light: 'Semisombra',
              difficulty: 'Fácil',
              category: 'Interior',
              lastWatered: 'Hace 6 días',
              humidity: '50-70%',
              temperature: '18-28°C',
              description: 'La Monstera Deliciosa, también conocida como costilla de Adán, es una planta trepadora nativa de las selvas tropicales de Centroamérica.',
              careInstructions: [
                'Coloca en un lugar con luz indirecta brillante. Evita el sol directo que quema sus hojas.',
                'Riega solo cuando la mitad superior del sustrato esté seca.',
                'Limpia el polvo de sus hojas regularmente con un paño húmedo para facilitar la fotosíntesis.'
              ],
              location: 'Sala de Estar',
              acquisitionDate: '2026-03-01',
              diary: [
                {
                  id: 'entry_1_1',
                  date: '2026-03-01',
                  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
                  height: 20,
                  leavesCount: 3,
                  notes: 'Acabo de traer a Monsty a casa. Las hojas están un poco arrugadas por el viaje, pero se ve sana.',
                  mood: 'neutral'
                },
                {
                  id: 'entry_1_2',
                  date: '2026-04-01',
                  image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80',
                  height: 28,
                  leavesCount: 4,
                  notes: '¡Le ha salido una hoja nueva! Se está adaptando muy bien al rincón junto a la ventana.',
                  mood: 'happy'
                },
                {
                  id: 'entry_1_3',
                  date: '2026-05-01',
                  image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80',
                  height: 35,
                  leavesCount: 5,
                  notes: 'Monsty está creciendo súper rápido. La altura aumentó bastante y las hojas se ven grandes y brillantes.',
                  mood: 'happy'
                },
                {
                  id: 'entry_1_4',
                  date: '2026-05-18',
                  image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
                  height: 42,
                  leavesCount: 6,
                  notes: 'La regué hoy. Está brotando otra pequeña hoja en la base. ¡Se ve increíble!',
                  mood: 'happy'
                }
              ]
            },
            {
              id: '2',
              nickname: 'Susi',
              commonName: 'Lengua de Suegra',
              scientificName: 'Sansevieria trifasciata',
              image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&auto=format&fit=crop&q=80',
              healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
              nextWatering: 'En 5 días',
              nextWateringDate: '2026-05-24',
              waterFrequency: 'Cada 15-20 días',
              light: 'Semisombra',
              difficulty: 'Fácil',
              category: 'Interior',
              lastWatered: 'Hace 10 días',
              humidity: '30-50%',
              temperature: '15-32°C',
              description: 'Una de las plantas de interior más resistentes que existen. Purifica el aire eliminando toxinas.',
              careInstructions: [
                'Tolera casi cualquier nivel de luz, desde rincones oscuros hasta sol directo.',
                'El exceso de agua es su peor enemigo. Riega solo cuando el sustrato esté completamente seco.'
              ],
              location: 'Dormitorio',
              acquisitionDate: '2026-02-15',
              diary: [
                {
                  id: 'entry_2_1',
                  date: '2026-02-15',
                  image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80',
                  height: 30,
                  leavesCount: 5,
                  notes: 'Susi se ve espectacular en el dormitorio. Muy resistente.',
                  mood: 'happy'
                },
                {
                  id: 'entry_2_2',
                  date: '2026-04-15',
                  image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80',
                  height: 32,
                  leavesCount: 5,
                  notes: 'No ha crecido mucho en altura, lo cual es normal para esta especie, pero mantiene su color vibrante.',
                  mood: 'neutral'
                },
                {
                  id: 'entry_2_3',
                  date: '2026-05-15',
                  image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=80',
                  height: 35,
                  leavesCount: 6,
                  notes: '¡Le brotó una nueva hoja desde la raíz! Muy emocionado de ver su progreso constante.',
                  mood: 'happy'
                }
              ]
            }
          ];
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlants));
          setPlants(defaultPlants);
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
