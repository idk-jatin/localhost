import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
