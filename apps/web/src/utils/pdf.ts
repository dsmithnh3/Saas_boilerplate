import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface PDFReportData {
  title: string;
  date: string;
  equipmentData: Array<{
    id: string;
    name: string;
    status: string;
    temperature: number;
    pressure: number;
  }>;
  maintenanceNotes: string;
  technician: string;
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export async function generateEquipmentReport(data: PDFReportData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  page.drawText(data.title, { x: 50, y: height - 50, size: 20, font, color: rgb(0, 0, 0) });
  page.drawText(`Date: ${data.date}`, {
    x: 50,
    y: height - 80,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  let yPosition = height - 120;
  data.equipmentData.forEach((equipment, index) => {
    const y = yPosition - index * 25;
    page.drawText(`${equipment.name} - ${equipment.status}`, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  });

  yPosition -= data.equipmentData.length * 25 + 30;
  page.drawText('Maintenance Notes:', {
    x: 50,
    y: yPosition,
    size: fontSize + 2,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText(data.maintenanceNotes, {
    x: 50,
    y: yPosition - 25,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Technician: ${data.technician}`, {
    x: 50,
    y: 100,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  return await pdfDoc.save();
}

export async function htmlToPDF(elementId: string, filename: string): Promise<void> {
  if (!isBrowser()) return;
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element with id ${elementId} not found`);

  const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}

export async function generatePidDiagram(
  equipmentList: Array<{
    id: string;
    name: string;
    type: 'compressor' | 'condenser' | 'evaporator' | 'valve' | 'pump';
    position: { x: number; y: number };
    connections: string[];
  }>,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText('Piping and Instrumentation Diagram (P&ID)', {
    x: 50,
    y: height - 50,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  equipmentList.forEach(equipment => {
    page.drawRectangle({
      x: equipment.position.x,
      y: equipment.position.y,
      width: 60,
      height: 40,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    page.drawText(equipment.name, {
      x: equipment.position.x + 5,
      y: equipment.position.y + 25,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });
  });

  return await pdfDoc.save();
}
