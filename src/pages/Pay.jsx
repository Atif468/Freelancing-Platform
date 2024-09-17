import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/checkOutForm/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Pay = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await loadStripe("your-key-here");
      setStripePromise(stripe);
    };
    
    initializeStripe();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch(`/payment/intent/${id}`);
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };

    fetchClientSecret();
  }, [id]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex justify-center p-4">
      {clientSecret && stripePromise && (
        <div className="w-full max-w-lg">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Pay;
