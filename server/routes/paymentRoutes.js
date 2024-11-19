import express from "express";
import { authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-payment-intent", authorizeUser, createPaymentIntent);
router.post("/save-donation", authorizeUser, saveDonation);
