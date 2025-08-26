import { describe, it, expect } from 'vitest';
import { formatFileSize, generateUniqueFilename, validateFile } from '../utils/fileStorage';

describe('fileStorage utils', () => {
  it('formats file size', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
  });

  it('generates unique filename', () => {
    const name = generateUniqueFilename('manual.pdf', 'equip');
    expect(name).toMatch(/equip_manual_.*\.pdf$/);
  });

  it('validates allowed mime types including wildcard families', () => {
    const file = new File(['hello'], 'photo.png', { type: 'image/png' });
    const res = validateFile(file as File, ['image/*', 'application/pdf'], 5);
    expect(res.isValid).toBe(true);
  });

  it('rejects large files', () => {
    const bigBlob = new Blob([new Uint8Array(6 * 1024 * 1024)]);
    const bigFile = new File([bigBlob], 'big.pdf', { type: 'application/pdf' });
    const res = validateFile(bigFile as File, ['application/pdf'], 5);
    expect(res.isValid).toBe(false);
    expect(res.error).toMatch(/exceeds/);
  });
});
