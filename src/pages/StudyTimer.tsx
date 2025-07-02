
import React from 'react';
import { useStudyTimer } from '@/hooks/useStudyTimer';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

const StudyTimer = () => {
  const { 
    isActive, 
    currentSession, 
    startTimer, 
    stopTimer, 
    getWeeklyStudyTime, 
    formatTime 
  } = useStudyTimer();

  const weeklyStudyTime = getWeeklyStudyTime();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const totalWeeklyMinutes = weeklyStudyTime.reduce((sum, minutes) => sum + minutes, 0);
  const averageDailyMinutes = Math.round(totalWeeklyMinutes / 7);

  return (
    <Layout>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Timer</h1>
          <p className="text-gray-600">Track your study sessions and stay motivated</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6" />
                <span>Current Session</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">
                  {formatTime(currentSession)}
                </div>
                <div className="space-x-4">
                  {!isActive ? (
                    <Button 
                      onClick={startTimer} 
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      Start Timer
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopTimer} 
                      size="lg"
                      variant="destructive"
                    >
                      Stop Timer
                    </Button>
                  )}
                </div>
                {isActive && (
                  <p className="mt-4 opacity-90">
                    Keep going! You're doing great! 🚀
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {Math.floor(totalWeeklyMinutes / 60)}h {totalWeeklyMinutes % 60}m
                  </div>
                  <p className="text-gray-600">Total this week</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {Math.floor(averageDailyMinutes / 60)}h {averageDailyMinutes % 60}m
                  </div>
                  <p className="text-gray-500 text-sm">Daily average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Day</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Study Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {dayNames.map((day, index) => {
                    const minutes = weeklyStudyTime[index];
                    const hours = Math.floor(minutes / 60);
                    const remainingMinutes = minutes % 60;
                    const progressPercentage = totalWeeklyMinutes > 0 ? (minutes / Math.max(...weeklyStudyTime)) * 100 : 0;
                    
                    return (
                      <tr key={day} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{day}</td>
                        <td className="py-3 px-4">
                          {hours > 0 || remainingMinutes > 0 ? (
                            <span className="text-green-600 font-semibold">
                              {hours > 0 && `${hours}h `}{remainingMinutes > 0 && `${remainingMinutes}m`}
                            </span>
                          ) : (
                            <span className="text-gray-400">No study time</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {totalWeeklyMinutes === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">⏰</div>
                <p className="text-gray-500">
                  Start your first study session to see your progress here!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {totalWeeklyMinutes > 0 && (
          <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="text-center py-6">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Great Progress This Week!
              </h3>
              <p className="text-gray-600">
                You've studied for {Math.floor(totalWeeklyMinutes / 60)} hours and {totalWeeklyMinutes % 60} minutes. 
                Keep up the excellent work!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default StudyTimer;
