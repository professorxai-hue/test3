import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import Login from './components/Login';
import TodoList from './components/TodoList';

const AppContent =  => {
  const { currentUser } = useAuth;

  return (
    <div className="app-container">
      <header className="header">
        <h1>📝 TodoList RBAC App</h1>
        <p>Role-Based Access Control Demo</p>
      </header>
      
      {currentUser ? (
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      ) : (
        <Login />
      )}
    </div>
  );
};

const App =  => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;