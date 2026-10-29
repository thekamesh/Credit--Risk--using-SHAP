from contextlib import asynccontextmanager
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "credit_risk_model.pkl"
THRESHOLD_PATH = BASE_DIR / "best_threshold.pkl"

ml_model = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        ml_model["model"] = joblib.load(MODEL_PATH)
        ml_model["threshold"] = float(joblib.load(THRESHOLD_PATH))
    except Exception as exc:
        raise RuntimeError(f"Could not load ML model files: {exc}") from exc

    yield
    ml_model.clear()


app = FastAPI(
    title="Credit Risk Prediction API",
    version="1.0.0",
    lifespan=lifespan
)


app.mount(
    "/static",
    StaticFiles(directory=BASE_DIR / "static"),
    name="static"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoanApplication(BaseModel):
    person_age: int = Field(..., ge=18, le=100)
    person_income: float = Field(..., gt=0)
    person_home_ownership: str
    person_emp_length: float = Field(..., ge=0)
    loan_intent: str
    loan_grade: str
    loan_amnt: float = Field(..., gt=0)
    loan_int_rate: float = Field(..., ge=0)
    loan_percent_income: float = Field(..., ge=0, le=1)
    cb_person_default_on_file: str
    cb_person_cred_hist_length: int = Field(..., ge=0)


@app.get("/", include_in_schema=False)
def home():
    return FileResponse(BASE_DIR / "static" / "index.html")


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": "model" in ml_model
    }


@app.post("/predict")
def predict(data: LoanApplication):

    if "model" not in ml_model:
        raise HTTPException(
            status_code=503,
            detail="ML model is not loaded."
        )

    input_df = pd.DataFrame([data.model_dump()])

    try:
        probability = float(
            ml_model["model"].predict_proba(input_df)[:, 1][0]
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {exc}"
        )

    threshold = float(ml_model["threshold"])

    prediction = int(probability >= threshold)

    return {
        "default_probability": probability,
        "default_prediction": prediction,
        "threshold": threshold,
        "Result": "High Risk" if prediction == 1 else "Low Risk"
    }