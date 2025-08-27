# train_model.py
import torch
import torchvision.transforms as transforms
from torch.utils.data import DataLoader, Dataset
from PIL import Image
import os
import numpy as np
import xgboost as xgb
import joblib
from feature_extractor import CNNFeatureExtractor
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score


class XRayDataset(Dataset):
    def __init__(self, image_paths, labels, transform=None):
        self.image_paths = image_paths
        self.labels = labels
        self.transform = transform

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        image_path = self.image_paths[idx]
        label = self.labels[idx]
        
        # Load and preprocess image
        image = Image.open(image_path).convert('RGB')
        if self.transform:
            image = self.transform(image)
        
        return image, label


def create_dataloader(image_dir, label_file, batch_size=32):
    """
    Create dataloader from image directory and label file
    
    Args:
        image_dir: Directory containing X-ray images
        label_file: CSV file with image paths and labels
        batch_size: Batch size for dataloader
    """
    # Define transforms
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                           std=[0.229, 0.224, 0.225])
    ])
    
    # Load labels (assuming CSV format: image_path,label)
    import pandas as pd
    df = pd.read_csv(label_file)
    image_paths = [os.path.join(image_dir, path) for path in df['image_path']]
    labels = df['label'].values
    
    # Create dataset and dataloader
    dataset = XRayDataset(image_paths, labels, transform)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=False)
    
    return dataloader


def train_xgboost_model(X_train, y_train, X_val, y_val):
    """
    Train XGBoost model on extracted features
    """
    # Define XGBoost parameters
    params = {
        'objective': 'binary:logistic',
        'eval_metric': 'logloss',
        'max_depth': 6,
        'learning_rate': 0.1,
        'n_estimators': 100,
        'subsample': 0.8,
        'colsample_bytree': 0.8,
        'random_state': 42
    }
    
    # Create and train model
    model = xgb.XGBClassifier(**params)
    model.fit(X_train, y_train, 
              eval_set=[(X_val, y_val)],
              early_stopping_rounds=10,
              verbose=True)
    
    return model


def main():
    """
    Main training pipeline
    """
    print("Starting Osteoporosis Risk Assessment Model Training...")
    
    # Configuration
    IMAGE_DIR = "data/xray_images"  # Update with your image directory
    LABEL_FILE = "data/labels.csv"   # Update with your label file
    BATCH_SIZE = 32
    DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    print(f"Using device: {DEVICE}")
    
    # Check if data exists
    if not os.path.exists(IMAGE_DIR):
        print(f"Image directory not found: {IMAGE_DIR}")
        print("Please update IMAGE_DIR in the script or create the directory")
        return
    
    if not os.path.exists(LABEL_FILE):
        print(f"Label file not found: {LABEL_FILE}")
        print("Please update LABEL_FILE in the script or create the file")
        return
    
    try:
        # Create dataloader
        print("Creating dataloader...")
        dataloader = create_dataloader(IMAGE_DIR, LABEL_FILE, BATCH_SIZE)
        
        # Initialize feature extractor
        print("Initializing feature extractor...")
        feature_extractor = CNNFeatureExtractor(backbone='resnet50', device=DEVICE)
        
        # Extract features
        print("Extracting features...")
        X, y = feature_extractor.extract_features(dataloader)
        print(f"Extracted features shape: {X.shape}")
        print(f"Labels shape: {y.shape}")
        
        # Split data
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Train XGBoost model
        print("Training XGBoost model...")
        model = train_xgboost_model(X_train, y_train, X_val, y_val)
        
        # Evaluate model
        print("Evaluating model...")
        y_pred = model.predict(X_val)
        accuracy = accuracy_score(y_val, y_pred)
        print(f"Validation Accuracy: {accuracy:.4f}")
        print("\nClassification Report:")
        print(classification_report(y_val, y_pred))
        
        # Save model
        print("Saving model...")
        joblib.dump(model, 'xgb_cnn_features.joblib')
        print("Model saved as 'xgb_cnn_features.joblib'")
        
        # Save features for later use
        np.save('extracted_features.npy', X)
        np.save('feature_labels.npy', y)
        print("Features saved as 'extracted_features.npy'")
        print("Labels saved as 'feature_labels.npy'")
        
        print("Training completed successfully!")
        
    except Exception as e:
        print(f"Error during training: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main() 