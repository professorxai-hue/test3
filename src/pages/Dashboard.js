import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRBAC } from '../hooks/useRBAC';
import RoleGate from '../components/RoleGate';
import { PERMISSIONS } from '../utils/rbac';

const Dashboard =  => {
  const { user, logout } = useAuth;
  const { role } = useRBAC;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username}! Your role: <strong>{role}</strong></p>
      <div style={{ marginTop: '20px' }}>
        <h3>Your Permissions:</h3>
        <RoleGate permission={PERMISSIONS.READ}><p>✅ Read Access</p></RoleGate>
        <RoleGate permission={PERMISSIONS.CREATE}><p>✅ Create Access</p></RoleGate>
        <RoleGate permission={PERMISSIONS.UPDATE}><p>✅ Update Access</p></RoleGate>
        <RoleGate permission={PERMISSIONS.DELETE}><p>✅ Delete Access</p></RoleGate>
      </div>
      <button onClick={logout} style={{ marginTop: '20px', padding: '10px 20px' }}>Logout</button>
    </div>
  );
};

export default Dashboard;
