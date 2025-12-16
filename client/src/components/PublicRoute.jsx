import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute({ children }) {
  const { user, initialized } = useAuth();

  if (!initialized) {
    return <div className="text-terminal p-4">initializing auth…</div>;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children; 
}