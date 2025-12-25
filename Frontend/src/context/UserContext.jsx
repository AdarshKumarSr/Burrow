import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const UserDataContext = createContext(null);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
      setIsLoading(false);
      return;
    }

    // 🔥 If user already cached, DON'T flicker
    if (user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchUserProfile();
  }, [token]);

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser: (u) => {
          setUser(u);
          if (u) localStorage.setItem("user", JSON.stringify(u));
        },
        setToken: (t) => {
          setToken(t);
          if (t) localStorage.setItem("token", t);
          else localStorage.removeItem("token");
        },
        isLoading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
