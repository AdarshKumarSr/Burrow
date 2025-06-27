// ChatBotUI.jsx
import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import DiseaseResult from "./DiseaseResult";

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


// const steps = [
//   {
//     id: "greet",
//     message: "Hi! 🤖 Tell me your symptoms and I'll try to help.",
//     trigger: "symptomInput",
//   },
//   {
//     id: "symptomInput",
//     user: true,
//     validator: (value) => value.length > 2 || "Please enter more than 2 characters.",
//     trigger: "result",
//   },
//   {
//     id: "result",
//     component: <DiseaseResult />,
//     asMessage: true,
//     trigger: "followup",
//   },
//   {
//     id: "followup",
//     message: "Do you need any further help?",
//     trigger: "followup-response",
//   },
//   {
//     id: "followup-response",
//     options: [
//       { value: "yes", label: "Yes", trigger: "symptomInput" },
//       { value: "no", label: "No", trigger: "end" },
//     ],
//   },
//   {
//     id: "end",
//     message: "Stay healthy! 💙",
//     end: true,
//   },
// ];

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};


const steps = [
  {
    id: "intro",
    message: "Hi there! 👋 I'm your Health Assistant Bot.",
    trigger: "askName",
  },
  {
    id: "askName",
    message: "What’s your name? 😊",
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
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "80vh",
        width: "100%",
        backgroundColor: "#121212",
        padding: "2rem"
      }}>
        {/* <ChatBot
          steps={steps}
          headerTitle="Health Assistant Bot"
          recognitionEnable={true}
          placeholder="Type the symptoms..."
          style={{ width: "100%", maxWidth: "600px", borderRadius: "16px" }}
        /> */}

        <ChatBot
  steps={steps}
  headerTitle="Health Assistant Bot"
  recognitionEnable={true}
  placeholder="Speak or type your symptoms..."
  handleEnd={() => speak("Goodbye! Stay healthy.")}
  onStepChange={(step) => {
    if (step.message) {
      speak(step.message);
    }
  }}
  style={{ width: "100%", maxWidth: "600px", borderRadius: "16px" }}
/>

      </div>
    </ThemeProvider>
  );
}


export default ChatBotUI;
