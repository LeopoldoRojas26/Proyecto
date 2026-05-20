export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  image: string;
  healthStatus: {
    emoji: string;
    text: string;
    color: string; // Hex color for status indicator
  };
  nextWatering: string; // e.g. "Hoy", "Mañana", "En 3 días"
  nextWateringDate: string; // ISO date string e.g. "2026-05-20"
  waterFrequency: string; // e.g. "Cada 5 días"
  light: 'Sombra' | 'Semisombra' | 'Sol directo';
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  category: 'Interior' | 'Exterior' | 'Suculentas' | 'Huerto';
  lastWatered: string; // e.g. "Hace 3 días"
  humidity: string; // e.g. "40-60%"
  temperature: string; // e.g. "18-24°C"
  description: string;
  careInstructions: string[];
}

export interface Reminder {
  id: string;
  plantId: string;
  plantName: string;
  taskType: 'Riego' | 'Poda' | 'Abono' | 'Trasplante' | 'Limpieza';
  time: string; // e.g. "10:00 AM"
  date: string; // e.g. "2026-05-20"
  relativeDate: string; // e.g. "Hoy", "Mañana", "Ayer"
  done: boolean;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'Siembra' | 'Poda' | 'Trasplante' | 'Abono' | 'Riego';
  plantName: string;
  notes: string;
  color: string; // Color coding
}

export const MOCK_PLANTS: Plant[] = [
  {
    id: '1',
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
    description: 'La Monstera Deliciosa, también conocida como costilla de Adán, es una planta trepadora nativa de las selvas tropicales de Centroamérica. Es famosa por las llamativas perforaciones en sus hojas maduras.',
    careInstructions: [
      'Coloca en un lugar con luz indirecta brillante. Evita el sol directo que quema sus hojas.',
      'Riega solo cuando la mitad superior del sustrato esté seca.',
      'Limpia el polvo de sus hojas regularmente con un paño húmedo para facilitar la fotosíntesis.'
    ]
  },
  {
    id: '2',
    commonName: 'Lengua de Suegra',
    scientificName: 'Sansevieria trifasciata',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
    nextWatering: 'En 5 días',
    nextWateringDate: '2026-05-24',
    waterFrequency: 'Cada 15-20 días',
    light: 'Semisombra', // adaptable
    difficulty: 'Fácil',
    category: 'Interior',
    lastWatered: 'Hace 10 días',
    humidity: '30-50%',
    temperature: '15-32°C',
    description: 'Una de las plantas de interior más resistentes que existen. Purifica el aire eliminando toxinas como el benceno y el formaldehído. Es sumamente tolerante a la negligencia.',
    careInstructions: [
      'Tolera casi cualquier nivel de luz, desde rincones oscuros hasta sol directo.',
      'El exceso de agua es su peor enemigo. Riega solo cuando el sustrato esté completamente seco.',
      'Usa una maceta con buen drenaje y sustrato arenoso para cactus/suculentas.'
    ]
  },
  {
    id: '3',
    commonName: 'Rosal de Miniatura',
    scientificName: 'Rosa chinensis minima',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '⚠️', text: 'Necesita Atención', color: '#FFB74D' },
    nextWatering: 'Hoy',
    nextWateringDate: '2026-05-19',
    waterFrequency: 'Cada 2-3 días',
    light: 'Sol directo',
    difficulty: 'Difícil',
    category: 'Exterior',
    lastWatered: 'Hace 3 días',
    humidity: '40-60%',
    temperature: '10-25°C',
    description: 'Hermosos rosales enanos que florecen abundantemente si reciben suficiente sol. Requieren cuidados minuciosos, poda frecuente y control preventivo de plagas.',
    careInstructions: [
      'Requiere al menos 6 horas de sol directo al día.',
      'Mantén la tierra ligeramente húmeda pero nunca encharcada.',
      'Retira las flores marchitas para estimular nuevas floraciones.'
    ]
  },
  {
    id: '4',
    commonName: 'Ficus Lira',
    scientificName: 'Ficus lyrata',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '🥀', text: 'Hojas secas', color: '#E57373' },
    nextWatering: 'Hoy',
    nextWateringDate: '2026-05-19',
    waterFrequency: 'Cada 7-10 días',
    light: 'Semisombra',
    difficulty: 'Medio',
    category: 'Interior',
    lastWatered: 'Hace 9 días',
    humidity: '60-80%',
    temperature: '18-24°C',
    description: 'Elegante árbol de interior con hojas grandes en forma de violín. Es un poco caprichoso con su ubicación y no le gustan las corrientes de aire ni los cambios bruscos de temperatura.',
    careInstructions: [
      'Ubica cerca de una ventana grande pero sin sol directo abrasador.',
      'Riega abundantemente cuando los primeros 3 cm de tierra se sientan secos.',
      'Gira la planta 90 grados cada mes para asegurar un crecimiento uniforme.'
    ]
  },
  {
    id: '5',
    commonName: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '🌿', text: 'Excelente', color: '#4CAF50' },
    nextWatering: 'En 8 días',
    nextWateringDate: '2026-05-27',
    waterFrequency: 'Cada 12-14 días',
    light: 'Sol directo',
    difficulty: 'Fácil',
    category: 'Suculentas',
    lastWatered: 'Hace 4 días',
    humidity: '30-40%',
    temperature: '15-35°C',
    description: 'Planta suculenta medicinal conocida por las propiedades regeneradoras de su gel interno. Ideal para quemaduras y cuidado de la piel. Requiere muy poco mantenimiento.',
    careInstructions: [
      'Ponla en una zona muy luminosa, idealmente con sol directo varias horas.',
      'Riega con moderación. Asegúrate de que drene bien el agua sobrante.',
      'No fertilices en exceso; una vez en primavera es suficiente.'
    ]
  }
];

