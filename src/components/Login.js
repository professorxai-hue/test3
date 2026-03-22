import React, { useState } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';

const Login =  => {
  const [username, setUsername] = useState();
  const [role, setRole] = useState(ROLES.VIEWER);
  const { login } = useAuth;

  const handleSubmit = (e) => {
    e.preventDefault;
    if (username.trim) {
      login(username, role);
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to TodoList RBAC</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        Select a role to experience different permission levels
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value={ROLES.ADMIN}>Admin (Full Access)</option>
          <option value={ROLES.EDITOR}>Editor (Create, Read, Update)</option>
          <option value={ROLES.VIEWER}>Viewer (Read Only)</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '5px' }}>
        <h4>Role Permissions:</h4>
        <ul style={{ marginTop: '10px', marginLeft: '20px', color: '#666' }}>
          <li><strong>Admin:</strong> Create, Read, Update, Delete todos</li>
          <li><strong>Editor:</strong> Create, Read, Update todos</li>
          <li><strong>Viewer:</strong> Read todos only</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;