#!/usr/bin/env python3
"""
Startup script for the Knee Osteoporosis Prediction API
"""

import uvicorn
from app_fastapi import app

if __name__ == "__main__":
    uvicorn.run(
        "app_fastapi:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 