import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, LogOut, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import TaskModal from './TaskModal';

function SubjectView({ subject, onBack, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const subjectTitles = {
    math: 'Mathematics',
    english: 'English',
    science: 'Science'
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-[#1a1440] via-[#4b1e6d] to-[#3a1c5c] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl p-10 max-w-4xl w-full mx-auto shadow-2xl border border-white/20 bg-white/15"
      >
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 glass-card rounded-xl text-white hover:bg-white/20 transition-colors duration-100 border border-white/20 shadow mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h2 className="text-2xl font-bold text-white drop-shadow">{subjectTitles[subject]}</h2>
          <button
            onClick={onLogout}
            className="ml-auto p-2 glass-card rounded-xl text-white hover:bg-white/20 transition-colors duration-100 border border-white/20 shadow"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold shadow-md hover:from-purple-700 hover:to-blue-600 transition-colors duration-100"
          >
            <Plus className="w-5 h-5" /> Add Task
          </motion.button>
        </div>
        <div className="space-y-4">
          <AnimatePresence>
            {tasks.map((task) => (
              <>
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`glass-card rounded-xl p-4 flex items-center justify-between border border-white/20 shadow-lg bg-white/10 ${task.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTask(task.id)}
                      className={`p-2 rounded-lg transition-colors duration-100 shadow-md border border-white/20 ${task.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                      {task.completed ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <X className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                    <div>
                      <h3 className={`font-semibold text-white ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                      <p className="text-purple-200 text-sm">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                    className="ml-4 p-2 rounded-lg text-white hover:bg-white/20 border border-white/20"
                  >
                    {expandedTask === task.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </motion.div>
                {expandedTask === task.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white/10 rounded-b-xl px-6 pb-4 mb-2 border-l-4 border-purple-400"
                  >
                    <div className="space-y-1 text-purple-100 text-base pt-2">
                      <p><span className="font-semibold text-purple-300">Description:</span> {task.description}</p>
                      <p><span className="font-semibold text-purple-300">Preparation:</span> {task.preparation}</p>
                      <p><span className="font-semibold text-purple-300">Marks:</span> {task.marks}</p>
                    </div>
                  </motion.div>
                )}
              </>
            ))}
          </AnimatePresence>
        </div>
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={addTask}
          subject={subject}
        />
      </motion.div>
    </div>
  );
}

export default SubjectView;
 