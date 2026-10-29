# 💳 Credit Risk Assessment using SHAP

An end-to-end **Machine Learning Credit Risk Assessment System** that predicts whether a loan applicant is likely to default and classifies the applicant as **Low Risk** or **High Risk**.

The project uses **Machine Learning, probability threshold optimization, SHAP explainability, FastAPI, and an interactive web interface** to create a complete ML deployment pipeline.

---

## 🚀 Live Application

🔗 **Live Demo:** 
https://credit-risk-using-shap-sw1h.onrender.com/

🔗 **GitHub Repository:**  
https://github.com/thekamesh/Credit--Risk--using-SHAP

---

## 📌 Project Overview

Credit risk assessment is an important problem in the financial industry.

The goal of this project is to analyze applicant information such as:

- Age
- Income
- Employment length
- Home ownership
- Loan amount
- Loan interest rate
- Loan intent
- Loan grade
- Loan-to-income ratio
- Previous default history
- Credit history length

and predict the probability that an applicant may default on a loan.

The system then uses an optimized classification threshold to classify the applicant into:

🟢 **Low Risk**

or

🔴 **High Risk**

---

## ✨ Key Features

- 🤖 Machine Learning based credit risk prediction
- 📊 Default probability prediction
- 🎯 Optimized decision threshold
- 🔍 SHAP-based model explainability
- ⚡ FastAPI REST API
- 🌐 Interactive web interface
- 🎨 Modern animated UI
- 📱 Responsive design
- 🛡️ Input validation using Pydantic
- ❤️ Health-check endpoint
- ☁️ Deployment-ready for Render
- 🔄 CORS support for frontend/API communication

---

## 🧠 Machine Learning Workflow

The project follows an end-to-end ML pipeline:

```text
Raw Dataset
     ↓
Data Cleaning
     ↓
Exploratory Data Analysis
     ↓
Feature Engineering
     ↓
Categorical Encoding
     ↓
Model Training
     ↓
Model Evaluation
     ↓
Probability Calibration / Threshold Optimization
     ↓
SHAP Explainability
     ↓
Model Serialization
     ↓
FastAPI Deployment
     ↓
Interactive Web Application
```

---

## 📊 Input Features

The API accepts the following features:

| Feature | Description |
|---|---|
| `person_age` | Age of the applicant |
| `person_income` | Annual income |
| `person_home_ownership` | Home ownership status |
| `person_emp_length` | Employment length |
| `loan_intent` | Purpose of the loan |
| `loan_grade` | Loan grade |
| `loan_amnt` | Loan amount |
| `loan_int_rate` | Loan interest rate |
| `loan_percent_income` | Loan amount as a percentage of income |
| `cb_person_default_on_file` | Previous default history |
| `cb_person_cred_hist_length` | Length of credit history |

---

## 🎯 Prediction Output

The API returns:

```json
{
  "default_probability": 0.23,
  "default_prediction": 0,
  "threshold": 0.35,
  "Result": "Low Risk"
}
```

### Prediction Logic

```text
Probability >= Optimized Threshold
              ↓
          High Risk

Probability < Optimized Threshold
              ↓
           Low Risk
```

Using an optimized threshold instead of blindly using `0.50` allows the classification decision to be adjusted according to the model's performance and business objective.

---

## 🔍 SHAP Explainability

SHAP (SHapley Additive exPlanations) is used to understand how different features influence the model's predictions.

SHAP helps answer questions such as:

- Which features are driving credit risk?
- Which features increase default probability?
- Which features decrease default probability?
- How does the model make its decisions?

This makes the ML model more interpretable and useful for a credit-risk application.

---

## 🛠️ Technologies Used

### Programming Language
- Python

### Machine Learning
- Scikit-learn
- XGBoost
- Pandas
- NumPy
- Joblib

### Explainable AI
- SHAP

### Backend
- FastAPI
- Pydantic
- Uvicorn

### Frontend
- HTML
- CSS
- JavaScript

### Deployment
- Render

### Version Control
- Git
- GitHub

---

## 📁 Project Structure

