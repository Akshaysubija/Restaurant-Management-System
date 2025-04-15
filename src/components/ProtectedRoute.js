import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
