import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthContext } from "./_services/AuthContext";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./_services/ProtectedRoute";
import AdminRoute from "./_services/AdminRoute";

function App() {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  return (
    <div className="App">
      {auth.isAuthenticated && !(location.pathname === "/admin") && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decisions/create"
          element={
            <ProtectedRoute>
              <CreateDecision />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decision/:id"
          element={
            <ProtectedRoute>
              <Decision />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
