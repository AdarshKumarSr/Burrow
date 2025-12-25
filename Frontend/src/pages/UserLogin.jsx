import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setToken } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // ✅ ONLY notify context
      setToken(token);
      setUser(user);

      // ✅ go directly to dashboard
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] pt-24 flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-gray-400 pb-2 w-fit">
        Login
      </h2>

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />

          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md transition mb-4"
        >
          LOGIN
        </button>

        <p className="text-center text-sm text-gray-600 mb-4">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Create New Account
          </Link>
        </p>
      </form>

      <Link
        to="/doctor-login"
        className="mt-6 bg-[#10b461] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#0e9d54] transition"
      >
        Sign In as Doctor
      </Link>
    </div>
  );
};

export default UserLogin;
