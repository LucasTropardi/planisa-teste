import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Benchmark } from "./pages/Benchmark";
import { Users } from "./pages/Users";
import { AdminRoute } from "./routes/AdminRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/benchmark" element={<ProtectedRoute><Benchmark /></ProtectedRoute>} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Users />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
