import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Database, 
  Settings, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  BarChart3
} from 'lucide-react';

export function MLTrainingPlan() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Machine Learning Training Plan</h1>
        <p className="text-lg text-muted-foreground">
          Step-by-step guide for building an advanced osteoporosis detection model
        </p>
      </div>

      {/* Phase 1: Data Collection & Preprocessing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            Phase 1: Data Collection & Preprocessing
          </CardTitle>
          <CardDescription>Foundation setup and data preparation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">1.1 Data Collection</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Collect 3,000+ X-ray images with labels (Normal, Osteopenia, Osteoporosis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Gather clinical metadata: age, gender, BMI, medical history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ensure data privacy compliance (HIPAA, anonymization)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Address class imbalance (typically: 60% Normal, 30% Osteopenia, 10% Osteoporosis)</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">1.2 Image Preprocessing</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Convert DICOM to standard format (PNG/JPEG)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Resize to 224×224 or 320×320 pixels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Normalize pixel values (0-1 range)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Apply histogram equalization for contrast enhancement</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Data Augmentation Pipeline</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Badge variant="outline">Random Rotation (±15°)</Badge>
              <Badge variant="outline">Horizontal Flip</Badge>
              <Badge variant="outline">Brightness (±20%)</Badge>
              <Badge variant="outline">Zoom (0.8-1.2x)</Badge>
              <Badge variant="outline">Gaussian Noise</Badge>
              <Badge variant="outline">Small Translation</Badge>
              <Badge variant="outline">Contrast Adjustment</Badge>
              <Badge variant="outline">Elastic Deformation</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase 2: Model Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Phase 2: Model Architecture & Selection
          </CardTitle>
          <CardDescription>Choose and configure the deep learning model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Recommended: EfficientNet-B3</CardTitle>
                <Badge className="w-fit bg-purple-100 text-purple-800">Best Performance</Badge>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Pre-trained on ImageNet</p>
                <p>• 12M parameters (efficient)</p>
                <p>• 300×300 input resolution</p>
                <p>• Best accuracy/efficiency tradeoff</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alternative: ResNet50</CardTitle>
                <Badge variant="outline">Baseline Option</Badge>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Well-established architecture</p>
                <p>• 25M parameters</p>
                <p>• 224×224 input resolution</p>
                <p>• Good for comparison</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced: Vision Transformer</CardTitle>
                <Badge variant="outline">Experimental</Badge>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Attention-based architecture</p>
                <p>• Requires more data</p>
                <p>• Better interpretability</p>
                <p>• Higher computational cost</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3">Model Configuration</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="font-medium mb-2">Image Branch</h6>
                <ul className="text-sm space-y-1">
                  <li>• EfficientNet-B3 backbone (frozen initially)</li>
                  <li>• Global Average Pooling</li>
                  <li>• Dropout layer (0.3)</li>
                  <li>• Dense layer (512 units, ReLU)</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium mb-2">Clinical Data Branch</h6>
                <ul className="text-sm space-y-1">
                  <li>• Input: age, gender, BMI, history</li>
                  <li>• Dense layer (128 units, ReLU)</li>
                  <li>• Dropout layer (0.2)</li>
                  <li>• Dense layer (64 units, ReLU)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h6 className="font-medium mb-2">Fusion & Output</h6>
              <ul className="text-sm space-y-1">
                <li>• Concatenate image + clinical features</li>
                <li>• Dense layer (256 units, ReLU)</li>
                <li>• Output layer (3 units, Softmax) → [Normal, Osteopenia, Osteoporosis]</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase 3: Training Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-green-600" />
            Phase 3: Training Strategy
          </CardTitle>
          <CardDescription>Optimization and training configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">3.1 Training Configuration</h4>
              <div className="bg-green-50 p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Loss Function:</span>
                    <p>Weighted Cross-Entropy</p>
                  </div>
                  <div>
                    <span className="font-medium">Optimizer:</span>
                    <p>AdamW (lr=1e-4)</p>
                  </div>
                  <div>
                    <span className="font-medium">Batch Size:</span>
                    <p>32 (adjust for GPU memory)</p>
                  </div>
                  <div>
                    <span className="font-medium">Epochs:</span>
                    <p>50 (with early stopping)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">3.2 Learning Schedule</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Phase 1</Badge>
                  <span>Freeze backbone, train head (10 epochs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Phase 2</Badge>
                  <span>Unfreeze top layers, lower LR (20 epochs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Phase 3</Badge>
                  <span>Fine-tune all layers (20 epochs)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Training Code Template</h5>
            <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
{`# Example training configuration
model = create_osteoporosis_model()
optimizer = AdamW(model.parameters(), lr=1e-4, weight_decay=1e-4)
scheduler = CosineAnnealingLR(optimizer, T_max=50)

# Class weights for imbalanced dataset
class_weights = torch.tensor([0.5, 1.0, 2.0])  # Normal, Osteopenia, Osteoporosis
criterion = CrossEntropyLoss(weight=class_weights)

# Training loop with mixed precision
scaler = GradScaler()
for epoch in range(num_epochs):
    train_loss = train_epoch(model, train_loader, optimizer, criterion, scaler)
    val_loss, val_acc = validate(model, val_loader, criterion)
    scheduler.step()`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Phase 4: Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-600" />
            Phase 4: Model Evaluation & Validation
          </CardTitle>
          <CardDescription>Comprehensive performance assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">4.1 Performance Metrics</h4>
              <div className="space-y-3">
                <div className="bg-orange-50 p-3 rounded">
                  <h6 className="font-medium mb-2">Primary Metrics</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Overall Accuracy (target: &gt;90%)</li>
                    <li>• Per-class Precision & Recall</li>
                    <li>• F1-Score for each stage</li>
                    <li>• AUC-ROC (one-vs-rest)</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h6 className="font-medium mb-2">Clinical Metrics</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Sensitivity for Osteoporosis (&gt;95%)</li>
                    <li>• Specificity for Normal cases</li>
                    <li>• False Positive Rate</li>
                    <li>• Calibration Score</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">4.2 Validation Strategy</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>5-fold stratified cross-validation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Hold-out test set (20% of data)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>External validation on different hospital data</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Temporal validation (different time periods)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3">Expected Performance Targets</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded">
                <div className="text-2xl font-bold text-green-600">92%+</div>
                <div className="text-sm">Overall Accuracy</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-2xl font-bold text-blue-600">95%+</div>
                <div className="text-sm">Osteoporosis Sensitivity</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-2xl font-bold text-purple-600">0.94+</div>
                <div className="text-sm">Weighted F1-Score</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase 5: Explainability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-600" />
            Phase 5: Model Explainability & Deployment
          </CardTitle>
          <CardDescription>Making AI decisions interpretable for clinicians</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">5.1 Explainability Tools</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Grad-CAM:</strong> Visual heatmaps showing important regions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>LIME:</strong> Local feature importance explanations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>SHAP:</strong> Feature contribution analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Attention Maps:</strong> Model focus visualization</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">5.2 Deployment Checklist</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Model optimization (ONNX/TensorRT)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>API endpoint with FastAPI/Flask</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Docker containerization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Model versioning & monitoring</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Implementation Timeline</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-4">
                <Badge className="bg-gray-100 text-gray-800 min-w-fit">Weeks 1-2</Badge>
                <span>Data collection, cleaning, and preprocessing pipeline</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-100 text-blue-800 min-w-fit">Weeks 3-4</Badge>
                <span>Model architecture design and initial training</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-yellow-100 text-yellow-800 min-w-fit">Weeks 5-6</Badge>
                <span>Hyperparameter tuning and optimization</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-800 min-w-fit">Weeks 7-8</Badge>
                <span>Validation, explainability, and deployment</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}