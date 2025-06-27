from flask import Flask, request, jsonify
import pandas as pd
import joblib
import re
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   


model = joblib.load("models/rf_structured.pkl")
symptom_list = joblib.load("models/all_symptoms.pkl")
class_names = joblib.load("models/class_names.pkl")

desc_df = pd.read_csv("data/symptom_Description.csv")
prec_df = pd.read_csv("data/symptom_precaution.csv")

doctor_mapping = {
    "gerd": [
        {"name": "Dr. Anjali Mehta", "specialty": "Gastroenterologist", "location": "Mumbai"},
        {"name": "Dr. Rajesh Iyer", "specialty": "Gastroenterologist", "location": "Delhi"},
    ],
    "bronchial asthma": [
        {"name": "Dr. Ritu Kapoor", "specialty": "Pulmonologist", "location": "Bangalore"},
        {"name": "Dr. Ashok Nair", "specialty": "Allergy & Immunology", "location": "Chennai"},
    ],
    "urinary tract infection": [
        {"name": "Dr. Swati Verma", "specialty": "Urologist", "location": "Pune"},
        {"name": "Dr. Vikram Joshi", "specialty": "General Physician", "location": "Ahmedabad"},
    ],
    "diabetes": [
        {"name": "Dr. Neha Desai", "specialty": "Endocrinologist", "location": "Mumbai"},
        {"name": "Dr. Amit Sharma", "specialty": "Diabetologist", "location": "Hyderabad"},
    ],
    "migraine": [
        {"name": "Dr. Sneha Rao", "specialty": "Neurologist", "location": "Kolkata"},
        {"name": "Dr. Kunal Mehra", "specialty": "Pain Specialist", "location": "Delhi"},
    ],
    "tuberculosis": [
        {"name": "Dr. Arvind Patil", "specialty": "Pulmonologist", "location": "Mumbai"},
        {"name": "Dr. Seema Gupta", "specialty": "Infectious Disease Specialist", "location": "Jaipur"},
    ],
    "hepatitis b": [
        {"name": "Dr. Priya Nanda", "specialty": "Hepatologist", "location": "Chandigarh"},
        {"name": "Dr. Faisal Qureshi", "specialty": "Gastroenterologist", "location": "Delhi"},
    ],
    "osteoarthristis": [
        {"name": "Dr. Rohit Malhotra", "specialty": "Orthopedic Surgeon", "location": "Lucknow"},
        {"name": "Dr. Asha Menon", "specialty": "Rheumatologist", "location": "Bhopal"},
    ],
    "common cold": [
        {"name": "Dr. Ravi Sheth", "specialty": "General Physician", "location": "Nagpur"},
        {"name": "Dr. Meena Kumar", "specialty": "ENT Specialist", "location": "Surat"},
    ],
    "acne": [
        {"name": "Dr. Pooja Sethi", "specialty": "Dermatologist", "location": "Indore"},
        {"name": "Dr. Manish Vyas", "specialty": "Skin Specialist", "location": "Patna"},
    ],
}



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
    """Fetch description, precautions, and suggested doctors for a disease"""
    info = {"description": "", "precautions": [], "doctors": []}

    
    desc_row = desc_df[desc_df["Disease"].str.lower() == disease_name.lower()]
    if not desc_row.empty:
        info["description"] = desc_row.iloc[0]["Description"]

    
    prec_row = prec_df[prec_df["Disease"].str.lower() == disease_name.lower()]
    if not prec_row.empty:
        for i in range(1, 5):
            val = prec_row.iloc[0].get(f"Precaution_{i}", None)
            if pd.notna(val):
                info["precautions"].append(val)

    info["doctors"] = doctor_mapping.get(disease_name.lower(), [])

    return info


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    input_text = data.get("text", "")
    symptoms_from_dropdown = data.get("symptoms", [])

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
