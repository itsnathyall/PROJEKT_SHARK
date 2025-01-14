import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Import your Landing Page
import LoginPage from "./pages/LoginPage"; // Import your Login Page
import HomePage from "./pages/HomePage"; // Import your Home Page

function App() {
  return (
    <Router>
      <Routes>
        {/* Set LandingPage as the default route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;









