import type { ReactElement } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactElement;
  message?: string;
};

const ProtectedRoute = ({ children, message = "Please log in or sign up first." }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (!isAuthenticated) {
      alert(message);
    }
  }, [isAuthenticated, message]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;