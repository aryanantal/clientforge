import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "./controller/project.controller.js";
import { verifyToken, requireAdmin } from "../../middleware/auth.js";

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Convert image name properly: sanitize and add timestamp
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    const ext = path.extname(sanitizedName);
    const name = path.basename(sanitizedName, ext);
    const timestamp = Date.now();
    cb(null, `${name}_${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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