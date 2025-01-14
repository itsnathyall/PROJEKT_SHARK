import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  // Add handleLogin function here
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent page reload
    // Simulate login logic here (e.g., check credentials)
    navigate("/home"); // Redirect to the homepage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ECF0F1]">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="absolute top-4 left-4 bg-white text-[#2C3E50] px-4 py-2 rounded hover:bg-gray-200 transition duration-200 shadow"
      >
        Go Back
      </button>

      <div className="bg-[#2C3E50] w-full max-w-md p-8 flex flex-col items-center">
        <h1 className="text-6xl font-bold text-white mb-2">InkSpire</h1>
        <p className="text-white mb-10">Beyond Words | Beyond Imagination</p>

        {/* Attach handleLogin to the form's onSubmit */}
        <form className="w-full" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Name"
            className="mb-4 p-3 w-full border rounded bg-white text-gray-700 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Full name"
            className="mb-4 p-3 w-full border rounded bg-white text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#E74C3C] text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

  
  
  