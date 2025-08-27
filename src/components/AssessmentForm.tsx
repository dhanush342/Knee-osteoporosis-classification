import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface AssessmentData {
  // Demographics
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  
  // Family History
  familyHistoryOsteoporosis: boolean;
  familyHistoryFractures: boolean;
  
  // Medical History
  previousFractures: boolean;
  chronicDiseases: string[];
  medications: string[];
  menopauseStatus: string;
  
  // Lifestyle
  smokingStatus: string;
  alcoholConsumption: string;
  physicalActivity: string;
  
  // Diet
  calciumIntake: string;
  vitaminDIntake: string;
  proteinIntake: string;
}

interface AssessmentFormProps {
  onComplete: (data: AssessmentData) => void;
}

export function AssessmentForm({ onComplete }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<AssessmentData>>({
    chronicDiseases: [],
    medications: []
  });

  const totalSteps = 5;

  const updateFormData = (updates: Partial<AssessmentData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(formData as AssessmentData);
  };

  const handleCheckboxChange = (field: 'chronicDiseases' | 'medications', value: string, checked: boolean) => {
    const currentArray = formData[field] || [];
    const updatedArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    updateFormData({ [field]: updatedArray });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => updateFormData({ age: parseInt(e.target.value) })}
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => updateFormData({ gender: value as 'male' | 'female' })}
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
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => updateFormData({ height: parseInt(e.target.value) })}
                    placeholder="Enter your height"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => updateFormData({ weight: parseInt(e.target.value) })}
                    placeholder="Enter your weight"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="mb-4">Family & Medical History</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="familyOsteoporosis"
                  checked={formData.familyHistoryOsteoporosis || false}
                  onCheckedChange={(checked) => updateFormData({ familyHistoryOsteoporosis: !!checked })}
                />
                <Label htmlFor="familyOsteoporosis">Family history of osteoporosis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="familyFractures"
                  checked={formData.familyHistoryFractures || false}
                  onCheckedChange={(checked) => updateFormData({ familyHistoryFractures: !!checked })}
                />
                <Label htmlFor="familyFractures">Family history of fractures</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="previousFractures"
                  checked={formData.previousFractures || false}
                  onCheckedChange={(checked) => updateFormData({ previousFractures: !!checked })}
                />
                <Label htmlFor="previousFractures">Previous fractures (especially after age 50)</Label>
              </div>
              
              {formData.gender === 'female' && (
                <div>
                  <Label>Menopause Status</Label>
                  <Select
                    value={formData.menopauseStatus}
                    onValueChange={(value) => updateFormData({ menopauseStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premenopausal">Pre-menopausal</SelectItem>
                      <SelectItem value="perimenopausal">Peri-menopausal</SelectItem>
                      <SelectItem value="postmenopausal">Post-menopausal</SelectItem>
                      <SelectItem value="earlymenopause">Early menopause (before 45)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="mb-4">Medical Conditions & Medications</h3>
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Chronic Diseases (check all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Rheumatoid arthritis',
                    'Diabetes',
                    'Thyroid disorders',
                    'Kidney disease',
                    'Liver disease',
                    'Gastrointestinal disorders'
                  ].map((disease) => (
                    <div key={disease} className="flex items-center space-x-2">
                      <Checkbox
                        id={disease}
                        checked={formData.chronicDiseases?.includes(disease) || false}
                        onCheckedChange={(checked) => handleCheckboxChange('chronicDiseases', disease, !!checked)}
                      />
                      <Label htmlFor={disease}>{disease}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="mb-3 block">Current Medications (check all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Corticosteroids',
                    'Anti-seizure medications',
                    'Proton pump inhibitors',
                    'Blood thinners',
                    'Hormone therapy',
                    'Chemotherapy drugs'
                  ].map((medication) => (
                    <div key={medication} className="flex items-center space-x-2">
                      <Checkbox
                        id={medication}
                        checked={formData.medications?.includes(medication) || false}
                        onCheckedChange={(checked) => handleCheckboxChange('medications', medication, !!checked)}
                      />
                      <Label htmlFor={medication}>{medication}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="mb-4">Lifestyle Factors</h3>
            <div className="space-y-4">
              <div>
                <Label>Smoking Status</Label>
                <Select
                  value={formData.smokingStatus}
                  onValueChange={(value) => updateFormData({ smokingStatus: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never smoked</SelectItem>
                    <SelectItem value="former">Former smoker</SelectItem>
                    <SelectItem value="current">Current smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Alcohol Consumption</Label>
                <Select
                  value={formData.alcoholConsumption}
                  onValueChange={(value) => updateFormData({ alcoholConsumption: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select alcohol consumption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No alcohol</SelectItem>
                    <SelectItem value="light">Light (1-2 drinks/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-7 drinks/week)</SelectItem>
                    <SelectItem value="heavy">Heavy (8+ drinks/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Physical Activity Level</Label>
                <Select
                  value={formData.physicalActivity}
                  onValueChange={(value) => updateFormData({ physicalActivity: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-4 days/week)</SelectItem>
                    <SelectItem value="active">Active (5+ days/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="mb-4">Nutrition Assessment</h3>
            <div className="space-y-4">
              <div>
                <Label>Daily Calcium Intake</Label>
                <Select
                  value={formData.calciumIntake}
                  onValueChange={(value) => updateFormData({ calciumIntake: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select calcium intake" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (less than 600mg/day)</SelectItem>
                    <SelectItem value="moderate">Moderate (600-1000mg/day)</SelectItem>
                    <SelectItem value="adequate">Adequate (1000-1200mg/day)</SelectItem>
                    <SelectItem value="high">High (more than 1200mg/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Vitamin D Intake/Exposure</Label>
                <Select
                  value={formData.vitaminDIntake}
                  onValueChange={(value) => updateFormData({ vitaminDIntake: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vitamin D status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (limited sun exposure, no supplements)</SelectItem>
                    <SelectItem value="moderate">Moderate (some sun exposure or occasional supplements)</SelectItem>
                    <SelectItem value="adequate">Adequate (regular sun exposure and/or supplements)</SelectItem>
                    <SelectItem value="high">High (extensive sun exposure and supplements)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Protein Intake</Label>
                <Select
                  value={formData.proteinIntake}
                  onValueChange={(value) => updateFormData({ proteinIntake: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select protein intake" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (less than 0.8g/kg body weight)</SelectItem>
                    <SelectItem value="moderate">Moderate (0.8-1.0g/kg body weight)</SelectItem>
                    <SelectItem value="adequate">Adequate (1.0-1.2g/kg body weight)</SelectItem>
                    <SelectItem value="high">High (more than 1.2g/kg body weight)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.age && formData.gender && formData.height && formData.weight;
      case 1:
        return true; // Optional fields
      case 2:
        return true; // Optional fields
      case 3:
        return formData.smokingStatus && formData.alcoholConsumption && formData.physicalActivity;
      case 4:
        return formData.calciumIntake && formData.vitaminDIntake && formData.proteinIntake;
      default:
        return false;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Osteoporosis Risk Assessment</CardTitle>
        <CardDescription>
          Complete this comprehensive assessment to evaluate your osteoporosis risk
        </CardDescription>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-sm">{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={((currentStep + 1) / totalSteps) * 100} />
        </div>
      </CardHeader>
      <CardContent>
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
            >
              Complete Assessment
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}