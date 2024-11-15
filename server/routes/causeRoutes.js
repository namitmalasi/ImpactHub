import express from "express";
import {
  addCommentCause,
  createCause,
  getCauseById,
  getCauses,
  likeCause,
} from "../controllers/causeControllers.js";
import { authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCauses);
router.get("/:id", getCauseById);
router.post("/", authorizeUser, createCause);
router.post("/:id/like", authorizeUser, likeCause);
router.post("/:id/comment", authorizeUser, addCommentCause);

export default router;
