import  { motion } from 'framer-motion';
import { Book, Calculator, Globe, LogOut, User } from 'lucide-react';

function Dashboard({ onSelectSubject, onLogout }) {
   const subjects = [
    { id: 'math', name: 'Math', icon: Calculator, color: 'from-blue-500 to-blue-600' },
    { id: 'english', name: 'English', icon: Book, color: 'from-blue-600 to-indigo-600' },
    { id: 'science', name: 'Science', icon: Globe, color: 'from-indigo-600 to-blue-700' }
  ]; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1a1440] via-[#4b1e6d] to-[#3a1c5c]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl p-10 w-full max-w-2xl shadow-2xl border border-white/20 bg-white/15"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white drop-shadow mb-0"
          >
            Which subject do you want to list today?
          </motion.h1>
          <motion.button
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onLogout}
            className="p-2 glass-card rounded-xl text-white hover:bg-white/20 transition-colors duration-100 border border-white/20 shadow"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.15 }}
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectSubject(subject.id)}
              className="glass-card rounded-2xl p-8 text-white font-medium flex flex-col items-center shadow-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-150 group"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-100 shadow-lg">
                <subject.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mt-2 text-white drop-shadow">{subject.name}</h3>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
 