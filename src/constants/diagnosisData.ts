export interface Symptom {
  id: string;
  label: string;
}

export interface DiagnosisEntry {
  id: string;
  name: string;
  type: 'Enfermedad' | 'Plaga';
  description: string;
  severity: 'Bajo' | 'Medio' | 'Alto';
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  prevention: string[];
}

export const SYMPTOMS: Symptom[] = [
  { id: 'manchas_marrones', label: 'Manchas marrones u oscuras' },
  { id: 'hojas_amarillas', label: 'Hojas amarillentas (clorosis)' },
  { id: 'polvo_blanco', label: 'Polvo o capa blanca en hojas' },
  { id: 'moho_gris', label: 'Moho gris o pelusa' },
  { id: 'hojas_marchitas', label: 'Hojas marchitas o caídas' },
  { id: 'agujeros', label: 'Agujeros o bordes comidos' },
  { id: 'bichos_visibles', label: 'Bichos pequeños visibles' },
  { id: 'telaranas', label: 'Telarañas finas entre hojas' },
  { id: 'pegajoso', label: 'Sustancia pegajosa (melaza)' },
  { id: 'deformacion', label: 'Hojas deformadas o enrolladas' },
  { id: 'pudricion', label: 'Base o tallo blando/podrido' },
  { id: 'caida_hojas', label: 'Caída de hojas constante' },
  { id: 'manchas_negras', label: 'Puntos negros o anillos' },
  { id: 'costras', label: 'Costras o bultos inmóviles' },
  { id: 'mosquitas', label: 'Pequeñas moscas al regar' }
];

