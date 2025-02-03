import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage"; 
import HomePage from "./pages/HomePage";
import MultiStepForm from "./pages/MultiStepForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/home" element={<HomePage />} />
        
      </Routes>
    </Router>
  );
}

export default App;