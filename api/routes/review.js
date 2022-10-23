import express from "express";
import {
  addReview,
  deleteReview,
  getReview,
  updateReview,
} from "../controllers/review.js";
// import { login, logout, register } from "../controllers/auth";

const router = express.Router();

router.post("/", addReview);
router.get("/:id", getReview);
router.delete("/:id", deleteReview);
router.put("/:id", updateReview);

export default router;