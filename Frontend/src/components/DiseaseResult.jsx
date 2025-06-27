import React, { useEffect, useState, useRef } from "react";

const DiseaseResult = ({ steps, triggerNextStep }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedDoctor, setExpandedDoctor] = useState(null); // NEW
  const fetchedRef = useRef(false);

  const userInput = steps?.symptomInput?.value;

  useEffect(() => {
    if (fetchedRef.current || !userInput) return;
    fetchedRef.current = true;

    const fetchPrediction = async () => {
      try {
        const res = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: userInput }),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        console.log("Backend response:", data);

        if (data?.results?.length > 0) {
          setResponse(data);
        } else {
          setError("❌ No predictions found.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("⚠️ Error contacting backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [userInput]);

  if (loading) return <div>🧠 Analyzing your symptoms...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  const { results = [], symptoms = [], top_disease_info = {} } = response || {};
  const doctors = top_disease_info.doctors || [];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h3>🧠 Predicted Diseases</h3>
        {results.map((res, i) => (
          <p key={i}>
            {i + 1}. <strong>{res.disease}</strong> – {Math.round(res.confidence * 100)}%
          </p>
        ))}

        {symptoms.length > 0 && (
          <>
            <h4>📋 Matched Symptoms</h4>
            <p>{symptoms.join(", ")}</p>
          </>
        )}

        {top_disease_info.description && (
          <>
            <h4>📖 Description</h4>
            <p>{top_disease_info.description}</p>
          </>
        )}

        {top_disease_info.precautions?.length > 0 && (
          <>
            <h4>🛡️ Precautions</h4>
            <ul>
              {top_disease_info.precautions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {doctors.length > 0 && (
          <>
            <h4>👨‍⚕️ Suggested Doctors</h4>
            <ul style={styles.doctorList}>
              {doctors.map((doc, i) => (
                <li key={i} style={styles.doctorItem}>
                  <span>{doc.name}</span>
                  <button
                    style={styles.button}
                    onClick={() =>
                      setExpandedDoctor(expandedDoctor === i ? null : i)
                    }
                  >
                    {expandedDoctor === i ? "Hide Details" : "View Details"}
                  </button>
                  {expandedDoctor === i && (
                    <div style={styles.doctorDetails}>
                      <p><strong>Specialty:</strong> {doc.specialty}</p>
                      <p><strong>Location:</strong> {doc.location}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  container: {
    background: "#1e1e1e",
    color: "#eaeaea",
    padding: "20px",
    borderRadius: "16px",
    width: "85%",
    maxWidth: "720px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  error: {
    color: "#ff6b6b",
    padding: "10px",
    backgroundColor: "#2e2e2e",
    borderRadius: "10px",
  },
  doctorList: {
    listStyle: "none",
    padding: 0,
  },
  doctorItem: {
    marginBottom: "12px",
  },
  doctorDetails: {
    marginTop: "6px",
    padding: "10px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
  },
  button: {
    marginLeft: "10px",
    padding: "4px 10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#0077ff",
    color: "white",
    cursor: "pointer",
  },
};

export default DiseaseResult;
