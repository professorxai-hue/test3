import React from 'react';
import { useAuth, PERMISSIONS } from '../context/AuthContext';

const Header =  => {
  const { user, logout, hasPermission } = useAuth;

  return (
    <header className="app-header">
      <div className="header-brand">
        <h1>TodoList RBAC</h1>
      </div>
      
      <div className="header-user">
        <div className="user-details">
          <span className="user-name">{user?.name}</span>
          <span className={`role-badge role-${user?.role}`}>{user?.role}</span>
        </div>
        <div className="user-permissions">
          {hasPermission(PERMISSIONS.CREATE_TODO) && <span className="perm-badge">Create</span>}
          {hasPermission(PERMISSIONS.UPDATE_TODO) && <span className="perm-badge">Update</span>}
          {hasPermission(PERMISSIONS.DELETE_TODO) && <span className="perm-badge">Delete</span>}
          {hasPermission(PERMISSIONS.MANAGE_USERS) && <span className="perm-badge">Admin</span>}
        </div>
        <button onClick={logout} className="btn btn-logout">
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
