import dotenv from "dotenv";
import mongoose from "mongoose";
import { chromium } from "playwright";
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const HUBSPOT_WEBSITE_SLUGS = [
  "prognos-health-hubspot-website",
  "odw-logistics-maka-power-theme",
  "north-coast-container-maka-power-theme",
  "contegix-wordpress-to-hubspot-migration",
  "rj-lee-group-enterprise-migration",
  "cameron-mfg-hubspot-theme-migration",
  "orderease-hubspot-revamp",
  "rise-and-shine-leading-hubspot-website",
  "otb-packaging-hubspot-theme",
  "unison-alberta-hubspot-theme-migration",
  "sdapp-hubspot-website-landing-pages",
  "startable-blog-hubspot",
];

const CATEGORY_PATCHES = [
  {
    slug: "aura-figma-design",
    title: "Aura — Figma Design",
    category: "Figma Design · UI/UX",
    tags: ["Figma", "UI", "Design", "HubSpot CMS", "Adobe XD"],
  },
  {
    slug: "aura-theme-hubspot-marketplace",
    title: "Aura — HubSpot Marketplace Theme",
    category: "HubSpot CMS · Marketplace Theme",
    tags: ["HubSpot", "HubL", "UI", "Design", "HubSpot CMS", "JavaScript"],
  },
  {
    slug: "euphoria-theme-hubspot-marketplace",
    category: "HubSpot CMS · Marketplace Theme",
  },
  {
    slug: "empkhet-organic-farming-e-commerce-platform",
    category: "Full Stack · Next.js & MERN",
    tags: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "E-Commerce"],
  },
  {
    slug: "iot-smart-farming-dashboard",
    category: "Full Stack · React & Firebase",
    tags: ["React", "Firebase", "IoT", "Tailwind CSS", "JavaScript", "Dashboard"],
  },
  {
    slug: "personal-portfolio-website-conversion-focused",
    category: "Website · Next.js",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web"],
  },
  {
    slug: "agam-fire-safety-website",
    category: "Website · Web Development",
    tags: ["Web", "UI", "Design", "SEO", "Responsive layouts", "JavaScript"],
  },
  {
    slug: "globalsafe-perkasa-squarespace-website",
    category: "Squarespace · Website",
    tags: ["Squarespace", "UI", "Design", "SEO", "Web", "Responsive layouts"],
  },
  {
    slug: "eco-multistep-calculator",
    category: "Website · HubSpot CMS Module",
  },
];

const SQUARESPACE_PROJECTS = [
  {
    slug: "globalsafe-perkasa-squarespace-website",
    title: "Globalsafe Perkasa Indonesia — Squarespace Website",
    category: "Squarespace · Website",
    liveUrl: "https://www.globalsafeperkasa.com/",
    order: 29,
    before:
      "Indonesian fire & safety manufacturer needed a credible web presence for foam concentrates, SOLAS rations, and emergency kits.",
    after:
      "Polished Squarespace site showcasing product lines, certifications, and emergency response solutions for B2B buyers.",
    metric: "Product catalog UX · SOLAS compliance messaging · contact lead capture",
    problem:
      "PT. Globalsafe Perkasa Indonesia needed a professional Squarespace website to communicate Made-in-Indonesia quality, industry applications, and PFOA/PFOS/PFHxS-compliant product positioning to international buyers.",
    solution:
      "Designed and built a Squarespace website with product category sections, services overview, certificate/trust pathways, and contact forms — structured for safety-critical B2B audiences with mobile-responsive layouts.",
    tags: ["Squarespace", "UI", "Design", "SEO", "Web", "Responsive layouts"],
    previewUrl: "https://www.globalsafeperkasa.com/",
  },
  {
    slug: "atelier-real-squarespace-template",
    title: "Atelier Real — Squarespace Template Design",
    category: "Squarespace · Template Design",
    liveUrl: "https://onion-guitar-k9n2.squarespace.com/",
    order: 30,
    before:
      "Creative studio brand needed a refined Squarespace template with editorial layout and portfolio-first storytelling.",
    after:
      "Custom Squarespace template design with elegant typography, gallery sections, and conversion-ready contact flows.",
    metric: "Template design · editorial layout · portfolio + services IA",
    problem:
      "Atelier Real required a Squarespace template that felt premium and gallery-driven — showcasing creative work with strong typography, whitespace, and a clear path from portfolio discovery to inquiry without a generic template look.",
    solution:
      "Designed a custom Squarespace template with hero storytelling, project/gallery grids, about and services sections, and styled contact CTAs. Built as a reusable Squarespace design system with responsive breakpoints and password-protected preview for client review.",
    tags: ["Squarespace", "UI", "Design", "Figma", "Web", "Responsive layouts"],
    previewUrl: "https://onion-guitar-k9n2.squarespace.com/",
    previewPassword: "12345678",
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

async function unlockSquarespacePreview(page, password) {
  if (!password) return;

  const passwordInput = page.locator('input[type="password"]').first();
  const visible = await passwordInput.isVisible({ timeout: 8000 }).catch(() => false);

  if (visible) {
    await passwordInput.fill(password);
    const submit = page
      .locator('button[type="submit"], input[type="submit"], button[name="password"], form button')
      .first();
    await submit.click();
    await page.waitForTimeout(4500);
  }
}

async function captureScreenshots(browser, project) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    await page.goto(project.previewUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
    await unlockSquarespacePreview(page, project.previewPassword);
    await page.waitForTimeout(4500);

    const heroShot = await page.screenshot({ fullPage: false, type: "png" });
    const heroUrl = await uploadScreenshot(heroShot, `${project.slug}-hero`, "portfolio/squarespace-clients");

    await page.evaluate(() =>
      window.scrollTo(0, Math.min(window.innerHeight, document.body.scrollHeight * 0.45)),
    );
    await page.waitForTimeout(1500);
    const detailShot = await page.screenshot({ fullPage: false, type: "png" });
    const detailUrl = await uploadScreenshot(detailShot, `${project.slug}-detail`, "portfolio/squarespace-clients");

    return [heroUrl, detailUrl];
  } finally {
    await page.close();
  }
}

async function upsertSquarespaceProject(project, images) {
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

async function patchCategories() {
  for (const patch of CATEGORY_PATCHES) {
    const update = { category: patch.category };
    if (patch.title) update.title = patch.title;
    if (patch.tags) update.tags = patch.tags;
    await Project.updateOne({ slug: patch.slug }, { $set: update });
    console.log("patched:", patch.slug);
  }

  for (const slug of HUBSPOT_WEBSITE_SLUGS) {
    await Project.updateOne(
      { slug },
      { $set: { category: "Website · HubSpot CMS" } },
    );
    console.log("hubspot website:", slug);
  }
}

async function main() {
  await connectDB();
  const browser = await chromium.launch({ headless: true });

  try {
    await patchCategories();

    for (const project of SQUARESPACE_PROJECTS) {
      console.log(`Screenshot: ${project.title}`);
      let images = [];
      try {
        images = await captureScreenshots(browser, project);
      } catch (err) {
        console.warn(`Screenshot failed for ${project.slug}:`, err.message);
        const existing = await Project.findOne({ slug: project.slug });
        if (existing?.images?.length) images = existing.images;
      }

      if (images.length) {
        const result = await upsertSquarespaceProject(project, images);
        console.log(result.action, result.slug);
      }
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
