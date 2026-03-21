import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login =  => {
  const [selectedUser, setSelectedUser] = useState();
  const { users, login } = useAuth;

  const handleLogin = (e) => {
    e.preventDefault;
    if (selectedUser) {
      login(selectedUser);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to TodoList RBAC App</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Select a user to login and experience different permission levels
      </p>
      <form className="login-form" onSubmit={handleLogin}>
        <select 
          value={selectedUser} 
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        >
          <option value="">Select a user...</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
        <button type="submit">Login</button>
      </form>
      
      <div className="permissions-info">
        <h4>Role Permissions:</h4>
        <ul>
          <li><strong>Admin:</strong> Full access - can manage all todos and users</li>
          <li><strong>Manager:</strong> Can create, read, update any todo, delete own todos</li>
          <li><strong>User:</strong> Can only manage their own todos</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;