export const DISEASES: DiagnosisEntry[] = [
  {
    id: 'd1',
    name: 'Oídio (Mildiu Polvoriento)',
    type: 'Enfermedad',
    description: 'Enfermedad fúngica que forma una capa de polvo blanco sobre las hojas, reduciendo la fotosíntesis.',
    severity: 'Medio',
    symptoms: ['polvo_blanco', 'hojas_amarillas', 'deformacion'],
    organicTreatment: ['Pulverizar mezcla de leche y agua (1:10) al sol', 'Bicarbonato de sodio (1 cdta por litro) con jabón potásico', 'Podar hojas muy afectadas'],
    chemicalTreatment: ['Fungicida a base de azufre', 'Fungicida sistémico específico para oídio'],
    prevention: ['Mejorar ventilación', 'Evitar mojar las hojas al regar', 'No juntar en exceso las plantas']
  },
  {
    id: 'd2',
    name: 'Podredumbre de Raíz / Cuello',
    type: 'Enfermedad',
    description: 'Causada por exceso de riego y hongos en el sustrato (Phytophthora, Pythium). Las raíces se asfixian.',
    severity: 'Alto',
    symptoms: ['pudricion', 'hojas_marchitas', 'hojas_amarillas'],
    organicTreatment: ['Dejar secar el sustrato completamente', 'Podar raíces marrones y blandas', 'Trasplantar a sustrato nuevo y poroso con canela en polvo'],
    chemicalTreatment: ['Fungicida específico para suelo (Aliette)', 'Aplicar fosfito potásico'],
    prevention: ['Regar solo cuando el sustrato esté seco', 'Asegurar maceta con buen drenaje', 'Usar perlita/fibra de coco en el sustrato']
  },
  {
    id: 'd3',
    name: 'Mancha Foliar (Alternaria)',
    type: 'Enfermedad',
    description: 'Hongo que produce manchas circulares oscuras con anillos concéntricos en las hojas más viejas.',
    severity: 'Medio',
    symptoms: ['manchas_marrones', 'manchas_negras', 'caida_hojas'],
    organicTreatment: ['Retirar hojas infectadas', 'Extracto de cola de caballo (fungicida natural)'],
    chemicalTreatment: ['Fungicida a base de cobre', 'Fungicida polivalente de amplio espectro'],
    prevention: ['No mojar el follaje', 'Desinfectar herramientas de poda', 'Aumentar espacio entre plantas']
  },
  {
    id: 'd4',
    name: 'Roya',
    type: 'Enfermedad',
    description: 'Hongo que se manifiesta como pústulas de color naranja, óxido o marrón en el envés de las hojas.',
    severity: 'Medio',
    symptoms: ['manchas_marrones', 'deformacion', 'caida_hojas'],
    organicTreatment: ['Eliminar hojas afectadas', 'Aplicar purín de ortiga o decocción de ajo'],
    chemicalTreatment: ['Fungicidas con cobre o azufre', 'Tratamiento sistémico antiroya'],
    prevention: ['Evitar humedad excesiva en el follaje', 'Ventilación adecuada']
  },
  {
    id: 'd5',
    name: 'Botrytis (Moho Gris)',
    type: 'Enfermedad',
    description: 'Hongo oportunista que ataca tejidos muertos o debilitados, formando un moho grisáceo.',
    severity: 'Alto',
    symptoms: ['moho_gris', 'pudricion', 'manchas_marrones'],
    organicTreatment: ['Cortar partes afectadas limpiamente', 'Bicarbonato de sodio', 'Mejorar ventilación inmediatamente'],
    chemicalTreatment: ['Fungicidas antibotritis específicos'],
    prevention: ['Recoger flores y hojas muertas', 'Evitar heridas en la planta', 'Controlar humedad ambiental']
  },
  {
    id: 'd6',
    name: 'Antracnosis',
    type: 'Enfermedad',
    description: 'Enfermedad fúngica que causa lesiones oscuras y hundidas en tallos, hojas y frutos.',
    severity: 'Medio',
    symptoms: ['manchas_marrones', 'manchas_negras', 'caida_hojas'],
    organicTreatment: ['Podar tejido enfermo', 'Purín de cola de caballo'],
    chemicalTreatment: ['Fungicida de cobre'],
    prevention: ['Rotación si es huerto', 'Evitar salpicaduras de tierra a las hojas']
  },
  {
    id: 'd7',
    name: 'Clorosis Férrica',
    type: 'Enfermedad',
    description: 'Deficiencia nutricional (falta de hierro) a menudo causada por sustrato alcalino.',
    severity: 'Bajo',
    symptoms: ['hojas_amarillas'], // Nervaduras verdes, resto amarillo
    organicTreatment: ['Añadir posos de café o compost ácido al suelo', 'Regar con agua de lluvia'],
    chemicalTreatment: ['Aplicar quelatos de hierro vía radicular o foliar', 'Acidificantes de suelo'],
    prevention: ['Controlar el pH del agua de riego', 'Abono completo regular']
  },
  {
    id: 'd8',
    name: 'Fusariosis (Marchitez vascular)',
    type: 'Enfermedad',
    description: 'Hongo que bloquea los conductos de savia, causando marchitez aunque la tierra esté húmeda.',
    severity: 'Alto',
    symptoms: ['hojas_marchitas', 'hojas_amarillas', 'pudricion'],
    organicTreatment: ['Difícil cura. Destruir planta afectada para evitar contagio', 'Solarización del suelo'],
    chemicalTreatment: ['Fungicidas muy específicos en primeras fases, raramente efectivos'],
    prevention: ['Usar semillas certificadas', 'Sustratos estériles para semilleros']
  },
  {
    id: 'd9',
    name: 'Mancha Negra del Rosal',
    type: 'Enfermedad',
    description: 'Hongo específico que ataca rosales, formando manchas negras de bordes irregulares.',
    severity: 'Medio',
    symptoms: ['manchas_negras', 'caida_hojas', 'hojas_amarillas'],
    organicTreatment: ['Poda drástica', 'Aceite de Neem con bicarbonato'],
    chemicalTreatment: ['Fungicida específico para rosales (Difenoconazol)'],
    prevention: ['Mantener el follaje seco', 'Recoger hojas caídas en otoño']
  },
  {
    id: 'd10',
    name: 'Verticilosis',
    type: 'Enfermedad',
    description: 'Hongo de suelo similar al Fusarium. Causa marchitamiento y amarillamiento desde abajo hacia arriba.',
    severity: 'Alto',
    symptoms: ['hojas_marchitas', 'hojas_amarillas', 'caida_hojas'],
    organicTreatment: ['Eliminar planta', 'Micorrizas preventivas en el suelo'],
    chemicalTreatment: ['Suele ser resistente a tratamientos químicos'],
    prevention: ['No plantar especies susceptibles en suelo infectado']
  },
  {
    id: 'd11',
    name: 'Bacteriosis (Mancha bacteriana)',
    type: 'Enfermedad',
    description: 'Manchas angulares o rodeadas de un halo amarillo causadas por bacterias (Xanthomonas o Pseudomonas).',
    severity: 'Medio',
    symptoms: ['manchas_marrones', 'manchas_negras', 'hojas_amarillas'],
    organicTreatment: ['Evitar contacto entre plantas', 'Cortar áreas afectadas'],
    chemicalTreatment: ['Bactericidas a base de cobre (Oxicloruro)'],
    prevention: ['Desinfectar tijeras con alcohol', 'Riego por goteo']
  },
  {
    id: 'd12',
    name: 'Fumagina (Negrilla)',
    type: 'Enfermedad',
    description: 'Hongo negro similar al hollín que crece sobre la melaza (sustancia pegajosa) que dejan los pulgones o cochinillas.',
    severity: 'Bajo',
    symptoms: ['manchas_negras', 'pegajoso'],
    organicTreatment: ['Lavar hojas con agua y jabón potásico', 'Eliminar la plaga subyacente (pulgón/cochinilla)'],
    chemicalTreatment: ['Tratar la plaga que segrega melaza con insecticida sistémico'],
    prevention: ['Control riguroso de insectos chupadores de savia']
  },
  {
    id: 'd13',
    name: 'Virus del Mosaico',
    type: 'Enfermedad',
    description: 'Virus transmitido por pulgones o herramientas que causa patrones moteados (mosaico) amarillo y verde.',
    severity: 'Alto',
    symptoms: ['hojas_amarillas', 'deformacion'],
    organicTreatment: ['Incurable. Desechar la planta en la basura (no compostar)'],
    chemicalTreatment: ['Ninguno existe'],
    prevention: ['Controlar pulgones y trips', 'Desinfección de herramientas']
  },
  {
    id: 'd14',
    name: 'Agalla de Corona (Agrobacterium)',
    type: 'Enfermedad',
    description: 'Bacterias que causan tumores o bultos en la base del tallo o raíces.',
    severity: 'Alto',
    symptoms: ['costras', 'deformacion'],
    organicTreatment: ['Destruir plantas infectadas'],
    chemicalTreatment: ['Ninguno curativo, solo productos biológicos preventivos en viveros'],
    prevention: ['Inspeccionar plantas nuevas antes de comprar', 'Evitar heridas en raíces']
  },
  {
    id: 'd15',
    name: 'Gomosis',
    type: 'Enfermedad',
    description: 'Exudación de goma o resina en el tronco o ramas, típica de árboles frutales.',
    severity: 'Medio',
    symptoms: ['pegajoso', 'manchas_marrones'],
    organicTreatment: ['Limpiar la herida hasta tejido sano', 'Pasta cicatrizante natural'],
    chemicalTreatment: ['Aplicar fungicida de cobre en la herida'],
    prevention: ['Evitar encharcamientos', 'Podar en épocas secas']
  },
  {
    id: 'd16',
    name: 'Tizón Tardío (Phytophthora infestans)',
    type: 'Enfermedad',
    description: 'Hongo fulminante muy común en tomates y patatas, manchas pardas que avanzan rápido.',
    severity: 'Alto',
    symptoms: ['manchas_marrones', 'pudricion', 'hojas_marchitas'],
    organicTreatment: ['Destruir plantas. Imposible de frenar con medios orgánicos si avanza.'],
    chemicalTreatment: ['Fungicidas penetrantes o sistémicos (Mancozeb + Cimoxanilo)'],
    prevention: ['Proteger de lluvias constantes', 'Cultivos resistentes']
  },
  {
    id: 'd17',
    name: 'Quemadura Solar',
    type: 'Enfermedad',
    description: 'Daño abiótico por exposición repentina a sol intenso.',
    severity: 'Bajo',
    symptoms: ['manchas_marrones', 'hojas_marchitas'],
    organicTreatment: ['Mover la planta a sombra parcial', 'Las hojas quemadas no se recuperan, se pueden cortar por estética'],
    chemicalTreatment: ['No aplica'],
    prevention: ['Aclimatación gradual al sol', 'Mallas de sombreo']
  },
  {
    id: 'd18',
    name: 'Edema Foliar',
    type: 'Enfermedad',
    description: 'Ampollas o costras por debajo de la hoja causado por raíces absorbiendo más agua de la que la planta puede transpirar.',
    severity: 'Bajo',
    symptoms: ['costras', 'deformacion'],
    organicTreatment: ['Disminuir el riego', 'Aumentar ventilación y luz'],
    chemicalTreatment: ['No aplica'],
    prevention: ['Riegos moderados en épocas de alta humedad o frío']
  },
  {
    id: 'd19',
    name: 'Asfixia Radicular',
    type: 'Enfermedad',
    description: 'Problema físico por sustrato compactado o encharcado constante, raíces mueren sin oxígeno.',
    severity: 'Alto',
    symptoms: ['hojas_amarillas', 'hojas_marchitas', 'caida_hojas'],
    organicTreatment: ['Drenar maceta', 'Airear tierra haciendo agujeros finos', 'Cambiar sustrato'],
    chemicalTreatment: ['No aplica'],
    prevention: ['Añadir perlita, piedra pómez o arena al sustrato para soltura']
  },
  {
    id: 'd20',
    name: 'Estrés Térmico (Frío extremo)',
    type: 'Enfermedad',
    description: 'Las heladas o corrientes frías revientan las células de la planta, dejándola lacia y negra.',
    severity: 'Medio',
    symptoms: ['manchas_negras', 'hojas_marchitas', 'pudricion'],
    organicTreatment: ['Esperar a primavera para podar lo dañado', 'Resguardar del frío'],
    chemicalTreatment: ['Bioestimulantes con aminoácidos'],
    prevention: ['Mantas antiheladas', 'Meter plantas tropicales al interior en invierno']
  }
];

