import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
