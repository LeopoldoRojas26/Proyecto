export type ClimaticZone = 'Norte' | 'Sur' | 'Tropical';
export type OptimalTaskType = 'Siembra' | 'Poda' | 'Trasplante';

export interface OptimalPeriod {
  type: OptimalTaskType;
  startMonth: number; // 0-indexed (0 = Jan, 11 = Dec)
  endMonth: number;
  description: string;
}

export function getOptimalPeriods(zone: ClimaticZone, category: string): OptimalPeriod[] {
  const periods: OptimalPeriod[] = [];

  if (zone === 'Norte') {
    if (category === 'Huerto') {
      periods.push({ type: 'Siembra', startMonth: 2, endMonth: 4, description: 'Mejor época para sembrar hortalizas.' });
      periods.push({ type: 'Trasplante', startMonth: 4, endMonth: 5, description: 'Ideal para mover plántulas al exterior.' });
    } else {
      periods.push({ type: 'Poda', startMonth: 0, endMonth: 2, description: 'Poda de invierno recomendada.' });
      periods.push({ type: 'Trasplante', startMonth: 2, endMonth: 4, description: 'Trasplante al inicio de la primavera.' });
    }
  } else if (zone === 'Sur') {
    if (category === 'Huerto') {
      periods.push({ type: 'Siembra', startMonth: 8, endMonth: 10, description: 'Época ideal para sembrar.' });
      periods.push({ type: 'Trasplante', startMonth: 10, endMonth: 11, description: 'Ideal para mover plántulas.' });
    } else {
      periods.push({ type: 'Poda', startMonth: 5, endMonth: 7, description: 'Poda de invierno austral.' });
      periods.push({ type: 'Trasplante', startMonth: 8, endMonth: 10, description: 'Trasplante en primavera austral.' });
    }
  } else {
    // Tropical
    if (category === 'Huerto') {
      periods.push({ type: 'Siembra', startMonth: 4, endMonth: 6, description: 'Siembra al inicio de temporada de lluvias.' });
    }
    periods.push({ type: 'Poda', startMonth: 10, endMonth: 0, description: 'Poda en época seca.' });
    periods.push({ type: 'Trasplante', startMonth: 3, endMonth: 5, description: 'Trasplante antes de lluvias intensas.' });
  }

  return periods;
}

export function determineZoneFromCoords(latitude: number): ClimaticZone {
  // Tropics: roughly between -23.5 and 23.5
  if (latitude >= -23.5 && latitude <= 23.5) {
    return 'Tropical';
  } else if (latitude > 23.5) {
    return 'Norte';
  } else {
    return 'Sur';
  }
}
