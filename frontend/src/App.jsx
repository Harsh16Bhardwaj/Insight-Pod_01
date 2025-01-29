import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import CommunityPage from "./pages/CommunityPage";
import FeedbackPage from "./pages/FeedbackPage";
import Carousel from "./pages/Carousel";
import Register from "./pages/Register";
import PrefrencePage from "./pages/prefrencePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="gradient-bg min-h-screen text-white">
        {!isAuthenticated ? (
          <>
            <Navigation
              onLogout={handleLogout}
              isAuthenticated={isAuthenticated}
            />
            <div className="pt-24">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/login"
                  element={<AuthPage onLogin={handleLogin} />}
                />
                <Route path="/register" element={<Register />} />
                {/* Preferences page route */}

              </Routes>
            </div>
          </>
        ) : (
          <>
            <Navigation
              onLogout={handleLogout}
              isAuthenticated={isAuthenticated}
            />
            <div className="pt-24">
              <Routes>
              <Route path="/preferences" element={<PrefrencePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/player" element={<PlayerPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/carousel" element={<Carousel />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
