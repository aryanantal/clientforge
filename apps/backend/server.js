import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import contactModule from "./modules/contact/contact.module.js";
import authModule from "./modules/auth/auth.module.js";
import projectModule from "./modules/project/project.module.js";
import statsModule from "./modules/stats/stats.module.js";
import faqModule from "./modules/faq/faq.module.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/projects", projectModule);
app.use("/api/contact", contactModule);
app.use("/api/auth", authModule);
app.use("/api/stats", statsModule);
app.use("/api/faqs", faqModule);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});