import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/auth'); // Redirect to login page if no authToken
    }
  }, [navigate]);

  // Fetch recent posts from backend when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) return; // If no token, don't attempt to fetch posts.

      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`, // Use auth token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data); // Update posts state
      } catch (error) {
        setApiError(error.message); // Handle error
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchPosts();
  }, []);

  // Handle creating a new post
  const handleCreatePost = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/auth'); // Redirect if not logged in
      return;
    }

    try {
      const newPost = { title: 'New Post', content: 'This is a newly created post.' };

      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();

      if (response.ok) {
        setPosts([data, ...posts]); // Prepend new post to the list
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      setApiError(error.message); // Handle error
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/auth'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-start">
      {/* Navigation Bar */}
      <nav className="w-full bg-[#2C3E50] p-6 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">InkSpire</h1>
          <div className="flex gap-6 items-center">
            <Link to="/profile" className="hover:text-[#a4b0be] transition-colors">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-[#E74C3C] text-white px-6 py-2 rounded-lg hover:bg-[#c0392b] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex-grow w-full max-w-3xl p-6 sm:p-8 md:p-12">
        <motion.h2
          className="text-4xl font-extrabold text-center text-[#2C3E50] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to InkSpire
        </motion.h2>
        <p className="text-lg text-center text-[#34495E] mb-8">
          Your ultimate collaborative writing platform, where creativity meets collaboration.
        </p>

        {/* Create Post Button */}
        <motion.button
          onClick={handleCreatePost}
          className="bg-[#3498DB] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#2980B9] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create New Post
        </motion.button>

        {/* Posts Section */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">Recent Posts</h3>

          {loading ? (
            <div className="text-center text-[#34495E]">Loading posts...</div>
          ) : apiError ? (
            <div className="text-center text-red-500">{apiError}</div>
          ) : (
            <div className="space-y-4 text-[#34495E]">
              {posts.map((post) => (
                <div key={post.id} className="border-b pb-2">
                  <h4 className="text-lg font-semibold">{post.title}</h4>
                  <p className="text-sm">{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#2C3E50] p-4 text-center text-[#BDC3C7] mt-8">
        <p>© 2025 InkSpire. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;



