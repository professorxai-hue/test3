import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Define roles and their permissions
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  CREATE_TODO: 'create_todo',
  READ_TODO: 'read_todo',
  UPDATE_TODO: 'update_todo',
  DELETE_TODO: 'delete_todo',
  MANAGE_USERS: 'manage_users',
  ASSIGN_TODOS: 'assign_todos'
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_TODO,
    PERMISSIONS.READ_TODO,
    PERMISSIONS.UPDATE_TODO,
    PERMISSIONS.DELETE_TODO,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.ASSIGN_TODOS
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.CREATE_TODO,
    PERMISSIONS.READ_TODO,
    PERMISSIONS.UPDATE_TODO,
    PERMISSIONS.DELETE_TODO,
    PERMISSIONS.ASSIGN_TODOS
  ],
  [ROLES.USER]: [
    PERMISSIONS.CREATE_TODO,
    PERMISSIONS.READ_TODO,
    PERMISSIONS.UPDATE_TODO
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.READ_TODO
  ]
};

// Mock users database
const MOCK_USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: ROLES.ADMIN, name: 'Admin User' },
  { id: 2, username: 'manager', password: 'manager123', role: ROLES.MANAGER, name: 'Manager User' },
  { id: 3, username: 'user', password: 'user123', role: ROLES.USER, name: 'Regular User' },
  { id: 4, username: 'viewer', password: 'viewer123', role: ROLES.VIEWER, name: 'Viewer User' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState( => {
    const saved = localStorage.getItem('rbac_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState(MOCK_USERS);

  const login = useCallback((username, password) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('rbac_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  }, [users]);

  const logout = useCallback( => {
    setUser(null);
    localStorage.removeItem('rbac_user');
  }, );

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || ;
    return userPermissions.includes(permission);
  }, [user]);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  }, [user]);

  const getAllUsers = useCallback( => {
    return users.map(({ password, ...u }) => u);
  }, [users]);

  const updateUserRole = useCallback((userId, newRole) => {
    if (!hasPermission(PERMISSIONS.MANAGE_USERS)) return false;
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    return true;
  }, [hasPermission]);

  const value = {
    user,
    login,
    logout,
    hasPermission,
    hasRole,
    getAllUsers,
    updateUserRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;
