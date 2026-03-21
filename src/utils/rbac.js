export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [PERMISSIONS.CREATE, PERMISSIONS.READ, PERMISSIONS.UPDATE, PERMISSIONS.DELETE],
  [ROLES.EDITOR]: [PERMISSIONS.CREATE, PERMISSIONS.READ, PERMISSIONS.UPDATE],
  [ROLES.VIEWER]: [PERMISSIONS.READ]
};

export const hasPermission = (userRole, permission) => {
  const permissions = ROLE_PERMISSIONS[userRole] || ;
  return permissions.includes(permission);
};

export const hasAnyPermission = (userRole, permissionList) => {
  return permissionList.some(permission => hasPermission(userRole, permission));
};
