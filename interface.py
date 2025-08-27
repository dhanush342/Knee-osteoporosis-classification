# interface.py
import joblib
import torch
from torchvision.models import resnet50
from PIL import Image
import numpy as np
import os
from typing import Tuple, Optional, Dict, Any
import warnings

# Globals (will be loaded lazily)
xgb_clf = None
resnet_model = None
model_loaded = False

def load_models(model_dir: str = ".") -> bool:
    """
    Load XGBoost and ResNet models from specified directory
    
    Args:
        model_dir: Directory containing model files
        
    Returns:
        bool: True if models loaded successfully, False otherwise
    """
    global xgb_clf, resnet_model, model_loaded
    
    if model_loaded:
        return True
    
    try:
        print("Loading models...")
        
        # Load XGBoost classifier
        xgb_path = os.path.join(model_dir, "xgb_cnn_features.joblib")
        if not os.path.exists(xgb_path):
            raise FileNotFoundError(f"XGBoost model not found at {xgb_path}")
        
        xgb_clf = joblib.load(xgb_path)
        print(f"✓ XGBoost model loaded from {xgb_path}")
        
        # Load ResNet backbone
        resnet_path = os.path.join(model_dir, "resnet50_backbone.pth")
        if not os.path.exists(resnet_path):
            raise FileNotFoundError(f"ResNet model not found at {resnet_path}")
        
        resnet_model = resnet50(pretrained=False)
        resnet_model.fc = torch.nn.Identity()  # Remove final classification layer
        resnet_model.load_state_dict(torch.load(resnet_path, map_location="cpu"))
        resnet_model.eval()
        print(f"✓ ResNet backbone loaded from {resnet_path}")
        
        model_loaded = True
        print("✓ All models loaded successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error loading models: {str(e)}")
        return False

def preprocess_image(image_path: str, target_size: Tuple[int, int] = (224, 224)) -> torch.Tensor:
    """
    Preprocess image for model input
    
    Args:
        image_path: Path to the image file
        target_size: Target size for resizing (width, height)
        
    Returns:
        torch.Tensor: Preprocessed image tensor
    """
    try:
        # Load and convert image
        image = Image.open(image_path).convert("RGB")
        
        # Resize image
        image = image.resize(target_size)
        
        # Convert to tensor and normalize
        image_array = np.array(image)
        image_tensor = torch.tensor(image_array).permute(2, 0, 1).unsqueeze(0).float() / 255.0
        
        return image_tensor
        
    except Exception as e:
        raise ValueError(f"Error preprocessing image {image_path}: {str(e)}")

def extract_features(image_tensor: torch.Tensor) -> np.ndarray:
    """
    Extract features using ResNet backbone
    
    Args:
        image_tensor: Preprocessed image tensor
        
    Returns:
        np.ndarray: Extracted features
    """
    global resnet_model
    
    if resnet_model is None:
        raise RuntimeError("ResNet model not loaded. Call load_models() first.")
    
    with torch.no_grad():
        features = resnet_model(image_tensor).numpy()
    
    return features

def predict(image_path: str, return_probabilities: bool = True) -> Dict[str, Any]:
    """
    Make prediction on an image
    
    Args:
        image_path: Path to the image file
        return_probabilities: Whether to return prediction probabilities
        
    Returns:
        Dict containing prediction results
    """
    global xgb_clf
    
    if not model_loaded:
        if not load_models():
            raise RuntimeError("Failed to load models")
    
    if xgb_clf is None:
        raise RuntimeError("XGBoost model not loaded")
    
    try:
        # Preprocess image
        image_tensor = preprocess_image(image_path)
        
        # Extract features
        features = extract_features(image_tensor)
        
        # Make prediction
        prediction = xgb_clf.predict(features)[0]
        
        result = {
            "prediction": int(prediction),
            "prediction_label": "Osteoporosis" if prediction == 1 else "No Osteoporosis",
            "image_path": image_path
        }
        
        # Add probabilities if requested
        if return_probabilities and hasattr(xgb_clf, 'predict_proba'):
            probabilities = xgb_clf.predict_proba(features)[0]
            result["probabilities"] = {
                "no_osteoporosis": float(probabilities[0]),
                "osteoporosis": float(probabilities[1])
            }
            result["confidence"] = float(max(probabilities))
        
        return result
        
    except Exception as e:
        raise RuntimeError(f"Error during prediction: {str(e)}")

def predict_batch(image_paths: list, return_probabilities: bool = True) -> list:
    """
    Make predictions on multiple images
    
    Args:
        image_paths: List of image file paths
        return_probabilities: Whether to return prediction probabilities
        
    Returns:
        List of prediction results
    """
    results = []
    
    for i, image_path in enumerate(image_paths):
        try:
            print(f"Processing image {i+1}/{len(image_paths)}: {os.path.basename(image_path)}")
            result = predict(image_path, return_probabilities)
            results.append(result)
        except Exception as e:
            print(f"Error processing {image_path}: {str(e)}")
            results.append({
                "error": str(e),
                "image_path": image_path
            })
    
    return results

def get_model_info() -> Dict[str, Any]:
    """
    Get information about loaded models
    
    Returns:
        Dict containing model information
    """
    if not model_loaded:
        return {"status": "Models not loaded"}
    
    info = {
        "status": "Models loaded",
        "xgb_model": {
            "type": type(xgb_clf).__name__,
            "n_classes": getattr(xgb_clf, 'n_classes_', 'Unknown'),
            "n_features": getattr(xgb_clf, 'n_features_in_', 'Unknown')
        },
        "resnet_model": {
            "type": "ResNet50",
            "backbone_layers": len(list(resnet_model.children())),
            "feature_dim": 2048
        }
    }
    
    return info

def validate_image(image_path: str) -> bool:
    """
    Validate if image file exists and is readable
    
    Args:
        image_path: Path to the image file
        
    Returns:
        bool: True if image is valid, False otherwise
    """
    try:
        if not os.path.exists(image_path):
            return False
        
        # Try to open the image
        with Image.open(image_path) as img:
            img.verify()
        
        return True
        
    except Exception:
        return False

if __name__ == "__main__":
    # Interactive mode
    print("=== Osteoporosis Risk Assessment Interface ===")
    
    # Load models
    if not load_models():
        print("Failed to load models. Exiting.")
        exit(1)
    
    # Get model info
    info = get_model_info()
    print(f"\nModel Information:")
    print(f"Status: {info['status']}")
    print(f"XGBoost: {info['xgb_model']['type']}")
    print(f"ResNet: {info['resnet_model']['type']}")
    
    while True:
        try:
            img_path = input("\nEnter image path (or 'quit' to exit): ").strip()
            
            if img_path.lower() in ['quit', 'exit', 'q']:
                print("Goodbye!")
                break
            
            if not validate_image(img_path):
                print("❌ Invalid image path or file not readable")
                continue
            
            # Make prediction
            result = predict(img_path)
            
            print(f"\n=== Prediction Results ===")
            print(f"Image: {os.path.basename(img_path)}")
            print(f"Prediction: {result['prediction_label']}")
            
            if 'probabilities' in result:
                print(f"Confidence: {result['confidence']:.2%}")
                print(f"Probabilities:")
                print(f"  No Osteoporosis: {result['probabilities']['no_osteoporosis']:.2%}")
                print(f"  Osteoporosis: {result['probabilities']['osteoporosis']:.2%}")
            
        except KeyboardInterrupt:
            print("\n\nGoodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {str(e)}") 