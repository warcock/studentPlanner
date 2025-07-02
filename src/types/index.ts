
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  duration: number; // in minutes
  startTime: Date;
  endTime?: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
