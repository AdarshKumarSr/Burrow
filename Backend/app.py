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
        {"name": "Dr. Amit Nanda", "specialty": "Allergist", "location": "Delhi"},
        {"name": "Dr. Reema Das", "specialty": "Immunologist", "location": "Mumbai"}
    ],
    "malaria": [
        {"name": "Dr. Kunal Verma", "specialty": "Infectious Disease", "location": "Mumbai"},
        {"name": "Dr. Priya Patil", "specialty": "General Physician", "location": "Kolkata"}
    ],
    "allergy": [
        {"name": "Dr. Meera Sinha", "specialty": "Allergist", "location": "Chennai"},
        {"name": "Dr. Rajiv Thakkar", "specialty": "Immunologist", "location": "Ahmedabad"}
    ],
    "hypothyroidism": [
        {"name": "Dr. Ananya Mehta", "specialty": "Endocrinologist", "location": "Pune"},
        {"name": "Dr. Vikram Reddy", "specialty": "Thyroid Specialist", "location": "Delhi"}
    ],
    "psoriasis": [
        {"name": "Dr. Neha Kapoor", "specialty": "Dermatologist", "location": "Hyderabad"},
        {"name": "Dr. Sameer Kulkarni", "specialty": "Skin Specialist", "location": "Nagpur"}
    ],
    "gerd": [
        {"name": "Dr. Rakesh Chandra", "specialty": "Gastroenterologist", "location": "Delhi"},
        {"name": "Dr. Leena Jacob", "specialty": "Internal Medicine", "location": "Bangalore"}
    ],
    "chronic cholestasis": [
        {"name": "Dr. Imran Sheikh", "specialty": "Hepatologist", "location": "Kochi"},
        {"name": "Dr. Aparna Vyas", "specialty": "Gastroenterologist", "location": "Ahmedabad"}
    ],
    "hepatitis a": [
        {"name": "Dr. Kiran Shah", "specialty": "Hepatologist", "location": "Delhi"},
        {"name": "Dr. Shalini Varma", "specialty": "Infectious Disease", "location": "Mumbai"}
    ],
    "osteoarthristis": [
        {"name": "Dr. Sunita Menon", "specialty": "Rheumatologist", "location": "Pune"},
        {"name": "Dr. Abhay Gupta", "specialty": "Orthopedic", "location": "Chandigarh"}
    ],
    "(vertigo) paroymsal positional vertigo": [
        {"name": "Dr. Tanya Seth", "specialty": "ENT Specialist", "location": "Bangalore"},
        {"name": "Dr. Rohit Bansal", "specialty": "Neurologist", "location": "Delhi"}
    ],
    "hypoglycemia": [
        {"name": "Dr. Arvind Rao", "specialty": "Endocrinologist", "location": "Mumbai"},
        {"name": "Dr. Aarti Deshmukh", "specialty": "Diabetologist", "location": "Hyderabad"}
    ],
    "acne": [
        {"name": "Dr. Kavita Joshi", "specialty": "Dermatologist", "location": "Chennai"},
        {"name": "Dr. Manish Dubey", "specialty": "Cosmetologist", "location": "Delhi"}
    ],
    "diabetes": [
        {"name": "Dr. Sanjay Mehta", "specialty": "Diabetologist", "location": "Bangalore"},
        {"name": "Dr. Sneha Shah", "specialty": "Endocrinologist", "location": "Surat"}
    ],
    "impetigo": [
        {"name": "Dr. Ritu Sharma", "specialty": "Pediatric Dermatologist", "location": "Delhi"},
        {"name": "Dr. Asif Naqvi", "specialty": "Skin Specialist", "location": "Lucknow"}
    ],
    "hypertension": [
        {"name": "Dr. Vineet Goel", "specialty": "Cardiologist", "location": "Mumbai"},
        {"name": "Dr. Swati Bansal", "specialty": "General Physician", "location": "Indore"}
    ],
    "peptic ulcer diseae": [
        {"name": "Dr. Rakesh Mathur", "specialty": "Gastroenterologist", "location": "Delhi"},
        {"name": "Dr. Neetu Joshi", "specialty": "Internal Medicine", "location": "Hyderabad"}
    ],
    "dimorphic hemorrhoids(piles)": [
        {"name": "Dr. Ajay Sharma", "specialty": "Proctologist", "location": "Bangalore"},
        {"name": "Dr. Monica Singh", "specialty": "Colorectal Surgeon", "location": "Pune"}
    ],
    "common cold": [
        {"name": "Dr. Ashok Iyer", "specialty": "General Physician", "location": "Delhi"},
        {"name": "Dr. Nina Thomas", "specialty": "Family Medicine", "location": "Chennai"}
    ],
    "chicken pox": [
        {"name": "Dr. Bhavna Kapoor", "specialty": "Infectious Disease", "location": "Mumbai"},
        {"name": "Dr. Shashank Rao", "specialty": "Pediatrician", "location": "Nagpur"}
    ],
    "cervical spondylosis": [
        {"name": "Dr. Gaurav Bhatt", "specialty": "Orthopedic", "location": "Delhi"},
        {"name": "Dr. Meenal Desai", "specialty": "Spine Specialist", "location": "Ahmedabad"}
    ],
    "hyperthyroidism": [
        {"name": "Dr. Rekha Jain", "specialty": "Endocrinologist", "location": "Jaipur"},
        {"name": "Dr. Arjun Sharma", "specialty": "Thyroid Specialist", "location": "Chennai"}
    ],
    "urinary tract infection": [
        {"name": "Dr. Farah Siddiqui", "specialty": "Urologist", "location": "Mumbai"},
        {"name": "Dr. Manju Pandey", "specialty": "Gynecologist", "location": "Delhi"}
    ],
    "varicose veins": [
        {"name": "Dr. Alok Tiwari", "specialty": "Vascular Surgeon", "location": "Bangalore"},
        {"name": "Dr. Leena Kurian", "specialty": "Cardiologist", "location": "Hyderabad"}
    ],
    "aids": [
        {"name": "Dr. Nilesh Kamat", "specialty": "Infectious Disease", "location": "Pune"},
        {"name": "Dr. Alka Verma", "specialty": "Internal Medicine", "location": "Delhi"}
    ],
    "paralysis (brain hemorrhage)": [
        {"name": "Dr. Prakash Menon", "specialty": "Neurologist", "location": "Mumbai"},
        {"name": "Dr. Jyoti Singh", "specialty": "Neurosurgeon", "location": "Delhi"}
    ],
    "typhoid": [
        {"name": "Dr. Suhasini Rao", "specialty": "General Physician", "location": "Kolkata"},
        {"name": "Dr. Harish Shah", "specialty": "Infectious Disease", "location": "Surat"}
    ],
    "hepatitis b": [
        {"name": "Dr. Rajdeep Verma", "specialty": "Hepatologist", "location": "Hyderabad"},
        {"name": "Dr. Anjali Sood", "specialty": "Liver Specialist", "location": "Bangalore"}
    ],
    "fungal infection": [
        {"name": "Dr. Kiran Grover", "specialty": "Dermatologist", "location": "Delhi"},
        {"name": "Dr. Rajashree Naik", "specialty": "Skin Specialist", "location": "Mumbai"}
    ],
    "hepatitis c": [
        {"name": "Dr. Ankit Shukla", "specialty": "Hepatologist", "location": "Chennai"},
        {"name": "Dr. Neelam Prasad", "specialty": "Gastroenterologist", "location": "Pune"}
    ],
    "migraine": [
        {"name": "Dr. Vikas Batra", "specialty": "Neurologist", "location": "Delhi"},
        {"name": "Dr. Smita Kaul", "specialty": "Pain Management", "location": "Mumbai"}
    ],
    "bronchial asthma": [
        {"name": "Dr. Rohan Deshpande", "specialty": "Pulmonologist", "location": "Ahmedabad"},
        {"name": "Dr. Shruti Jain", "specialty": "Chest Physician", "location": "Delhi"}
    ],
    "alcoholic hepatitis": [
        {"name": "Dr. Manoj Suri", "specialty": "Hepatologist", "location": "Bangalore"},
        {"name": "Dr. Kshipra Anand", "specialty": "Liver Specialist", "location": "Kolkata"}
    ],
    "jaundice": [
        {"name": "Dr. Saurabh Yadav", "specialty": "Gastroenterologist", "location": "Lucknow"},
        {"name": "Dr. Priyanka Mittal", "specialty": "Hepatologist", "location": "Delhi"}
    ],
    "hepatitis e": [
        {"name": "Dr. Nirmal Nair", "specialty": "Gastroenterologist", "location": "Chennai"},
        {"name": "Dr. Shobha Singh", "specialty": "Infectious Disease", "location": "Mumbai"}
    ],
    "dengue": [
        {"name": "Dr. Kshitij Roy", "specialty": "General Physician", "location": "Delhi"},
        {"name": "Dr. Hema Srinivasan", "specialty": "Internal Medicine", "location": "Bangalore"}
    ],
    "hepatitis d": [
        {"name": "Dr. Pooja Narayan", "specialty": "Hepatologist", "location": "Mumbai"},
        {"name": "Dr. Anshul Dubey", "specialty": "Liver Specialist", "location": "Hyderabad"}
    ],
    "heart attack": [
        {"name": "Dr. Aditya Rao", "specialty": "Cardiologist", "location": "Pune"},
        {"name": "Dr. Seema Tiwari", "specialty": "Cardiac Surgeon", "location": "Delhi"}
    ],
    "pneumonia": [
        {"name": "Dr. Kavya Ramesh", "specialty": "Pulmonologist", "location": "Chennai"},
        {"name": "Dr. Abhishek Joshi", "specialty": "Chest Physician", "location": "Bangalore"}
    ],
    "arthritis": [
        {"name": "Dr. Mehul Kothari", "specialty": "Rheumatologist", "location": "Surat"},
        {"name": "Dr. Bhavana Iyengar", "specialty": "Orthopedic", "location": "Delhi"}
    ],
    "gastroenteritis": [
        {"name": "Dr. Sandeep Bajaj", "specialty": "Gastroenterologist", "location": "Jaipur"},
        {"name": "Dr. Rekha Subramaniam", "specialty": "Internal Medicine", "location": "Mumbai"}
    ],
    "tuberculosis": [
        {"name": "Dr. Amrita Sen", "specialty": "Pulmonologist", "location": "Kolkata"},
        {"name": "Dr. Deepak Shetty", "specialty": "Infectious Disease", "location": "Bangalore"}
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
