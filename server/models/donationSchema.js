import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    cause: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cause",
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    stripePaymentId: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
