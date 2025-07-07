import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SubjectView from './components/SubjectView';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedSubject(null);
    localStorage.removeItem('studylist-username');
  };

  return (
       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4"> 
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Login onLogin={handleLogin} />
          </motion.div>
        ) : selectedSubject ? (
          <motion.div
            key="subject"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <SubjectView 
              subject={selectedSubject} 
              onBack={() => setSelectedSubject(null)}
              onLogout={handleLogout}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Dashboard 
              onSelectSubject={setSelectedSubject}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
 