import React, { createContext, useContext, useState } from 'react';
import { ROLES } from '../utils/rbac';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, role) => {
    setUser({ username, role });
  };

  const logout =  => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =  => useContext(AuthContext);
