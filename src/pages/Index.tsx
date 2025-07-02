
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
