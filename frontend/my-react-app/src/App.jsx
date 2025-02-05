import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage"; 
import HomePage from "./pages/HomePage";
import MultiStepForm from "./pages/MultiStepForm";
import PostDetails from "./pages/PostDetails";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUpPage />} />

      </Routes>
    </Router>
  );
}

export default App;