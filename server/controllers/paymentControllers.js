import { stripe } from "../config/stripe";
import Donation from "../models/donationModel";

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, causeId } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Converting to cents
      currency: "usd",
      metadata: {
        causeId,
        userId: req.user.id,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveDonation = async (req, res) => {
  try {
    const { amount, causeId, paymentIntentId } = req.body;

    const donation = new Donation({
      userId: req.user.id,
      causeId,
      amount,
      status: "completed",
      stripePaymentIntentId: paymentIntentId,
    });

    await donation.save();
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
