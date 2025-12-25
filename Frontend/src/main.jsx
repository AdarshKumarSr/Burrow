import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/DoctorContext.jsx";
import CartProvider from "./context/CartContext.jsx";

import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <CaptainContext>
      <UserContext>
        <BrowserRouter>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                background: "#333",
                color: "#fff",
                fontSize: "14px",
              },
            }}
          />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </CartProvider>
);
