import Select from "react-select";
import { useEffect, useState } from "react";

function SymptomForm() {
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [description, setDescription] = useState("");
  const [precautions, setPrecautions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await fetch("http://localhost:5000/symptoms");
        const data = await res.json();
        if (data.symptoms) {
          const formatted = data.symptoms.map((symptom) => ({
            label: symptom.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            value: symptom,
          }));
          setAllSymptoms(formatted);
        } else {
          throw new Error("Invalid symptom response.");
        }
      } catch (err) {
        console.error(err.message);
        setError("Failed to load symptoms.");
      }
    };
    fetchSymptoms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setDescription("");
    setPrecautions([]);
    setError("");

    try {
      const selectedKeys = selectedOptions.map((opt) => opt.value);

      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedKeys }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Backend error");

      setResults(data.results);
      setDescription(data.top_disease_info.description);
      setPrecautions(data.top_disease_info.precautions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Select Symptoms</h2>

      <form onSubmit={handleSubmit}>
       <Select
  isMulti
  options={allSymptoms}
  value={selectedOptions}
  onChange={setSelectedOptions}
  placeholder="Click to select symptoms..."
  className="mb-4"
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: "#f8f8f8", // input box background
      borderColor: "#ccc",
      color: "#000",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#f0f0f0", // dropdown menu background
      color: "#000",              // fallback text color
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#dbeafe" : "#fff", // hover color
      color: "#000",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#c7d2fe", // selected tag bg
      color: "#000",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#000",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#000",
      ":hover": {
        backgroundColor: "#a5b4fc",
        color: "#fff",
      },
    }),
  }}
/>


        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Predicting..." : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {results.length > 0 && (
        <div className="mt-5">
          <h3 className="font-semibold">Top Predictions:</h3>
          <ul className="list-decimal list-inside">
            {results.map((res, i) => (
              <li key={i}>
                <strong>{res.disease}</strong> – {res.confidence * 100}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {description && (
        <div className="mt-4">
          <h3 className="font-semibold">What is it?</h3>
          <p>{description}</p>
        </div>
      )}

      {precautions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Precautions:</h3>
          <ul className="list-disc list-inside">
            {precautions.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SymptomForm;
