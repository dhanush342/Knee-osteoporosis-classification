# app_fastapi.py

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50
import xgboost as xgb
import joblib
import numpy as np
from PIL import Image
import shap
import io
import csv
import os

# -----------------------------
# Load models at startup
# -----------------------------
app = FastAPI(title="Knee Osteoporosis Prediction API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CNN backbone
resnet_model = resnet50()
resnet_model.fc = torch.nn.Identity()  # remove final classification layer
resnet_model.load_state_dict(torch.load("resnet50_backbone.pth", map_location="cpu"))
resnet_model.eval()

# Load XGBoost model
xgb_clf = joblib.load("xgb_cnn_features.joblib")

# SHAP explainer
explainer = shap.TreeExplainer(xgb_clf)

# -----------------------------
# Transform for input images
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# -----------------------------
# Helper functions
# -----------------------------
def extract_features(image: Image.Image):
    img_tensor = transform(image).unsqueeze(0)  # add batch dimension
    with torch.no_grad():
        features = resnet_model(img_tensor)
    return features.numpy()

def append_history_csv(record: dict, path: str = "patienthistory.csv"):
    headers = ["id", "date", "patientName", "patientId", "age", "stage", "risk"]
    write_header = not os.path.exists(path) or os.path.getsize(path) == 0
    with open(path, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        if write_header:
            writer.writeheader()
        writer.writerow({k: record.get(k, "") for k in headers})

# -----------------------------
# API Endpoints
# -----------------------------
@app.get("/")
def root():
    return {"message": "Hello! Knee Osteoporosis Prediction API is running."}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image
        data = await file.read()
        image = Image.open(io.BytesIO(data)).convert("RGB")

        # Extract features and predict
        features = extract_features(image)
        pred = xgb_clf.predict(features)[0]
        pred_proba = xgb_clf.predict_proba(features)[0].tolist()

        # Explain prediction
        shap_values = explainer.shap_values(features)
        explanation = shap_values.tolist()  # convert to JSON serializable

        return JSONResponse({
            "prediction": int(pred),
            "probabilities": pred_proba,
            "shap_values": explanation
        })

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/history")
async def save_history(record: dict):
    try:
        # minimal validation
        required = ["id", "date", "patientName", "patientId", "age", "stage", "risk"]
        for key in required:
            if key not in record:
                return JSONResponse({"error": f"Missing field: {key}"}, status_code=400)
        append_history_csv(record)
        return JSONResponse({"status": "ok"})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)