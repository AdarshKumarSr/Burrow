import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import DiseaseResult from "./DiseaseResult";

const theme = {
  background: "#f8fffc",
  fontFamily: "Poppins, sans-serif",
  headerBgColor: "#a8ffeb",
  headerFontColor: "black",
  headerFontSize: "20px",
  botBubbleColor: "#b9f5d8",
  botFontColor: "#1a3c34",
  userBubbleColor: "#ffffff",
  userFontColor: "#1a3c34",
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};

const steps = [
  {
    id: "intro",
    message: "Hi there! \uD83D\uDC4B I'm your Health Assistant Bot.",
    trigger: "askName",
  },
  {
    id: "askName",
    message: "What's your name? \uD83D\uDE0A",
    trigger: "getName",
  },
  {
    id: "getName",
    user: true,
    trigger: "greetByName",
  },
  {
    id: "greetByName",
    message: ({ previousValue }) =>
      `Nice to meet you, ${previousValue}! What symptoms are you experiencing?`,
    trigger: "symptomInput",
  },
  {
    id: "symptomInput",
    user: true,
    validator: (value) =>
      value.length > 2 || "Please enter more than 2 characters.",
    trigger: "result",
  },
  {
    id: "result",
    component: <DiseaseResult />,
    asMessage: true,
    trigger: "askMoreHelp",
  },
  {
    id: "askMoreHelp",
    message:
      "Would you like to ask about another symptom, or know more about a disease?",
    trigger: "moreOptions",
  },
  {
    id: "moreOptions",
    options: [
      { value: "moreSymptoms", label: "Another symptom", trigger: "symptomInput" },
      { value: "restart", label: "Start over", trigger: "askName" },
      { value: "exit", label: "No, thanks!", trigger: "goodbye" },
    ],
  },
  {
    id: "goodbye",
    message: "Alright, take care and stay healthy! \uD83D\uDC99",
    end: true,
  },
];

function ChatBotUI() {
  const [chatKey, setChatKey] = useState(Date.now());
  const [pastRecords, setPastRecords] = useState(() => {
    const saved = localStorage.getItem("pastChats");
    return saved ? JSON.parse(saved) : [];
  });
  const [chatSteps, setChatSteps] = useState([]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .rsc-container { box-sizing: border-box !important; border-radius: 16px !important; overflow: hidden !important; }
      .rsc-header { height: 60px !important; display: flex !important; align-items: center !important; padding-left: 20px !important; font-size: 18px !important; }
      .rsc-footer { height: 60px !important; padding: 12px 16px !important; box-sizing: border-box; }
      .rsc-input { font-size: 16px !important; padding: 10px 14px !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleNewChat = () => {
    setChatKey(Date.now());
    setChatSteps([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: "#f8fffc",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "320px",
            background: "#ffffff",
            borderRight: "2px solid #b9f5d8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem 1rem",
            boxShadow: "2px 0 8px rgba(168,255,235,0.08)",
          }}
        >
          <button
            onClick={handleNewChat}
            style={{
              width: "90%",
              padding: "0.75rem 0",
              marginBottom: "2rem",
              borderRadius: "10px",
              border: "1px solid #a8ffeb",
              background: "#b9f5d8",
              color: "#1a3c34",
              fontWeight: 600,
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            + New Chat
          </button>

          <div
            style={{
              width: "90%",
              border: "1px solid #b9f5d8",
              borderRadius: "10px",
              padding: "1rem",
              minHeight: "200px",
              background: "#f8fffc",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: "#1a3c34",
                marginBottom: "0.5rem",
              }}
            >
              Past Records
            </span>
            {pastRecords.length === 0 ? (
              <span
                style={{ color: "#7bbfa3", fontSize: "0.95rem", marginTop: "1rem" }}
              >
                No records yet.
              </span>
            ) : (
              <ul style={{ paddingLeft: "1rem", width: "100%" }}>
                {pastRecords.map((record) => (
                  <li
                    key={record.id}
                    style={{ marginBottom: "0.5rem", cursor: "pointer", color: "#1a3c34" }}
                  >
                    📝 {record.summary}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: "2rem",
          }}
        >
          <div
            style={{
              width: "800px",
              height: "600px",
              borderRadius: "16px",
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ChatBot
              key={chatKey}
              steps={steps}
              headerTitle="Health Assistant Bot"
              recognitionEnable={true}
              placeholder="Speak or type your symptoms..."
              handleEnd={({ steps }) => {
                const chatSummary = {
                  id: Date.now(),
                  summary: steps.symptomInput?.value || "Unknown symptom",
                  fullSteps: steps,
                };
                const updatedRecords = [chatSummary, ...pastRecords];
                setPastRecords(updatedRecords);
                localStorage.setItem("pastChats", JSON.stringify(updatedRecords));
                speak("Goodbye! Stay healthy.");
              }}
              onStepChange={(step) => {
                if (step.message) speak(step.message);
                setChatSteps((prev) => [...prev, step]);
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0px",
              }}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ChatBotUI;
