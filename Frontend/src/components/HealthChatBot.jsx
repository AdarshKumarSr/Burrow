import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import DiseaseResult from "./DiseaseResult";

// Theme for the chatbot
const theme = {
  background: "#f8fffc",
  fontFamily: "Poppins, sans-serif",
  headerBgColor: "#a8ffeb",
  headerFontColor: "#1a3c34",
  headerFontSize: "18px",
  botBubbleColor: "#b9f5d8",
  botFontColor: "#1a3c34",
  userBubbleColor: "#ffffff",
  userFontColor: "#1a3c34",
};

// Text-to-speech function
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};

// ChatBot steps
const steps = [
  {
    id: "intro",
    message: "Hi there! 👋 I'm your Health Assistant Bot.",
    trigger: "askName",
  },
  {
    id: "askName",
    message: "What's your name? 😊",
    trigger: "getName",
  },
  {
    id: "getName",
    user: true,
    trigger: "greetByName",
  },
  {
    id: "greetByName",
    message: ({ previousValue }) => `Nice to meet you, ${previousValue}! What symptoms are you experiencing?`,
    trigger: "symptomInput",
  },
  {
    id: "symptomInput",
    user: true,
    validator: (value) => value.length > 2 || "Please enter more than 2 characters.",
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
    message: "Would you like to ask about another symptom, or know more about a disease?",
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
    message: "Alright, take care and stay healthy! 💙",
    end: true,
  },
];

function ChatBotUI() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#f8fffc", minHeight: "100vh", display: "flex", flexDirection: "row" }}>
        {/* Left Sidebar */}
        <div style={{
          width: "320px",
          background: "#ffffff",
          borderRight: "2px solid #b9f5d8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 1rem",
          boxShadow: "2px 0 8px rgba(168,255,235,0.08)",
        }}>
          <button style={{
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
            transition: "background 0.2s"
          }}>+ New Chat</button>
          <div style={{
            width: "90%",
            border: "1px solid #b9f5d8",
            borderRadius: "10px",
            padding: "1rem",
            minHeight: "200px",
            background: "#f8fffc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <span style={{ fontWeight: 600, color: "#1a3c34", marginBottom: "0.5rem" }}>Past Records</span>
            <div style={{ width: "80%", borderBottom: "1px solid #b9f5d8", margin: "0.5rem 0" }}></div>
            {/* Placeholder for records */}
            <span style={{ color: "#7bbfa3", fontSize: "0.95rem", marginTop: "1rem" }}>
              No records yet.
            </span>
          </div>
        </div>
        {/* Main Chat Area */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "2rem" }}>
          <ChatBot
            steps={steps}
            headerTitle="Health Assistant Bot"
            recognitionEnable={true}
            placeholder="Speak or type your symptoms..."
            handleEnd={() => speak("Goodbye! Stay healthy.")}
            onStepChange={(step) => {
              if (step.message) speak(step.message);
            }}
            style={{ width: "100%", maxWidth: "900px", borderRadius: "16px" }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ChatBotUI;