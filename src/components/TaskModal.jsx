import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function TaskModal({ isOpen, onClose, onSubmit, subject }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    preparation: '',
    marks: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', dueDate: '', preparation: '', marks: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-[#1a1440]/80 via-[#4b1e6d]/80 to-[#3a1c5c]/80 flex items-center justify-center p-4 z-50 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="rounded-2xl p-10 w-full max-w-sm shadow-2xl border border-purple-300 bg-[#ede9fe] transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-purple-900">Add New Task</h2>
              <motion.button
                whileHover={{ scale: 1.15, backgroundColor: '#ede9fe' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                onClick={onClose}
                className="p-2 bg-white rounded-lg text-purple-800 hover:bg-purple-200 transition-colors duration-100 border border-purple-300 shadow-md"
                style={{ boxShadow: '0 2px 8px 0 rgba(80, 0, 120, 0.10)' }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-purple-900 mb-2">What are you going to list about?</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#f8fafc] text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border border-purple-200 shadow-sm"
                  placeholder="Task title"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-900 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#f8fafc] text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 h-20 border border-purple-200 shadow-sm"
                  placeholder="Task description"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-900 mb-2">When is it due?</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#f8fafc] text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-300 border border-purple-200 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-900 mb-2">What do you need to prepare?</label>
                <input
                  type="text"
                  name="preparation"
                  value={formData.preparation}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#f8fafc] text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border border-purple-200 shadow-sm"
                  placeholder="Preparation needed"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-900 mb-2">How many scores/marks is this list?</label>
                <input
                  type="number"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#f8fafc] text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border border-purple-200 shadow-sm"
                  placeholder="Total marks"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-100 shadow-lg"
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;
 