import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component }) {
  const isAuthenticated = true; // 실제 인증 로직을 추가해야 합니다.

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;