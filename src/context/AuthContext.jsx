import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

export const AuthContext = createContext(false);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  // const [cart, setCart] = useState(null); // Add cart state

  // Function to check if the token is valid
  const handleAuth = () => {
    const token = localStorage.getItem("access");
    if (token) {
      const decoded = jwtDecode(token);
      const expiryDate = decoded.exp;
      const currentTime = Date.now() / 1000;
      if (expiryDate >= currentTime) {
        setIsAuthenticated(true);
        get_username(); // Fetch username if authenticated
        // linkCartToUser(); // Link anonymous cart to user
        // fetchUserCart(); // Fetch user's cart after login
      } else {
        // Token is expired, clear it
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false);
        // setCart(null);
      }
    }
  };

  // Additional

  // Function to fetch the username
  function get_username(){
    api
      .get("get_username")
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log("Auth Context Error:", err.message);
      });
  };

  //  // Function to link anonymous cart to user
  //  const linkCartToUser = () => {
  //   const cart_code = localStorage.getItem("cart_code");
  //   if (cart_code) {
  //     api
  //       .post("link_cart_to_user/", { cart_code })
  //       .then(() => {
  //         console.log("Cart linked to user successfully");
  //       })
  //       .catch((err) => {
  //         console.log("Error linking cart to user:", err.message);
  //       });
  //   }
  // };

  // // Function to fetch the User's Cart
  // const fetchUserCart = () => {
  //   api
  //     .get("get_user_cart/") // Ensure this endpoint exists in your Django backend
  //     .then((res) => {
  //       setCart(res.data); // Update cart state with the fetched cart
  //       localStorage.setItem("cart_code", res.data.cart_code); // Update cart_code in localStorage
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching user cart:", err.message);
  //     });
  // };

  // Check authentication status on initial load
  useEffect(() => {
    handleAuth();
  }, []);

  // Provide authentication state and functions to children
  const authValue = { isAuthenticated, setIsAuthenticated, username, get_username};

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}