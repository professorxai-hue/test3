import React, { useState } from 'react';
import { AuthProvider, useAuth, PERMISSIONS } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import Login from './components/Login';
import Header from './components/Header';
import TodoList from './components/TodoList';
import UserManagement from './components/UserManagement';

const AppContent =  => {
  const { isAuthenticated, hasPermission } = useAuth;
  const [activeTab, setActiveTab] = useState('todos');

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <TodoProvider>
      <div className="app">
        <Header />
        
        <nav className="app-nav">
          <button 
            className={`nav-btn ${activeTab === 'todos' ? 'active' : }`}
            onClick={ => setActiveTab('todos')}
          >
            Tasks
          </button>
          {hasPermission(PERMISSIONS.MANAGE_USERS) && (
            <button 
              className={`nav-btn ${activeTab === 'users' ? 'active' : }`}
              onClick={ => setActiveTab('users')}
            >
              User Management
            </button>
          )}
        </nav>

        <main className="app-main">
          {activeTab === 'todos' && <TodoList />}
          {activeTab === 'users' && <UserManagement />}
        </main>

        <footer className="app-footer">
          <p>TodoList with Role-Based Access Control (RBAC)</p>
        </footer>
      </div>
    </TodoProvider>
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
