import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    } else if (auth.role !== "admin") {
      navigate("/");
    }
  }, [auth.isAuthenticated, auth.role, navigate]);
  return children;
}

export default AdminRoute;
