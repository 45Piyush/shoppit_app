// import React from 'react';
// import { useEffect, useState } from "react";
// import api from "../../api";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Spinner from "../ui/Spinner";
import useCartData from "../../hooks/useCartData";

const CartPage = ({ setNumberCartItems }) => {

  /* Used Custom Hook useCartData in hooks folder*/ 
  const { cartitems, setCartItems, cartTotal, setCartTotal, tax, loading } = useCartData();

  if(loading){
    return <Spinner loading={loading}/>
  }

  if (cartitems.length < 1) {
    return (
      <div className="alert alert-primary my-5" role="alert">
        No item added in your cart.
      </div>
    );
  }

  return (
    <div
      className="container my-3 py-3"
      style={{ height: "72vh", overflow: "scroll"}}
    >
      <h5 className="mb-4" >Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
          {cartitems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              cartitems={cartitems}
              setCartTotal={setCartTotal}
              setNumberCartItems = {setNumberCartItems}
              setCartItems = {setCartItems}
            />
          ))}
        </div>
        <CartSummary cartTotal={cartTotal} tax={tax} />
      </div>
    </div>
  );
};

export default CartPage;
