import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);
  return children;
}

export default ProtectedRoute;
