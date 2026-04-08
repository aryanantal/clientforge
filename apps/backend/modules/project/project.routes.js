import express from "express";
import multer from "multer";
import path from "path";
import cloudinary from "cloudinary";
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
  params: {
    folder: "clientforge",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
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