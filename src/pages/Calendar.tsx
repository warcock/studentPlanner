
import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';

const Calendar = () => {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'year'>('month');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      isSameDay(new Date(task.dueDate), date)
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  const generateYearView = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentDate.getFullYear(), i, 1);
      const monthTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getFullYear() === currentDate.getFullYear() && 
               taskDate.getMonth() === i;
      });
      
      months.push({
        date: monthDate,
        name: format(monthDate, 'MMMM'),
        taskCount: monthTasks.length
      });
    }
    return months;
  };

  return (
    <Layout>
      <div className="px-4 py-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <div className="flex space-x-2">
            <Button 
              variant={view === 'month' ? 'default' : 'outline'}
              onClick={() => setView('month')}
            >
              Monthly
            </Button>
            <Button 
              variant={view === 'year' ? 'default' : 'outline'}
              onClick={() => setView('year')}
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>
                      {view === 'month' 
                        ? format(currentDate, 'MMMM yyyy')
                        : format(currentDate, 'yyyy')
                      }
                    </span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => view === 'month' ? navigateMonth('prev') : navigateYear('prev')}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => view === 'month' ? navigateMonth('next') : navigateYear('next')}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {view === 'month' ? (
                  <div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => {
                        const dayTasks = getTasksForDate(day);
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isToday = isSameDay(day, new Date());
                        
                        return (
                          <div
                            key={index}
                            className={`p-2 min-h-[80px] border border-gray-200 ${
                              isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                            } ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
                          >
                            <div className={`text-sm ${
                              isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                            } ${isToday ? 'font-bold text-blue-600' : ''}`}>
                              {format(day, 'd')}
                            </div>
                            {dayTasks.length > 0 && (
                              <div className="mt-1">
                                {dayTasks.slice(0, 2).map((task, taskIndex) => (
                                  <div
                                    key={taskIndex}
                                    className={`text-xs p-1 mb-1 rounded truncate ${
                                      task.completed 
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                    title={task.title}
                                  >
                                    {task.title}
                                  </div>
                                ))}
                                {dayTasks.length > 2 && (
                                  <div className="text-xs text-gray-500">
                                    +{dayTasks.length - 2} more
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {generateYearView().map((month, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setCurrentDate(month.date);
                          setView('month');
                        }}
                      >
                        <div className="font-medium text-gray-900">{month.name}</div>
                        <div className="text-sm text-gray-500">
                          {month.taskCount} task{month.taskCount !== 1 ? 's' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No tasks scheduled</p>
                ) : (
                  <div className="space-y-3">
                    {tasks
                      .filter(task => new Date(task.dueDate) >= new Date() && !task.completed)
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .slice(0, 5)
                      .map((task) => (
                        <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(task.dueDate), 'PPP')}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
