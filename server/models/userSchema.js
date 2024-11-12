import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    createdCauses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cause" }],
    supportedCauses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cause" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
