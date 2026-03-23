import express from "express";
import {
  getResume,
  updateProfile,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  addCertification,
  updateCertification,
  deleteCertification,
  getAllProjects,
  updateFeaturedProjects,
} from "./controller/resume.controller.js";
import { verifyToken, requireAdmin } from "../../middleware/auth.js";

const router = express.Router();

// GET resume (public)
router.get("/", getResume);

// UPDATE profile (admin only)
router.put("/profile", verifyToken, requireAdmin, updateProfile);

// Experience routes (admin only)
router.post("/experience", verifyToken, requireAdmin, addExperience);
router.put("/experience/:experienceId", verifyToken, requireAdmin, updateExperience);
router.delete("/experience/:experienceId", verifyToken, requireAdmin, deleteExperience);

// Education routes (admin only)
router.post("/education", verifyToken, requireAdmin, addEducation);
router.put("/education/:educationId", verifyToken, requireAdmin, updateEducation);
router.delete("/education/:educationId", verifyToken, requireAdmin, deleteEducation);

// Skills routes (admin only)
router.post("/skills", verifyToken, requireAdmin, addSkillCategory);
router.put("/skills/:skillCategoryId", verifyToken, requireAdmin, updateSkillCategory);
router.delete("/skills/:skillCategoryId", verifyToken, requireAdmin, deleteSkillCategory);

// Certifications routes (admin only)
router.post("/certifications", verifyToken, requireAdmin, addCertification);
router.put("/certifications/:certificationId", verifyToken, requireAdmin, updateCertification);
router.delete("/certifications/:certificationId", verifyToken, requireAdmin, deleteCertification);

// Projects routes (admin only)
router.get("/projects", verifyToken, requireAdmin, getAllProjects);
router.put("/featured-projects", verifyToken, requireAdmin, updateFeaturedProjects);

export default router;
