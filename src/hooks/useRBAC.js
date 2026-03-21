import { useAuth } from '../contexts/AuthContext';
import { hasPermission, hasAnyPermission } from '../utils/rbac';

export const useRBAC =  => {
  const { user } = useAuth;

  const can = (permission) => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const canAny = (permissions) => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  return { can, canAny, role: user?.role };
};
