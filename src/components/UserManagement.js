import React from 'react';
import { useAuth, ROLES, PERMISSIONS } from '../context/AuthContext';

const UserManagement =  => {
  const { getAllUsers, updateUserRole, hasPermission, user } = useAuth;
  
  if (!hasPermission(PERMISSIONS.MANAGE_USERS)) {
    return null;
  }

  const users = getAllUsers;

  const handleRoleChange = (userId, newRole) => {
    if (userId === user.id) {
      alert("You cannot change your own role");
      return;
    }
    updateUserRole(userId, newRole);
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <p className="section-desc">Manage user roles and permissions</p>
      
      <div className="users-table">
        <div className="table-header">
          <span>User</span>
          <span>Current Role</span>
          <span>Change Role</span>
        </div>
        {users.map(u => (
          <div key={u.id} className="table-row">
            <div className="user-info">
              <span className="user-name">{u.name}</span>
              <span className="user-username">@{u.username}</span>
            </div>
            <span className={`role-badge role-${u.role}`}>{u.role}</span>
            <select
              value={u.role}
              onChange={(e) => handleRoleChange(u.id, e.target.value)}
              disabled={u.id === user.id}
              className="role-select"
            >
              {Object.values(ROLES).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="permissions-info">
        <h3>Role Permissions</h3>
        <div className="permissions-grid">
          <div className="permission-card">
            <h4>Admin</h4>
            <ul>
              <li>Full access to all features</li>
              <li>Manage users and roles</li>
              <li>Assign todos to anyone</li>
            </ul>
          </div>
          <div className="permission-card">
            <h4>Manager</h4>
            <ul>
              <li>Create, read, update, delete todos</li>
              <li>Assign todos to users</li>
              <li>View all todos</li>
            </ul>
          </div>
          <div className="permission-card">
            <h4>User</h4>
            <ul>
              <li>Create own todos</li>
              <li>Update own todos</li>
              <li>View assigned todos</li>
            </ul>
          </div>
          <div className="permission-card">
            <h4>Viewer</h4>
            <ul>
              <li>Read-only access</li>
              <li>View assigned todos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
