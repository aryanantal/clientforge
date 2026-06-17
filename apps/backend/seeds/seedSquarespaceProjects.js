import dotenv from "dotenv";
import mongoose from "mongoose";
import { chromium } from "playwright";
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const PROJECTS = [
  {
    slug: "globalsafe-perkasa-squarespace-website",
    title: "Globalsafe Perkasa Indonesia — Squarespace Website",
    category: "Squarespace · Web Development",
    liveUrl: "https://www.globalsafeperkasa.com/",
    order: 16,
    before:
      "Indonesian fire & safety manufacturer needed a credible web presence for foam concentrates, SOLAS rations, and emergency kits.",
    after:
      "Polished Squarespace site showcasing product lines, certifications, and emergency response solutions for B2B buyers.",
    metric: "Product catalog UX · SOLAS compliance messaging · contact lead capture",
    problem:
      "PT. Globalsafe Perkasa Indonesia — a manufacturer of firefighting foam concentrates, SOLAS emergency food rations, drinking water packs, and first aid kits — needed a professional website to communicate Made-in-Indonesia quality, industry applications (civil, industrial, marine, military), and PFOA/PFOS/PFHxS-compliant product positioning to international buyers.",
    solution:
      "Designed and built a Squarespace website with clear hero messaging, product category sections (AFFF foam, emergency rations, first aid kits), services overview, certificate/trust pathways, and contact forms. Structured for readability across safety-critical B2B audiences with mobile-responsive layouts and marketer-friendly content editing.",
    tags: ["Squarespace", "UI", "Design", "SEO", "Web", "Responsive layouts"],
    previewUrl: "https://www.globalsafeperkasa.com/",
  },
];

async function uploadScreenshot(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/squarespace-clients",
        public_id: publicId,
        resource_type: "image",
        overwrite: true,
      },
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
    await page.goto(project.previewUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.waitForTimeout(4500);

    const heroShot = await page.screenshot({ fullPage: false, type: "png" });
    const heroUrl = await uploadScreenshot(heroShot, `${project.slug}-hero`);

    await page.evaluate(() =>
      window.scrollTo(0, Math.min(window.innerHeight, document.body.scrollHeight * 0.45)),
    );
    await page.waitForTimeout(1500);
    const detailShot = await page.screenshot({ fullPage: false, type: "png" });
    const detailUrl = await uploadScreenshot(detailShot, `${project.slug}-detail`);

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
    return { action: "updated", slug: project.slug, id: existing._id };
  }

  const created = await Project.create({
    ...payload,
    id: Date.now() + Math.floor(Math.random() * 1000),
    slug: project.slug,
  });
  return { action: "created", slug: project.slug, id: created._id };
}

async function main() {
  await connectDB();
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const project of PROJECTS) {
      console.log(`Processing: ${project.title}`);
      const images = await captureScreenshots(browser, project);
      const result = await upsertProject(project, images);
      results.push({ ...result, order: project.order, liveUrl: project.liveUrl });
      console.log(`${result.action}: ${project.slug}`);
    }

    console.log(JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
