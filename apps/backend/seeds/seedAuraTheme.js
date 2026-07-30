import dotenv from "dotenv";
import mongoose from "mongoose";
import { chromium } from "playwright";
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const MARKETPLACE_URL =
  "https://ecosystem.hubspot.com/marketplace/website/aura-theme-by-chetan-kumar";
const FIGMA_URL =
  "https://www.figma.com/site/On1auXJpg6SCJi4tOStUKf/Aura?node-id=0-1";

const PROJECTS = [
  {
    slug: "aura-figma-design",
    title: "Aura — Figma Design",
    category: "Figma Design · UI/UX",
    liveUrl: FIGMA_URL,
    order: 5,
    before:
      "HubSpot theme project needed a polished visual system before CMS development began.",
    after:
      "Complete Aura Figma design — typography, components, and page layouts for the HubSpot theme.",
    metric: "Figma design system · component library · HubSpot-ready layouts",
    problem:
      "Before building the Aura HubSpot theme, the project needed a cohesive Figma design system — page structures, spacing, typography, and reusable UI components that could translate cleanly into HubSpot CMS modules.",
    solution:
      "Designed Aura in Figma as the source-of-truth UI kit for the theme: hero sections, service blocks, portfolio grids, and conversion patterns. The Figma file guided HubSpot theme development and marketplace presentation.",
    tags: ["Figma", "UI", "Design", "HubSpot CMS", "Adobe XD", "Design"],
    previewUrl: FIGMA_URL,
    screenshotFolder: "portfolio/figma-designs",
  },
  {
    slug: "aura-theme-hubspot-marketplace",
    title: "Aura — HubSpot Marketplace Theme",
    category: "HubSpot CMS · Marketplace Theme",
    liveUrl: MARKETPLACE_URL,
    order: 6,
    before:
      "HubSpot teams needed a modern, flexible theme with strong visuals and conversion-ready sections.",
    after:
      "Published Aura theme on HubSpot Marketplace — built from the Figma design system.",
    metric: "Marketplace theme · modular HubSpot CMS · Figma-to-HubSpot delivery",
    problem:
      "Marketing and agency teams on HubSpot CMS needed a premium theme with contemporary design, flexible page sections, and fast time-to-launch — backed by a professional design foundation.",
    solution:
      "Developed and published Aura on the HubSpot Marketplace, translating the Figma design into a production HubSpot CMS theme with reusable modules, responsive layouts, and marketer-friendly field groups for landing pages and lead capture.",
    tags: ["HubSpot", "HubL", "UI", "Design", "HubSpot CMS", "JavaScript"],
    previewUrl: MARKETPLACE_URL,
    screenshotFolder: "portfolio/marketplace-themes",
  },
];

async function uploadScreenshot(buffer, publicId, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: publicId, resource_type: "image", overwrite: true },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}

async function captureScreenshots(browser, project) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    await page.goto(project.previewUrl, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForTimeout(6000);

    const heroShot = await page.screenshot({ fullPage: false, type: "png" });
    const heroUrl = await uploadScreenshot(
      heroShot,
      `${project.slug}-hero`,
      project.screenshotFolder,
    );

    await page.evaluate(() =>
      window.scrollTo(0, Math.min(window.innerHeight, document.body.scrollHeight * 0.4)),
    );
    await page.waitForTimeout(1500);
    const detailShot = await page.screenshot({ fullPage: false, type: "png" });
    const detailUrl = await uploadScreenshot(
      detailShot,
      `${project.slug}-detail`,
      project.screenshotFolder,
    );

    return [heroUrl, detailUrl];
  } finally {
    await page.close();
  }
}

async function upsertProject(project, images) {
  const payload = {
    title: project.title,
    category: project.category,
    before: project.before,
    after: project.after,
    metric: project.metric,
    problem: project.problem,
    solution: project.solution,
    images,
    tags: project.tags,
    liveUrl: project.liveUrl,
    order: project.order ?? 0,
  };

  const existing = await Project.findOne({ slug: project.slug });
  if (existing) {
    Object.assign(existing, payload);
    await existing.save();
    return { action: "updated", slug: project.slug };
  }

  await Project.create({
    ...payload,
    id: Date.now() + Math.floor(Math.random() * 1000),
    slug: project.slug,
  });
  return { action: "created", slug: project.slug };
}

async function main() {
  await connectDB();
  const browser = await chromium.launch({ headless: true });

  try {
    for (const project of PROJECTS) {
      console.log(`Processing: ${project.title}`);
      let images = [];

      try {
        images = await captureScreenshots(browser, project);
      } catch (err) {
        console.warn(`Screenshot failed for ${project.slug}:`, err.message);
        const existing = await Project.findOne({ slug: project.slug });
        if (existing?.images?.length) images = existing.images;
      }

      if (!images.length) {
        console.warn(`No images for ${project.slug}, skipping upsert`);
        continue;
      }

      const result = await upsertProject(project, images);
      console.log(`${result.action}: ${result.slug}`);
    }
  } finally {
    await browser.close();
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
