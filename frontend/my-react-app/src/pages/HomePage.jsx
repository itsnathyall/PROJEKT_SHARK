import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlusCircle, FaUserCircle, FaFire } from 'react-icons/fa';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", description: "", body: "" });
  const navigate = useNavigate();

  const URL = 'http://localhost:3000';

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/auth');
    }
  }, [navigate]);


  const fetchPosts = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${URL}/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Ошибка загрузки постов:", error.message);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/auth');
      return;
    }

    try {
      const response = await fetch(`${URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (response.ok) {
        setPosts([data, ...posts]);
        setShowModal(false); // Закрываем модальное окно
        setNewPost({ title: "", description: "", body: "" }); // Очищаем форму
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

  const handleLike = async (postId) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Вы не авторизованы!");
      return;
    }

    try {
      await fetch(`${URL}/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      // После лайка загружаем обновлённые данные
      fetchPosts();

    } catch (error) {
      console.error("Ошибка при лайке:", error.message);
    }
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
            onClick={() => setShowModal(true)}
            className="bg-[#ff6b6b] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#c0392b] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
          Create New Post
        </motion.button>

        <div className="mt-10 p-6 bg-[#ffffff0a] backdrop-blur-md rounded-xl shadow-lg border border-[#3e2e4a]">
          <h3 className="text-xl font-semibold text-[#f6f1eb] mb-4">Trending Posts <FaFire className="inline-block text-[#ff6b6b]" /></h3>
          {loading ? (
            <p className="text-[#f6f1eb99]">Loading posts...</p>
          ) : apiError ? (
            <p className="text-red-400">{apiError}</p>
          ) : (
            <div className="space-y-4 text-[#f6f1eb]">
              {posts.map((post) => (
                  <div key={post._id} className="border-b border-[#3e2e4a] pb-3 transition-all hover:rounded-lg">
                    <h4
                        onClick={() => navigate(`/posts/${post._id}`)}
                        className="text-left mb-2 text-lg font-semibold cursor-pointer hover:text-blue-400"
                    >
                      {post.title.slice(0, 92)}{post.description.title > 92 ? "..." : ""}
                    </h4>

                    <p className="text-left mb-2 text-sm text-[#f6f1eb99]">
                      {post.description.slice(0, 92)}{post.description.length > 92 ? "..." : ""}
                    </p>

                    <p
                        onClick={() => navigate(`/posts/${post._id}`)}
                        className="text-left mb-3 text-base font-regular text-[#f6f1eb] cursor-pointer hover:text-blue-300"
                    >
                      {post.body.slice(0, 150)}{post.body.length > 150 ? "..." : ""}
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                          onClick={() => handleLike(post._id)}
                          className="flex items-center gap-2 text-blue-500 cursor-pointer">
                        ❤️ {post.likes}
                      </button>

                      <button className="flex items-center gap-2 text-[#f6f1eb] hover:text-gray-400">
                        💬 <span>{post.comments}</span>
                      </button>
                    </div>
                  </div>
              ))}


            </div>
          )}
        </div>
      </motion.div>

      {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <motion.div className="bg-[#222b3d] p-6 rounded-lg shadow-lg w-[400px]" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <h2 className="text-xl font-semibold text-[#f6f1eb] mb-4">Create a New Post</h2>
              <input type="text" placeholder="Title" className="w-full p-2 mb-3 rounded bg-[#333b4d] text-white"
                     value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
              <input type="text" placeholder="Description" className="w-full p-2 mb-3 rounded bg-[#333b4d] text-white"
                     value={newPost.description} onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} />
              <textarea placeholder="Body" className="w-full p-2 mb-3 rounded bg-[#333b4d] text-white"
                        value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="text-red-400 hover:text-red-600">Cancel</button>
                <button onClick={handleCreatePost} className="bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#c0392b]">Post</button>
              </div>
            </motion.div>
          </div>
      )}

      <footer className="w-full bg-[#ffffff0a] p-4 text-center text-[#f6f1eb99] mt-8 border-t border-[#3e2e4a]">
        <p>© 2025 InkSpire. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;




