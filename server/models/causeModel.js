import mongoose from "mongoose";

const causeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["environment", "community", "education", "health", "other"],
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    targetAmount: { type: Number },
    raisedAmount: { type: Number, default: 0 },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
causeSchema.index({ location: "2dsphere" });

const Cause = mongoose.model("Cause", causeSchema);
export default Cause;
