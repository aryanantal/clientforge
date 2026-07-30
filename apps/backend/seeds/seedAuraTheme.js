import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const PROJECT = {
  slug: "aura-theme-hubspot-marketplace",
  title: "Aura — Figma Design",
  category: "Figma Design · UI/UX",
  liveUrl: "https://ecosystem.hubspot.com/marketplace/website/aura-theme-by-chetan-kumar",
  order: 5,
  before:
    "HubSpot teams needed a modern visual direction before committing to full theme development.",
  after:
    "Aura Figma design system — layout explorations, component styles, and HubSpot-ready UI direction.",
  metric: "Figma design system · HubSpot theme concept · modular UI kit",
  problem:
    "Agencies and product teams on HubSpot CMS needed a strong visual foundation — typography, spacing, components, and page layouts — before engineering a publishable theme.",
  solution:
    "Designed Aura in Figma as a complete UI/UX system for HubSpot CMS themes: hero patterns, service sections, portfolio grids, and conversion blocks. The design was later published as a HubSpot Marketplace theme concept with modular, marketer-friendly layouts.",
  tags: ["Figma", "UI", "Design", "HubSpot CMS", "HubL", "Adobe XD"],
};

async function main() {
  await connectDB();

  const existing = await Project.findOne({ slug: PROJECT.slug });
  if (existing) {
    Object.assign(existing, PROJECT);
    await existing.save();
    console.log("updated:", PROJECT.slug);
  } else {
    console.log("project not found:", PROJECT.slug);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
