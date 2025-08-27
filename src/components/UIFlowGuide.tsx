import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Upload, 
  Eye, 
  EyeOff, 
  FileImage, 
  Brain, 
  TrendingUp, 
  Download,
  ArrowRight,
  Smartphone,
  Monitor
} from 'lucide-react';

export function UIFlowGuide() {
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">UI Flow Design Guide</h1>
        <p className="text-lg text-muted-foreground">
          Complete interface design for osteoporosis X-ray analysis platform
        </p>
      </div>

      {/* Flow Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="w-6 h-6 text-blue-600" />
            User Flow Overview
          </CardTitle>
          <CardDescription>Step-by-step interaction flow for the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-3">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold">Upload</h4>
              <p className="text-sm text-muted-foreground">Drag & drop X-ray</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-3">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold">Analyze</h4>
              <p className="text-sm text-muted-foreground">AI processing</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold">Results</h4>
              <p className="text-sm text-muted-foreground">Stage & heatmap</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Screen Designs */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="upload">Upload Screen</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Screen</TabsTrigger>
          <TabsTrigger value="results">Results Screen</TabsTrigger>
          <TabsTrigger value="responsive">Responsive Design</TabsTrigger>
        </TabsList>

        {/* Upload Screen */}
        <TabsContent value="upload">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Interface Design
                </CardTitle>
                <CardDescription>Main upload screen with drag-and-drop functionality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mock Upload Interface */}
                <div className="border-2 border-dashed border-teal-300 bg-teal-50 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-teal-900 mb-2">Upload X-ray Image</h3>
                  <p className="text-teal-700 mb-4">Drag and drop your X-ray here, or click to browse</p>
                  <Button className="bg-teal-600 hover:bg-teal-700 mb-4">
                    <FileImage className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-teal-600">Supports: JPEG, PNG, DICOM (max 50MB)</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Design Elements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Large drag-and-drop area with visual feedback</li>
                    <li>• Clear file format and size limitations</li>
                    <li>• Progress indicator for upload</li>
                    <li>• File preview with remove option</li>
                    <li>• Accessibility features (keyboard navigation)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Upload Area</h5>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <strong>Dimensions:</strong> 400×300px minimum<br/>
                    <strong>States:</strong> Default, Drag Active, Error, Success<br/>
                    <strong>Colors:</strong> Teal-50 background, Teal-300 border<br/>
                    <strong>Animation:</strong> Subtle scale on hover
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Upload Button</h5>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong>Style:</strong> Primary button, Teal-600<br/>
                    <strong>Icon:</strong> Upload icon (left aligned)<br/>
                    <strong>Text:</strong> "Choose File" or "Browse Files"<br/>
                    <strong>States:</strong> Default, Hover, Loading, Disabled
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">File Preview</h5>
                  <div className="bg-purple-50 p-3 rounded text-sm">
                    <strong>Layout:</strong> Thumbnail + file info + remove button<br/>
                    <strong>Info:</strong> Filename, size, format<br/>
                    <strong>Remove:</strong> X icon, confirmation dialog<br/>
                    <strong>Validation:</strong> Real-time format checking
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analysis Screen */}
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Analysis Interface
                </CardTitle>
                <CardDescription>AI processing screen with progress indication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mock Analysis Interface */}
                <div className="text-center space-y-6 p-8">
                  <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto flex items-center justify-center">
                    <Brain className="w-10 h-10 text-purple-600 animate-pulse" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress</h3>
                    <p className="text-muted-foreground">Analyzing X-ray for osteoporosis detection...</p>
                  </div>

                  <div className="w-full max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Processing</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                      <span>Running deep learning model inference...</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Processing Steps</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Image preprocessing complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Feature extraction complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span>AI model inference in progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span>Generating heatmap visualization</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Design Specs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Progress Indicator</h5>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <strong>Type:</strong> Linear progress bar + percentage<br/>
                    <strong>Color:</strong> Purple-600 for progress<br/>
                    <strong>Animation:</strong> Smooth transitions<br/>
                    <strong>Duration:</strong> 15-30 seconds typical
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Status Messages</h5>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong>Preprocessing:</strong> "Preparing image for analysis..."<br/>
                    <strong>Analysis:</strong> "Running AI model..."<br/>
                    <strong>Heatmap:</strong> "Generating visualization..."<br/>
                    <strong>Complete:</strong> "Analysis complete!"
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Loading Animation</h5>
                  <div className="bg-purple-50 p-3 rounded text-sm">
                    <strong>Icon:</strong> Brain icon with pulse animation<br/>
                    <strong>Dots:</strong> Bouncing dots for active step<br/>
                    <strong>Colors:</strong> Purple-600 for active states<br/>
                    <strong>Timing:</strong> 1.5s animation cycle
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Results Screen */}
        <TabsContent value="results">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Results Interface Design
                </CardTitle>
                <CardDescription>Comprehensive results display with heatmap visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Viewer */}
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">X-ray Analysis</h4>
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
                      
                      <div className="relative bg-black rounded-lg overflow-hidden">
                        <div className="aspect-square bg-gray-800 flex items-center justify-center">
                          <FileImage className="w-16 h-16 text-gray-400" />
                        </div>
                        {showHeatmap && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/30 to-orange-500/30 mix-blend-multiply">
                            <div className="absolute top-1/3 left-1/2 w-24 h-32 bg-red-500/60 rounded-full blur-lg"></div>
                            <div className="absolute top-1/2 right-1/3 w-16 h-20 bg-orange-500/40 rounded-full blur-md"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="space-y-6">
                    <Card className="border-2 border-red-200">
                      <CardHeader className="text-center">
                        <CardTitle className="text-red-700">High Risk</CardTitle>
                        <CardDescription>Osteoporosis Detected</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center space-y-4">
                        <div className="text-4xl font-bold text-red-600">85%</div>
                        <p className="text-sm">Confidence Score</p>
                        
                        <div className="space-y-2">
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            Stage: Osteoporosis
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Significant bone density loss detected. Immediate medical consultation recommended.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm">Immediate Actions</h5>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Schedule DEXA scan</li>
                            <li>• Consult endocrinologist</li>
                            <li>• Review medications</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm">Lifestyle Changes</h5>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Increase calcium intake</li>
                            <li>• Weight-bearing exercises</li>
                            <li>• Vitamin D supplementation</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        Share with Doctor
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Color Coding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Normal (Green)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Osteopenia (Yellow)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Osteoporosis (Red)</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Heatmap Toggle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Toggle button with clear labels</p>
                  <p>• Smooth fade transition</p>
                  <p>• Red/orange gradient overlay</p>
                  <p>• Intensity based on risk level</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Action Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Primary: Download Report</p>
                  <p>• Secondary: Share options</p>
                  <p>• Clear icons for recognition</p>
                  <p>• Full-width layout</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Responsive Design */}
        <TabsContent value="responsive">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Responsive Design Guidelines
                </CardTitle>
                <CardDescription>Adaptive layouts for different screen sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      Desktop (1024px+)
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
                      <p>• Two-column layout (image + results)</p>
                      <p>• Full-size drag-and-drop area</p>
                      <p>• Side-by-side heatmap toggle</p>
                      <p>• Expanded recommendation cards</p>
                      <p>• Multiple action buttons visible</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Mobile (320px-768px)
                    </h4>
                    <div className="bg-green-50 p-4 rounded-lg text-sm space-y-2">
                      <p>• Single-column stacked layout</p>
                      <p>• Compact upload area</p>
                      <p>• Swipe gesture for heatmap</p>
                      <p>• Collapsible recommendation sections</p>
                      <p>• Bottom sheet for actions</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Breakpoint Strategy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="font-semibold">Mobile</div>
                      <div className="text-muted-foreground">&lt; 768px</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="font-semibold">Tablet</div>
                      <div className="text-muted-foreground">768px - 1024px</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="font-semibold">Desktop</div>
                      <div className="text-muted-foreground">1024px - 1440px</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="font-semibold">Large</div>
                      <div className="text-muted-foreground">&gt; 1440px</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}