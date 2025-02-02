// import React from 'react';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api";

const PaymentStatusPage = ({ setNumberCartItems }) => {
  const [statusMessage, setStatusMessage] = useState("Verifying your payment");
  const [statusSubMessage, setStatusSubMessage] = useState(
    "Wait a momment, your payment is being verified!"
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(function () {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get("status"); // For Stripe
    const paymentId = queryParams.get("paymentId"); // For PayPal
    const payerId = queryParams.get("PayerID"); // For PayPal
    const ref = queryParams.get("ref"); // For both PayPal and Stripe
    const sessionId = queryParams.get("session_id"); // For Stripe

    if (!ref) {
      setError("Invalid payment details. Please contact support.");
      setLoading(false);
      return;
    }

    // Handle PayPal callback
    // if (!paymentId || !payerId || !ref) {
    //   setError("Invalid payment details. Please contact support.");
    //   setLoading(false);
    //   return;
    // }

    if (paymentId && payerId && ref) {
      api
        .post(
          `paypal_payment_callback/?paymentId=${paymentId}&PayerId=${payerId}&transaction_id=${ref}`
        )
        .then((res) => {
          setStatusMessage(res.data.message);
          setStatusSubMessage(res.data.subMessage);
          localStorage.removeItem("cart_code");
          setNumberCartItems(0);
        })
        .catch((err) => {
          setError("Payment verification failed. Please contact support.");
          console.error("Error verifying payment:", err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    else if (paymentStatus && ref && sessionId) {
      api
        .post(
          `stripe_payment_callback/?status=${paymentStatus}&ref=${ref}&session_id=${sessionId}`
        )
        .then((res) => {
          setStatusMessage(res.data.message);
          setStatusSubMessage(res.data.subMessage);
          localStorage.removeItem("cart_code");
          setNumberCartItems(0);
        })
        .catch((err) => {
          setError("Payment verification failed. Please contact support.");
          console.error("Error verifying Stripe payment:", err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    else {
      setError("Invalid payment details. Please contact support.");
      setLoading(false);
    }
  }, [location, setNumberCartItems]);

  // useEffect(function () {
  //   const queryParams = new URLSearchParams(location.search);
  //   const status = queryParams.get("status");
  //   const txRef = queryParams.get("tx_ref");
  //   const transactionId = queryParams.get("transaction_id");

  //   if (status && txRef && transactionId) {
  //     api
  //       .post(
  //         `payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`
  //       )
  //       .then((res) => {
  //         setStatusMessage(res.data.message);
  //         setStatusSubMessage(res.data.subMessage);
  //         localStorage.removeItem("cart_code");
  //         setNumberCartItems(0);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // }, []);

  return (
    <header className="py-5" style={{ backgroundColor: "#6050DC" }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h2 className="display-4 fw-bold">
          {loading ? "Verifying Payment!" : statusMessage}
            {/* Verifying Payment! */}
            </h2>
          <p className="lead fw-normal text-white-75 mb-4">
          {loading ? "Wait a moment, your payment is being verified!" : statusSubMessage}
            {/* Give us a moment, we are verifying your payment! */}
            {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          </p>
          <span> 
            <Link
              to="/order-details"
              className="btn btn-light btn-lg px-4 py-2 mx-3"
            >
              View Order Details
            </Link>
            <Link to="/shop" className="btn btn-light btn-lg px-4 py-2">
              Continue Shopping
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default PaymentStatusPage;
