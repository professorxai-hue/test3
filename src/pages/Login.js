import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES } from '../utils/rbac';

const Login =  => {
  const [username, setUsername] = useState();
  const [role, setRole] = useState(ROLES.VIEWER);
  const { login } = useAuth;
  const navigate = useNavigate;

  const handleSubmit = (e) => {
    e.preventDefault;
    login(username, role);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.EDITOR}>Editor</option>
            <option value={ROLES.VIEWER}>Viewer</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
