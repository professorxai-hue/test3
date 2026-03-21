import React from 'react';
import { useRBAC } from '../hooks/useRBAC';

const RoleGate = ({ permission, permissions, children, fallback = null }) => {
  const { can, canAny } = useRBAC;

  if (permission && can(permission)) return children;
  if (permissions && canAny(permissions)) return children;
  return fallback;
};

export default RoleGate;
