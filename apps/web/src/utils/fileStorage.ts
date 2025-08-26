import * as XLSX from 'xlsx';

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  uploadedBy: string;
  category: 'equipment' | 'maintenance' | 'reports' | 'diagrams' | 'manuals';
  tags: string[];
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function downloadBlob(blob: Blob, filename: string): void {
  if (!isBrowser()) return;
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToExcel(data: any[], filename: string, sheetName: string = 'Sheet1'): void {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  downloadBlob(blob, `${filename}.xlsx`);
}

export function importFromExcel(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function exportEquipmentReport(
  equipmentData: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    lastMaintenance: string;
    nextMaintenance: string;
    temperature: number;
    pressure: number;
    efficiency: number;
  }>,
): void {
  const reportData = equipmentData.map(equipment => ({
    'Equipment ID': equipment.id,
    'Equipment Name': equipment.name,
    Type: equipment.type,
    Status: equipment.status,
    'Last Maintenance': equipment.lastMaintenance,
    'Next Maintenance': equipment.nextMaintenance,
    'Temperature (°C)': equipment.temperature,
    'Pressure (bar)': equipment.pressure,
    'Efficiency (%)': equipment.efficiency,
  }));
  exportToExcel(reportData, 'equipment-maintenance-report', 'Equipment Report');
}

export function exportCustomerData(
  customerData: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    equipmentCount: number;
    totalValue: number;
    lastContact: string;
  }>,
): void {
  const reportData = customerData.map(customer => ({
    'Customer ID': customer.id,
    Name: customer.name,
    Email: customer.email,
    Phone: customer.phone,
    Company: customer.company,
    Address: customer.address,
    'Equipment Count': customer.equipmentCount,
    'Total Contract Value': customer.totalValue,
    'Last Contact': customer.lastContact,
  }));
  exportToExcel(reportData, 'customer-data-export', 'Customer Data');
}

export function exportProjectTimeline(
  projectData: Array<{
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    progress: number;
    assignedTo: string;
    priority: string;
    budget: number;
  }>,
): void {
  const reportData = projectData.map(project => ({
    'Project ID': project.id,
    'Project Name': project.name,
    Status: project.status,
    'Start Date': project.startDate,
    'End Date': project.endDate,
    'Progress (%)': project.progress,
    'Assigned To': project.assignedTo,
    Priority: project.priority,
    'Budget ($)': project.budget,
  }));
  exportToExcel(reportData, 'project-timeline-export', 'Project Timeline');
}

export function validateFile(
  file: File,
  allowedTypes: string[],
  maxSizeMB: number,
): { isValid: boolean; error?: string } {
  const typeAllowed = allowedTypes.some(pattern => {
    if (pattern.endsWith('/*')) {
      const family = pattern.replace('/*', '');
      return file.type.startsWith(family + '/');
    }
    return file.type === pattern;
  });
  if (!typeAllowed) {
    return {
      isValid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${maxSizeMB}MB`,
    };
  }
  return { isValid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function generateUniqueFilename(originalName: string, prefix?: string): string {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.includes('.') ? originalName.split('.').pop() : '';
  const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, '');
  return `${prefix ? prefix + '_' : ''}${nameWithoutExtension}_${timestamp}_${randomString}${extension ? '.' + extension : ''}`;
}