export const MOCK_REMINDERS: Reminder[] = [
  {
    id: 'r1',
    plantId: '3',
    plantName: 'Rosal de Miniatura',
    taskType: 'Riego',
    time: '08:00 AM',
    date: '2026-05-19',
    relativeDate: 'Hoy',
    done: false
  },
  {
    id: 'r2',
    plantId: '4',
    plantName: 'Ficus Lira',
    taskType: 'Riego',
    time: '09:30 AM',
    date: '2026-05-19',
    relativeDate: 'Hoy',
    done: false
  },
  {
    id: 'r3',
    plantId: '1',
    plantName: 'Monstera Deliciosa',
    taskType: 'Riego',
    time: '10:00 AM',
    date: '2026-05-20',
    relativeDate: 'Mañana',
    done: false
  },
  {
    id: 'r4',
    plantId: '3',
    plantName: 'Rosal de Miniatura',
    taskType: 'Poda',
    time: '05:00 PM',
    date: '2026-05-21',
    relativeDate: 'En 2 días',
    done: false
  },
  {
    id: 'r5',
    plantId: '2',
    plantName: 'Lengua de Suegra',
    taskType: 'Limpieza',
    time: '11:00 AM',
    date: '2026-05-22',
    relativeDate: 'En 3 días',
    done: false
  },
  {
    id: 'r6',
    plantId: '5',
    plantName: 'Aloe Vera',
    taskType: 'Abono',
    time: '09:00 AM',
    date: '2026-05-25',
    relativeDate: 'En 6 días',
    done: false
  }
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  // Events for May 2026
  {
    id: 'c1',
    date: '2026-05-05',
    type: 'Siembra',
    plantName: 'Tomate Cherry',
    notes: 'Sembrar semillas en semilleros con sustrato abonado.',
    color: '#4CAF50' // Green
  },
  {
    id: 'c2',
    date: '2026-05-12',
    type: 'Poda',
    plantName: 'Rosal de Miniatura',
    notes: 'Limpieza de tallos secos e infectados para fomentar floración.',
    color: '#FFA000' // Amber
  },
  {
    id: 'c3',
    date: '2026-05-15',
    type: 'Trasplante',
    plantName: 'Menta',
    notes: 'Pasar brotes enraizados a una maceta definitiva más amplia.',
    color: '#0288D1' // Blue
  },
  {
    id: 'c4',
    date: '2026-05-19', // Today
    type: 'Riego',
    plantName: 'Rosal & Ficus',
    notes: 'Riego matutino abundante.',
    color: '#2E7D32' // Deep Green
  },
  {
    id: 'c5',
    date: '2026-05-22',
    type: 'Abono',
    plantName: 'Monstera Deliciosa',
    notes: 'Aplicar humus de lombriz líquido diluido en el riego.',
    color: '#8D6E63' // Brown
  },
  {
    id: 'c6',
    date: '2026-05-28',
    type: 'Siembra',
    plantName: 'Albahaca',
    notes: 'Sembrar en maceta de cocina con luz directa abundante.',
    color: '#4CAF50'
  }
];

