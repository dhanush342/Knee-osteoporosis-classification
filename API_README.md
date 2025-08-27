# Knee Osteoporosis Prediction API

This FastAPI backend provides an API for predicting knee osteoporosis risk from X-ray images using a combination of CNN (ResNet50) and XGBoost models.

## Features

- **Image Upload**: Accept X-ray images via POST request
- **ML Prediction**: Uses pre-trained ResNet50 + XGBoost model
- **SHAP Explanations**: Provides model interpretability
- **FastAPI**: Modern, fast web framework with automatic API documentation

## Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Model Files Required

Make sure you have the following model files in your project directory:
- `resnet50_backbone.pth` - Pre-trained ResNet50 backbone
- `xgb_cnn_features.joblib` - Trained XGBoost classifier

### 3. Run the API Server

```bash
# Option 1: Using the startup script
python run_api.py

# Option 2: Using uvicorn directly
uvicorn app_fastapi:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at: `http://localhost:8000`

## API Endpoints

### GET `/`
- **Description**: Health check endpoint
- **Response**: Confirmation that the API is running

### POST `/predict`
- **Description**: Predict osteoporosis risk from X-ray image
- **Input**: Image file (multipart/form-data)
- **Response**: 
  ```json
  {
    "prediction": 0,
    "probabilities": [0.8, 0.2],
    "shap_values": [...]
  }
  ```

## API Documentation

Once the server is running, you can access:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`

## Model Architecture

1. **Feature Extraction**: ResNet50 backbone (without final classification layer)
2. **Classification**: XGBoost model trained on extracted features
3. **Explanation**: SHAP values for model interpretability

## Error Handling

The API includes comprehensive error handling for:
- Invalid image formats
- Missing model files
- Processing errors
- File upload issues

## Development

- **Hot Reload**: Enabled for development
- **Logging**: Configured with info level
- **CORS**: Can be configured for frontend integration

## Integration with Frontend

This API can be integrated with your React frontend by:
1. Sending POST requests to `/predict` endpoint
2. Handling the JSON response
3. Displaying predictions and explanations
4. Error handling for failed requests 