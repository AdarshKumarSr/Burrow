import React, { useEffect, useState, useRef } from "react";

const DiseaseResult = ({ steps, triggerNextStep }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false); // Prevent duplicate fetch

  const userInput = steps.symptomInput?.value;

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.results?.length) {
          setResponse(data);
        } else {
          setError("❌ No predictions found.");
        }
      })
      .catch(() => setError("⚠️ Error contacting backend."))
      .finally(() => setLoading(false));
  }, [userInput]);

  if (loading) return <div>🧠 Processing your symptoms...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  const { results, symptoms, top_disease_info } = response || {};

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h3>🧠 Predicted Diseases</h3>
        {results.map((res, i) => (
          <p key={i}>
            {i + 1}. <strong>{res.disease}</strong> – {Math.round(res.confidence * 100)}%
          </p>
        ))}

        {symptoms?.length > 0 && (
          <>
            <h4>📋 Matched Symptoms</h4>
            <p>{symptoms.join(", ")}</p>
          </>
        )}

        {top_disease_info?.description && (
          <>
            <h4>📖 Description</h4>
            <p>{top_disease_info.description}</p>
          </>
        )}

        {top_disease_info?.precautions?.length > 0 && (
          <>
            <h4>🛡️ Precautions</h4>
            <ul>
              {top_disease_info.precautions.map((item, i) => (
                <li key={i}>{item}</li>
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
  },
};


export default DiseaseResult;
