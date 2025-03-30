import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type AuthGuardProps = {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "employee")[];
};

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { user, userRole, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have the required role
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect admin to admin dashboard
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    }
    // Redirect employee to employee dashboard
    if (userRole === "employee") {
      return <Navigate to="/employee" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
