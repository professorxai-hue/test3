import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Define roles and their permissions
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

export const PERMISSIONS = {
  CREATE_TODO: 'create_todo',
  READ_TODO: 'read_todo',
  UPDATE_OWN_TODO: 'update_own_todo',
  UPDATE_ANY_TODO: 'update_any_todo',
  DELETE_OWN_TODO: 'delete_own_todo',
  DELETE_ANY_TODO: 'delete_any_todo',
  MANAGE_USERS: 'manage_users'
};

// Role-Permission mapping
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_TODO,
    PERMISSIONS.READ_TODO,
    PERMISSIONS.UPDATE_OWN_TODO,
    PERMISSIONS.UPDATE_ANY_TODO,
    PERMISSIONS.DELETE_OWN_TODO,
    PERMISSIONS.DELETE_ANY_TODO,
    PERMISSIONS.MANAGE_USERS
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.CREATE_TODO,
    PERMISSIONS.READ_TODO,
    PERMISSIONS.UPDATE_OWN_TODO,
    PERMISSIONS.UPDATE_ANY_TODO,
    PERMISSIONS.DELETE_OWN_TODO
  ],
  [ROLES.USER]: [
    PERMISSIONS.CREATE_TODO,
    PERMISSIONS.READ_TODO,
    PERMISSIONS.UPDATE_OWN_TODO,
    PERMISSIONS.DELETE_OWN_TODO
  ]
};

// Mock users
const USERS = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: ROLES.ADMIN },
  { id: 2, name: 'Manager User', email: 'manager@example.com', role: ROLES.MANAGER },
  { id: 3, name: 'Regular User', email: 'user@example.com', role: ROLES.USER }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userId) => {
    const user = USERS.find(u => u.id === parseInt(userId));
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout =  => {
    setCurrentUser(null);
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    const userPermissions = ROLE_PERMISSIONS[currentUser.role] || ;
    return userPermissions.includes(permission);
  };

  const canModifyTodo = (todo, action) => {
    if (!currentUser) return false;
    
    if (action === 'update') {
      if (hasPermission(PERMISSIONS.UPDATE_ANY_TODO)) return true;
      if (hasPermission(PERMISSIONS.UPDATE_OWN_TODO) && todo.userId === currentUser.id) return true;
    }
    
    if (action === 'delete') {
      if (hasPermission(PERMISSIONS.DELETE_ANY_TODO)) return true;
      if (hasPermission(PERMISSIONS.DELETE_OWN_TODO) && todo.userId === currentUser.id) return true;
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users: USERS,
      login,
      logout,
      hasPermission,
      canModifyTodo,
      ROLES,
      PERMISSIONS
    }}>
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