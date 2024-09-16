import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./checkOutForm.scss";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
    variables: { colorPrimaryText: '#262626' },
    defaultCollapsed: false,
  };

  return (
    <div className="w-[70%] mx-auto my-8 p-4 shadow-lg rounded-md">
      <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-[#5469d4] text-white rounded-md border-0 py-3 px-4 text-lg font-semibold flex items-center justify-center shadow-md transition-all duration-200 ease hover:contrast-115 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="spinner w-5 h-5 text-white"></div>
          ) : (
            "Pay now"
          )}
        </button>
        {message && <div id="payment-message" className="text-center mt-4 text-red-600">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
