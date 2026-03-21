import React from 'react';
import { useAuth } from '../context/AuthContext';

const PermissionsInfo =  => {
  const { user } = useAuth;

  const permissionLabels = {
    canCreate: 'Create new todos',
    canRead: 'View todos',
    canUpdate: 'Edit and toggle todos',
    canDelete: 'Delete todos',
    canManageUsers: 'Manage users',
  };

  return (
    <div className="permissions-info">
      <h3>🔑 Your Permissions ({user.role})</h3>
      <ul>
        {Object.entries(user.permissions).map(([key, value]) => (
          value && <li key={key}>{permissionLabels[key]}</li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionsInfo;