import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121a2a] text-[#f6f1eb]">
            <div className="max-w-2xl p-8 bg-[#ffffff0a] rounded-xl shadow-lg border border-[#3e2e4a]">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-sm text-[#f6f1eb99]">{post.description}</p>
                <p className="mt-4">{post.body}</p>
            </div>
        </div>
    );
};

export default PostDetails;