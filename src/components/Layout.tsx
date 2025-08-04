import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center fade-in">{children}</div>;
  }

  const navigation = [
    { name: 'Dashboard', path: '/' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Reminders', path: '/reminders' },
    { name: 'Study Timer', path: '/study-timer' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col fade-in">
      <nav className="bg-white/80 dark:bg-card/80 shadow-sm border-b smooth backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary tracking-tight select-none">Scholar</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium smooth ${
                      location.pathname === item.path
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/40'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}!</span>
              <Button variant="outline" size="sm" className="smooth" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full flex-1 flex flex-col fade-in">
        <div className="backdrop-blur-md bg-white/70 dark:bg-card/70 rounded-xl shadow-lg p-6 smooth fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
