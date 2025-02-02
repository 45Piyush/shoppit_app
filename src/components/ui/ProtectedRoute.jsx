import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState(null);
  const location = useLocation();

  useEffect(function () {
    auth().catch(() => setIsAuthorised(false));
  }, []);

  // To retrieve Refresh Token when Access Token Expired
  async function refreshToken() {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      setIsAuthorised(false);
      return;
    }

    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        setIsAuthorised(true);
      } else {
        setIsAuthorised(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthorised(false);
    }
  }

  // To Set Access to Login if Acess Token is Present
  async function auth() {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthorised(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiry_date = decoded.exp;
      const current_time = Date.now() / 1000;
      if (current_time > expiry_date) {
        await refreshToken();
      } else {
        setIsAuthorised(true);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsAuthorised(false);
    }
  }

  if (isAuthorised === null) {
    return <Spinner />;
  }

  return isAuthorised ? children : <Navigate to="/login" state={{from:location}} replace />;
};

export default ProtectedRoute;
