import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  AlertTriangle, 
  CheckCircle, 
  Heart, 
  Activity, 
  Utensils, 
  Stethoscope,
  Info
} from 'lucide-react';
import { RiskResult } from './RiskCalculator';

interface ResultsProps {
  results: RiskResult;
  onStartOver: () => void;
}

export function Results({ results, onStartOver }: ResultsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'High': return 'bg-orange-500';
      case 'Very High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'Low': return 'default';
      case 'Moderate': return 'secondary';
      case 'High': return 'destructive';
      case 'Very High': return 'destructive';
      default: return 'default';
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'Low':
        return 'Your risk of developing osteoporosis is low. Continue maintaining healthy habits and consider preventive measures.';
      case 'Moderate':
        return 'You have a moderate risk of developing osteoporosis. Taking preventive action now can significantly reduce your risk.';
      case 'High':
        return 'You have a high risk of developing osteoporosis. It is important to take immediate action and consult with healthcare professionals.';
      case 'Very High':
        return 'You have a very high risk of developing osteoporosis. Immediate medical attention and comprehensive intervention are strongly recommended.';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Risk Score Overview */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Heart className="w-6 h-6" />
            Your Osteoporosis Risk Assessment
          </CardTitle>
          <CardDescription>
            Based on your health profile and lifestyle factors
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
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
                  className={getRiskColor(results.riskLevel)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">{results.riskScore}</div>
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant={getRiskBadgeVariant(results.riskLevel)} className="text-lg px-4 py-2">
                {results.riskLevel} Risk
              </Badge>
              <p className="text-muted-foreground max-w-md mx-auto">
                {getRiskDescription(results.riskLevel)}
              </p>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This assessment is for educational purposes only and should not replace professional medical advice. 
              Please consult with your healthcare provider for personalized recommendations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Risk Factors and Protective Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.riskFactors.length > 0 ? (
              <ul className="space-y-2">
                {results.riskFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-sm">{factor}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No significant risk factors identified.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Protective Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.protectiveFactors.length > 0 ? (
              <ul className="space-y-2">
                {results.protectiveFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span className="text-sm">{factor}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Focus on building protective factors through lifestyle changes.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>
            Evidence-based strategies to improve your bone health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nutrition" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="nutrition" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="exercise" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Exercise
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Medical
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Lifestyle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nutrition" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium">Nutrition Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.nutrition.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="exercise" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium">Exercise Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.exercise.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium">Medical Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.medical.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="lifestyle" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium">Lifestyle Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.lifestyle.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onStartOver}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Take Assessment Again
        </button>
      </div>
    </div>
  );
}