import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  [ROLES.ADMIN]: ['create', 'read', 'update', 'delete', 'complete'],
  [ROLES.EDITOR]: ['create', 'read', 'update', 'complete'],
  [ROLES.VIEWER]: ['read']
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, role) => {
    setUser({ username, role, permissions: PERMISSIONS[role] });
  };

  const logout =  => {
    setUser(null);
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =  => useContext(AuthContext);