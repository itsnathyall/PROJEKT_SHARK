import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        fetch("http://localhost:3000/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        fetch("http://localhost:3000/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.filter((post) => post.user_id === user?.id));
            })
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    if (loading) return <p className="text-center text-white">Loading profile...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/auth');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#121a2a] to-[#1b2436] text-[#f6f1eb] p-8">
            <div className="bg-[#ffffff0a] backdrop-blur-md p-10 rounded-xl shadow-lg border border-[#3e2e4a] max-w-4xl w-full">

                {/* Header Section */}
                <div className="flex items-center gap-6">
                    <div className="w-28 h-28 bg-[#ff6b6b] rounded-full flex items-center justify-center text-4xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{user.name} {user.lastname}</h1>
                        <p className="text-[#f6f1eb99]">@{user.username}</p>
                        <p className="text-sm text-[#f6f1eb99] mt-2">{user.email}</p>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-[#22263a] p-4 rounded-lg">
                        <h3 className="text-xl font-semibold">{posts.length}</h3>
                        <p className="text-sm text-[#f6f1eb99]">Posts</p>
                    </div>
                    <div className="bg-[#22263a] p-4 rounded-lg">
                        <h3 className="text-xl font-semibold">1.2K</h3>
                        <p className="text-sm text-[#f6f1eb99]">Followers</p>
                    </div>
                    <div className="bg-[#22263a] p-4 rounded-lg">
                        <h3 className="text-xl font-semibold">250</h3>
                        <p className="text-sm text-[#f6f1eb99]">Following</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4 justify-center">
                    <button className="px-4 py-2 rounded-lg bg-[#ff6b6b] text-white hover:bg-[#c0392b] transition-all">
                        Edit Profile
                    </button>
                    <button  onClick={handleLogout} className="px-4 py-2 rounded-lg bg-[#ff6b6b] text-white hover:bg-[#c0392b] transition-all">
                        Logout
                    </button>
                </div>

                {/* Recent Posts */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Recent Posts</h2>
                    {posts.length > 0 ? (
                        <div className="mt-4 space-y-4">
                            {posts.map((post) => (
                                <div key={post._id} className="border-b border-[#ffffff30] pb-2 p-4 bg-[#22263a] rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold">{post.title}</h4>
                                    <p className="text-sm text-[#f6f1eb99]">{post.body.slice(0, 100)}...</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[#f6f1eb99] mt-4">No posts yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;