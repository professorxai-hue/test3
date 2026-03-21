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
      <div className="login-box">
        <h2>TodoList RBAC Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={ROLES.ADMIN}>Admin (Full Access)</option>
            <option value={ROLES.EDITOR}>Editor (No Delete)</option>
            <option value={ROLES.VIEWER}>Viewer (Read Only)</option>
          </select>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;