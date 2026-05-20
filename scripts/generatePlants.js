const fs = require('fs');

const categories = ['Interior', 'Exterior', 'Suculentas', 'Cactus', 'Aromáticas', 'Ornamentales', 'Huerto'];
const lights = ['Sombra', 'Semisombra', 'Sol directo'];
const difficulties = ['Fácil', 'Medio', 'Difícil'];

const images = {
  'Interior': [
    'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80',
    'https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80',
    'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80'
  ],
  'Exterior': [
    'https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80'
  ],
  'Suculentas': [
    'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80'
  ],
  'Cactus': [
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80',
    'https://images.unsplash.com/photo-1519336305162-4b6ed6b5fcde?w=600&q=80'
  ],
  'Aromáticas': [
    'https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80',
    'https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80'
  ],
  'Ornamentales': [
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80',
    'https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80'
  ],
  'Huerto': [
    'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&q=80',
    'https://images.unsplash.com/photo-1595856728038-f90989f6d6c3?w=600&q=80'
  ]
};

const commonNamesData = {
  'Interior': ['Ficus', 'Monstera', 'Pothos', 'Calathea', 'Sansevieria', 'Zamioculcas', 'Spathiphyllum', 'Aglaonema', 'Dracaena', 'Pilea', 'Begonia', 'Alocasia', 'Peperomia', 'Maranta', 'Fittonia'],
  'Exterior': ['Rosal', 'Bugambilia', 'Jazmín', 'Hortensia', 'Geranio', 'Petunia', 'Margarita', 'Clavel', 'Crisantemo', 'Azalea', 'Camelia', 'Glicina', 'Bambú', 'Hiedra', 'Clematis'],
  'Suculentas': ['Aloe', 'Echeveria', 'Sedum', 'Crassula', 'Haworthia', 'Graptopetalum', 'Kalanchoe', 'Sempervivum', 'Senecio', 'Agave', 'Gasteria', 'Euphorbia', 'Pachyphytum'],
  'Cactus': ['Opuntia', 'Echinocactus', 'Mammillaria', 'Ferocactus', 'Gymnocalycium', 'Schlumbergera', 'Rhipsalis', 'Cereus', 'Astrophytum', 'Copiapoa', 'Rebutia', 'Melocactus'],
  'Aromáticas': ['Lavanda', 'Menta', 'Romero', 'Albahaca', 'Orégano', 'Tomillo', 'Salvia', 'Cilantro', 'Perejil', 'Eneldo', 'Hierbabuena', 'Cebollino', 'Manzanilla', 'Estragón'],
  'Ornamentales': ['Orquídea', 'Anthurium', 'Bonsai', 'Helecho', 'Bromelia', 'Croton', 'Cinta', 'Lirio de paz', 'Violeta africana', 'Ciclamen', 'Poinsettia', 'Dieffenbachia', 'Syngonium'],
  'Huerto': ['Tomate', 'Pimiento', 'Lechuga', 'Zanahoria', 'Rábano', 'Fresa', 'Espinaca', 'Cebolla', 'Ajo', 'Pepino', 'Calabacín', 'Berenjena', 'Remolacha', 'Acelga']
};

const baseDescriptions = [
  "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
  "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
  "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
  "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
  "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
  "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería."
];

let plants = [];
let idCounter = 1;

for (let i = 0; i < 100; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const nameList = commonNamesData[category];
  const baseName = nameList[Math.floor(Math.random() * nameList.length)];
  
  const modifiers = ["Real", "Enano", "Gigante", "Silvestre", "Común", "Variegado", "Imperial", "de la India", "Asiático", "Tropical"];
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  
  const commonName = `${baseName} ${modifier}`;
  const scientificName = `${baseName.toLowerCase()} ${modifier.toLowerCase()}us`;
  
  const catImages = images[category];
  const image = catImages[Math.floor(Math.random() * catImages.length)];
  
  const light = lights[Math.floor(Math.random() * lights.length)];
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  const toxicity = Math.random() > 0.6; // ~40% toxic
  const wateringFreq = [2, 3, 5, 7, 10, 15, 20][Math.floor(Math.random() * 7)];
  
  plants.push({
    id: `exp-${idCounter++}`,
    commonName,
    scientificName,
    image,
    category,
    light,
    difficulty,
    description: baseDescriptions[Math.floor(Math.random() * baseDescriptions.length)],
    wateringFrequency: `Cada ${wateringFreq} días`,
    idealTemperature: "18-24°C",
    idealHumidity: category === 'Cactus' || category === 'Suculentas' ? "Baja (20-40%)" : "Media/Alta (50-80%)",
    idealSubstrate: category === 'Cactus' || category === 'Suculentas' ? "Arenoso con buen drenaje" : "Universal enriquecido",
    petToxic: toxicity,
    healthStatus: { emoji: '✨', text: 'Saludable', color: '#81C784' },
    nextWatering: `En ${Math.floor(Math.random() * 5) + 1} días`,
    nextWateringDate: "2026-05-25",
    waterFrequency: `Cada ${wateringFreq} días`,
    lastWatered: "Hace 2 días",
    humidity: category === 'Cactus' ? "20%" : "60%",
    temperature: "20°C",
    careInstructions: [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  });
}

const fileContent = `export interface ExplorePlant {
  id: string;
  commonName: string;
  scientificName: string;
  image: string;
  category: 'Interior' | 'Exterior' | 'Suculentas' | 'Cactus' | 'Aromáticas' | 'Ornamentales' | 'Huerto';
  light: 'Sombra' | 'Semisombra' | 'Sol directo';
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  description: string;
  wateringFrequency: string;
  idealTemperature: string;
  idealHumidity: string;
  idealSubstrate: string;
  petToxic: boolean;
  
  healthStatus: { emoji: string; text: string; color: string; };
  nextWatering: string;
  nextWateringDate: string;
  waterFrequency: string;
  lastWatered: string;
  humidity: string;
  temperature: string;
  careInstructions: string[];
}

export const EXPLORE_LIBRARY_REAL: ExplorePlant[] = ${JSON.stringify(plants, null, 2)};
`;

fs.writeFileSync('./src/constants/exploreData.ts', fileContent);
console.log('100 plants generated successfully!');
