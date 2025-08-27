import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Eye, 
  CheckCircle, 
  Loader2,
  Activity,
  Scan
} from 'lucide-react';
import { PatientData } from './XrayUpload';

interface AIAnalysisProps {
  patientData: PatientData;
  onComplete: (results: AnalysisResults) => void;
}

export interface AnalysisResults {
  patientData: PatientData;
  riskScore: number;
  riskLevel: 'Normal' | 'Osteopenia' | 'Osteoporosis';
  confidence: number;
  stage: string;
  recommendations: {
    medical: string[];
    lifestyle: string[];
    followUp: string[];
  };
  analysis: {
    boneMineral: number;
    trabecular: number;
    cortical: number;
  };
  heatmap: string; // Base64 encoded heatmap overlay
}

export function AIAnalysis({ patientData, onComplete }: AIAnalysisProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    {
      title: 'Preprocessing X-ray',
      description: 'Normalizing image, enhancing contrast, and extracting ROI',
      icon: Scan,
      duration: 2000
    },
    {
      title: 'AI Model Inference',
      description: 'Running deep learning model on image features',
      icon: Brain,
      duration: 3000
    },
    {
      title: 'Generating Heatmap',
      description: 'Creating Grad-CAM visualization for explainability',
      icon: Eye,
      duration: 2000
    },
    {
      title: 'Clinical Analysis',
      description: 'Combining imaging results with patient data',
      icon: Activity,
      duration: 1500
    },
    {
      title: 'Generating Report',
      description: 'Compiling results and recommendations',
      icon: CheckCircle,
      duration: 1000
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Determine current step based on progress
        const stepProgress = Math.floor(newProgress / 20);
        if (stepProgress !== currentStep && stepProgress < analysisSteps.length) {
          setCurrentStep(stepProgress);
        }
        
        // Complete analysis at 100%
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            // Generate mock results
            const results = generateMockResults();
            onComplete(results);
          }, 1000);
        }
        
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  const generateMockResults = (): AnalysisResults => {
    // Mock AI analysis based on patient data
    let riskScore = 30;
    let riskLevel: 'Normal' | 'Osteopenia' | 'Osteoporosis' = 'Normal';
    
    // Adjust based on age
    if (patientData.age > 65) riskScore += 25;
    else if (patientData.age > 50) riskScore += 15;
    
    // Adjust based on gender
    if (patientData.gender === 'female') riskScore += 10;
    
    // Adjust based on medical history
    if (patientData.medicalHistory.includes('Previous fractures')) riskScore += 20;
    if (patientData.medicalHistory.includes('Family history of osteoporosis')) riskScore += 15;
    if (patientData.medicalHistory.includes('Corticosteroid use')) riskScore += 15;
    if (patientData.medicalHistory.includes('Early menopause')) riskScore += 20;
    
    // Calculate BMI and adjust
    const bmi = patientData.weight / ((patientData.height / 100) ** 2);
    if (bmi < 18.5) riskScore += 15;
    
    // Determine risk level
    if (riskScore >= 70) {
      riskLevel = 'Osteoporosis';
    } else if (riskScore >= 45) {
      riskLevel = 'Osteopenia';
    }
    
    const confidence = Math.min(85 + Math.random() * 10, 95);
    
    // Generate mock heatmap (placeholder)
    const heatmap = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    
    return {
      patientData,
      riskScore: Math.min(riskScore, 100),
      riskLevel,
      confidence,
      stage: riskLevel,
      recommendations: {
        medical: riskLevel === 'Osteoporosis' 
          ? ['DEXA scan recommended', 'Consult endocrinologist', 'Consider bisphosphonate therapy']
          : riskLevel === 'Osteopenia'
          ? ['DEXA scan in 1-2 years', 'Monitor bone health', 'Consider calcium/vitamin D supplements']
          : ['Routine bone health monitoring', 'Maintain healthy lifestyle'],
        lifestyle: [
          'Weight-bearing exercises 3x/week',
          'Adequate calcium intake (1200mg/day)',
          'Vitamin D supplementation (1000 IU/day)',
          'Avoid smoking and excessive alcohol'
        ],
        followUp: riskLevel === 'Osteoporosis'
          ? ['Follow-up in 3 months', 'Repeat imaging in 6 months']
          : ['Annual check-up', 'Repeat assessment in 1-2 years']
      },
      analysis: {
        boneMineral: Math.max(50 - riskScore/2, 10),
        trabecular: Math.max(60 - riskScore/2.5, 15),
        cortical: Math.max(70 - riskScore/3, 20)
      },
      heatmap
    };
  };

  const currentStepInfo = analysisSteps[currentStep];
  const Icon = currentStepInfo?.icon || Loader2;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Brain className="w-7 h-7 text-teal-600" />
              AI Analysis in Progress
            </CardTitle>
            <CardDescription>
              Analyzing X-ray for {patientData.name} (ID: {patientData.patientId})
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Current Step */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                  <Icon className={`w-10 h-10 text-teal-600 ${Icon === Loader2 ? 'animate-spin' : ''}`} />
                </div>
              </div>
              
              {currentStepInfo && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentStepInfo.title}
                  </h3>
                  <p className="text-gray-600">
                    {currentStepInfo.description}
                  </p>
                </>
              )}
            </div>

            {/* Step Timeline */}
            <div className="space-y-3">
              {analysisSteps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      isCompleted 
                        ? 'bg-teal-600 border-teal-600' 
                        : isCurrent 
                        ? 'border-teal-600 bg-teal-50' 
                        : 'border-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : isCurrent ? (
                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${
                        isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className={`text-sm ${
                        isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    
                    <div>
                      {isCompleted && (
                        <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                          Complete
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                          Processing
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Patient Info Reminder */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium text-gray-700">Patient: </span>
                  <span>{patientData.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Age: </span>
                  <span>{patientData.age}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Gender: </span>
                  <span className="capitalize">{patientData.gender}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}