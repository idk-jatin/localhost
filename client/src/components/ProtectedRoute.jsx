import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, initialized } = useAuth();

  if (!initialized) {
    return <div className="text-terminal p-4">initializing auth…</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
