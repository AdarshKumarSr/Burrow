from flask import Flask, request, jsonify
import pandas as pd
import joblib
import re
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from your frontend (React)

# ==== Load ML artifacts ====
model = joblib.load("models/rf_structured.pkl")
symptom_list = joblib.load("models/all_symptoms.pkl")
class_names = joblib.load("models/class_names.pkl")

# Load additional CSVs for description and precautions
desc_df = pd.read_csv("data/symptom_Description.csv")
prec_df = pd.read_csv("data/symptom_precaution.csv")

# ==== Helper Functions ====
def extract_symptoms_from_text(text):
    """Extract known symptoms from user text using keyword matching"""
    text = text.lower()
    return [
        symptom for symptom in symptom_list
        if re.search(r'\b' + re.escape(symptom.lower()) + r'\b', text)
    ]

def predict_disease(symptoms):
    """Given list of symptoms, return top 3 disease predictions with confidence"""
    input_df = pd.DataFrame([[1 if s in symptoms else 0 for s in symptom_list]], columns=symptom_list)
    probabilities = model.predict_proba(input_df)[0]

    top_3 = sorted(
        [(class_names[i], float(prob)) for i, prob in enumerate(probabilities)],
        key=lambda x: x[1],
        reverse=True
    )[:3]

    return [{"disease": name, "confidence": round(prob, 4)} for name, prob in top_3]

def get_disease_info(disease_name):
    """Fetch description and precautions for a disease"""
    info = {"description": "", "precautions": []}

    # Description
    desc_row = desc_df[desc_df["Disease"].str.lower() == disease_name.lower()]
    if not desc_row.empty:
        info["description"] = desc_row.iloc[0]["Description"]

    # Precautions
    prec_row = prec_df[prec_df["Disease"].str.lower() == disease_name.lower()]
    if not prec_row.empty:
        for i in range(1, 5):
            val = prec_row.iloc[0].get(f"Precaution_{i}", None)
            if pd.notna(val):
                info["precautions"].append(val)

    return info

# ==== API Routes ====

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    input_text = data.get("text", "")
    symptoms_from_dropdown = data.get("symptoms", [])

    # Use dropdown if available; otherwise, extract from text
    if symptoms_from_dropdown:
        selected = symptoms_from_dropdown
    elif input_text.strip():
        selected = extract_symptoms_from_text(input_text)
    else:
        return jsonify({"error": "No symptoms or text provided."}), 400

    if not selected:
        return jsonify({
            "results": [],
            "message": "No known symptoms found in the input."
        })

    results = predict_disease(selected)
    top_disease = results[0]["disease"]
    top_info = get_disease_info(top_disease)

    return jsonify({
        "results": results,
        "symptoms": selected,
        "top_disease_info": top_info
    })

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    """Return the full list of symptoms (formatted nicely for dropdowns)"""
    formatted = [s.replace("_", " ").title() for s in symptom_list]
    return jsonify({"symptoms": formatted})

# ==== Main Entrypoint ====
if __name__ == "__main__":
    app.run(debug=True, port=5000)
