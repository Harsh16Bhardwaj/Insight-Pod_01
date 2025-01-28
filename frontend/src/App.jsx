import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Added Navigate for redirect
import { Music } from "lucide-react";
import Navigation from "./components/Navigation";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import CommunityPage from "./pages/CommunityPage";
import FeedbackPage from "./pages/FeedbackPage";
import "animate.css";
import Carousel from "./pages/Carousel";
import Register from "./pages/Register"; // Import your Register page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for authentication state on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Clear token on logout
  };

  return (
    <Router>
      <div className="gradient-bg min-h-screen text-white">
        <Navigation onLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <div className="pt-24">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<HomePage />} /> 
                <Route
                  path="/login"
                  element={<AuthPage onLogin={handleLogin} />}
                />{" "}
                <Route path="/register" element={<Register />} />{" "}
                <Route path="*" element={<Navigate to="/" />} />{" "}
              </>
            ) : (
              <>
                <Route path="/home" element={<HomePage />} />
                <Route path="/player" element={<PlayerPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                {/* <Route path="/preferences" element={<PreferencesPage />} /> */}
                <Route path="/carousel" element={<Carousel />} />
                <Route path="*" element={<Navigate to="/home" />} />{" "}
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
