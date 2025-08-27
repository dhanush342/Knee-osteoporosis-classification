# model_utils.py
import torch
import numpy as np
import cv2
from torchvision import models, transforms
import torch.nn.functional as F
import matplotlib.pyplot as plt
from PIL import Image


# small grad-cam implementation for ResNet50
class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        self.hook()
    
    def hook(self):
        def forward_hook(module, inp, out):
            self.activations = out.detach()
        
        def backward_hook(module, grad_in, grad_out):
            self.gradients = grad_out[0].detach()
        
        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_backward_hook(backward_hook)
    
    def __call__(self, input_tensor, class_idx=None):
        self.model.zero_grad()
        out = self.model(input_tensor)
        
        if class_idx is None:
            class_idx = torch.argmax(out, dim=1).item()
        
        loss = out[0, class_idx]
        loss.backward(retain_graph=True)
        
        weights = self.gradients.mean(dim=(2,3), keepdim=True)
        cam = (weights * self.activations).sum(dim=1, keepdim=True)
        cam = F.relu(cam)
        cam = cam.squeeze().cpu().numpy()
        cam = cv2.resize(cam, (input_tensor.size(3), input_tensor.size(2)))
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        
        return cam


class ModelInterpreter:
    """Enhanced model interpretation utilities"""
    
    def __init__(self, model, device='cpu'):
        self.model = model
        self.device = device
        self.model.eval()
        
        # Standard ImageNet transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                               std=[0.229, 0.224, 0.225])
        ])
        
        # Inverse transform for visualization
        self.inv_transform = transforms.Compose([
            transforms.Normalize(mean=[0, 0, 0],
                               std=[1/0.229, 1/0.224, 1/0.406]),
            transforms.Normalize(mean=[-0.485, -0.456, -0.406],
                               std=[1, 1, 1])
        ])
    
    def preprocess_image(self, image_path):
        """Preprocess image for model input"""
        if isinstance(image_path, str):
            image = Image.open(image_path).convert('RGB')
        else:
            image = image_path
        
        # Apply transforms
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)
        return input_tensor, image
    
    def get_prediction(self, input_tensor):
        """Get model prediction and confidence"""
        with torch.no_grad():
            output = self.model(input_tensor)
            probabilities = F.softmax(output, dim=1)
            predicted_class = torch.argmax(output, dim=1).item()
            confidence = probabilities[0, predicted_class].item()
        
        return predicted_class, confidence, probabilities
    
    def visualize_gradcam(self, image_path, target_layer, class_idx=None, save_path=None):
        """Generate and visualize GradCAM heatmap"""
        # Preprocess image
        input_tensor, original_image = self.preprocess_image(image_path)
        
        # Initialize GradCAM
        grad_cam = GradCAM(self.model, target_layer)
        
        # Generate heatmap
        heatmap = grad_cam(input_tensor, class_idx)
        
        # Convert heatmap to RGB
        heatmap_rgb = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)
        heatmap_rgb = cv2.cvtColor(heatmap_rgb, cv2.COLOR_BGR2RGB)
        
        # Resize heatmap to match original image
        original_size = original_image.size[::-1]  # PIL size is (width, height)
        heatmap_resized = cv2.resize(heatmap_rgb, original_size)
        
        # Overlay heatmap on original image
        original_array = np.array(original_image)
        overlay = heatmap_resized * 0.7 + original_array * 0.3
        overlay = np.clip(overlay, 0, 255).astype(np.uint8)
        
        # Create visualization
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))
        
        # Original image
        axes[0].imshow(original_image)
        axes[0].set_title('Original Image')
        axes[0].axis('off')
        
        # Heatmap
        axes[1].imshow(heatmap, cmap='jet')
        axes[1].set_title('GradCAM Heatmap')
        axes[1].axis('off')
        
        # Overlay
        axes[2].imshow(overlay)
        axes[2].set_title('GradCAM Overlay')
        axes[2].axis('off')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()
        
        return heatmap, overlay
    
    def get_feature_maps(self, input_tensor, target_layer):
        """Extract feature maps from a specific layer"""
        feature_maps = []
        
        def hook_fn(module, input, output):
            feature_maps.append(output.detach())
        
        handle = target_layer.register_forward_hook(hook_fn)
        
        with torch.no_grad():
            self.model(input_tensor)
        
        handle.remove()
        
        if feature_maps:
            return feature_maps[0]
        return None
    
    def visualize_feature_maps(self, input_tensor, target_layer, num_features=16, save_path=None):
        """Visualize feature maps from a specific layer"""
        feature_maps = self.get_feature_maps(input_tensor, target_layer)
        
        if feature_maps is None:
            print("No feature maps found")
            return
        
        # Select features to visualize
        num_channels = feature_maps.size(1)
        indices = torch.linspace(0, num_channels-1, num_features).long()
        selected_features = feature_maps[0, indices]
        
        # Create grid
        fig, axes = plt.subplots(4, 4, figsize=(12, 12))
        axes = axes.ravel()
        
        for i, feature in enumerate(selected_features):
            feature_np = feature.cpu().numpy()
            axes[i].imshow(feature_np, cmap='viridis')
            axes[i].set_title(f'Feature {indices[i].item()}')
            axes[i].axis('off')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()


def create_resnet_model(pretrained=True, num_classes=2):
    """Create and configure ResNet model for osteoporosis classification"""
    model = models.resnet50(pretrained=pretrained)
    
    # Modify final layer for binary classification
    if num_classes == 2:
        model.fc = torch.nn.Sequential(
            torch.nn.Dropout(0.5),
            torch.nn.Linear(2048, 512),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.3),
            torch.nn.Linear(512, num_classes)
        )
    else:
        model.fc = torch.nn.Linear(2048, num_classes)
    
    return model


def load_model_weights(model, weights_path, device='cpu'):
    """Load pre-trained model weights"""
    try:
        checkpoint = torch.load(weights_path, map_location=device)
        
        if 'state_dict' in checkpoint:
            model.load_state_dict(checkpoint['state_dict'])
        else:
            model.load_state_dict(checkpoint)
        
        model.eval()
        print(f"Model weights loaded successfully from {weights_path}")
        return model
    
    except Exception as e:
        print(f"Error loading model weights: {e}")
        return None


def save_model_checkpoint(model, optimizer, epoch, loss, save_path):
    """Save model checkpoint during training"""
    checkpoint = {
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'loss': loss,
    }
    
    torch.save(checkpoint, save_path)
    print(f"Checkpoint saved to {save_path}")


def calculate_model_metrics(y_true, y_pred, y_proba=None):
    """Calculate comprehensive model evaluation metrics"""
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
    
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred, average='weighted'),
        'recall': recall_score(y_true, y_pred, average='weighted'),
        'f1_score': f1_score(y_true, y_pred, average='weighted'),
    }
    
    if y_proba is not None:
        try:
            metrics['roc_auc'] = roc_auc_score(y_true, y_proba[:, 1])
        except:
            metrics['roc_auc'] = None
    
    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    metrics['confusion_matrix'] = cm
    
    return metrics 