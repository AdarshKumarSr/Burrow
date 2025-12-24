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
    "drug reaction": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e91", "name": "Dr. Amit Nanda", "specialty": "Allergist", "location": "Delhi"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4e92", "name": "Dr. Reema Das", "specialty": "Immunologist", "location": "Mumbai"}
    ],
    "malaria": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e93", "name": "Dr. Kunal Verma", "specialty": "Infectious Disease", "location": "Mumbai"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4e94", "name": "Dr. Priya Patil", "specialty": "General Physician", "location": "Kolkata"}
    ],
    "allergy": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e95", "name": "Dr. Meera Sinha", "specialty": "Allergist", "location": "Chennai"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4e96", "name": "Dr. Rajiv Thakkar", "specialty": "Immunologist", "location": "Ahmedabad"}
    ],
    "hypothyroidism": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e97", "name": "Dr. Ananya Mehta", "specialty": "Endocrinologist", "location": "Pune"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4e98", "name": "Dr. Vikram Reddy", "specialty": "Thyroid Specialist", "location": "Delhi"}
    ],
    "psoriasis": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e99", "name": "Dr. Neha Kapoor", "specialty": "Dermatologist", "location": "Hyderabad"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4e9a", "name": "Dr. Sameer Kulkarni", "specialty": "Skin Specialist", "location": "Nagpur"}
    ],
    "gerd": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e9b", "name": "Dr. Rakesh Chandra", "specialty": "Gastroenterologist", "location": "Delhi"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4e9c", "name": "Dr. Leena Jacob", "specialty": "Internal Medicine", "location": "Bangalore"}
    ],
    "chronic cholestasis": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e9d", "name": "Dr. Imran Sheikh", "specialty": "Hepatologist", "location": "Kochi"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4e9e", "name": "Dr. Aparna Vyas", "specialty": "Gastroenterologist", "location": "Ahmedabad"}
    ],
    "hepatitis a": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4e9f", "name": "Dr. Kiran Shah", "specialty": "Hepatologist", "location": "Delhi"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea0", "name": "Dr. Shalini Varma", "specialty": "Infectious Disease", "location": "Mumbai"}
    ],
    "osteoarthristis": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea1", "name": "Dr. Sunita Menon", "specialty": "Rheumatologist", "location": "Pune"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea2", "name": "Dr. Abhay Gupta", "specialty": "Orthopedic", "location": "Chandigarh"}
    ],
    "(vertigo) paroymsal positional vertigo": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea3", "name": "Dr. Tanya Seth", "specialty": "ENT Specialist", "location": "Bangalore"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea4", "name": "Dr. Rohit Bansal", "specialty": "Neurologist", "location": "Delhi"}
    ],
    "hypoglycemia": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea5", "name": "Dr. Arvind Rao", "specialty": "Endocrinologist", "location": "Mumbai"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea6", "name": "Dr. Aarti Deshmukh", "specialty": "Diabetologist", "location": "Hyderabad"}
    ],
    "acne": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea7", "name": "Dr. Kavita Joshi", "specialty": "Dermatologist", "location": "Chennai"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea8", "name": "Dr. Manish Dubey", "specialty": "Cosmetologist", "location": "Delhi"}
    ],
    "diabetes": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4ea9", "name": "Dr. Sanjay Mehta", "specialty": "Diabetologist", "location": "Bangalore"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eaa", "name": "Dr. Sneha Shah", "specialty": "Endocrinologist", "location": "Surat"}
    ],
    "impetigo": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4eab", "name": "Dr. Ritu Sharma", "specialty": "Pediatric Dermatologist", "location": "Delhi"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eac", "name": "Dr. Asif Naqvi", "specialty": "Skin Specialist", "location": "Lucknow"}
    ],
    "hypertension": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4ead", "name": "Dr. Vineet Goel", "specialty": "Cardiologist", "location": "Mumbai"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eae", "name": "Dr. Swati Bansal", "specialty": "General Physician", "location": "Indore"}
    ],
    "peptic ulcer diseae": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4eaf", "name": "Dr. Rakesh Mathur", "specialty": "Gastroenterologist", "location": "Delhi"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb0", "name": "Dr. Neetu Joshi", "specialty": "Internal Medicine", "location": "Hyderabad"}
    ],
    "dimorphic hemorrhoids(piles)": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb1", "name": "Dr. Ajay Sharma", "specialty": "Proctologist", "location": "Bangalore"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb2", "name": "Dr. Monica Singh", "specialty": "Colorectal Surgeon", "location": "Pune"}
    ],
    "common cold": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb3", "name": "Dr. Ashok Iyer", "specialty": "General Physician", "location": "Delhi"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb4", "name": "Dr. Nina Thomas", "specialty": "Family Medicine", "location": "Chennai"}
    ],
    "chicken pox": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb5", "name": "Dr. Bhavna Kapoor", "specialty": "Infectious Disease", "location": "Mumbai"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb6", "name": "Dr. Shashank Rao", "specialty": "Pediatrician", "location": "Nagpur"}
    ],
    "tuberculosis": [
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb7", "name": "Dr. Amrita Sen", "specialty": "Pulmonologist", "location": "Kolkata"},
        {"_id": "c0fbd6c38e5f3a1d2a0b4eb8", "name": "Dr. Deepak Shetty", "specialty": "Infectious Disease", "location": "Bangalore"}
    ]
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

    
    info["missing_data"] = not any([
        info["description"].strip(),
        len(info["precautions"]) > 0,
        len(info["doctors"]) > 0
    ])

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
