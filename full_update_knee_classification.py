import os
import numpy as np
from PIL import Image
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
import torch
import torchvision.models as models
import torchvision.transforms as transforms

# -------------------------
# Paths to your image folders
# -------------------------
data_paths = {
    "normal": r"C:\Users\Nagineni Dhanush\Music\Desktop\Osteop\Osteoporosis Knee X-ray\normal",
    "osteopenia": r"C:\Users\Nagineni Dhanush\Music\Desktop\Osteop\Osteoporosis Knee X-ray\osteopenia",
    "osteoporosis": r"C:\Users\Nagineni Dhanush\Music\Desktop\Osteop\Osteoporosis Knee X-ray\osteoporosis"
}

# -------------------------
# Load images and labels
# -------------------------
X = []
y = []

for label, path in data_paths.items():
    for img_file in os.listdir(path):
        img_path = os.path.join(path, img_file)
        try:
            img = Image.open(img_path).convert("RGB").resize((224, 224))
            X.append(img)
            y.append(label)
        except:
            print(f"Failed to load {img_path}")

print(f"Total images: {len(X)}")

# -------------------------
# Encode string labels to integers
# -------------------------
le = LabelEncoder()
y_encoded = le.fit_transform(y)  # normal->0, osteopenia->1, osteoporosis->2

# -------------------------
# Split dataset
# -------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# -------------------------
# Define ResNet50 feature extractor
# -------------------------
resnet = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)
modules = list(resnet.children())[:-1]  # remove the final classification layer
resnet = torch.nn.Sequential(*modules)
resnet.eval()

# Transformation
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                         std=[0.229, 0.224, 0.225])
])

# -------------------------
# Feature extraction
# -------------------------
def extract_features(img_list):
    features = []
    for img in img_list:
        tensor = transform(img).unsqueeze(0)  # shape [1,3,224,224]
        with torch.no_grad():
            feat = resnet(tensor).cpu().numpy().flatten()
        features.append(feat)
    return np.array(features)

print("Extracting train features...")
X_train_feats = extract_features(X_train)

print("Extracting test features...")
X_test_feats = extract_features(X_test)

# -------------------------
# Train XGBoost classifier
# -------------------------
clf = XGBClassifier(use_label_encoder=False, eval_metric="mlogloss")
print("Training classifier...")
clf.fit(X_train_feats, y_train)

# -------------------------
# Evaluate
# -------------------------
train_acc = clf.score(X_train_feats, y_train)
test_acc = clf.score(X_test_feats, y_test)
print(f"Train Accuracy: {train_acc:.4f}")
print(f"Test Accuracy: {test_acc:.4f}")

# -------------------------
# Save model and LabelEncoder
# -------------------------
import joblib
joblib.dump(clf, "xgb_knee_model.pkl")
joblib.dump(le, "label_encoder.pkl")
print("Model and label encoder saved.")
