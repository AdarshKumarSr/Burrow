import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const UserDataContext = createContext(null);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/users/profile"); // or /auth/me
      setUser(res.data);
      console.log("User profile fetched successfully");
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
