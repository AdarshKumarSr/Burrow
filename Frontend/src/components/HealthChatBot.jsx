import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import DiseaseResult from "./DiseaseResult";

// Theme styling
const theme = {
  background: "#121212",
  fontFamily: "Poppins, sans-serif",
  headerBgColor: "#2e2e2e",
  headerFontColor: "#ffffff",
  headerFontSize: "18px",
  botBubbleColor: "#333333",
  botFontColor: "#ffffff",
  userBubbleColor: "#222222",
  userFontColor: "#ffffff",
};

// Speech function
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};

function ChatBotUI() {
  const [userName, setUserName] = useState("");

  const steps = [
    {
      id: "intro",
      message: "Hi there! 👋 I'm your friendly Health Assistant Bot.",
      trigger: "askName",
      delay: 500,
    },
    {
      id: "askName",
      message: "What’s your name? 😊",
      trigger: "getName",
      delay: 400,
    },
    {
      id: "getName",
      user: true,
      trigger: ({ value }) => {
        setUserName(value);
        return "greetByName";
      },
    },
    {
      id: "greetByName",
      message: ({ previousValue }) => `Nice to meet you, ${previousValue}! 🌟 What symptoms are you experiencing today?`,
      trigger: "symptomInput",
    },
    {
      id: "symptomInput",
      user: true,
      validator: (value) => value.length > 2 || "Please enter more than 2 characters.",
      trigger: "confirmSymptom",
    },
    {
      id: "confirmSymptom",
      message: "Thanks! 🔍 Let me check what it could be...",
      trigger: "result",
      delay: 800,
    },
    {
      id: "result",
      component: <DiseaseResult />,
      asMessage: true,
      trigger: "askMoreHelp",
    },
    {
      id: "askMoreHelp",
      message: "Would you like to ask about another symptom, or start over?",
      trigger: "moreOptions",
      delay: 600,
    },
    {
      id: "moreOptions",
      options: [
        { value: "moreSymptoms", label: "🩺 Another symptom", trigger: "symptomInput" },
        { value: "restart", label: "🔁 Start over", trigger: "askName" },
        { value: "exit", label: "❌ No, thanks!", trigger: "goodbye" },
      ],
    },
    {
      id: "goodbye",
      message: () => `Alright, take care ${userName || "friend"}! 💙 Stay healthy and see you next time!`,
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "100%",
          backgroundColor: "#121212",
          padding: "2rem",
        }}
      >
        <ChatBot
          steps={steps}
          headerTitle="Health Assistant Bot"
          recognitionEnable={true}
          placeholder="Speak or type your symptoms..."
          handleEnd={() => speak(`Goodbye ${userName || ""}, stay healthy!`)}
          onStepChange={(step) => {
            if (step.message) speak(step.message);
          }}
          style={{ width: "100%", maxWidth: "600px", borderRadius: "16px" }}
        />
      </div>
    </ThemeProvider>
  );
}

export default ChatBotUI;
