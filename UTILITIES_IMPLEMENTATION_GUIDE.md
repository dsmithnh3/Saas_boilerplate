# Industrial Refrigeration SaaS - Utilities Implementation Guide

## Overview

This guide outlines the comprehensive set of utilities and tools implemented for the Industrial Refrigeration Management SaaS platform. These utilities are designed to support engineering, project management, CRM, file storage, and technical documentation needs.

## 📁 File Structure

```
apps/web/src/
├── utils/
│   ├── pdf.ts              # PDF generation and manipulation
│   ├── fileStorage.ts      # File handling and Excel operations
│   └── engineering.ts      # Engineering calculations and conversions
├── components/utils/
│   └── FileUpload.tsx      # Reusable file upload component
├── hooks/                  # Custom React hooks
├── services/              # API and external service integrations
└── types/                 # TypeScript type definitions
```

## 🛠️ Utility Categories

### 1. PDF Generation & Manipulation (`pdf.ts`)

#### **Features:**

- Equipment inspection reports
- P&ID diagram generation
- HTML to PDF conversion
- Custom report templates

#### **Implementation Examples:**

```typescript
// Generate equipment maintenance report
const reportData = {
  title: 'Equipment Inspection Report - Plant A',
  date: '2024-01-15',
  equipmentData: [
    {
      id: 'COMP-001',
      name: 'Main Compressor',
      status: 'Operational',
      temperature: -15.5,
      pressure: 2.3,
    },
  ],
  maintenanceNotes: 'All systems operating within normal parameters',
  technician: 'John Smith',
};

const pdfBytes = await generateEquipmentReport(reportData);
```

#### **Use Cases:**

- **Maintenance Reports**: Generate detailed equipment inspection reports
- **P&ID Documentation**: Create piping and instrumentation diagrams
- **Compliance Reports**: Export regulatory compliance documentation
- **Customer Reports**: Generate customer-specific equipment reports

### 2. File Storage & Management (`fileStorage.ts`)

#### **Features:**

- Excel import/export functionality
- File validation and processing
- Equipment data exports
- Customer data management
- Project timeline exports

#### **Implementation Examples:**

```typescript
// Export equipment maintenance data
const equipmentData = [
  {
    id: 'COMP-001',
    name: 'Main Compressor',
    type: 'Screw Compressor',
    status: 'Operational',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-04-01',
    temperature: -15.5,
    pressure: 2.3,
    efficiency: 85.2,
  },
];

exportEquipmentReport(equipmentData);
```

#### **Use Cases:**

- **Data Migration**: Import existing equipment data from Excel
- **Reporting**: Export maintenance schedules and performance data
- **CRM Integration**: Export customer data for external CRM systems
- **Backup**: Create data backups in Excel format

### 3. Engineering Calculations (`engineering.ts`)

#### **Features:**

- Refrigeration system efficiency calculations (COP)
- Temperature and pressure conversions
- Heat transfer calculations
- Maintenance scheduling algorithms
- Energy cost calculations

#### **Implementation Examples:**

```typescript
// Calculate system performance
const system: RefrigerationSystem = {
  id: 'SYS-001',
  name: 'Main Refrigeration System',
  type: 'ammonia',
  capacity: 500, // kW
  evaporatorTemp: -20, // °C
  condenserTemp: 35, // °C
  refrigerant: 'R717',
  efficiency: 85,
};

const performance = calculateSystemPerformance(system);
console.log(`COP: ${performance.cop.toFixed(2)}`);
console.log(`Power Consumption: ${performance.powerConsumption.toFixed(2)} kW`);
console.log(`Cost per Hour: $${performance.costPerHour.toFixed(2)}`);
```

#### **Use Cases:**

- **System Design**: Calculate optimal system configurations
- **Performance Monitoring**: Track system efficiency over time
- **Cost Analysis**: Calculate operational costs and ROI
- **Maintenance Planning**: Schedule preventive maintenance based on usage

### 4. File Upload Component (`FileUpload.tsx`)

#### **Features:**

- Drag and drop file upload
- File type validation
- Size limit enforcement
- Multiple file support
- Visual feedback

#### **Implementation Examples:**

