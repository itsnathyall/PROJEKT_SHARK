import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.firstName) validationErrors.firstName = "First Name is required.";
    if (!formData.lastName) validationErrors.lastName = "Last Name is required.";
    if (!formData.username) validationErrors.username = "Username is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Passwords must match.";
    
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    // Map frontend fields to match backend expectations
    const requestBody = {
        email: formData.email,
        password: formData.password,
        name: formData.firstName,
        lastname: formData.lastName,
        username: formData.username
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        console.log('Successfully registered:', data);
        navigate('/home');
    } catch (error) { 
        console.error('Registration failed:', error);
        setApiError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#121a2a] overflow-hidden">
      {/* Background Light Trails */}
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

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-[#ffffff0a] backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-[#ffffff20] transform hover:scale-[1.02] transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#f6f1eb] mb-6 tracking-wide drop-shadow-lg">
          Join InkSpire ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#ffffff0a] border ${errors.firstName ? 'border-red-500' : 'border-[#ffffff30]'} rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300`}
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
          </div>

          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#ffffff0a] border ${errors.lastName ? 'border-red-500' : 'border-[#ffffff30]'} rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300`}
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
          </div>

          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#ffffff0a] border ${errors.username ? 'border-red-500' : 'border-[#ffffff30]'} rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300`}
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#ffffff0a] border ${errors.email ? 'border-red-500' : 'border-[#ffffff30]'} rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#ffffff0a] border ${errors.password ? 'border-red-500' : 'border-[#ffffff30]'} rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300`}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <div className="relative">
            <label className="block text-md font-medium text-[#f6f1eb] tracking-wide" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#ffffff0a] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#ffffff30]'} rounded-lg text-white placeholder-[#f6f1eb99] focus:ring-2 focus:ring-[#ff6b6b] outline-none transition-all duration-300`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>

          {apiError && <p className="text-red-500 text-xs text-center mt-2">{apiError}</p>}

          <button
            type="submit"
            className="w-full bg-[#ff6b6b] text-white py-3 rounded-lg mt-6 hover:bg-[#ff4b4b] transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[#f6f1eb] text-sm">Already have an account? <Link to="/login" className="text-[#ff6b6b] hover:underline">Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;











