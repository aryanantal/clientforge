import dotenv from "dotenv";
import mongoose from "mongoose";
import { chromium } from "playwright";
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const PROJECTS = [
  {
    slug: "rise-and-shine-leading-hubspot-website",
    title: "Rise & Shine Leading — HubSpot Website",
    category: "HubSpot CMS · Web Development",
    liveUrl: "https://riseandshineleading.com/",
    before: "Leadership brand lacked a cohesive digital presence for programs and community pathways.",
    after: "Conversion-focused HubSpot site with clear program funnels and leadership positioning.",
    metric: "Structured program navigation · community + coaching CTAs · mobile-ready layouts",
    problem:
      "Dr. Nicole R. Christopher needed a polished HubSpot website that communicated two distinct bodies of work — Leader Life by Design™ and Ink & Influence™ — while guiding visitors from awareness to booked calls and community enrollment without overwhelming them.",
    solution:
      "Designed and developed a HubSpot CMS website with hero messaging, program pathways (Leadership Circle, Writers Circle, Leader Life Accelerator, Author Jumpstart), repeatable content sections, and strong CTAs for booking leadership connection calls. Built for clarity, authority, and intentional visitor journeys across leadership and authorship offerings.",
    tags: ["HubSpot", "HubL", "UI", "Design", "JavaScript", "Responsive layouts"],
    previewUrl: "https://riseandshineleading.com/",
  },
  {
    slug: "prognos-health-hubspot-website",
    title: "Prognos Health — Enterprise HubSpot Website",
    category: "Enterprise Web · HubSpot CMS",
    liveUrl: "https://prognoshealth.com/",
    before: "Complex life-sciences messaging was hard to navigate for enterprise buyers and partners.",
    after: "Enterprise HubSpot site showcasing RWD marketplace, solutions, and clinical data authority.",
    metric: "Multi-solution IA · case-study hub · enterprise-grade performance positioning",
    problem:
      "Prognos Health required a scalable marketing site to communicate clinical and genomic laboratory data offerings, commercial analytics, patient journey insights, and precision marketing — all to pharmaceutical and life-sciences audiences with high trust and compliance expectations.",
    solution:
      "Built and optimized a HubSpot CMS enterprise website with structured solutions navigation (Oncology, Rare Disease, Commercial Analytics, Precision Marketing), insights/case-study pathways, data marketplace positioning, and conversion flows for demos and contact. Focused on clear information architecture, credible enterprise storytelling, and performance-friendly front-end delivery.",
    tags: ["HubSpot", "UI", "Performance", "JavaScript", "Enterprise", "SEO"],
    previewUrl: "https://prognoshealth.com/",
  },
  {
    slug: "iot-smart-farming-dashboard",
    updateOnly: true,
    title: "Smart Farming Dashboard",
    category: "IoT · React · Firebase",
    liveUrl: "https://smart-farming-app-8eba8.firebaseapp.com/",
    before: "No centralized, real-time view of soil moisture, temperature, and humidity across field nodes.",
    after: "Magazine-clean IoT dashboard with live telemetry, alerts, and grower-first UX.",
    metric: "24/7 live monitoring · multi-sensor nodes · threshold alerts & historical trends",
    problem:
      "Growers lacked a calm, readable interface for ESP8266 sensor data — soil moisture, air temperature, and humidity — making it hard to act on field conditions quickly or review trends without cluttered, technical dashboards.",
    solution:
      "Built a React + Firebase smart farming dashboard with real-time Wi-Fi telemetry, per-node sensor readings (temp, humidity, soil moisture), threshold alerts, historical trends, and an editorial UI designed for daily use. Deployed on Firebase with login, pricing, and contact flows for greenhouse and field operators.",
    tags: ["React", "Firebase", "IoT", "Tailwind CSS", "JavaScript", "Automation"],
    previewUrl: "https://smart-farming-app-8eba8.firebaseapp.com/",
  },
];

async function uploadScreenshot(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/client-projects",
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
    await page.goto(project.previewUrl, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForTimeout(3500);

    const heroShot = await page.screenshot({ fullPage: false, type: "png" });
    const heroUrl = await uploadScreenshot(heroShot, `${project.slug}-hero`);

    await page.evaluate(() => window.scrollTo(0, Math.min(window.innerHeight * 1.1, document.body.scrollHeight * 0.35)));
    await page.waitForTimeout(1500);
    const midShot = await page.screenshot({ fullPage: false, type: "png" });
    const midUrl = await uploadScreenshot(midShot, `${project.slug}-detail`);

    let galleryUrl = null;
    if (project.slug === "iot-smart-farming-dashboard") {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
      await page.waitForTimeout(1200);
      const galleryShot = await page.screenshot({ fullPage: false, type: "png" });
      galleryUrl = await uploadScreenshot(galleryShot, `${project.slug}-features`);
    }

    return galleryUrl ? [heroUrl, midUrl, galleryUrl] : [heroUrl, midUrl];
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
  };

  if (project.updateOnly) {
    const existing = await Project.findOne({ slug: project.slug });
    if (!existing) {
      throw new Error(`Project not found for update: ${project.slug}`);
    }
    Object.assign(existing, payload);
    await existing.save();
    return { action: "updated", id: existing._id, slug: project.slug };
  }

  const existing = await Project.findOne({ slug: project.slug });
  if (existing) {
    Object.assign(existing, payload);
    await existing.save();
    return { action: "updated", id: existing._id, slug: project.slug };
  }

  const baseId = Date.now();
  const created = await Project.create({
    ...payload,
    id: baseId,
    slug: project.slug,
  });
  return { action: "created", id: created._id, slug: project.slug };
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
      results.push({ ...result, images, liveUrl: project.liveUrl });
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
