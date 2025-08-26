import { describe, it, expect } from 'vitest';
import { generateEquipmentReport } from '../utils/pdf';

describe('pdf utils', () => {
  it('generates equipment report bytes', async () => {
    const bytes = await generateEquipmentReport({
      title: 'Report',
      date: '2024-01-01',
      equipmentData: [
        { id: '1', name: 'Compressor A', status: 'OK', temperature: -10, pressure: 2.1 },
      ],
      maintenanceNotes: 'All good',
      technician: 'Tech',
    });
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBeGreaterThan(100);
  });
});
