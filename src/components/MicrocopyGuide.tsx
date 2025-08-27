import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Upload, 
  Brain, 
  Download, 
  AlertTriangle, 
  FileText,
  RefreshCw
} from 'lucide-react';

export function MicrocopyGuide() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Microcopy & Button Labels Guide</h1>
        <p className="text-lg text-muted-foreground">
          Professional clinical interface copy for osteoporosis detection platform
        </p>
      </div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="buttons">Button Labels</TabsTrigger>
          <TabsTrigger value="messages">Status Messages</TabsTrigger>
          <TabsTrigger value="clinical">Clinical Copy</TabsTrigger>
          <TabsTrigger value="errors">Error Handling</TabsTrigger>
        </TabsList>

        {/* Button Labels */}
        <TabsContent value="buttons">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Actions
                </CardTitle>
                <CardDescription>File upload and selection buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Primary Upload</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-teal-50 rounded">
                      <span className="text-sm">Choose X-ray File</span>
                      <Badge variant="outline" className="text-xs">Recommended</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Upload X-ray Image</span>
                      <Badge variant="outline" className="text-xs">Alternative</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Browse Files</span>
                      <Badge variant="outline" className="text-xs">Simple</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Upload States</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <strong>Uploading:</strong> "Uploading... 45%"
                    </div>
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <strong>Success:</strong> "Upload Complete ✓"
                    </div>
                    <div className="p-2 bg-red-50 rounded text-sm">
                      <strong>Failed:</strong> "Upload Failed - Retry"
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">File Management</h5>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Remove:</strong> "Remove File" or "Delete"</p>
                    <p>• <strong>Replace:</strong> "Choose Different File"</p>
                    <p>• <strong>Preview:</strong> "View Full Size"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Analysis Actions
                </CardTitle>
                <CardDescription>AI processing and analysis buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Start Analysis</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">Analyze X-ray</span>
                      <Badge variant="outline" className="text-xs">Primary</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Start AI Analysis</span>
                      <Badge variant="outline" className="text-xs">Clear</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Run Osteoporosis Detection</span>
                      <Badge variant="outline" className="text-xs">Specific</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Processing States</h5>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Running:</strong> "Analyzing..." or "Processing"</p>
                    <p>• <strong>Cancel:</strong> "Stop Analysis"</p>
                    <p>• <strong>Retry:</strong> "Retry Analysis"</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">View Controls</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-orange-50 rounded text-sm">
                      <strong>Heatmap:</strong> "Show Risk Areas" / "Hide Heatmap"
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <strong>Zoom:</strong> "Zoom In" / "Fit to Screen"
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export & Share
                </CardTitle>
                <CardDescription>Results sharing and download options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Download Options</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Download Report (PDF)</span>
                      <Badge variant="outline" className="text-xs">Recommended</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Export Results</span>
                      <Badge variant="outline" className="text-xs">Generic</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Save Analysis Report</span>
                      <Badge variant="outline" className="text-xs">Clear</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Sharing Actions</h5>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Email:</strong> "Email to Doctor"</p>
                    <p>• <strong>EHR:</strong> "Add to Patient Record"</p>
                    <p>• <strong>Print:</strong> "Print Report"</p>
                    <p>• <strong>Link:</strong> "Copy Shareable Link"</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Clinical Actions</h5>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Review:</strong> "Mark as Reviewed"</p>
                    <p>• <strong>Specialist:</strong> "Request Specialist Review"</p>
                    <p>• <strong>Follow-up:</strong> "Schedule Follow-up"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Navigation & Flow
                </CardTitle>
                <CardDescription>App navigation and workflow buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Navigation</h5>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Back:</strong> "← Back to Dashboard"</p>
                    <p>• <strong>Home:</strong> "Return to Home"</p>
                    <p>• <strong>New:</strong> "New Analysis"</p>
                    <p>• <strong>History:</strong> "View Previous Scans"</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Workflow Actions</h5>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Continue:</strong> "Continue" or "Next Step"</p>
                    <p>• <strong>Cancel:</strong> "Cancel Analysis"</p>
                    <p>• <strong>Save Draft:</strong> "Save for Later"</p>
                    <p>• <strong>Start Over:</strong> "New Analysis"</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Settings & Help</h5>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Settings:</strong> "Settings" or "Preferences"</p>
                    <p>• <strong>Help:</strong> "Help & Support"</p>
                    <p>• <strong>Tutorial:</strong> "How to Use"</p>
                    <p>• <strong>Contact:</strong> "Contact Support"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Status Messages */}
        <TabsContent value="messages">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status Messages & Notifications</CardTitle>
                <CardDescription>User feedback and system status communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Upload Status</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <p className="text-sm font-medium">Uploading X-ray image...</p>
                        <p className="text-xs text-muted-foreground">Please wait while we process your file</p>
                      </div>
                      <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                        <p className="text-sm font-medium">Upload successful!</p>
                        <p className="text-xs text-muted-foreground">Your X-ray is ready for analysis</p>
                      </div>
                      <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                        <p className="text-sm font-medium">Upload failed</p>
                        <p className="text-xs text-muted-foreground">Please check file format and try again</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Analysis Status</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                        <p className="text-sm font-medium">AI analysis in progress...</p>
                        <p className="text-xs text-muted-foreground">This may take 15-30 seconds</p>
                      </div>
                      <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                        <p className="text-sm font-medium">Analysis complete</p>
                        <p className="text-xs text-muted-foreground">Results are ready for review</p>
                      </div>
                      <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                        <p className="text-sm font-medium">Low confidence result</p>
                        <p className="text-xs text-muted-foreground">Please review image quality and consider retaking</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h4 className="font-semibold text-lg">Processing Steps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded text-center">
                      <div className="font-medium text-sm">Preprocessing</div>
                      <div className="text-xs text-muted-foreground">Preparing image for analysis</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded text-center">
                      <div className="font-medium text-sm">AI Inference</div>
                      <div className="text-xs text-muted-foreground">Running deep learning model</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded text-center">
                      <div className="font-medium text-sm">Generating Heatmap</div>
                      <div className="text-xs text-muted-foreground">Creating visual explanation</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded text-center">
                      <div className="font-medium text-sm">Finalizing Report</div>
                      <div className="text-xs text-muted-foreground">Compiling results</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Clinical Copy */}
        <TabsContent value="clinical">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Clinical Interface Copy
                </CardTitle>
                <CardDescription>Professional medical terminology and explanations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Risk Level Descriptions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-green-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-green-700">Normal</CardTitle>
                          <Badge className="w-fit bg-green-100 text-green-800">Low Risk</Badge>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p><strong>Primary:</strong> "Bone density appears normal for patient demographics"</p>
                          <p><strong>Secondary:</strong> "No significant indicators of osteoporosis detected"</p>
                          <p><strong>Action:</strong> "Continue preventive care and routine monitoring"</p>
                        </CardContent>
                      </Card>

                      <Card className="border-yellow-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-yellow-700">Osteopenia</CardTitle>
                          <Badge className="w-fit bg-yellow-100 text-yellow-800">Moderate Risk</Badge>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p><strong>Primary:</strong> "Low bone mass detected (T-score: -1.0 to -2.5)"</p>
                          <p><strong>Secondary:</strong> "Increased risk of developing osteoporosis"</p>
                          <p><strong>Action:</strong> "Preventive intervention recommended"</p>
                        </CardContent>
                      </Card>

                      <Card className="border-red-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-red-700">Osteoporosis</CardTitle>
                          <Badge className="w-fit bg-red-100 text-red-800">High Risk</Badge>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p><strong>Primary:</strong> "Osteoporosis detected (T-score ≤ -2.5)"</p>
                          <p><strong>Secondary:</strong> "Significant bone density loss with increased fracture risk"</p>
                          <p><strong>Action:</strong> "Immediate medical intervention required"</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Clinical Recommendations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h5 className="font-medium">Immediate Actions</h5>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Schedule bone density scan (DEXA)</li>
                          <li>Consult with endocrinologist or rheumatologist</li>
                          <li>Review current medications for bone impact</li>
                          <li>Assess fall risk and home safety</li>
                          <li>Order laboratory tests (vitamin D, calcium, PTH)</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="font-medium">Lifestyle Interventions</h5>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Increase dietary calcium intake (1200mg daily)</li>
                          <li>Ensure adequate vitamin D (800-1000 IU daily)</li>
                          <li>Implement weight-bearing exercise program</li>
                          <li>Balance and strength training exercises</li>
                          <li>Smoking cessation and alcohol moderation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Technical Explanations</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">AI Analysis Explanation</h5>
                      <p className="text-sm mb-3">
                        "Our deep learning model analyzes X-ray images using convolutional neural networks 
                        trained on thousands of bone density cases. The AI identifies patterns in bone 
                        trabecular structure and cortical thickness to assess osteoporosis risk."
                      </p>
                      <p className="text-sm">
                        <strong>Confidence Score:</strong> Indicates the model's certainty in its prediction. 
                        Scores below 70% may require additional clinical assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Error Handling */}
        <TabsContent value="errors">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Error Messages & Validation
                </CardTitle>
                <CardDescription>Clear error communication and recovery guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">File Upload Errors</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Invalid file format</p>
                            <p className="text-xs text-red-600">Please upload a JPEG, PNG, or DICOM file. Other formats are not supported.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-red-800">File too large</p>
                            <p className="text-xs text-red-600">Maximum file size is 50MB. Please compress your image or use a different file.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Upload failed</p>
                            <p className="text-xs text-red-600">Network error occurred. Please check your connection and try again.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Analysis Errors</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-orange-800">Poor image quality</p>
                            <p className="text-xs text-orange-600">Image quality is too low for accurate analysis. Please upload a higher resolution X-ray.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-orange-800">Unable to detect bone structure</p>
                            <p className="text-xs text-orange-600">AI cannot identify bone regions clearly. Ensure X-ray shows hip or spine clearly.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Analysis failed</p>
                            <p className="text-xs text-red-600">Technical error occurred during processing. Please try again or contact support.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">System Errors</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Service temporarily unavailable</p>
                            <p className="text-xs text-gray-600">Our analysis service is undergoing maintenance. Please try again in a few minutes.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-800">Session expired</p>
                            <p className="text-xs text-blue-600">Please log in again to continue using the platform.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Recovery Actions</h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Error Recovery Buttons</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <Badge variant="outline" className="justify-center">Try Again</Badge>
                        <Badge variant="outline" className="justify-center">Upload Different File</Badge>
                        <Badge variant="outline" className="justify-center">Contact Support</Badge>
                        <Badge variant="outline" className="justify-center">Go Back</Badge>
                      </div>
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