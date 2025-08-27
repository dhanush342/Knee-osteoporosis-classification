import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { XrayUpload, PatientData } from './components/XrayUpload';
import { AIAnalysis, AnalysisResults } from './components/AIAnalysis';
import { AIResults } from './components/AIResults';
import { AssessmentForm, AssessmentData } from './components/AssessmentForm';
import { Results } from './components/Results';
import { calculateOsteoporosisRisk, RiskResult } from './components/RiskCalculator';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Stethoscope, 
  Heart, 
  Scan 
} from 'lucide-react';
import RecentScans from '../RecentScans';
import History from '../History';

type AppView = 
  | 'welcome' 
  | 'dashboard' 
  | 'xray-upload' 
  | 'ai-analysis' 
  | 'ai-results'
  | 'assessment'
  | 'assessment-results'
  | 'recent-scans'
  | 'history';

type StoredScan = {
  id: string;
  date: string;
  patientName: string;
  patientId: string;
  age: number;
  stage: string;
  risk: 'Low' | 'Moderate' | 'High';
  results: AnalysisResults;
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<RiskResult | null>(null);
  const [scans, setScans] = useState<StoredScan[]>([]);

  const handleStartClinical = () => {
    setCurrentView('dashboard');
  };

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleNewScan = () => {
    setCurrentView('xray-upload');
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleViewRecentScans = () => {
    setCurrentView('recent-scans');
  };

  const handleUploadComplete = (data: PatientData) => {
    setPatientData(data);
    setCurrentView('ai-analysis');
  };

  const persistHistory = async (scan: StoredScan) => {
    try {
      await fetch('http://localhost:8000/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: scan.id,
          date: scan.date,
          patientName: scan.patientName,
          patientId: scan.patientId,
          age: scan.age,
          stage: scan.stage,
          risk: scan.risk
        })
      });
    } catch (e) {
      console.warn('Failed to save history to CSV', e);
    }
  };

  const handleAnalysisComplete = (results: AnalysisResults) => {
    setAnalysisResults(results);
    const id = Date.now().toString();
    const risk =
      results.riskLevel === 'Osteoporosis' ? 'High' :
      results.riskLevel === 'Osteopenia' ? 'Moderate' : 'Low';
    const newScan: StoredScan = {
      id,
      date: new Date().toLocaleString(),
      patientName: results.patientData.name,
      patientId: results.patientData.patientId,
      age: results.patientData.age,
      stage: results.riskLevel,
      risk,
      results
    };
    setScans(prev => [newScan, ...prev]);
    persistHistory(newScan);
    setCurrentView('ai-results');
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    const results = calculateOsteoporosisRisk(data);
    setAssessmentResults(results);
    setCurrentView('assessment-results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setPatientData(null);
    setAnalysisResults(null);
  };

  const handleBackToWelcome = () => {
    setCurrentView('welcome');
    setPatientData(null);
    setAnalysisResults(null);
    setAssessmentResults(null);
  };

  const handleStartOver = () => {
    setAssessmentResults(null);
    setCurrentView('welcome');
  };

  const openScanById = (id: string) => {
    const found = scans.find(s => s.id === id);
    if (found) {
      setAnalysisResults(found.results);
      setCurrentView('ai-results');
    }
  };

  if (currentView === 'dashboard') {
    return (
      <Dashboard 
        onNewScan={handleNewScan}
        onViewHistory={handleViewHistory}
        recentScans={scans.slice(0, 5)}
        onViewScan={openScanById}
        onViewRecentScans={handleViewRecentScans}
      />
    );
  }

  if (currentView === 'xray-upload') {
    return (
      <XrayUpload 
        onBack={handleBackToDashboard}
        onAnalyze={handleUploadComplete}
      />
    );
  }

  if (currentView === 'ai-analysis' && patientData) {
    return (
      <AIAnalysis
        patientData={patientData}
        onComplete={handleAnalysisComplete}
      />
    );
  }

  if (currentView === 'ai-results' && analysisResults) {
    return (
      <AIResults
        results={analysisResults}
        onBack={handleBackToDashboard}
        onNewScan={handleNewScan}
      />
    );
  }

  if (currentView === 'assessment') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBackToWelcome}>
            ← Back
          </Button>
        </div>
        <AssessmentForm onComplete={handleAssessmentComplete} />
      </div>
    );
  }

  if (currentView === 'assessment-results' && assessmentResults) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBackToWelcome}>
            ← Back
          </Button>
        </div>
        <Results results={assessmentResults} onStartOver={handleStartOver} />
      </div>
    );
  }

  if (currentView === 'recent-scans') {
    return (
      <div className="min-h-screen bg-background p-6">
        <RecentScans scans={scans} onView={openScanById} />
      </div>
    );
  }

  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-background p-6">
        <History history={scans} onView={openScanById} />
      </div>
    );
  }

  // Welcome/Landing Page
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 bg-teal-100 text-teal-800">
                AI-Powered Clinical Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-teal-600">OsteoScan</span>
                <br />
                AI Bone Health Platform
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Advanced AI-powered X-ray analysis for osteoporosis detection, staging, and clinical decision support. 
                Combining deep learning with clinical expertise for accurate bone health assessment.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleStartClinical}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-medium shadow-lg"
              >
                <Scan className="w-5 h-5 mr-2" />
                Clinical X-ray Analysis
              </Button>
              <Button
                variant="outline"
                onClick={handleStartAssessment}
                className="px-8 py-4 text-lg font-medium border-2"
              >
                <Heart className="w-5 h-5 mr-2" />
                Risk Assessment Tool
              </Button>
            </div>
            
            {/* Removed View Development Guides */}
          </div>
        </div>
      </div>

      {/* Platform Options */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Platform</h2>
          <p className="text-xl text-muted-foreground">
            Professional AI analysis or comprehensive risk assessment
          </p>
        </div>

        <Tabs defaultValue="clinical" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="clinical" className="py-3 px-6">
              <Stethoscope className="w-5 h-5 mr-2" />
              Clinical Platform
            </TabsTrigger>
            <TabsTrigger value="assessment" className="py-3 px-6">
              <Heart className="w-5 h-5 mr-2" />
              Assessment Tool
            </TabsTrigger>
          </TabsList>

          {/* rest unchanged */}
        </Tabs>
      </div>
    </div>
  );
}