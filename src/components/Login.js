import React, { useState } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';

const Login =  => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { login } = useAuth;

  const handleSubmit = (e) => {
    e.preventDefault;
    setError();
    const result = login(username, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const demoCredentials = [
    { role: 'Admin', username: 'admin', password: 'admin123', desc: 'Full access' },
    { role: 'Manager', username: 'manager', password: 'manager123', desc: 'Manage & assign todos' },
    { role: 'User', username: 'user', password: 'user123', desc: 'Create & manage own todos' },
    { role: 'Viewer', username: 'viewer', password: 'viewer123', desc: 'Read-only access' }
  ];

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>TodoList RBAC</h1>
        <p className="subtitle">Role-Based Access Control Demo</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Accounts</h3>
          <div className="credentials-grid">
            {demoCredentials.map((cred) => (
              <div 
                key={cred.role} 
                className="credential-card"
                onClick={ => {
                  setUsername(cred.username);
                  setPassword(cred.password);
                }}
              >
                <span className={`role-badge role-${cred.role.toLowerCase}`}>
                  {cred.role}
                </span>
                <p className="credential-desc">{cred.desc}</p>
                <code>{cred.username} / {cred.password}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
