import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice.js'; // Adjust the path if necessary
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axiosInstance.post('/user/login', { email, password }); // Adjust your API endpoint
      const userData = response.data; // Assuming the user data is returned in the response
      console.log(userData); // Log the user data

      // Dispatch the login action
      dispatch(login(userData));

      // Optionally call onLogin callback
      onLogin();

      // Redirect to preferences page after successful login
      navigate('/preferences'); // Redirect to preferences page

    } catch (error) {
      setError('Invalid email or password'); // Handle the error
    }
  };

  return (
    <>
      <nav className="p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music className="w-8 h-8 text-white" />
            <div className="text-white text-3xl font-bold tracking-wider">InsightPod</div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto glass-effect p-10 rounded-2xl neon-border animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 input-highlight transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-300 text-sm ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 input-highlight transition-all duration-300"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-xl font-semibold 
                       hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Login to Your Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
