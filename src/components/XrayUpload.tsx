import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
// Removed unused imports from './ui/select'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Upload, 
  X, 
  FileImage, 
  User, 
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export interface PatientData {
  patientId: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  medicalHistory: string[];
  symptoms: string[];
  xrayFile: File | null;
  xrayPreview: string | null;
}

interface XrayUploadProps {
  onBack: () => void;
  onAnalyze: (data: PatientData) => void;
}

export function XrayUpload({ onBack, onAnalyze }: XrayUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    patientId: '',
    name: '',
    age: 0,
    gender: 'female',
    height: 0,
    weight: 0,
    medicalHistory: [],
    symptoms: [],
    xrayFile: null,
    xrayPreview: null
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/dicom'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.dcm')) {
      alert('Please upload a valid X-ray image (JPEG, PNG) or DICOM file');
      return;
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPatientData(prev => ({
          ...prev,
          xrayFile: file,
          xrayPreview: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // For DICOM files, show placeholder
      setPatientData(prev => ({
        ...prev,
        xrayFile: file,
        xrayPreview: null
      }));
    }
  };

  const removeFile = () => {
    setPatientData(prev => ({
      ...prev,
      xrayFile: null,
      xrayPreview: null
    }));
  };

  const updatePatientData = (updates: Partial<PatientData>) => {
    setPatientData(prev => ({ ...prev, ...updates }));
  };

  const handleCheckboxChange = (field: 'medicalHistory' | 'symptoms', value: string, checked: boolean) => {
    const currentArray = patientData[field] || [];
    const updatedArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    updatePatientData({ [field]: updatedArray });
  };

  const isFormValid = () => {
    return patientData.patientId && 
           patientData.name && 
           patientData.age > 0 && 
           patientData.gender && 
           patientData.height > 0 && 
           patientData.weight > 0 && 
           patientData.xrayFile;
  };

  const handleAnalyze = () => {
    if (isFormValid()) {
      onAnalyze(patientData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New X-ray Analysis</h1>
            <p className="text-gray-600">Upload X-ray and enter patient information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* X-ray Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="w-5 h-5" />
                X-ray Upload
              </CardTitle>
              <CardDescription>
                Upload X-ray image (JPEG, PNG) or DICOM file
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!patientData.xrayFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop X-ray file here
                  </p>
                  <p className="text-gray-500 mb-4">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.dcm,application/dicom"
                    onChange={handleFileInput}
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-teal-600 hover:bg-teal-700" asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports: JPEG, PNG, DICOM (max 50MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileImage className="w-8 h-8 text-teal-600" />
                      <div>
                        <p className="font-medium">{patientData.xrayFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(patientData.xrayFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeFile}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {patientData.xrayPreview && (
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={patientData.xrayPreview} 
                        alt="X-ray preview" 
                        className="w-full h-64 object-contain bg-black"
                      />
                    </div>
                  )}
                  
                  {!patientData.xrayPreview && patientData.xrayFile && (
                    <div className="p-8 text-center bg-gray-100 rounded-lg">
                      <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">DICOM file uploaded</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Patient Information
              </CardTitle>
              <CardDescription>
                Enter patient details for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    value={patientData.patientId}
                    onChange={(e) => updatePatientData({ patientId: e.target.value })}
                    placeholder="P-12345"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={patientData.name}
                    onChange={(e) => updatePatientData({ name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={patientData.age || ''}
                    onChange={(e) => updatePatientData({ age: parseInt(e.target.value) || 0 })}
                    placeholder="65"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={patientData.height || ''}
                    onChange={(e) => updatePatientData({ height: parseInt(e.target.value) || 0 })}
                    placeholder="170"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={patientData.weight || ''}
                    onChange={(e) => updatePatientData({ weight: parseInt(e.target.value) || 0 })}
                    placeholder="65"
                  />
                </div>
              </div>

              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={patientData.gender}
                  onValueChange={(value) => updatePatientData({ gender: value as 'male' | 'female' })}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-3 block">Medical History (check all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Previous fractures',
                    'Family history of osteoporosis',
                    'Rheumatoid arthritis',
                    'Corticosteroid use',
                    'Thyroid disorders',
                    'Early menopause'
                  ].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={patientData.medicalHistory.includes(condition)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('medicalHistory', condition, !!checked)
                        }
                      />
                      <Label htmlFor={condition} className="text-sm">{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Button */}
        <div className="mt-6 text-center">
          {!isFormValid() && (
            <Alert className="mb-4 max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please complete all required fields and upload an X-ray to continue.
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={handleAnalyze}
            disabled={!isFormValid()}
            className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg"
          >
            {isFormValid() ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Start AI Analysis
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Complete Form to Analyze
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}