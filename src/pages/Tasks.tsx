
import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, getTasksSortedByDueDate } = useTasks();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date>();

  const handleAddTask = () => {
    if (!title || !dueDate) {
      toast({ 
        title: "Missing information", 
        description: "Please fill in the title and due date.",
        variant: "destructive"
      });
      return;
    }

    addTask(title, description, dueDate);
    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setIsAddingTask(false);
    toast({ title: "Task added!", description: "Your task has been created successfully." });
  };

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed: !completed });
    toast({ 
      title: completed ? "Task marked as pending" : "Task completed!", 
      description: completed ? "Task moved back to pending." : "Great job completing your task!" 
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast({ title: "Task deleted", description: "The task has been removed." });
  };

  const sortedTasks = getTasksSortedByDueDate();

  return (
    <Layout>
      <div className="px-4 py-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button>Add New Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                  />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTask}>
                    Add Task
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {sortedTasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No tasks yet!</p>
              <p className="text-gray-400 mb-6">Create your first task to get started with your student planner.</p>
              <Button onClick={() => setIsAddingTask(true)}>Create Your First Task</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((task) => {
              const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
              const isDueSoon = (
                new Date(task.dueDate).getTime() - new Date().getTime()
              ) < (2 * 24 * 60 * 60 * 1000) && !task.completed; // Due within 2 days

              return (
                <Card key={task.id} className={cn(
                  "transition-all hover:shadow-md",
                  task.completed && "bg-green-50 border-green-200",
                  isOverdue && "bg-red-50 border-red-200",
                  isDueSoon && !isOverdue && "bg-yellow-50 border-yellow-200"
                )}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task.id, task.completed)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <h3 className={cn(
                            "font-semibold text-lg",
                            task.completed && "line-through text-gray-500"
                          )}>
                            {task.title}
                          </h3>
                        </div>
                        {task.description && (
                          <p className="text-gray-600 mt-2 ml-7">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-3 ml-7">
                          <span className="text-sm text-gray-500">
                            Due: {format(new Date(task.dueDate), "PPP")}
                          </span>
                          {isOverdue && (
                            <span className="text-red-600 text-sm font-medium">⚠️ Overdue</span>
                          )}
                          {isDueSoon && !isOverdue && (
                            <span className="text-yellow-600 text-sm font-medium">⏰ Due Soon</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
