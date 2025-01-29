import React from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import logo1 from '../public/logo1.png'

function Navigation({ onLogout, isAuthenticated }) {
  return (
    <nav className="glass-effect fixed w-full z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className='w-14 -mr-4'><img className='' src={logo1} alt="" /></div>
            <span className="text-2xl font-bold">InsightPod</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="nav-link">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="nav-link">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className='flex space-x-10 items-center'>
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/player" className="nav-link">Player</Link>
                <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                <Link to="/feedback" className="nav-link">Feedback</Link>
                <Link to="/carousel" className="nav-link">Carousel</Link>
                <button 
                  onClick={onLogout}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
