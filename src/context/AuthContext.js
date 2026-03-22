import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Role-based permissions
export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  [ROLES.ADMIN]: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canManageUsers: true
  },
  [ROLES.EDITOR]: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: false,
    canManageUsers: false
  },
  [ROLES.VIEWER]: {
    canCreate: false,
    canRead: true,
    canUpdate: false,
    canDelete: false,
    canManageUsers: false
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, role) => {
    setUser({
      username,
      role,
      permissions: PERMISSIONS[role]
    });
  };

  const logout =  => {
    setUser(null);
  };

  const hasPermission = (permission) => {
    return user?.permissions?.[permission] || false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =  => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};