import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import TodoList from './components/TodoList';

const AppContent =  => {
  const { user } = useAuth;
  return user ? <TodoList /> : <Login />;
};

function App {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;