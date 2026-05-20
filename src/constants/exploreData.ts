export interface ExplorePlant {
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

export const EXPLORE_LIBRARY_REAL: ExplorePlant[] = [
  {
    "id": "exp-1",
    "commonName": "Mammillaria Silvestre",
    "scientificName": "mammillaria silvestreus",
    "image": "https://images.unsplash.com/photo-1519336305162-4b6ed6b5fcde?w=600&q=80",
    "category": "Cactus",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-2",
    "commonName": "Perejil Común",
    "scientificName": "perejil comúnus",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-3",
    "commonName": "Echinocactus Gigante",
    "scientificName": "echinocactus giganteus",
    "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    "category": "Cactus",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-4",
    "commonName": "Aloe Silvestre",
    "scientificName": "aloe silvestreus",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-5",
    "commonName": "Sedum Enano",
    "scientificName": "sedum enanous",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-6",
    "commonName": "Aloe Silvestre",
    "scientificName": "aloe silvestreus",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-7",
    "commonName": "Fittonia Silvestre",
    "scientificName": "fittonia silvestreus",
    "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80",
    "category": "Interior",
    "light": "Semisombra",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-8",
    "commonName": "Cilantro Imperial",
    "scientificName": "cilantro imperialus",
    "image": "https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-9",
    "commonName": "Zanahoria de la India",
    "scientificName": "zanahoria de la indiaus",
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&q=80",
    "category": "Huerto",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-10",
    "commonName": "Orquídea Asiático",
    "scientificName": "orquídea asiáticous",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-11",
    "commonName": "Albahaca Enano",
    "scientificName": "albahaca enanous",
    "image": "https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-12",
    "commonName": "Camelia Silvestre",
    "scientificName": "camelia silvestreus",
    "image": "https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&q=80",
    "category": "Exterior",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-13",
    "commonName": "Spathiphyllum Silvestre",
    "scientificName": "spathiphyllum silvestreus",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
    "category": "Interior",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-14",
    "commonName": "Dracaena Imperial",
    "scientificName": "dracaena imperialus",
    "image": "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80",
    "category": "Interior",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-15",
    "commonName": "Fresa Asiático",
    "scientificName": "fresa asiáticous",
    "image": "https://images.unsplash.com/photo-1595856728038-f90989f6d6c3?w=600&q=80",
    "category": "Huerto",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-16",
    "commonName": "Cereus Variegado",
    "scientificName": "cereus variegadous",
    "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    "category": "Cactus",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-17",
    "commonName": "Aloe Común",
    "scientificName": "aloe comúnus",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-18",
    "commonName": "Astrophytum Enano",
    "scientificName": "astrophytum enanous",
    "image": "https://images.unsplash.com/photo-1519336305162-4b6ed6b5fcde?w=600&q=80",
    "category": "Cactus",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-19",
    "commonName": "Mammillaria Asiático",
    "scientificName": "mammillaria asiáticous",
    "image": "https://images.unsplash.com/photo-1519336305162-4b6ed6b5fcde?w=600&q=80",
    "category": "Cactus",
    "light": "Semisombra",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-20",
    "commonName": "Manzanilla Enano",
    "scientificName": "manzanilla enanous",
    "image": "https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-21",
    "commonName": "Crisantemo Común",
    "scientificName": "crisantemo comúnus",
    "image": "https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&q=80",
    "category": "Exterior",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-22",
    "commonName": "Peperomia Común",
    "scientificName": "peperomia comúnus",
    "image": "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80",
    "category": "Interior",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-23",
    "commonName": "Tomillo Asiático",
    "scientificName": "tomillo asiáticous",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-24",
    "commonName": "Lirio de paz Asiático",
    "scientificName": "lirio de paz asiáticous",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-25",
    "commonName": "Poinsettia Real",
    "scientificName": "poinsettia realus",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-26",
    "commonName": "Salvia Real",
    "scientificName": "salvia realus",
    "image": "https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-27",
    "commonName": "Croton Real",
    "scientificName": "croton realus",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-28",
    "commonName": "Rábano Asiático",
    "scientificName": "rábano asiáticous",
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&q=80",
    "category": "Huerto",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-29",
    "commonName": "Petunia Variegado",
    "scientificName": "petunia variegadous",
    "image": "https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&q=80",
    "category": "Exterior",
    "light": "Semisombra",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-30",
    "commonName": "Helecho Silvestre",
    "scientificName": "helecho silvestreus",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-31",
    "commonName": "Echeveria Imperial",
    "scientificName": "echeveria imperialus",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-32",
    "commonName": "Aloe Gigante",
    "scientificName": "aloe giganteus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Semisombra",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-33",
    "commonName": "Violeta africana Tropical",
    "scientificName": "violeta africana tropicalus",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-34",
    "commonName": "Bugambilia de la India",
    "scientificName": "bugambilia de la indiaus",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    "category": "Exterior",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-35",
    "commonName": "Pimiento Real",
    "scientificName": "pimiento realus",
    "image": "https://images.unsplash.com/photo-1595856728038-f90989f6d6c3?w=600&q=80",
    "category": "Huerto",
    "light": "Semisombra",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-36",
    "commonName": "Croton Común",
    "scientificName": "croton comúnus",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-37",
    "commonName": "Haworthia Variegado",
    "scientificName": "haworthia variegadous",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-38",
    "commonName": "Rhipsalis Común",
    "scientificName": "rhipsalis comúnus",
    "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    "category": "Cactus",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-39",
    "commonName": "Ciclamen Real",
    "scientificName": "ciclamen realus",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-40",
    "commonName": "Orégano Tropical",
    "scientificName": "orégano tropicalus",
    "image": "https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80",
    "category": "Aromáticas",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-41",
    "commonName": "Crassula Silvestre",
    "scientificName": "crassula silvestreus",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-42",
    "commonName": "Orégano Silvestre",
    "scientificName": "orégano silvestreus",
    "image": "https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-43",
    "commonName": "Copiapoa Tropical",
    "scientificName": "copiapoa tropicalus",
    "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    "category": "Cactus",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-44",
    "commonName": "Cilantro Enano",
    "scientificName": "cilantro enanous",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-45",
    "commonName": "Mammillaria Silvestre",
    "scientificName": "mammillaria silvestreus",
    "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    "category": "Cactus",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-46",
    "commonName": "Bromelia Enano",
    "scientificName": "bromelia enanous",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-47",
    "commonName": "Monstera Común",
    "scientificName": "monstera comúnus",
    "image": "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80",
    "category": "Interior",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-48",
    "commonName": "Euphorbia Imperial",
    "scientificName": "euphorbia imperialus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-49",
    "commonName": "Albahaca Silvestre",
    "scientificName": "albahaca silvestreus",
    "image": "https://images.unsplash.com/photo-1615486171448-4fd9a815a51c?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-50",
    "commonName": "Croton Asiático",
    "scientificName": "croton asiáticous",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-51",
    "commonName": "Aglaonema Variegado",
    "scientificName": "aglaonema variegadous",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
    "category": "Interior",
    "light": "Semisombra",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-52",
    "commonName": "Aloe de la India",
    "scientificName": "aloe de la indiaus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-53",
    "commonName": "Lirio de paz Silvestre",
    "scientificName": "lirio de paz silvestreus",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-54",
    "commonName": "Crassula de la India",
    "scientificName": "crassula de la indiaus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-55",
    "commonName": "Schlumbergera Imperial",
    "scientificName": "schlumbergera imperialus",
    "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    "category": "Cactus",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-56",
    "commonName": "Gymnocalycium Común",
    "scientificName": "gymnocalycium comúnus",
    "image": "https://images.unsplash.com/photo-1519336305162-4b6ed6b5fcde?w=600&q=80",
    "category": "Cactus",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-57",
    "commonName": "Echeveria Tropical",
    "scientificName": "echeveria tropicalus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-58",
    "commonName": "Zamioculcas Variegado",
    "scientificName": "zamioculcas variegadous",
    "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80",
    "category": "Interior",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-59",
    "commonName": "Albahaca Tropical",
    "scientificName": "albahaca tropicalus",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-60",
    "commonName": "Calabacín de la India",
    "scientificName": "calabacín de la indiaus",
    "image": "https://images.unsplash.com/photo-1595856728038-f90989f6d6c3?w=600&q=80",
    "category": "Huerto",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-61",
    "commonName": "Bugambilia Silvestre",
    "scientificName": "bugambilia silvestreus",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    "category": "Exterior",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-62",
    "commonName": "Azalea Variegado",
    "scientificName": "azalea variegadous",
    "image": "https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&q=80",
    "category": "Exterior",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-63",
    "commonName": "Zamioculcas Real",
    "scientificName": "zamioculcas realus",
    "image": "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80",
    "category": "Interior",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-64",
    "commonName": "Lechuga Tropical",
    "scientificName": "lechuga tropicalus",
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&q=80",
    "category": "Huerto",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-65",
    "commonName": "Ciclamen Silvestre",
    "scientificName": "ciclamen silvestreus",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-66",
    "commonName": "Copiapoa Real",
    "scientificName": "copiapoa realus",
    "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    "category": "Cactus",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-67",
    "commonName": "Haworthia Silvestre",
    "scientificName": "haworthia silvestreus",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-68",
    "commonName": "Anthurium Variegado",
    "scientificName": "anthurium variegadous",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-69",
    "commonName": "Croton Gigante",
    "scientificName": "croton giganteus",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-70",
    "commonName": "Rosal Real",
    "scientificName": "rosal realus",
    "image": "https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&q=80",
    "category": "Exterior",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-71",
    "commonName": "Gasteria Variegado",
    "scientificName": "gasteria variegadous",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    "category": "Suculentas",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-72",
    "commonName": "Syngonium Asiático",
    "scientificName": "syngonium asiáticous",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-73",
    "commonName": "Croton Silvestre",
    "scientificName": "croton silvestreus",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-74",
    "commonName": "Geranio Gigante",
    "scientificName": "geranio giganteus",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    "category": "Exterior",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-75",
    "commonName": "Perejil Enano",
    "scientificName": "perejil enanous",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-76",
    "commonName": "Kalanchoe Silvestre",
    "scientificName": "kalanchoe silvestreus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-77",
    "commonName": "Camelia Tropical",
    "scientificName": "camelia tropicalus",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    "category": "Exterior",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-78",
    "commonName": "Sedum de la India",
    "scientificName": "sedum de la indiaus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-79",
    "commonName": "Aloe Real",
    "scientificName": "aloe realus",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    "category": "Suculentas",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-80",
    "commonName": "Ficus Tropical",
    "scientificName": "ficus tropicalus",
    "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80",
    "category": "Interior",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-81",
    "commonName": "Pepino Enano",
    "scientificName": "pepino enanous",
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&q=80",
    "category": "Huerto",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-82",
    "commonName": "Rábano Silvestre",
    "scientificName": "rábano silvestreus",
    "image": "https://images.unsplash.com/photo-1595856728038-f90989f6d6c3?w=600&q=80",
    "category": "Huerto",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-83",
    "commonName": "Perejil Enano",
    "scientificName": "perejil enanous",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-84",
    "commonName": "Ferocactus de la India",
    "scientificName": "ferocactus de la indiaus",
    "image": "https://images.unsplash.com/photo-1519336305162-4b6ed6b5fcde?w=600&q=80",
    "category": "Cactus",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-85",
    "commonName": "Orquídea Gigante",
    "scientificName": "orquídea giganteus",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-86",
    "commonName": "Remolacha Asiático",
    "scientificName": "remolacha asiáticous",
    "image": "https://images.unsplash.com/photo-1595856728038-f90989f6d6c3?w=600&q=80",
    "category": "Huerto",
    "light": "Sol directo",
    "difficulty": "Difícil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-87",
    "commonName": "Orégano Gigante",
    "scientificName": "orégano giganteus",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-88",
    "commonName": "Aglaonema Real",
    "scientificName": "aglaonema realus",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
    "category": "Interior",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "De crecimiento rápido si se le da el entorno adecuado. Es la favorita de muchos aficionados a la jardinería.",
    "wateringFrequency": "Cada 5 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 5 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-89",
    "commonName": "Remolacha Común",
    "scientificName": "remolacha comúnus",
    "image": "https://images.unsplash.com/photo-1595856728038-f90989f6d6c3?w=600&q=80",
    "category": "Huerto",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-90",
    "commonName": "Rábano Imperial",
    "scientificName": "rábano imperialus",
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&q=80",
    "category": "Huerto",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-91",
    "commonName": "Lirio de paz Variegado",
    "scientificName": "lirio de paz variegadous",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-92",
    "commonName": "Margarita Tropical",
    "scientificName": "margarita tropicalus",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    "category": "Exterior",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-93",
    "commonName": "Jazmín Imperial",
    "scientificName": "jazmín imperialus",
    "image": "https://images.unsplash.com/photo-1528826722302-d60843d71269?w=600&q=80",
    "category": "Exterior",
    "light": "Sol directo",
    "difficulty": "Medio",
    "description": "Conocida por su hermoso follaje, requiere cuidados moderados pero recompensa con un crecimiento espectacular.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 5 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-94",
    "commonName": "Ferocactus de la India",
    "scientificName": "ferocactus de la indiaus",
    "image": "https://images.unsplash.com/photo-1519336305162-4b6ed6b5fcde?w=600&q=80",
    "category": "Cactus",
    "light": "Semisombra",
    "difficulty": "Difícil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 15 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Baja (20-40%)",
    "idealSubstrate": "Arenoso con buen drenaje",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 15 días",
    "lastWatered": "Hace 2 días",
    "humidity": "20%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-95",
    "commonName": "Perejil Variegado",
    "scientificName": "perejil variegadous",
    "image": "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&q=80",
    "category": "Aromáticas",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 3 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-96",
    "commonName": "Violeta africana Común",
    "scientificName": "violeta africana comúnus",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Sombra",
    "difficulty": "Difícil",
    "description": "Es una planta excepcionalmente resistente, ideal para cualquier tipo de hogar. Aporta mucha vitalidad y frescura.",
    "wateringFrequency": "Cada 10 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 10 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-97",
    "commonName": "Orquídea Silvestre",
    "scientificName": "orquídea silvestreus",
    "image": "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=600&q=80",
    "category": "Ornamentales",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 3 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 4 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 3 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-98",
    "commonName": "Bonsai Gigante",
    "scientificName": "bonsai giganteus",
    "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    "category": "Ornamentales",
    "light": "Semisombra",
    "difficulty": "Fácil",
    "description": "Requiere atención constante a la humedad, pero sus colores brillantes la convierten en el centro de atención.",
    "wateringFrequency": "Cada 2 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": true,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 2 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-99",
    "commonName": "Pothos Variegado",
    "scientificName": "pothos variegadous",
    "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80",
    "category": "Interior",
    "light": "Sombra",
    "difficulty": "Fácil",
    "description": "Perfecta para dar un toque natural. Se adapta bien a diversos ambientes siempre que no sufra corrientes de frío.",
    "wateringFrequency": "Cada 20 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 1 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 20 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  },
  {
    "id": "exp-100",
    "commonName": "Remolacha Variegado",
    "scientificName": "remolacha variegadous",
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&q=80",
    "category": "Huerto",
    "light": "Sol directo",
    "difficulty": "Fácil",
    "description": "Una especie muy valorada tanto por su estética como por sus propiedades de purificación del aire.",
    "wateringFrequency": "Cada 7 días",
    "idealTemperature": "18-24°C",
    "idealHumidity": "Media/Alta (50-80%)",
    "idealSubstrate": "Universal enriquecido",
    "petToxic": false,
    "healthStatus": {
      "emoji": "✨",
      "text": "Saludable",
      "color": "#81C784"
    },
    "nextWatering": "En 2 días",
    "nextWateringDate": "2026-05-25",
    "waterFrequency": "Cada 7 días",
    "lastWatered": "Hace 2 días",
    "humidity": "60%",
    "temperature": "20°C",
    "careInstructions": [
      "No encharcar el sustrato.",
      "Revisar hojas caídas regularmente.",
      "Abonar durante primavera."
    ]
  }
];
