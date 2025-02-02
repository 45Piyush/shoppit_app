// import React from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";
import { useEffect, useState } from "react";
import api from "../../api";
import PlaceHolderContainer from "../ui/PlaceHolderContainer";
import Error from "../ui/Error";
import { randomValue } from "../../GenerateCartCode";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartLoading, setCartLoading] = useState(false);

  // Generate or fetch cart_code
  useEffect(function () {
    setCartLoading(true);
    try {
      let cartCode = localStorage.getItem("cart_code");
      if (!cartCode) {
        localStorage.setItem("cart_code", randomValue);
      }
      console.log(cartCode);
    } catch (err) {
      console.error("Error generating cart code:", err);
      setError("Failed to initialize cart. Please refresh the page.");
    } finally {
      setCartLoading(false);
    }
  }, []);

  // Fetching Products ...
  useEffect(function () {
    setLoading(true);

    api
      .get("products")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
        setLoading(false);
        setError("");
      })

      .catch((err) => {
        console.log("Error Fetching Products : ", err.message);
        setLoading(false);
        setError("Oops Sorry !! Failed To Load The Products. 😢 ");
      });
  }, []);

  return (
    <>
      <Header />
      {error && <Error error={error} />}
      { loading || cartLoading ? <PlaceHolderContainer/> : <CardContainer products={products}/>}

      {/* {loading || error != "" || <CardContainer products={products} />} */}

    </>
  );
};

export default HomePage;
