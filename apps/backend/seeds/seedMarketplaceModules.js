import dotenv from "dotenv";
import mongoose from "mongoose";
import { chromium } from "playwright";
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const MODULES = [
  {
    slug: "advance-video-popup-hubspot-module",
    title: "Advance Video Popup — HubSpot Marketplace Module",
    category: "HubSpot CMS · Custom Module",
    liveUrl: "https://www.chetankumar.me/advance-video-popup-live-preview",
    before: "No lightweight way to embed multi-platform video lightboxes without custom dev work.",
    after: "Drag-and-drop video popup module with YouTube, Vimeo, Wistia, HubSpot Video, and MP4 support.",
    metric: "5 video platforms · accessible lightbox · multi-instance per page",
    problem:
      "Marketing teams needed professional video lightboxes on HubSpot pages without leaving the CMS or writing JavaScript. Native embeds sent visitors off-site and lacked consistent branding, accessibility, and theme integration.",
    solution:
      "Built and published a HubSpot Marketplace custom module with configurable thumbnails, play button styling, aspect ratios (16:9, 4:3, 1:1, 21:9), lightbox backdrop, hover effects, and separate mobile spacing. Supports multiple independent instances on one page with keyboard navigation, ARIA labels, and Escape-to-close.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "Accessibility", "HubSpot CMS"],
    previewUrl: "https://www.chetankumar.me/advance-video-popup-live-preview",
    screenshotSelector: "section",
  },
  {
    slug: "sticky-sidebar-accordion-hubspot-module",
    title: "Sticky Sidebar with Accordion — HubSpot Marketplace Module",
    category: "HubSpot CMS · Custom Module",
    liveUrl: "https://www.chetankumar.me/sticky-sidebar-with-accordion",
    before: "Long-form HubSpot pages lacked persistent navigation and manual anchor IDs.",
    after: "Auto-generated sticky sidebar with scroll-spy, smooth scroll, and accordion sections.",
    metric: "Scroll-spy nav · repeatable sections · mobile-friendly stack layout",
    problem:
      "Documentation, FAQ, and policy pages on HubSpot were hard to scan. Teams manually wired anchor links and fixed headers broke scroll positioning — especially on content-heavy SaaS and support sites.",
    solution:
      "Developed a marketplace module with repeatable heading + rich-text sections, automatic sidebar link generation, active-section scroll spy, collapsible accordion panels, theme-inherited border colors, and configurable sticky/scroll offsets for fixed headers. Mobile layout stacks navigation above content for touch users.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "Responsive layouts", "Accessibility"],
    previewUrl: "https://www.chetankumar.me/sticky-sidebar-with-accordion",
    screenshotSelector: "main, .body-container, body",
  },
  {
    slug: "typewriter-hubspot-marketplace-module",
    title: "Typewriter — HubSpot Marketplace Module",
    category: "HubSpot CMS · Custom Module",
    liveUrl: "https://www.chetankumar.me/typewriter-by-chetan",
    before: "Static hero headlines failed to showcase multiple skills or value props dynamically.",
    after: "JavaScript typewriter animation module with intro, looping words, and full style controls.",
    metric: "100+ marketplace downloads · zero-code editor setup",
    problem:
      "Landing pages needed animated typewriter effects to rotate skills, services, or brand phrases — but marketing teams could not maintain custom JavaScript across HubSpot themes.",
    solution:
      "Shipped a free HubSpot Marketplace module with intro text, repeatable typewriter words, blinking cursor animation, and editor controls for font, size, color, alignment, line height, and spacing on desktop and mobile. Works out of the box in the drag-and-drop page editor with instant preview.",
    tags: ["HubSpot", "JavaScript", "UI", "Animation", "HubSpot CMS", "Design"],
    previewUrl: "https://www.chetankumar.me/typewriter-by-chetan",
    screenshotSelector: "main, .body-container, body",
  },
];

async function uploadScreenshot(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/marketplace-modules",
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

async function captureScreenshots(browser, mod) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(mod.previewUrl, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2500);

  const heroShot = await page.screenshot({ fullPage: false, type: "png" });
  const heroUrl = await uploadScreenshot(heroShot, `${mod.slug}-hero`);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await page.waitForTimeout(1200);
  const midShot = await page.screenshot({ fullPage: false, type: "png" });
  const midUrl = await uploadScreenshot(midShot, `${mod.slug}-features`);

  await page.close();
  return [heroUrl, midUrl];
}

async function upsertProject(mod, images) {
  const payload = {
    id: mod.id,
    slug: mod.slug,
    title: mod.title,
    category: mod.category,
    before: mod.before,
    after: mod.after,
    metric: mod.metric,
    problem: mod.problem,
    solution: mod.solution,
    images,
    tags: mod.tags,
    liveUrl: mod.liveUrl,
  };

  const existing = await Project.findOne({ slug: mod.slug });
  if (existing) {
    Object.assign(existing, payload);
    await existing.save();
    return { action: "updated", id: existing._id };
  }

  const created = await Project.create(payload);
  return { action: "created", id: created._id };
}

async function main() {
  await connectDB();

  const browser = await chromium.launch({ headless: true });

  try {
    const baseId = Date.now();
    const results = [];

    for (let i = 0; i < MODULES.length; i++) {
      const mod = { ...MODULES[i], id: baseId + i };
      console.log(`Processing: ${mod.title}`);
      const images = await captureScreenshots(browser, mod);
      const result = await upsertProject(mod, images);
      results.push({ ...result, slug: mod.slug, images });
      console.log(`${result.action}: ${mod.slug}`);
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
