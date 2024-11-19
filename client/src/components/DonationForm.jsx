import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/stripe-react-js";
import { useDonationStore } from "../stores/donationStore";

const DonationForm = ({ causeId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { createDonation, saveDonation } = useDonationStore();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get client secret and payment intent ID
      const { clientSecret, paymentIntentId } = await createDonation(
        causeId,
        parseFloat(amount)
      );

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // If payment is successful, save the donation in our database
      if (result.paymentIntent.status === "succeeded") {
        await saveDonation({
          amount: parseFloat(amount),
          causeId,
          paymentIntentId,
        });

        // Clear form
        setAmount("");
        elements.getElement(CardElement).clear();

        alert("Thank you for your donation!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Donation Amount ($)
        </label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Card Details
        </label>
        <div className="p-3 border rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Processing..." : "Donate Now"}
      </button>
    </form>
  );
};

export default DonationForm;