```text
Credit--Risk--using-SHAP/
│
├── main.py
├── credit_risk_model.pkl
├── best_threshold.pkl
├── requirements.txt
├── runtime.txt
├── render.yaml
├── README.md
│
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/thekamesh/Credit--Risk--using-SHAP.git
```

### 2. Navigate to the project directory

```bash
cd Credit--Risk--using-SHAP
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the FastAPI application

```bash
uvicorn main:app --reload
```

The application will be available at:

```text
http://127.0.0.1:8000
```

---

## 📚 API Documentation

FastAPI automatically provides interactive API documentation.

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

---

## 🔌 API Endpoint

### POST `/predict`

Example request:

```json
{
  "person_age": 30,
  "person_income": 55000,
  "person_home_ownership": "RENT",
  "person_emp_length": 4,
  "loan_intent": "PERSONAL",
  "loan_grade": "C",
  "loan_amnt": 10000,
  "loan_int_rate": 12.5,
  "loan_percent_income": 0.18,
  "cb_person_default_on_file": "N",
  "cb_person_cred_hist_length": 7
}
```

Example response:

```json
{
  "default_probability": 0.18,
  "default_prediction": 0,
  "threshold": 0.35,
  "Result": "Low Risk"
}
```

---

## ❤️ Health Check

The API also provides a health-check endpoint:

```text
GET /health
```

This can be used to verify that the application is running correctly.

---

## ☁️ Deployment

This project is configured for deployment on **Render**.

The project includes:

```text
requirements.txt
runtime.txt
render.yaml
```

The Render start command is:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

The application uses:

```text
Python 3.11.11
```

and pins the scikit-learn version used for model compatibility.

---

## 🎨 Web Interface

The frontend provides an interactive interface where users can enter loan applicant information and receive:

- Default probability
- Risk classification
- Decision threshold
- Animated prediction result
- Visual risk indicator

The frontend communicates with the FastAPI backend through the `/predict` endpoint.

---

## 🔐 Model Files

The trained model and threshold are stored as serialized files:

```text
credit_risk_model.pkl
best_threshold.pkl
```

### `credit_risk_model.pkl`

Contains the trained machine learning model used to generate default probabilities.

### `best_threshold.pkl`

Contains the optimized probability threshold used to convert the predicted probability into a final risk classification.

---

## 📈 Example Risk Scenarios

### 🟢 Lower Risk Applicant

Characteristics such as:

- Higher income
- Stable employment
- Lower loan-to-income ratio
- Good loan grade
- No previous default
- Longer credit history

can contribute to a lower predicted default probability.

### 🔴 Higher Risk Applicant

Characteristics such as:

- Lower income
- Short employment history
- Higher loan-to-income ratio
- Poorer loan grade
- Previous default history
- Shorter credit history

can contribute to a higher predicted default probability.

> Note: The final prediction is made by the trained ML model and should not be interpreted as a real-world financial decision by itself.

---

## 🎯 Project Objectives

The main objectives of this project are:

1. Build a machine learning model for credit risk prediction.
2. Evaluate model performance.
3. Optimize the classification threshold.
4. Improve model interpretability using SHAP.
5. Build a REST API using FastAPI.
6. Create an interactive frontend.
7. Deploy the complete application online.
8. Demonstrate an end-to-end ML deployment workflow.

---

## 🔮 Future Improvements

Possible improvements include:

- User authentication
- Database integration
- Prediction history
- Advanced SHAP visualizations
- Model monitoring
- Data drift detection
- Automated retraining
- Docker deployment
- Cloud database integration
- More advanced risk scoring
- Admin dashboard

---

## ⚠️ Disclaimer

This project is created for **educational and demonstration purposes**.

The predictions generated by this application should not be considered professional financial or lending advice. Real-world credit decisions require additional financial, regulatory, and risk-management considerations.

---

## 👨‍💻 Author

**Kamesh Gupta**

GitHub:  
https://github.com/thekamesh

---

## ⭐ If you found this project useful

Consider giving the repository a ⭐ on GitHub!
