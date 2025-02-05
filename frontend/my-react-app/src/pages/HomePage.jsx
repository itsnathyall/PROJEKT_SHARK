import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const URL = 'http://localhost:3000';

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/auth');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${URL}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data); // Установка данных в состояние
      } catch (error) {
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Вызов функции для загрузки постов
  }, []);

  const handleCreatePost = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/auth');
      return;
    }

    try {
      const newPost = { title: 'New Post', content: 'This is a newly created post.' };
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (response.ok) {
        setPosts([data, ...posts]);
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/auth');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-[#121a2a] overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="w-[500px] h-[200px] bg-[#ff6b6b]/40 blur-[100px] rounded-full absolute top-10 left-10" />
        <motion.div className="w-[400px] h-[150px] bg-[#f6f1eb]/30 blur-[80px] rounded-full absolute bottom-10 right-10" />
      </motion.div>

      <nav className="w-full bg-[#ffffff0a] backdrop-blur-md p-6 text-white shadow-lg border border-[#3e2e4a] rounded-b-3xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide text-[#f6f1eb]">InkSpire</h1>
          <div className="flex gap-6 items-center">
            <Link to="/profile" className="text-[#f6f1eb] hover:text-[#ff6b6b] transition-colors">Profile</Link>
            <button onClick={handleLogout} className="bg-[#ff6b6b] text-white px-6 py-2 rounded-lg hover:bg-[#c0392b] transition-all">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <motion.div
        className="relative w-full max-w-3xl p-8 sm:p-10 md:p-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-5xl font-extrabold text-[#f6f1eb] tracking-wide mb-6">Welcome to InkSpire</h2>
        <p className="text-lg text-[#f6f1eb99] mb-8">Your ultimate collaborative writing platform.</p>

        <motion.button
          onClick={handleCreatePost}
          className="bg-[#ff6b6b] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#c0392b] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create New Post
        </motion.button>

        {/* <div className="mt-10 p-6 bg-[#ffffff0a] backdrop-blur-md rounded-xl shadow-lg border border-[#3e2e4a]">
          <h3 className="text-xl font-semibold text-[#f6f1eb] mb-4">Recent Posts</h3>
          {loading ? (
            <p className="text-[#f6f1eb99]">Loading posts...</p>
          ) : apiError ? (
            <p className="text-red-400">{apiError}</p>
          ) : (
            <div className="space-y-4 text-[#f6f1eb]">
              {posts.map((post) => (
                <div key={post._id} className="border-b border-[#ffffff30] pb-2">
                  <h4 className="text-lg font-semibold">{post.title}</h4>
                  <p className="text-sm text-[#f6f1eb99]">{post.body}</p>
                  <p className="text-sm text-[#f6f1eb99]">{post.description}</p>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </motion.div>

      <footer className="w-full bg-[#ffffff0a] p-4 text-center text-[#f6f1eb99] mt-8 border-t border-[#3e2e4a]">
        <p>© 2025 InkSpire. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;




