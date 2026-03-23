import express from "express";
import {
  getAllStats,
  createStat,
  updateStat,
  deleteStat,
} from "./controller/stats.controller.js";
import { verifyToken, requireAdmin } from "../../middleware/auth.js";

const router = express.Router();

// GET all stats (public)
router.get("/", getAllStats);

// Protected routes - require admin
router.post("/", verifyToken, requireAdmin, createStat);
router.put("/:statId", verifyToken, requireAdmin, updateStat);
router.delete("/:statId", verifyToken, requireAdmin, deleteStat);

export default router;