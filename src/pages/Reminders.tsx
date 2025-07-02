
import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

const Reminders = () => {
  const { getUpcomingTasks } = useTasks();
  
  const upcomingTasks = getUpcomingTasks(3);
  
  const getUrgencyColor = (daysUntilDue: number) => {
    if (daysUntilDue <= 1) return 'red';
    if (daysUntilDue <= 2) return 'yellow';
    return 'blue';
  };

  const getUrgencyClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 border-red-200 border-l-red-500';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 border-l-yellow-500';
      default:
        return 'bg-blue-50 border-blue-200 border-l-blue-500';
    }
  };

  const getUrgencyIcon = (color: string) => {
    switch (color) {
      case 'red':
        return '🚨';
      case 'yellow':
        return '⚠️';
      default:
        return '📅';
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reminders</h1>
          <p className="text-gray-600">Tasks due within the next 3 days</p>
        </div>

        {upcomingTasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                All caught up!
              </h2>
              <p className="text-gray-500">
                No urgent tasks coming up in the next 3 days. Great job staying organized!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">{getUrgencyIcon('red')}</div>
                  <h2 className="text-xl font-bold mb-1">
                    You have {upcomingTasks.length} upcoming task{upcomingTasks.length !== 1 ? 's' : ''}
                  </h2>
                  <p className="opacity-90">Stay on top of your deadlines!</p>
                </div>
              </CardContent>
            </Card>

            {upcomingTasks.map((task) => {
              const daysUntilDue = Math.ceil(
                (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              const urgencyColor = getUrgencyColor(daysUntilDue);
              const urgencyClass = getUrgencyClass(urgencyColor);
              const urgencyIcon = getUrgencyIcon(urgencyColor);

              return (
                <Card key={task.id} className={`border-l-4 ${urgencyClass}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <span className="text-2xl">{urgencyIcon}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Due: {format(new Date(task.dueDate), 'EEEE, MMMM do, yyyy')}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        urgencyColor === 'red' 
                          ? 'bg-red-100 text-red-800'
                          : urgencyColor === 'yellow'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {daysUntilDue === 0 
                          ? 'Due Today!' 
                          : `${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''} left`
                        }
                      </div>
                    </CardTitle>
                  </CardHeader>
                  {task.description && (
                    <CardContent>
                      <p className="text-gray-700">{task.description}</p>
                    </CardContent>
                  )}
                </Card>
              );
            })}

            <Card className="mt-8 border-dashed border-2 border-gray-300">
              <CardContent className="text-center py-8">
                <div className="text-4xl mb-3">💡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Tip</h3>
                <p className="text-gray-600">
                  Break down large tasks into smaller, manageable chunks to avoid last-minute stress!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reminders;
