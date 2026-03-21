import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header =  => {
  const { user, logout } = useAuth;

  return (
    <header className="header">
      <div className="user-info">
        <h2>📝 TodoList</h2>
        <span>Welcome, {user.name}</span>
        <span className={`role-badge ${user.role}`}>{user.role}</span>
      </div>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;