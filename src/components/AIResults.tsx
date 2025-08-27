import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Eye, 
  EyeOff, 
  Download, 
  Share, 
  CheckCircle,
  TrendingUp,
  Activity,
  FileText,
  Stethoscope,
  Users,
  Calendar,
  ArrowLeft,
  Info
} from 'lucide-react';
import { AnalysisResults } from './AIAnalysis';

interface AIResultsProps {
  results: AnalysisResults;
  onBack: () => void;
  onNewScan: () => void;
}

export function AIResults({ results, onBack, onNewScan }: AIResultsProps) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  // Removed unused selectedView state

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Normal': return 'text-green-700 bg-green-50 border-green-200';
      case 'Osteopenia': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Osteoporosis': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'Normal':
        return 'Bone density appears normal for patient age and demographics. Continue preventive measures.';
      case 'Osteopenia':
        return 'Low bone mass detected (T-score between -1.0 and -2.5). Preventive intervention recommended.';
      case 'Osteoporosis':
        return 'Osteoporosis detected (T-score ≤ -2.5). Immediate medical intervention required.';
      default:
        return '';
    }
  };

  const bmi = results.patientData.weight / ((results.patientData.height / 100) ** 2);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Analysis Results</h1>
              <p className="text-gray-600">
                {results.patientData.name} (ID: {results.patientData.patientId})
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Add to EHR
            </Button>
            <Button onClick={onNewScan}>
              New Scan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image and Heatmap */}
          <div className="lg:col-span-2 space-y-6">
            {/* X-ray Viewer */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    X-ray Analysis
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={showHeatmap ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowHeatmap(!showHeatmap)}
                    >
                      {showHeatmap ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Hide Heatmap
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Show Heatmap
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  AI-enhanced X-ray with risk region highlighting (Grad-CAM visualization)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* X-ray Image Display */}
                  <div className="bg-black rounded-lg overflow-hidden">
                    {results.patientData.xrayPreview ? (
                      <div className="relative">
                        <img 
                          src={results.patientData.xrayPreview} 
                          alt="Patient X-ray" 
                          className="w-full h-96 object-contain"
                        />
                        {showHeatmap && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/30 to-orange-500/30 mix-blend-multiply">
                            {/* Mock heatmap overlay */}
                            <div className="absolute top-1/3 left-1/2 w-24 h-32 bg-red-500/40 rounded-full blur-lg"></div>
                            <div className="absolute top-1/2 right-1/3 w-16 h-20 bg-orange-500/30 rounded-full blur-md"></div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-96 flex items-center justify-center text-white">
                        <div className="text-center">
                          <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>DICOM file loaded</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Analysis Overlay Info */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {results.analysis.boneMineral}%
                      </div>
                      <div className="text-sm text-gray-600">Bone Mineral</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {results.analysis.trabecular}%
                      </div>
                      <div className="text-sm text-gray-600">Trabecular</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {results.analysis.cortical}%
                      </div>
                      <div className="text-sm text-gray-600">Cortical</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle>AI Risk Assessment</CardTitle>
                <CardDescription>Based on X-ray analysis and patient data</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {/* gauge remains */}
                <div className="space-y-2">
                  <Badge className={`${getRiskColor(results.riskLevel)} border text-base px-4 py-2`}>
                    {results.riskLevel}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {getRiskDescription(results.riskLevel)}
                  </p>
                </div>
                {/* Removed AI Confidence/Model Performance */}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${results.riskScore * 3.51} 351`}
                      className={
                        results.riskLevel === 'Normal' ? 'text-green-500' :
                        results.riskLevel === 'Osteopenia' ? 'text-orange-500' :
                        'text-red-500'
                      }
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{results.riskScore}</div>
                      <div className="text-xs text-gray-500">Risk Score</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge className={`${getRiskColor(results.riskLevel)} border text-base px-4 py-2`}>
                    {results.riskLevel}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {getRiskDescription(results.riskLevel)}
                  </p>
                </div>

                {/* Removed AI Confidence and Model Performance */}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Suggested next steps
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Patient Information Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Patient Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold">{results.patientData.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold capitalize">{results.patientData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">BMI</p>
                    <p className="font-semibold">{bmi.toFixed(1)} kg/m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Risk Factors</p>
                    <p className="font-semibold">{results.patientData.medicalHistory.length}</p>
                  </div>
                </div>
                
                {results.patientData.medicalHistory.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Medical History</p>
                    <div className="flex flex-wrap gap-2">
                      {results.patientData.medicalHistory.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results and Recommendations */}
          <div className="space-y-6">
            {/* Risk Score */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle>AI Risk Assessment</CardTitle>
                <CardDescription>Based on X-ray analysis and patient data</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${results.riskScore * 3.51} 351`}
                      className={
                        results.riskLevel === 'Normal' ? 'text-green-500' :
                        results.riskLevel === 'Osteopenia' ? 'text-orange-500' :
                        'text-red-500'
                      }
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{results.riskScore}</div>
                      <div className="text-xs text-gray-500">Risk Score</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge className={`${getRiskColor(results.riskLevel)} border text-base px-4 py-2`}>
                    {results.riskLevel}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {getRiskDescription(results.riskLevel)}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>AI Confidence</span>
                    <span>{results.confidence.toFixed(1)}%</span>
                  </div>
                  <Progress value={results.confidence} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical Recommendations</CardTitle>
                <CardDescription>
                  AI-generated suggestions based on analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="medical" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="medical">Medical</TabsTrigger>
                    <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                    <TabsTrigger value="followup">Follow-up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="medical" className="mt-4">
                    <ul className="space-y-2">
                      {results.recommendations.medical.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="lifestyle" className="mt-4">
                    <ul className="space-y-2">
                      {results.recommendations.lifestyle.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="followup" className="mt-4">
                    <ul className="space-y-2">
                      {results.recommendations.followUp.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Clinical Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Add to Patient Record
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Request Specialist Review
                </Button>
                <Button variant="outline" className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Reviewed
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Clinical Disclaimer */}
        <Alert className="mt-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Clinical Decision Support Tool:</strong> This AI analysis is intended to assist healthcare 
            providers in clinical decision-making. Results should be interpreted by qualified medical professionals 
            in conjunction with patient history, physical examination, and other diagnostic information. 
            This tool is not intended to replace clinical judgment.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}