export const PESTS: DiagnosisEntry[] = [
  {
    id: 'p1',
    name: 'Pulgón (Áfidos)',
    type: 'Plaga',
    description: 'Pequeños insectos verdes, negros o amarillos que se agrupan en brotes nuevos y chupan la savia.',
    severity: 'Medio',
    symptoms: ['bichos_visibles', 'deformacion', 'pegajoso'],
    organicTreatment: ['Pulverizar agua con jabón potásico y aceite de Neem', 'Introducir mariquitas'],
    chemicalTreatment: ['Insecticida sistémico o a base de piretrinas'],
    prevention: ['Evitar exceso de abono nitrogenado', 'Plantas repelentes como lavanda cerca']
  },
  {
    id: 'p2',
    name: 'Cochinilla Algodonosa',
    type: 'Plaga',
    description: 'Insectos blancos de aspecto algodonoso o harinoso. Chupan savia y debilitan la planta gravemente.',
    severity: 'Alto',
    symptoms: ['moho_gris', 'bichos_visibles', 'pegajoso', 'hojas_amarillas'],
    organicTreatment: ['Limpiar con un bastoncillo empapado en alcohol', 'Jabón potásico + Neem en pulverización'],
    chemicalTreatment: ['Insecticida anti-cochinillas o aceite mineral'],
    prevention: ['Mantener buena humedad ambiental (odian la humedad)', 'Revisar debajo de las hojas y uniones de tallos']
  },
  {
    id: 'p3',
    name: 'Araña Roja (Ácaros)',
    type: 'Plaga',
    description: 'Diminutos ácaros rojos o amarillos que tejen telarañas finas. Causan punteado amarillo y secan la hoja.',
    severity: 'Alto',
    symptoms: ['telaranas', 'hojas_amarillas', 'manchas_marrones'],
    organicTreatment: ['Aumentar drásticamente la humedad ambiental foliar', 'Acaricida biológico o purín de ortiga'],
    chemicalTreatment: ['Acaricida específico (los insecticidas normales no sirven)'],
    prevention: ['Rociar hojas con agua regularmente en verano']
  },
  {
    id: 'p4',
    name: 'Mosca Blanca',
    type: 'Plaga',
    description: 'Mosquitas blancas y diminutas que vuelan al mover la planta. Dejan melaza y debilitan la planta.',
    severity: 'Medio',
    symptoms: ['bichos_visibles', 'hojas_amarillas', 'pegajoso'],
    organicTreatment: ['Trampas cromáticas amarillas', 'Jabón potásico continuado cada 5 días'],
    chemicalTreatment: ['Insecticidas sistémicos (Imidacloprid)'],
    prevention: ['Trampas amarillas preventivas', 'Buena circulación de aire']
  },
  {
    id: 'p5',
    name: 'Trips',
    type: 'Plaga',
    description: 'Insectos alargados y oscuros que raspan las hojas, dejando cicatrices plateadas y puntos negros (heces).',
    severity: 'Medio',
    symptoms: ['bichos_visibles', 'manchas_marrones', 'deformacion'],
    organicTreatment: ['Trampas cromáticas azules', 'Jabón potásico y Neem'],
    chemicalTreatment: ['Insecticidas específicos para trips'],
    prevention: ['Eliminar malas hierbas cercanas', 'Trampas azules preventivas']
  },
  {
    id: 'p6',
    name: 'Mosca del Sustrato (Fungus gnats)',
    type: 'Plaga',
    description: 'Moscas negras pequeñas que vuelan desde la tierra. Sus larvas comen raíces finas.',
    severity: 'Bajo',
    symptoms: ['mosquitas', 'hojas_marchitas'],
    organicTreatment: ['Dejar secar la capa superior de tierra', 'Trampas amarillas', 'Esparcir canela o tierra de diatomeas en la superficie'],
    chemicalTreatment: ['Riego con insecticida de suelo o Bacillus thuringiensis (Bti)'],
    prevention: ['No sobreregar', 'Riego por inmersión']
  },
  {
    id: 'p7',
    name: 'Caracoles y Babosas',
    type: 'Plaga',
    description: 'Moluscos nocturnos que devoran grandes áreas de las hojas y dejan un rastro de baba brillante.',
    severity: 'Alto',
    symptoms: ['agujeros', 'bichos_visibles'],
    organicTreatment: ['Trampas de cerveza', 'Recolección manual nocturna', 'Cáscara de huevo triturada en la base'],
    chemicalTreatment: ['Cebos molusquicidas (Metaldehído) - Tóxico para mascotas'],
    prevention: ['Ceniza o tierra de diatomeas como barrera']
  },
  {
    id: 'p8',
    name: 'Orugas y Gusanos',
    type: 'Plaga',
    description: 'Larvas de mariposas/polillas que mastican y comen hojas muy rápido.',
    severity: 'Medio',
    symptoms: ['agujeros', 'bichos_visibles'],
    organicTreatment: ['Recolección manual', 'Bacillus thuringiensis (Bt) - Muy efectivo ecológico'],
    chemicalTreatment: ['Insecticidas polivalentes (Cipermetrina)'],
    prevention: ['Vigilancia de huevos en el envés de las hojas', 'Redes anti-insectos']
  },
  {
    id: 'p9',
    name: 'Minadores de Hojas',
    type: 'Plaga',
    description: 'Larvas que viven y comen dentro de la hoja, dejando caminos o galerías blanquecinas/transparentes.',
    severity: 'Medio',
    symptoms: ['manchas_marrones', 'agujeros', 'deformacion'], // Se ve como manchas raras
    organicTreatment: ['Arrancar y destruir las hojas con caminos', 'Aceite de Neem prensado en frío'],
    chemicalTreatment: ['Insecticidas penetrantes o sistémicos (Abamectina)'],
    prevention: ['Retirar las primeras hojas afectadas inmediatamente']
  },
  {
    id: 'p10',
    name: 'Cochinilla Escudo (Lapa)',
    type: 'Plaga',
    description: 'Insectos ocultos bajo un caparazón duro (como una costra) adheridos a los tallos. Difíciles de tratar.',
    severity: 'Alto',
    symptoms: ['costras', 'pegajoso', 'hojas_amarillas'],
    organicTreatment: ['Raspar con un cepillo suave o uña', 'Alcohol al 70% directo al insecto'],
    chemicalTreatment: ['Insecticida sistémico o aceite parafínico'],
    prevention: ['Revisión minuciosa de tallos']
  },
  {
    id: 'p11',
    name: 'Nematodos del Nudo de la Raíz',
    type: 'Plaga',
    description: 'Gusanos microscópicos en el suelo que forman nódulos o tumores en las raíces, impidiendo absorción.',
    severity: 'Alto',
    symptoms: ['hojas_amarillas', 'hojas_marchitas'], // Y raíces deformes
    organicTreatment: ['Solarización del sustrato', 'Plantar tajetes (clavel moro) que repelen nematodos'],
    chemicalTreatment: ['Nematicidas profesionales (muy tóxicos, raro en hogar)'],
    prevention: ['Rotación de cultivos', 'Desinfectar herramientas de suelo']
  },
  {
    id: 'p12',
    name: 'Hormigas',
    type: 'Plaga',
    description: 'Las hormigas en sí no dañan la planta (usualmente), pero "pastorean" y protegen pulgones para extraerles melaza.',
    severity: 'Bajo',
    symptoms: ['bichos_visibles', 'pegajoso'],
    organicTreatment: ['Tierra de diatomeas en la base', 'Cinta pegajosa en el tronco'],
    chemicalTreatment: ['Cebo granulado antihormigas'],
    prevention: ['Eliminar pulgones/cochinillas']
  },
  {
    id: 'p13',
    name: 'Avispa de las Agallas',
    type: 'Plaga',
    description: 'Avispas minúsculas que inyectan huevos en hojas o ramas creando tumores (agallas).',
    severity: 'Bajo',
    symptoms: ['costras', 'deformacion'],
    organicTreatment: ['Podar las agallas y destruirlas', 'No afecta gravemente a largo plazo'],
    chemicalTreatment: ['Innecesario normalmente'],
    prevention: ['Fomentar depredadores naturales']
  },
  {
    id: 'p14',
    name: 'Ácaros del Ciclamen / Microácaros',
    type: 'Plaga',
    description: 'Invisibles al ojo desnudo, atacan brotes nuevos que nacen atrofiados, duros y rizados.',
    severity: 'Alto',
    symptoms: ['deformacion', 'hojas_amarillas'],
    organicTreatment: ['Cortar partes atrofiadas', 'Ducha caliente de agua (43°C por 15 min - riesgoso)'],
    chemicalTreatment: ['Acaricida translaminar'],
    prevention: ['Evitar contagio separando plantas']
  },
  {
    id: 'p15',
    name: 'Tijeretas',
    type: 'Plaga',
    description: 'Insectos con pinzas que muerden pétalos y hojas tiernas durante la noche.',
    severity: 'Bajo',
    symptoms: ['agujeros', 'bichos_visibles'],
    organicTreatment: ['Trampas de maceta invertida con paja húmeda', 'Tierra de diatomeas'],
    chemicalTreatment: ['Insecticida en polvo en el suelo'],
    prevention: ['Reducir escombros y humedad excesiva alrededor']
  }
];

