import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("jwt_token");
  const location = useLocation();

  if (!token) {
    // Redirect to login and save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
