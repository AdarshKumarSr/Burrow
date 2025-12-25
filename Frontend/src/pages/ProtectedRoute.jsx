// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserDataContext);

  // ⏳ wait for UserContext to decide
  if (isLoading) {
    return <div className="pt-24 p-8">Checking authentication...</div>;
  }

  // 🔒 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
