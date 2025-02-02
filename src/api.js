import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// export const BASE_URL = "http://127.0.0.1:8000";

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),  // Include CSRF token
},
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(`${BASE_URL}/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem("access", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login"; // Redirect to login page
    throw error;
  }
};

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const expiryDate = decoded.exp;
      const currentTime = Date.now() / 1000;

      // Check if the token is expired
      if (expiryDate < currentTime) {
        // Token is expired, refresh it
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } else {
        // Token is valid, use it
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh the token
      const newAccessToken = await refreshAccessToken();

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       const decoded = jwtDecode(token);
//       const expiry_date = decoded.exp;
//       const current_time = Date.now() / 1000;
//       if (expiry_date > current_time) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
