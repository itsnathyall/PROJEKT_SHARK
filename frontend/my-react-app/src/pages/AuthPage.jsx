import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("authToken", data.authToken);
        
        // Redirect to home page
        console.log("Navigating to /home");
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log("Login failed:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#121a2a] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -50, opacity: 0.2 }}
          animate={{ x: [0, -20, 20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[500px] h-[200px] bg-[#ff6b6b]/40 blur-[100px] rounded-full absolute top-10 left-10"
        />
        <motion.div
          initial={{ x: 50, opacity: 0.2 }}
          animate={{ x: [0, 20, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[400px] h-[150px] bg-[#f6f1eb]/30 blur-[80px] rounded-full absolute bottom-10 right-10"
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-[#ffffff0a] backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-[#3e2e4a] transform hover:scale-[1.02] transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#f6f1eb] mb-6 tracking-wide drop-shadow-lg">
          Welcome Back, Writer ✍️
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {error && <p className="text-red-400 text-center">{error}</p>}

          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#ffffff0a] border border-[#ffffff30] rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#ffffff0a] border border-[#ffffff30] rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Animated Login Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 30px rgba(255, 107, 107, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-[#ff6b6b] text-white font-bold text-lg rounded-lg tracking-wide shadow-md transition-all duration-300"
          >
            Start Creating
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-5 text-center">
          <p className="text-[#f6f1eb]">
            New here? <Link to="/signup" className="text-[#ff6b6b] font-semibold underline">Join the community</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;




