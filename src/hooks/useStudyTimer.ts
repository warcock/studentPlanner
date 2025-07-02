
import { useState, useEffect } from 'react';
import { StudySession } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useStudyTimer = () => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentSession, setCurrentSession] = useState<number>(0); // in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setCurrentSession(diff);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);

  const startTimer = () => {
    const now = new Date();
    setStartTime(now);
    setIsActive(true);
    setCurrentSession(0);
  };

  const stopTimer = () => {
    if (!user || !startTime) return;

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // in minutes

    if (duration > 0) {
      const session: StudySession = {
        id: Date.now().toString(),
        userId: user.id,
        date: startTime.toISOString().split('T')[0],
        duration,
        startTime,
        endTime
      };

      const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
      sessions.push(session);
      localStorage.setItem('studySessions', JSON.stringify(sessions));
    }

    setIsActive(false);
    setStartTime(null);
    setCurrentSession(0);
  };

  const getWeeklyStudyTime = () => {
    if (!user) return [];

    const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const userSessions = sessions.filter((session: StudySession) => session.userId === user.id);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekSessions = userSessions.filter((session: StudySession) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= weekStart && sessionDate <= weekEnd;
    });

    const dailyTotals = Array(7).fill(0);
    weekSessions.forEach((session: StudySession) => {
      const dayIndex = new Date(session.date).getDay();
      dailyTotals[dayIndex] += session.duration;
    });

    return dailyTotals;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    isActive,
    currentSession,
    startTimer,
    stopTimer,
    getWeeklyStudyTime,
    formatTime
  };
};
