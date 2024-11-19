import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    causeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cause",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "failed"],
      default: "completed",
    },
    stripePaymentIntentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
