import { useState } from "react";
import styles from "./PaymentSection.module.css";
import api from "../../api";

const PaymentSection = () => {
  const cart_code = localStorage.getItem("cart_code");
  const [loading, setLoading] = useState(false);

  function paypalPayment() {
    setLoading(true);
    api
      .post("initiate_paypal_payment/", { cart_code })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if(res.data.approval_url){
        window.location.href = res.data.approval_url;
        }
        
      })
      .catch((err) => {
        console.log('Error initiating payment :',err.message);
        setLoading(false);
      });
  }

  function handleStripePayment(){
    setLoading(true);

    // Call Django backend to create a Stripe Checkout Session
    api
      .post("/initiate_stripe_payment/", { cart_code })
      .then((res) => {
        const { checkout_url } = res.data; // URL to redirect the user to Stripe's payment page
        if (checkout_url) {
          window.location.href = checkout_url; // Redirect to Stripe
        }
      })
      .catch((err) => {
        console.error("Error initiating Stripe payment:", err.message);
        alert("Failed to initiate payment. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div
          className="card-header"
          style={{ backgroundColor: "#6050DC", color: "white" }}
        >
          <h5>Payment Options</h5>
        </div>
        <div className="card-body">
          {/* PayPal Button */}
          <button
            className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}
            id="paypal-button"
            onClick={paypalPayment}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <i className="bi bi-paypal"></i> Pay with PayPal
              </>
            )}
            {/* <i className="bi bi-paypal"></i> Pay with PayPal */}
          </button>
          
          {/* Stripe Button */}
          <button
            className={`btn btn-warning w-100 mb-3 ${styles.stripeButton}`}
            onClick={handleStripePayment}
            disabled={loading}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <i className="bi bi-credit-card"></i> Pay with Stripe
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
