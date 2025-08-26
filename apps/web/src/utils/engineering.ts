/**
 * Engineering Utilities for Industrial Refrigeration Management
 * Pure, deterministic helpers safe for SSR and unit testing.
 */

export interface RefrigerationSystem {
  id: string;
  name: string;
  type: 'ammonia' | 'co2' | 'freon' | 'propane';
  capacity: number; // kW
  evaporatorTemp: number; // °C
  condenserTemp: number; // °C
  refrigerant: string;
  efficiency: number; // %
}

export function calculateCOP(evaporatorTemp: number, condenserTemp: number): number {
  const evaporatorTempK = evaporatorTemp + 273.15;
  const condenserTempK = condenserTemp + 273.15;
  const denominator = condenserTempK - evaporatorTempK;
  if (denominator <= 0) return Infinity;
  return evaporatorTempK / denominator;
}

export function calculatePowerConsumption(capacity: number, cop: number): number {
  if (cop === 0 || !isFinite(cop)) return 0;
  return capacity / cop;
}

export function convertTemperature(
  value: number,
  from: 'C' | 'F' | 'K',
  to: 'C' | 'F' | 'K',
): number {
  let celsius: number;
  switch (from) {
    case 'C':
      celsius = value;
      break;
    case 'F':
      celsius = ((value - 32) * 5) / 9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
  }
  switch (to) {
    case 'C':
      return celsius;
    case 'F':
      return (celsius * 9) / 5 + 32;
    case 'K':
      return celsius + 273.15;
    default:
      return celsius;
  }
}

export function convertPressure(
  value: number,
  from: 'bar' | 'psi' | 'kpa' | 'mpa',
  to: 'bar' | 'psi' | 'kpa' | 'mpa',
): number {
  let bar: number;
  switch (from) {
    case 'bar':
      bar = value;
      break;
    case 'psi':
      bar = value * 0.0689476;
      break;
    case 'kpa':
      bar = value * 0.01;
      break;
    case 'mpa':
      bar = value * 10;
      break;
  }
  switch (to) {
    case 'bar':
      return bar;
    case 'psi':
      return bar * 14.5038;
    case 'kpa':
      return bar * 100;
    case 'mpa':
      return bar * 0.1;
    default:
      return bar;
  }
}

export function calculateHeatTransfer(
  massFlow: number,
  specificHeat: number,
  deltaTemp: number,
): number {
  return massFlow * specificHeat * deltaTemp;
}

export function calculatePressureDrop(
  flowRate: number,
  pipeLength: number,
  pipeDiameter: number,
  roughness: number,
): number {
  if (pipeDiameter <= 0) return 0;
  const velocity = flowRate / (Math.PI * Math.pow(pipeDiameter / 2, 2));
  const frictionFactor = 0.02; // simplified
  return (frictionFactor * pipeLength * velocity * velocity) / (2 * 9.81 * pipeDiameter);
}

export function calculateEfficiency(actualOutput: number, theoreticalOutput: number): number {
  if (theoreticalOutput === 0) return 0;
  return (actualOutput / theoreticalOutput) * 100;
}

export function calculateEnergyCost(power: number, hours: number, ratePerKWh: number): number {
  return power * hours * ratePerKWh;
}

export function calculateMaintenanceSchedule(
  equipmentType: string,
  operatingHours: number,
  lastMaintenance: Date,
): {
  nextMaintenance: Date;
  maintenanceType: 'preventive' | 'predictive' | 'emergency';
  priority: 'low' | 'medium' | 'high';
} {
  const maintenanceIntervals: Record<string, number> = {
    compressor: 2000,
    condenser: 4000,
    evaporator: 3000,
    valve: 1000,
    pump: 1500,
  };
  const interval = maintenanceIntervals[equipmentType] || 2000;
  const hoursSinceLastMaintenance = (Date.now() - lastMaintenance.getTime()) / (1000 * 60 * 60);
  const hoursUntilNext = interval - (operatingHours - hoursSinceLastMaintenance);
  const nextMaintenance = new Date(Date.now() + hoursUntilNext * 60 * 60 * 1000);
  let maintenanceType: 'preventive' | 'predictive' | 'emergency' = 'preventive';
  let priority: 'low' | 'medium' | 'high' = 'medium';
  if (hoursUntilNext < 0) {
    maintenanceType = 'emergency';
    priority = 'high';
  } else if (hoursUntilNext < interval * 0.2) {
    priority = 'high';
  } else if (hoursUntilNext < interval * 0.5) {
    priority = 'medium';
  } else {
    priority = 'low';
  }
  return { nextMaintenance, maintenanceType, priority };
}

export function calculateRefrigerantCharge(
  systemVolume: number,
  refrigerantType: string,
  operatingConditions: { evaporatorTemp: number; condenserTemp: number },
): number {
  const densityFactors: Record<string, number> = {
    ammonia: 0.6,
    co2: 1.2,
    freon: 1.0,
    propane: 0.5,
  };
  const factor = densityFactors[refrigerantType] || 1.0;
  return systemVolume * factor;
}

export function calculateSystemPerformance(system: RefrigerationSystem): {
  cop: number;
  powerConsumption: number;
  energyEfficiency: number;
  costPerHour: number;
} {
  const cop = calculateCOP(system.evaporatorTemp, system.condenserTemp);
  const powerConsumption = calculatePowerConsumption(system.capacity, cop);
  const energyEfficiency = (system.efficiency / 100) * cop;
  const costPerHour = calculateEnergyCost(powerConsumption, 1, 0.12);
  return { cop, powerConsumption, energyEfficiency, costPerHour };
}
