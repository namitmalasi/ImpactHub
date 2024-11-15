import express from "express";
import {
  addCommentCause,
  createCause,
  getCauseById,
  getCauses,
  likeCause,
} from "../controllers/causeControllers.js";

const router = express.Router();

router.get("/", getCauses);
router.get("/:id", getCauseById);
router.post("/", authorizeUser, createCause);
router.post("/:id/like", authorizeUser, likeCause);
router.post("/:id/comment", addCommentCause);

export default router;
