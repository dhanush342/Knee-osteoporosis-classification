import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
// Removed unused imports from './ui/tabs'
import { MLTrainingPlan } from './MLTrainingPlan';
import { UIFlowGuide } from './UIFlowGuide';
import { MicrocopyGuide } from './MicrocopyGuide';
import { 
  Brain, 
  Palette, 
  FileText, 
  ArrowLeft,
  BookOpen,
  Code,
  Lightbulb
} from 'lucide-react';

interface ProjectGuidesProps {
  onBack: () => void;
}

export function ProjectGuides({ onBack }: ProjectGuidesProps) {
  const [activeGuide, setActiveGuide] = useState<'overview' | 'ml' | 'ui' | 'copy'>('overview');

  if (activeGuide === 'ml') {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-6">
          <Button variant="outline" onClick={() => setActiveGuide('overview')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Button>
        </div>
        <MLTrainingPlan />
      </div>
    );
  }

  if (activeGuide === 'ui') {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-6">
          <Button variant="outline" onClick={() => setActiveGuide('overview')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Button>
        </div>
        <UIFlowGuide />
      </div>
    );
  }

  if (activeGuide === 'copy') {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-6">
          <Button variant="outline" onClick={() => setActiveGuide('overview')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Button>
        </div>
        <MicrocopyGuide />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Platform
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Project Development Guides</h1>
            <p className="text-muted-foreground">Comprehensive step-by-step resources for building your osteoporosis detection system</p>
          </div>
        </div>

        {/* Guide Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveGuide('ml')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                ML Training Plan
              </CardTitle>
              <CardDescription>
                Complete machine learning pipeline from data collection to model deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Data preprocessing & augmentation</li>
                <li>• Model architecture selection</li>
                <li>• Training strategy & optimization</li>
                <li>• Evaluation metrics & validation</li>
                <li>• Explainability & deployment</li>
              </ul>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                View ML Guide
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveGuide('ui')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-blue-600" />
                </div>
                UI Flow Design
              </CardTitle>
              <CardDescription>
                Interface design guide with layouts, interactions, and responsive patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Upload interface design</li>
                <li>• Analysis progress screens</li>
                <li>• Results & heatmap display</li>
                <li>• Responsive breakpoints</li>
                <li>• Component specifications</li>
              </ul>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                View UI Guide
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveGuide('copy')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                Microcopy Guide
              </CardTitle>
              <CardDescription>
                Professional clinical interface copy, button labels, and error messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Button labels & actions</li>
                <li>• Status messages & feedback</li>
                <li>• Clinical terminology</li>
                <li>• Error handling & recovery</li>
                <li>• Professional medical copy</li>
              </ul>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                View Copy Guide
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Implementation Timeline
            </CardTitle>
            <CardDescription>Recommended development schedule for your final year project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-blue-600">1-2</span>
                  </div>
                  <h4 className="font-semibold">Weeks 1-2</h4>
                  <p className="text-sm text-muted-foreground">Data collection & preprocessing</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-purple-600">3-4</span>
                  </div>
                  <h4 className="font-semibold">Weeks 3-4</h4>
                  <p className="text-sm text-muted-foreground">Model training & UI design</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-green-600">5-6</span>
                  </div>
                  <h4 className="font-semibold">Weeks 5-6</h4>
                  <p className="text-sm text-muted-foreground">Integration & optimization</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-orange-600">7-8</span>
                  </div>
                  <h4 className="font-semibold">Weeks 7-8</h4>
                  <p className="text-sm text-muted-foreground">Testing & documentation</p>
                </div>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-teal-600" />
                  Key Success Factors
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Start with data collection early - this often takes longer than expected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Use transfer learning with pre-trained models to save training time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Implement MVP first, then add advanced features like heatmaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Document everything for your final report and presentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Test with real medical professionals if possible for feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Prepare for demo with clear before/after examples</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Stack */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Recommended Technical Stack
            </CardTitle>
            <CardDescription>Technologies and tools for building your osteoporosis detection system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Machine Learning</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Framework:</strong> PyTorch or TensorFlow</li>
                  <li>• <strong>Vision:</strong> Torchvision, OpenCV</li>
                  <li>• <strong>Preprocessing:</strong> PIL, scikit-image</li>
                  <li>• <strong>Explainability:</strong> Grad-CAM, LIME</li>
                  <li>• <strong>Deployment:</strong> ONNX, TorchScript</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Backend & API</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>API:</strong> FastAPI or Flask</li>
                  <li>• <strong>Database:</strong> PostgreSQL or MongoDB</li>
                  <li>• <strong>File Storage:</strong> AWS S3 or MinIO</li>
                  <li>• <strong>Authentication:</strong> JWT tokens</li>
                  <li>• <strong>Deployment:</strong> Docker, AWS/GCP</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Frontend</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Framework:</strong> React with TypeScript</li>
                  <li>• <strong>Styling:</strong> Tailwind CSS</li>
                  <li>• <strong>Components:</strong> shadcn/ui</li>
                  <li>• <strong>Charts:</strong> Recharts or Chart.js</li>
                  <li>• <strong>Build:</strong> Vite or Next.js</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}