export const diagnoseProblem = (symptoms: string[]): Array<{ entry: DiagnosisEntry, matchPercentage: number }> => {
  if (symptoms.length === 0) return [];
  
  const allProblems = [...DISEASES, ...PESTS];
  
  const results = allProblems.map(entry => {
    // Calculamos qué porcentaje de los síntomas seleccionados tiene esta enfermedad
    const matches = entry.symptoms.filter(s => symptoms.includes(s));
    // Damos peso también a si la enfermedad requiere síntomas que no están presentes,
    // pero de forma simplificada: porcentaje de síntomas coincidentes
    const matchPercentage = (matches.length / symptoms.length) * 100;
    
    // Penalización ligera si la enfermedad tiene muchos otros síntomas no marcados
    // para priorizar los diagnósticos más precisos
    const precisionMatch = (matches.length / entry.symptoms.length);
    
    // Ponderación: 70% que coincida con lo que el usuario vio, 30% que lo que el usuario vio sea la totalidad del problema
    const finalScore = (matchPercentage * 0.7) + (precisionMatch * 100 * 0.3);
    
    return { entry, matchPercentage: Math.round(finalScore) };
  });

  // Filtramos los que tengan un score mayor a 0 y los ordenamos de mayor a menor
  return results
    .filter(r => r.matchPercentage > 10)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
};
