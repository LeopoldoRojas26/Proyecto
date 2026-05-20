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

        const relocatedPlants: UserPlant[] = [
          {
            id: 'begonia_default',
            nickname: 'Bego',
            commonName: 'Begonia',
            scientificName: 'Begonia semperflorens',
            image: '@asset/begonia',
            healthStatus: { emoji: '🌿', text: 'Excelente', color: '#4CAF50' },
            nextWatering: 'Mañana',
            nextWateringDate: '2026-05-20',
            waterFrequency: 'Cada 5 días',
            light: 'Semisombra',
            difficulty: 'Fácil',
            category: 'Interior',
            lastWatered: 'Hace 4 días',
            humidity: '50-60%',
            temperature: '15-25°C',
            description: 'Es importante mantener la tierra de la begonia ligeramente húmeda, pero sin llegar a encharcarla, ya que el exceso de agua puede provocar la pudrición de las raíces.',
            careInstructions: [
              'Riega moderadamente solo cuando el primer centímetro del sustrato se sienta ligeramente seco.',
              'Evita el encharcamiento usando una maceta con drenaje óptimo y retira el agua sobrante del plato.',
              'Asegura un ambiente bien iluminado pero con luz indirecta para favorecer su espectacular floración.'
            ],
            location: 'Terraza',
            acquisitionDate: '2026-05-01',
            diary: []
          },
          {
            id: 'bambu_default',
            nickname: 'Bamby',
            commonName: 'Bambú de la Suerte',
            scientificName: 'Dracaena sanderiana',
            image: '@asset/bambu',
            healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
            nextWatering: 'En 3 días',
            nextWateringDate: '2026-05-22',
            waterFrequency: 'Cada 7 días',
            light: 'Semisombra',
            difficulty: 'Fácil',
            category: 'Interior',
            lastWatered: 'Hace 4 días',
            humidity: '40-60%',
            temperature: '18-30°C',
            description: 'El bambú es una planta de interior muy versátil y popular, especialmente en su versión conocida como bambú de la suerte (Dracaena sanderiana), aunque también hay otras especies de bambú que se pueden cultivar en interiores. No es un verdadero bambú, pero se le llama así debido a su apariencia similar.',
            careInstructions: [
              'Si se cultiva en agua, cámbiala en su totalidad cada 7-10 días por agua limpia libre de cloro.',
              'Proporciónale una ubicación templada y luz indirecta brillante o moderada.',
              'Si decides cultivarlo en tierra, mantén el sustrato constantemente húmedo pero poroso.'
            ],
            location: 'Oficina',
            acquisitionDate: '2026-04-10',
            diary: []
          },
          {
            id: 'dieffenbachia_default',
            nickname: 'Diffy',
            commonName: 'Dieffenbachia',
            scientificName: 'Dieffenbachia seguine',
            image: '@asset/dieffenbachia',
            healthStatus: { emoji: '🌿', text: 'Excelente', color: '#4CAF50' },
            nextWatering: 'En 2 días',
            nextWateringDate: '2026-05-21',
            waterFrequency: 'Cada 7 días',
            light: 'Semisombra',
            difficulty: 'Fácil',
            category: 'Interior',
            lastWatered: 'Hace 5 días',
            humidity: '60-80%',
            temperature: '18-25°C',
            description: 'Su resistencia y capacidad de adaptarse a diversas condiciones la convierten en una opción excelente para interiores. Al ser una planta tropical, la dieffenbachia disfruta de ambientes con alta humedad. Si el aire es demasiado seco, especialmente en invierno, es recomendable pulverizar las hojas con agua o utilizar un humidificador.',
            careInstructions: [
              'Pulveriza sus hojas con agua tibia con regularidad para emular su microclima selvático.',
              'Evita colocarla en esquinas de alta calefacción o bajo corrientes secas de aire en invierno.',
              'Colócala en un rincón cálido con luz tamizada o indirecta para evitar quemaduras.'
            ],
            location: 'Sala de Estar',
            acquisitionDate: '2026-05-10',
            diary: []
          },
          {
            id: 'aglaonema_default',
            nickname: 'Agla',
            commonName: 'Aglaonema',
            scientificName: 'Aglaonema commutatum',
            image: '@asset/aglaonema',
            healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
            nextWatering: 'En 4 días',
            nextWateringDate: '2026-05-23',
            waterFrequency: 'Cada 8-10 días',
            light: 'Semisombra',
            difficulty: 'Fácil',
            category: 'Interior',
            lastWatered: 'Hace 5 días',
            humidity: '40-60%',
            temperature: '16-24°C',
            description: 'La aglaonema es una planta de interior muy apreciada por su follaje decorativo y por ser extremadamente resistente. Es originaria de Asia tropical y subtropical, y es una excelente opción para quienes buscan una planta que requiera pocos cuidados. Se adapta bien a condiciones con poca luz. Sin embargo, si tienes una variedad con hojas más coloridas, como las de tonos rojos o rosados, necesitará más luz indirecta para mantener sus colores vibrantes.',
            careInstructions: [
              'Mueve la planta a un espacio con mayor luminosidad filtrada si notas que sus hojas rojas pierden viveza.',
              'Evita a toda costa los rayos del sol directo del mediodía que decoloran y causan quemaduras.',
              'Riega de forma espaciada, permitiendo que el sustrato se seque en un 50% entre cada sesión.'
            ],
            location: 'Pasillo',
            acquisitionDate: '2026-05-05',
            diary: []
          },
          {
            id: 'lirio_default',
            nickname: 'Paz',
            commonName: 'Lirio de la Paz',
            scientificName: 'Spathiphyllum wallisii',
            image: '@asset/lirio',
            healthStatus: { emoji: '🌿', text: 'Excelente', color: '#4CAF50' },
            nextWatering: 'En 2 días',
            nextWateringDate: '2026-05-21',
            waterFrequency: 'Cada 5-7 días',
            light: 'Semisombra',
            difficulty: 'Fácil',
            category: 'Interior',
            lastWatered: 'Hace 4 días',
            humidity: '50-70%',
            temperature: '18-25°C',
            description: 'El lirio de la paz, también conocido como "Cuna de Moisés", es una planta de interior muy popular por su elegancia y por ser fácil de cuidar. Además, tiene la capacidad de purificar el aire, lo que la convierte en una opción ideal para hogares y oficinas. Es una planta que crece mejor con luz indirecta, pero también puede tolerar niveles bajos de luz, lo que lo hace ideal para interiores.',
            careInstructions: [
              'Ubícalo en pasillos o estancias con luz tenue a brillante indirecta (soporta muy bien la sombra).',
              'Riega en abundancia apenas notes que sus tallos y hojas comienzan a decaer o "desmayarse".',
              'Limpia sus grandes hojas verdes periódicamente con un paño húmedo para facilitar la purificación del aire.'
            ],
            location: 'Comedor',
            acquisitionDate: '2026-05-15',
            diary: []
          }
        ];

        if (storedPlants) {
          let loadedPlants: UserPlant[] = JSON.parse(storedPlants);
          // Injection logic: if new plants are not present in AsyncStorage, inject them!
          const hasNewPlants = loadedPlants.some(p => p.id === 'begonia_default' || p.commonName === 'Begonia');
          let shouldRewrite = false;
          if (!hasNewPlants) {
            loadedPlants = [...loadedPlants, ...relocatedPlants];
            shouldRewrite = true;
          }
          // Migration logic: update Susi's image to the new local asset if it uses the old unsplash URL
          loadedPlants = loadedPlants.map(p => {
            const isSusi = p.id === '2' || 
                           (p.nickname && p.nickname.toLowerCase().trim() === 'susi') || 
                           (p.commonName && p.commonName.toLowerCase().trim().includes('suegra')) ||
                           (p.scientificName && p.scientificName.toLowerCase().trim().includes('sansevieria'));
            if (isSusi && p.image !== '@asset/susi') {
              shouldRewrite = true;
              const updatedDiary = p.diary?.map(d => {
                if (d.image !== '@asset/susi') {
                  return { ...d, image: '@asset/susi' };
                }
                return d;
              }) || [];
              return { ...p, image: '@asset/susi', diary: updatedDiary };
            }
            return p;
          });
          if (shouldRewrite) {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(loadedPlants));
          }
          setPlants(loadedPlants);
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
              image: '@asset/susi',
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
                  image: '@asset/susi',
                  height: 30,
                  leavesCount: 5,
                  notes: 'Susi se ve espectacular en el dormitorio. Muy resistente.',
                  mood: 'happy'
                },
                {
                  id: 'entry_2_2',
                  date: '2026-04-15',
                  image: '@asset/susi',
                  height: 32,
                  leavesCount: 5,
                  notes: 'No ha crecido mucho en altura, lo cual es normal para esta especie, pero mantiene su color vibrante.',
                  mood: 'neutral'
                },
                {
                  id: 'entry_2_3',
                  date: '2026-05-15',
                  image: '@asset/susi',
                  height: 35,
                  leavesCount: 6,
                  notes: '¡Le brotó una nueva hoja desde la raíz! Muy emocionado de ver su progreso constante.',
                  mood: 'happy'
                }
              ]
            },
            ...relocatedPlants
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
