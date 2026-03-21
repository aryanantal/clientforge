import express from "express";
import {
  login,
  register,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./controller/auth.controller.js";
import { verifyToken, requireAdmin, requireAuth } from "../../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/register", register);

// Protected routes - require authentication
router.get("/users", verifyToken, requireAuth, getAllUsers);
router.post("/users", verifyToken, requireAdmin, createUser);
router.put("/users/:userId", verifyToken, updateUser);
router.delete("/users/:userId", verifyToken, requireAdmin, deleteUser);

export default router;