```tsx
// Equipment manual upload
<FileUpload
  onFilesSelected={(files) => handleManualUpload(files)}
  acceptedTypes={['application/pdf', 'image/*']}
  maxSizeMB={25}
  multiple={false}
  className="mb-4"
/>

// Maintenance photo upload
<FileUpload
  onFilesSelected={(files) => handlePhotoUpload(files)}
  acceptedTypes={['image/*']}
  maxSizeMB={10}
  multiple={true}
  maxFiles={10}
/>
```

## 🏭 Industrial Refrigeration Specific Applications

### **Equipment Management**

#### **1. Compressor Monitoring**

```typescript
// Monitor compressor performance
const compressorData = {
  suctionTemp: -15,
  dischargeTemp: 85,
  suctionPressure: 1.2,
  dischargePressure: 12.5,
  powerConsumption: 75.5,
};

const cop = calculateCOP(compressorData.suctionTemp, compressorData.dischargeTemp);
const efficiency = calculateEfficiency(actualOutput, theoreticalOutput);
```

#### **2. System Diagnostics**

```typescript
// Generate diagnostic report
const diagnosticReport = {
  systemId: 'SYS-001',
  timestamp: new Date(),
  measurements: {
    evaporatorTemp: -18.5,
    condenserTemp: 32.0,
    refrigerantLevel: 85,
    oilLevel: 92,
  },
  calculations: {
    cop: calculateCOP(-18.5, 32.0),
    efficiency: calculateEfficiency(actual, theoretical),
    energyCost: calculateEnergyCost(power, hours, rate),
  },
};
```

### **Maintenance Management**

#### **1. Predictive Maintenance**

```typescript
// Calculate maintenance schedule
const maintenanceSchedule = calculateMaintenanceSchedule(
  'compressor',
  1500, // operating hours
  new Date('2024-01-01'), // last maintenance
);

console.log(`Next maintenance: ${maintenanceSchedule.nextMaintenance}`);
console.log(`Priority: ${maintenanceSchedule.priority}`);
```

#### **2. Work Order Generation**

```typescript
// Generate maintenance work order PDF
const workOrderData = {
  title: 'Preventive Maintenance - Compressor COMP-001',
  equipment: 'Main Compressor',
  technician: 'Mike Johnson',
  tasks: [
    'Check oil level and quality',
    'Inspect belts and couplings',
    'Clean condenser coils',
    'Test safety systems',
  ],
  estimatedDuration: '4 hours',
  requiredParts: ['Oil filter', 'Air filter'],
};
```

### **Customer Relationship Management (CRM)**

#### **1. Customer Data Export**

```typescript
// Export customer data for external CRM
const customerData = [
  {
    id: 'CUST-001',
    name: 'ABC Manufacturing',
    email: 'contact@abc.com',
    phone: '+1-555-0123',
    company: 'ABC Manufacturing Co.',
    address: '123 Industrial Blvd, City, State',
    equipmentCount: 15,
    totalValue: 250000,
    lastContact: '2024-01-10',
  },
];

exportCustomerData(customerData);
```

#### **2. Service History Tracking**

```typescript
// Track service history
const serviceHistory = {
  customerId: 'CUST-001',
  equipmentId: 'COMP-001',
  serviceDate: new Date(),
  serviceType: 'Preventive Maintenance',
  technician: 'John Smith',
  findings: 'All systems operating normally',
  recommendations: 'Schedule next maintenance in 3 months',
  photos: ['photo1.jpg', 'photo2.jpg'],
};
```

### **Project Management**

#### **1. Project Timeline Export**

```typescript
// Export project timeline
const projectData = [
  {
    id: 'PROJ-001',
    name: 'System Upgrade - Plant A',
    status: 'In Progress',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    progress: 65,
    assignedTo: 'Engineering Team',
    priority: 'High',
    budget: 150000,
  },
];

exportProjectTimeline(projectData);
```

#### **2. Resource Planning**

```typescript
// Calculate resource requirements
const resourceRequirements = {
  projectId: 'PROJ-001',
  manpower: {
    engineers: 2,
    technicians: 4,
    supervisors: 1,
  },
  materials: {
    compressors: 1,
    condensers: 2,
    piping: '500m',
    refrigerant: '1000kg',
  },
  timeline: {
    design: '2 weeks',
    procurement: '4 weeks',
    installation: '6 weeks',
    testing: '2 weeks',
  },
};
```

## 📊 Data Visualization & Reporting

