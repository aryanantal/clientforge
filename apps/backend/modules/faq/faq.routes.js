import express from "express";
import {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "./controller/faq.controller.js";
import { verifyToken, requireAdmin } from "../../middleware/auth.js";

const router = express.Router();

// GET all FAQs (public) - with optional category filter
router.get("/", getAllFAQs);

// Protected routes - require admin
router.post("/", verifyToken, requireAdmin, createFAQ);
router.put("/:faqId", verifyToken, requireAdmin, updateFAQ);
router.delete("/:faqId", verifyToken, requireAdmin, deleteFAQ);

export default router;