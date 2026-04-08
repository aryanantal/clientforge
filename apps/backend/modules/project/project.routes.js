import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "./controller/project.controller.js";
import { verifyToken, requireAdmin } from "../../middleware/auth.js";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "clientforge",
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET all projects (public)
router.get("/", getAllProjects);

// GET single project (public)
router.get("/:projectId", getProjectById);

// Protected routes - require admin
router.post("/", verifyToken, requireAdmin, upload.array("image", 5), createProject);
router.put("/:projectId", verifyToken, requireAdmin, upload.array("image", 5), updateProject);
router.delete("/:projectId", verifyToken, requireAdmin, deleteProject);

export default router;