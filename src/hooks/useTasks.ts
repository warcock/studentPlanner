
import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const userTasks = savedTasks.filter((task: Task) => task.userId === user.id);
      setTasks(userTasks);
    }
  }, [user]);

  const addTask = (title: string, description: string, dueDate: Date) => {
    if (!user) return;

    const newTask: Task = {
      id: Date.now().toString(),
      userId: user.id,
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date()
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    allTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);

    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedAllTasks = allTasks.map((task: Task) => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);

    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedAllTasks = allTasks.filter((task: Task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
  };

  const getTasksSortedByDueDate = () => {
    return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  const getUpcomingTasks = (days: number = 3) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= now && taskDate <= futureDate && !task.completed;
    }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksSortedByDueDate,
    getUpcomingTasks
  };
};
