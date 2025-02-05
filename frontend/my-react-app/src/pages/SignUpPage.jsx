import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        navigate("/auth"); // Μετά την εγγραφή, πάει στη σελίδα login
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.log("Registration failed:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#121a2a] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-[#ffffff0a] backdrop-blur-md p-10 rounded-3xl shadow-lg border border-[#3e2e4a] transform hover:scale-[1.02] transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#f6f1eb] mb-6">
          Create an Account ✍️
        </h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          {error && <p className="text-red-400 text-center">{error}</p>}

          <div>
            <label className="block text-md font-medium text-[#f6f1eb]">First Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#ffffff0a] border border-[#ffffff30] rounded-lg text-white"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-[#f6f1eb]">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#ffffff0a] border border-[#ffffff30] rounded-lg text-white"
              placeholder="Doe"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-[#f6f1eb]">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#ffffff0a] border border-[#ffffff30] rounded-lg text-white"
              placeholder="johndoe"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-[#f6f1eb]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#ffffff0a] border border-[#ffffff30] rounded-lg text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-[#f6f1eb]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#ffffff0a] border border-[#ffffff30] rounded-lg text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 30px rgba(255, 107, 107, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-[#ff6b6b] text-white font-bold text-lg rounded-lg shadow-md transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-[#f6f1eb]">
            Already have an account? <span className="text-[#ff6b6b] font-semibold underline cursor-pointer" onClick={() => navigate("/auth")}>Log in</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;