### **Performance Dashboards**

#### **1. System Performance Metrics**

```typescript
// Real-time performance monitoring
const performanceMetrics = {
  systemEfficiency: calculateSystemPerformance(system),
  energyConsumption: calculateEnergyCost(power, hours, rate),
  maintenanceStatus: calculateMaintenanceSchedule(equipment, hours, lastMaintenance),
  costAnalysis: {
    operational: energyCost,
    maintenance: maintenanceCost,
    total: energyCost + maintenanceCost,
  },
};
```

#### **2. Trend Analysis**

```typescript
// Historical data analysis
const trendData = {
  efficiency: [85, 87, 84, 86, 88, 85, 87],
  energyCost: [1200, 1180, 1220, 1190, 1170, 1210, 1185],
  maintenanceCost: [500, 450, 600, 480, 520, 470, 490],
  dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
};
```

## 🔧 Technical Implementation

### **API Integration**

#### **1. File Upload Service**

```typescript
// Upload files to cloud storage
const uploadFile = async (file: File, category: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);
  formData.append(
    'metadata',
    JSON.stringify({
      uploadedBy: user.id,
      uploadedAt: new Date(),
      tags: ['equipment', 'maintenance'],
    }),
  );

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  return response.json();
};
```

#### **2. PDF Generation Service**

```typescript
// Generate and store PDF reports
const generateAndStoreReport = async (reportData: PDFReportData) => {
  const pdfBytes = await generateEquipmentReport(reportData);

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const filename = `report_${reportData.title.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

  // Upload to cloud storage
  const uploadResponse = await uploadFile(blob, 'reports');

  return uploadResponse;
};
```

### **Database Integration**

#### **1. Equipment Data Model**

```typescript
// Prisma schema for equipment
model Equipment {
  id          String   @id @default(cuid())
  name        String
  type        String
  location    String
  specifications Json
  maintenanceHistory Maintenance[]
  performanceData PerformanceData[]
  documents   Document[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Maintenance {
  id          String   @id @default(cuid())
  equipmentId String
  equipment   Equipment @relation(fields: [equipmentId], references: [id])
  type        String
  scheduledDate DateTime
  completedDate DateTime?
  technician  String
  notes       String?
  documents   Document[]
  createdAt   DateTime @default(now())
}
```

## 🚀 Deployment Considerations

### **1. Environment Variables**

```env
# File Storage
AWS_S3_BUCKET=industrial-refrigeration-files
AWS_S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# PDF Generation
PDF_GENERATION_API_KEY=your_pdf_api_key

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### **2. Performance Optimization**

```typescript
// Implement caching for calculations
const calculationCache = new Map();

const getCachedCalculation = (key: string, calculation: () => number) => {
  if (calculationCache.has(key)) {
    return calculationCache.get(key);
  }

  const result = calculation();
  calculationCache.set(key, result);
  return result;
};
```

### **3. Error Handling**

```typescript
// Comprehensive error handling
const handleFileUpload = async (files: File[]) => {
  try {
    const uploadPromises = files.map(async file => {
      const validation = validateFile(file, acceptedTypes, maxSizeMB);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      return await uploadFile(file, 'equipment');
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};
```

## 📈 Future Enhancements

### **1. Advanced Analytics**

- Machine learning for predictive maintenance
- Anomaly detection in system performance
- Automated report generation
- Real-time alerts and notifications

### **2. Mobile Integration**

- Mobile app for field technicians
- Offline data collection
- Photo and video documentation
- GPS location tracking

### **3. IoT Integration**

- Real-time sensor data collection
- Automated system monitoring
- Predictive analytics
- Remote system control

### **4. Advanced Reporting**

- Interactive dashboards
- Custom report builder
- Automated email reports
- Integration with external systems

## 🎯 Conclusion

This comprehensive utilities implementation provides a solid foundation for the Industrial Refrigeration Management SaaS platform. The utilities are designed to be:

- **Scalable**: Handle growing data and user requirements
- **Maintainable**: Well-structured and documented code
- **Extensible**: Easy to add new features and integrations
- **User-Friendly**: Intuitive interfaces and workflows
- **Compliant**: Meet industry standards and regulations

The implementation supports the full lifecycle of industrial refrigeration management, from initial system design through ongoing maintenance and optimization.