export const EXPLORE_LIBRARY: Plant[] = [
  ...MOCK_PLANTS,
  {
    id: 'ex1',
    commonName: 'Pothos / Teléfono',
    scientificName: 'Epipremnum aureum',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
    nextWatering: 'En 4 días',
    nextWateringDate: '2026-05-23',
    waterFrequency: 'Cada 7 días',
    light: 'Sombra',
    difficulty: 'Fácil',
    category: 'Interior',
    lastWatered: 'Hace 3 días',
    humidity: '50-70%',
    temperature: '15-30°C',
    description: 'El Potos es una enredadera sumamente popular y fácil de cuidar. Sus hojas en forma de corazón pueden tener vetas amarillas o blancas. Crece muy rápido colgando de estantes.',
    careInstructions: [
      'Coloca en sombra o semisombra. Puede crecer bien con luz artificial.',
      'Espera a que el sustrato se haya secado casi por completo antes de volver a regar.',
      'Puedes propagarla fácilmente cortando un esqueje de tallo y poniéndolo en agua.'
    ]
  },
  {
    id: 'ex2',
    commonName: 'Lavanda',
    scientificName: 'Lavandula angustifolia',
    image: 'https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
    nextWatering: 'En 6 días',
    nextWateringDate: '2026-05-25',
    waterFrequency: 'Cada 10 días',
    light: 'Sol directo',
    difficulty: 'Medio',
    category: 'Exterior',
    lastWatered: 'Hace 4 days',
    humidity: '20-40%',
    temperature: '10-35°C',
    description: 'Planta aromática mediterránea sumamente apreciada por su perfume y sus flores violetas en espiga. Atrae a polinizadores benéficos como abejas y mariposas.',
    careInstructions: [
      'Coloca a pleno sol; necesita un mínimo de 6 a 8 horas de sol directo al día.',
      'Requiere un suelo calizo, arenoso y con un drenaje excelente.',
      'Riega moderadamente en verano y casi nada en invierno. Odia el encharcamiento.'
    ]
  },
  {
    id: 'ex3',
    commonName: 'Tomate Cherry',
    scientificName: 'Solanum lycopersicum var. cerasiforme',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '🌿', text: 'Excelente', color: '#4CAF50' },
    nextWatering: 'Mañana',
    nextWateringDate: '2026-05-20',
    waterFrequency: 'Cada 2 días',
    light: 'Sol directo',
    difficulty: 'Medio',
    category: 'Huerto',
    lastWatered: 'Ayer',
    humidity: '50-60%',
    temperature: '15-28°C',
    description: 'El tomate cherry es una variedad de tomate pequeña y redonda que florece con abundancia en macetas o huertos. Sus frutos son dulces, jugosos y crujientes.',
    careInstructions: [
      'Requiere sol directo todo el día para madurar sus frutos dulces.',
      'Riego regular y constante para evitar que se agrieten los frutos.',
      'Coloca tutores o guías para soportar el peso de las ramas cuando crezcan.'
    ]
  },
  {
    id: 'ex4',
    commonName: 'Planta de Jade',
    scientificName: 'Crassula ovata',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
    nextWatering: 'En 10 días',
    nextWateringDate: '2026-05-29',
    waterFrequency: 'Cada 15 días',
    light: 'Semisombra',
    difficulty: 'Fácil',
    category: 'Suculentas',
    lastWatered: 'Hace 5 días',
    humidity: '30-40%',
    temperature: '15-30°C',
    description: 'También conocida como árbol de la abundancia o de la suerte. Tiene hojas carnosas, ovaladas e intensamente verdes, que almacenan agua. Crece lento pero vive por décadas.',
    careInstructions: [
      'Prefiere luz brillante, incluso sol directo tamizado. En sombra pierde el color.',
      'Riega sólo cuando la tierra esté completamente seca de arriba a abajo.',
      'No requiere podas recurrentes, solo retirar hojas secas.'
    ]
  },
  {
    id: 'ex5',
    commonName: 'Menta',
    scientificName: 'Mentha spicata',
    image: 'https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&auto=format&fit=crop&q=80',
    healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
    nextWatering: 'Mañana',
    nextWateringDate: '2026-05-20',
    waterFrequency: 'Cada 3 días',
    light: 'Semisombra',
    difficulty: 'Fácil',
    category: 'Huerto',
    lastWatered: 'Hace 2 días',
    humidity: '60-80%',
    temperature: '12-25°C',
    description: 'Planta herbácea muy aromática y refrescante. Crece con gran vigor y es invasiva, por lo que se recomienda cultivar en maceta individual.',
    careInstructions: [
      'Prefiere semisombra o sol parcial. La tierra debe estar fresca y húmeda.',
      'Riega de forma frecuente para mantener el sustrato húmedo (sin encharcar).',
      'Poda las puntas para favorecer que crezca más tupida y compacta.'
    ]
  }
];
