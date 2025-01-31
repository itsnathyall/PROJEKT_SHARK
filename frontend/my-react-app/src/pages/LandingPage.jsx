import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import cosmosImage from '../images/cosmos.png';

const LandingPage = () => {
  useEffect(() => {
    console.log('LandingPage rendered');
    // Test API connection
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(data => console.log("Backend Response:", data))
      .catch(error => console.error("Error connecting to backend:", error));
  }, []);

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Side - Text Section */}
      <motion.div
        className="w-1/2 flex flex-col items-center justify-center text-center p-10 bg-gradient-to-r from-[#140316] via-[#3e2e4a] to-[#374c66]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl font-extrabold mb-10 text-[#f6f1eb] text-shadow-lg"
          style={{ textShadow: '0px 0px 10px rgba(25, 25, 25, 0.8)' }}
        >
          Welcome to InkSpire
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="text-3xl mb-6 max-w-lg mx-auto text-white"
        >
          Unite your ideas, write together, and create seamlessly - your ultimate collaborative writing platform.
        </motion.p>

        <div className="flex justify-center gap-6 mt-6">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(255, 107, 107, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/auth"
              className="bg-[#ff6b6b] text-white px-6 py-3 rounded-4xl font-semibold shadow-md transform transition duration-300"
            >
              Login / Sign Up
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Image Section */}
      <motion.div
        className="w-3/5 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      >
        <img
          src={cosmosImage}  // Ensure this path is correct
          alt="Fantasy Wonderland"
          className="w-full h-full object-cover"
        />

        {/* Gradient effect to create a smooth transition */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-l from-transparent to-[#374c66]"></div>
      </motion.div>
    </div>
  );
};

export default LandingPage;





