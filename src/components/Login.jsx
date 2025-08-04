import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('studylist-username');
    if (savedUser) {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('studylist-users') || '[]');
    if (isSignUp) {
      // Check if username already exists
      if (users.some(u => u.username === formData.username)) {
        setError('Username already exists. Please log in.');
        return;
      }
      // Add new user
      const newUsers = [...users, { username: formData.username, password: formData.password }];
      localStorage.setItem('studylist-users', JSON.stringify(newUsers));
      localStorage.setItem('studylist-username', formData.username);
      setError('');
      onLogin();
    } else {
      // Login: check if user exists and password matches
      const user = users.find(u => u.username === formData.username);
      if (!user) {
        setError('User not found. Please sign up first.');
        return;
      }
      if (user.password !== formData.password) {
        setError('Incorrect password.');
        return;
      }
      localStorage.setItem('studylist-username', formData.username);
      setError('');
      onLogin();
    }
  };

  // Logout function to clear current user
  const handleLogout = () => {
    localStorage.removeItem('studylist-username');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#1a1440] via-[#4b1e6d] to-[#3a1c5c]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-3xl p-10 w-full max-w-md shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-white mb-2 drop-shadow"
          >
            StudyList
          </motion.h1>
          <p className="text-purple-200">Your study companion</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-500 text-center font-medium">{error}</div>
          )}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 glass-card rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-transparent"
              required
            />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 glass-card rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </motion.div>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-600 transition-colors duration-100 shadow-md"
          >
            {isSignUp ? 'SIGN UP' : 'LOG IN'}
          </motion.button>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full py-3 bg-gradient-to-r from-[#a084e8] to-[#6f61c0] text-white rounded-xl font-semibold hover:from-[#bca7f2] hover:to-[#7c6fd0] transition-all duration-100 border-none shadow-md"
          >
            {isSignUp ? 'LOG IN' : 'SIGN UP'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
 