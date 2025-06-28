import React, { useEffect, useState, useRef } from "react";

const DiseaseResult = ({ steps, triggerNextStep }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedDoctor, setExpandedDoctor] = useState(null);
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

        if (data?.results?.length > 0) {
          setResponse(data);
          if (data.top_disease_info?.missing_data) {
            setTimeout(() => {
              triggerNextStep({ trigger: "symptomInput" });
            }, 4000);
          }
        } else {
          setError("Sorry, we’re unable to assist at the moment.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("⚠️ Error contacting backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [userInput, triggerNextStep]);

  if (loading) return <div className="text-gray-700 px-4">🧠 Analyzing your symptoms...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  const { results = [], symptoms = [], top_disease_info = {} } = response || {};
  const doctors = top_disease_info.doctors || [];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h3 className="text-lg font-semibold mb-3">🧠 Predicted Diseases</h3>
        {results.map((res, i) => (
          <p key={i}>
            {i + 1}. <strong>{res.disease.toLowerCase()}</strong> – {Math.round(res.confidence * 100)}%
          </p>
        ))}

        {symptoms.length > 0 && (
          <>
            <h4 className="mt-4 font-semibold">📋 Matched Symptoms</h4>
            <p>{symptoms.join(", ")}</p>
          </>
        )}

        {top_disease_info.missing_data ? (
          <div style={styles.error}>
            ⚠️ I couldn’t find detailed info. Could you describe your symptoms in more detail?
          </div>
        ) : (
          <>
            {top_disease_info.description && (
              <>
                <h4 className="mt-4 font-semibold">📖 Description</h4>
                <p>{top_disease_info.description}</p>
              </>
            )}

            {top_disease_info.precautions?.length > 0 && (
              <>
                <h4 className="mt-4 font-semibold">🛡️ Precautions</h4>
                <ul className="list-disc pl-5">
                  {top_disease_info.precautions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {doctors.length > 0 && (
              <>
                <h4 className="mt-4 font-semibold">👨‍⚕️ Suggested Doctors</h4>
                <ul style={styles.doctorList}>
                  {doctors.map((doc, i) => (
                    <li key={i} style={styles.doctorItem}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{doc.name}</span>
                        <button
                          style={styles.button}
                          onClick={() =>
                            setExpandedDoctor(expandedDoctor === i ? null : i)
                          }
                        >
                          {expandedDoctor === i ? "Hide" : "View"} Details
                        </button>
                      </div>
                      {expandedDoctor === i && (
                        <div style={styles.doctorDetails}>
                          <p><strong>Specialty:</strong> {doc.specialty}</p>
                          <p><strong>Location:</strong> {doc.location}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <button
                  style={{ ...styles.button, marginTop: "12px" }}
                  onClick={() => {
                    localStorage.setItem("selectedDoctors", JSON.stringify(doctors));
                    window.location.href = "/bookappointment";
                  }}
                >
                  📅 Book Appointment
                </button>
              </>
            )}
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
    padding: "30px 16px",
  },
  container: {
    background: "#d2f0e4", // Light mint green
    color: "#1c1c1c",       // Soft dark text
    padding: "24px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "720px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  error: {
    color: "#9b1c1c",
    backgroundColor: "#ffe0e0",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "12px",
    fontWeight: "500",
  },
  doctorList: {
    listStyle: "none",
    padding: 0,
  },
  doctorItem: {
    marginBottom: "12px",
    padding: "12px",
    backgroundColor: "#ecfdf5",
    borderRadius: "10px",
    border: "1px solid #b6e2d3",
  },
  doctorDetails: {
    marginTop: "8px",
    padding: "8px",
    backgroundColor: "#f9fffc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "#0077ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default DiseaseResult;
