// import React from 'react';
import { Link } from "react-router-dom";

const CartSummary = ({ cartTotal, tax }) => {
  const subTotal = cartTotal.toFixed(2) ;
  const cartTax = tax.toFixed(2);
  const total = (tax + cartTotal).toFixed(2);

  return (
    <div className="col-md-4 align-self-start">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Cart Summary</h5>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>{` ${subTotal} Rs`}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Tax:</span>
            <span>{` ${cartTax} Rs`}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Total:</span>
            <strong>{`${total} Rs`}</strong>
          </div>
          <Link to="/checkout">
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#6058DC", borderColor: "#6058DC" }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
