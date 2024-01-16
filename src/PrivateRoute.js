import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token && !refreshToken) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    children
  );
}
export default PrivateRoute;
