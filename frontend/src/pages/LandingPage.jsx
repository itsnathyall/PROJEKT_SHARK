import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-customBlue text-white flex flex-col justify-center p-8">
        <h1 className="text-6xl font-bold mb-6">InkSpire</h1>
        <ReactTyped className="text-4xl font-bold mb-10 " strings={["Beyond Words", "Beyond Imagination"]} typeSpeed={120} backSpeed={120} loop/>
        <p className="text-lg">
          Unite your ideas, write together, and create seamlessly — your
          ultimate collaborative writing platform starts here.
        </p>
      </div>
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-8">
        <h2 className="text-2xl font-bold mb-4 text-CustomBlue">Create a free account now</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="mb-4 p-3 w-full border rounded bg-red-100"
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-3 w-full border rounded bg-red-100"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-3 w-full border rounded bg-red-100"
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        <p className="mt-5 text-xs font-extralight text-center">
          By clicking "Create Account", you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

  
  