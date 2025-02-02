import { useState, useEffect } from "react";
import api from "../api";

function useCartData() {
  const cart_code = localStorage.getItem("cart_code");
  const [cartitems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const tax = 4.0;
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      setLoading(true);
      api
        .get(`get_cart?cart_code=${cart_code}`)
        .then((res) => {
          console.log(res.data);
          setCartItems(res.data.items || []);
          setCartTotal(res.data.sum_total || 0.0);
        })
        .catch((err) => {
          console.log("Error Fetchhing CartItems : ", err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [cart_code]
  );

  return {
    cartitems,
    setCartItems,
    cartTotal,
    setCartTotal,
    tax,
    loading,
    setLoading,
  };
}

export default useCartData;
