import { describe, it, expect } from 'vitest';
import {
  calculateCOP,
  convertTemperature,
  convertPressure,
  calculateHeatTransfer,
  calculatePressureDrop,
  calculateEfficiency,
  calculateEnergyCost,
  calculateMaintenanceSchedule,
  calculateRefrigerantCharge,
  calculateSystemPerformance,
} from '../utils/engineering';

describe('engineering utils', () => {
  it('calculates COP with valid temps', () => {
    const cop = calculateCOP(-10, 35);
    expect(cop).toBeGreaterThan(0);
  });

  it('returns Infinity COP when denominator <= 0', () => {
    const cop = calculateCOP(10, 10);
    expect(cop).toBe(Infinity);
  });

  it('converts temperature correctly', () => {
    expect(convertTemperature(0, 'C', 'F')).toBeCloseTo(32);
    expect(convertTemperature(32, 'F', 'C')).toBeCloseTo(0);
    expect(convertTemperature(273.15, 'K', 'C')).toBeCloseTo(0);
  });

  it('converts pressure correctly', () => {
    expect(convertPressure(1, 'bar', 'kpa')).toBeCloseTo(100);
    expect(convertPressure(14.5038, 'psi', 'bar')).toBeCloseTo(1, 3);
  });

  it('calculates heat transfer', () => {
    expect(calculateHeatTransfer(1.2, 4.18, 10)).toBeCloseTo(50.16);
  });

  it('calculates pressure drop safely', () => {
    expect(calculatePressureDrop(0.2, 10, 0.05, 0.0001)).toBeGreaterThanOrEqual(0);
  });

  it('calculates efficiency', () => {
    expect(calculateEfficiency(80, 100)).toBe(80);
    expect(calculateEfficiency(10, 0)).toBe(0);
  });

  it('calculates energy cost', () => {
    expect(calculateEnergyCost(10, 2, 0.1)).toBe(2);
  });

  it('maintenance schedule returns sensible values', () => {
    const result = calculateMaintenanceSchedule(
      'compressor',
      1000,
      new Date(Date.now() - 1000 * 60 * 60),
    );
    expect(result.nextMaintenance instanceof Date).toBe(true);
    expect(['preventive', 'predictive', 'emergency']).toContain(result.maintenanceType);
  });

  it('refrigerant charge uses factor', () => {
    expect(
      calculateRefrigerantCharge(10, 'ammonia', { evaporatorTemp: -10, condenserTemp: 35 }),
    ).toBeCloseTo(6);
  });

  it('system performance composes correctly', () => {
    const perf = calculateSystemPerformance({
      id: 's1',
      name: 'Sys',
      type: 'ammonia',
      capacity: 100,
      evaporatorTemp: -10,
      condenserTemp: 35,
      refrigerant: 'R717',
      efficiency: 85,
    });
    expect(perf.cop).toBeGreaterThan(0);
    expect(perf.powerConsumption).toBeGreaterThanOrEqual(0);
  });
});
