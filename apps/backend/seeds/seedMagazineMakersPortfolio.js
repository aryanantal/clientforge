import dotenv from "dotenv";
import mongoose from "mongoose";
import { chromium } from "playwright";
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const MARKETPLACE_BASE = "https://ecosystem.hubspot.com/marketplace";

const PROJECTS = [
  {
    slug: "agam-fire-safety-website",
    title: "Agam Enterprises — Fire & Safety Equipment Website",
    category: "Web Development · Fire & Safety",
    liveUrl: "https://www.agamfiresafety.com/",
    order: 17,
    before:
      "Fire safety supplier lacked a credible online catalog, quote flows, and trust signals for B2B buyers.",
    after:
      "Conversion-focused website with product categories, services, certifications, and quote capture for Haridwar-based supplier.",
    metric: "Product catalog IA · quote CTAs · ISI certification trust blocks",
    problem:
      "Agam Enterprises — a certified fire & safety equipment supplier in Haridwar serving manufacturing, healthcare, hospitality, and institutional clients — needed a professional web presence to showcase extinguishers, hydrant systems, alarm panels, refilling/AMC services, and compliance credentials (ISI, MSME, GeM) while driving bulk quotation requests.",
    solution:
      "Designed and developed a modern, mobile-responsive website with structured product categories (ABC dry powder, CO2, AFFF, hydrant valves, alarm panels), featured products, services (refilling, installation, audits/AMC), industry verticals, FAQ, and prominent Request a Quote CTAs. Built for fast-moving B2B buyers and pan-India dispatch positioning.",
    tags: ["Web", "UI", "Design", "SEO", "Responsive layouts", "JavaScript"],
    previewUrl: "https://www.agamfiresafety.com/",
    screenshotFolder: "portfolio/client-projects",
  },
  {
    slug: "euphoria-theme-hubspot-marketplace",
    title: "Euphoria — HubSpot Marketplace Theme",
    category: "HubSpot CMS · Marketplace Theme",
    liveUrl: `${MARKETPLACE_BASE}/website/euphoria-theme-by-magazine-makers`,
    order: 18,
    before: "Teams needed a premium, conversion-ready HubSpot theme without starting from scratch.",
    after: "Published Euphoria theme on HubSpot Marketplace with polished layouts and marketer-friendly modules.",
    metric: "Marketplace theme · modular page system · brand-ready design system",
    problem:
      "Agencies and in-house marketing teams on HubSpot CMS often need a premium starting theme with strong typography, flexible sections, and conversion patterns — without weeks of custom theme scaffolding.",
    solution:
      "Co-developed and published Euphoria by Magazine Makers on the HubSpot Marketplace: a premium CMS theme with reusable modules, responsive layouts, and editor-friendly field groups for landing pages, services, and lead capture — ready to install and customize from the marketplace.",
    tags: ["HubSpot", "HubL", "UI", "Design", "HubSpot CMS", "JavaScript"],
    previewUrl: `${MARKETPLACE_BASE}/website/euphoria-theme-by-magazine-makers`,
    screenshotFolder: "portfolio/marketplace-themes",
  },
  {
    slug: "pricing-table-advanced-hubspot-module",
    title: "Pricing Table Advanced — HubSpot Marketplace Module",
    category: "HubSpot CMS · Marketplace Module",
    liveUrl: `${MARKETPLACE_BASE}/modules/pricing-table-advanced-module-by-magazine-makers`,
    order: 23,
    before: "SaaS and service sites needed flexible pricing tables without custom dev on every launch.",
    after: "Advanced drag-and-drop pricing table module with tier columns, feature rows, and highlight states.",
    metric: "Multi-tier pricing · feature comparison rows · editor-configurable styling",
    problem:
      "HubSpot marketers building pricing pages had to rely on static tables or one-off custom code — slowing campaign launches and making A/B tests on tiers, CTAs, and highlighted plans difficult.",
    solution:
      "Built and published Pricing Table Advanced on the HubSpot Marketplace: configurable tier columns, feature lists, recommended-plan highlighting, CTA buttons, and responsive layouts — all editable in the drag-and-drop page editor without JavaScript.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "HubSpot CMS", "SaaS"],
    previewUrl: `${MARKETPLACE_BASE}/modules/pricing-table-advanced-module-by-magazine-makers`,
    screenshotFolder: "portfolio/marketplace-modules",
  },
  {
    slug: "premium-pricing-table-hubspot-module",
    title: "Premium Pricing Table — HubSpot Marketplace Module",
    category: "HubSpot CMS · Marketplace Module",
    liveUrl: `${MARKETPLACE_BASE}/modules/premium-pricing-table-module-by-magazine-makers`,
    order: 24,
    before: "Standard pricing blocks lacked premium visual polish for high-converting SaaS pages.",
    after: "Premium-styled pricing module with elevated typography, badges, and conversion-focused CTAs.",
    metric: "Premium tier styling · highlight badges · mobile-responsive columns",
    problem:
      "Growth teams on HubSpot needed pricing sections that felt premium and trustworthy — with clear plan differentiation — but native modules did not match modern SaaS landing page standards.",
    solution:
      "Shipped Premium Pricing Table by Magazine Makers on the HubSpot Marketplace with polished card layouts, optional badges (Popular / Best Value), per-tier CTAs, and spacing/typography controls for desktop and mobile — zero code required for marketers.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "Design", "HubSpot CMS"],
    previewUrl: `${MARKETPLACE_BASE}/modules/premium-pricing-table-module-by-magazine-makers`,
    screenshotFolder: "portfolio/marketplace-modules",
  },
  {
    slug: "comparison-pricing-table-hubspot-module",
    title: "Comparison Pricing Table — HubSpot Marketplace Module",
    category: "HubSpot CMS · Marketplace Module",
    liveUrl: `${MARKETPLACE_BASE}/modules/comparison-pricing-table-module-by-magazine-makers`,
    order: 25,
    before: "Feature-by-feature plan comparisons required manual HTML tables in HubSpot.",
    after: "Side-by-side comparison pricing module with checkmarks, tooltips, and sticky headers.",
    metric: "Feature matrix · plan comparison UX · repeatable feature rows",
    problem:
      "B2B SaaS pricing pages often need detailed feature matrices comparing Starter, Pro, and Enterprise tiers — but building and maintaining comparison tables in HubSpot was error-prone and not reusable across pages.",
    solution:
      "Published Comparison Pricing Table on the HubSpot Marketplace with repeatable feature rows, per-plan included/excluded states, optional section grouping, and responsive stacking on mobile — enabling marketers to launch comparison pages in minutes.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "SaaS", "HubSpot CMS"],
    previewUrl: `${MARKETPLACE_BASE}/modules/comparison-pricing-table-module-by-magazine-makers`,
    screenshotFolder: "portfolio/marketplace-modules",
  },
  {
    slug: "before-after-slider-hubspot-module",
    title: "Before/After Slider — HubSpot Marketplace Module",
    category: "HubSpot CMS · Marketplace Module",
    liveUrl: `${MARKETPLACE_BASE}/modules/before-after-slider-module-by-magazine-makers`,
    order: 26,
    before: "Case studies and redesigns lacked an interactive before/after reveal in HubSpot.",
    after: "Drag-and-drop before/after image slider with handle, labels, and responsive sizing.",
    metric: "Interactive slider · before/after labels · touch-friendly handle",
    problem:
      "Agencies showcasing website redesigns, facility upgrades, or product transformations needed an engaging before/after interaction — but embedding third-party widgets broke HubSpot performance and brand consistency.",
    solution:
      "Built Before/After Slider by Magazine Makers for the HubSpot Marketplace: upload before and after images, configurable slider handle, optional captions, aspect ratio controls, and smooth drag interaction on desktop and touch devices.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "Design", "HubSpot CMS"],
    previewUrl: `${MARKETPLACE_BASE}/modules/before-after-slider-module-by-magazine-makers`,
    screenshotFolder: "portfolio/marketplace-modules",
  },
  {
    slug: "premium-before-after-slider-hubspot-module",
    title: "Premium Before/After Slider — HubSpot Marketplace Module",
    category: "HubSpot CMS · Marketplace Module",
    liveUrl: `${MARKETPLACE_BASE}/modules/premium-before-after-slider-module-by-magazine-makers`,
    order: 27,
    before: "Basic sliders did not match premium brand sites for portfolio and transformation stories.",
    after: "Premium before/after module with refined animations, overlays, and editor style controls.",
    metric: "Premium slider UX · overlay labels · animation-ready transitions",
    problem:
      "Premium HubSpot sites needed a more polished before/after experience for case studies and visual proof — with better typography, transitions, and layout control than generic image comparison widgets.",
    solution:
      "Published Premium Before/After Slider on the HubSpot Marketplace with enhanced handle styling, optional overlay text, animation settings, and responsive breakpoints — giving marketers a high-end comparison block without custom development.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "Animation", "HubSpot CMS"],
    previewUrl: `${MARKETPLACE_BASE}/modules/premium-before-after-slider-module-by-magazine-makers`,
    screenshotFolder: "portfolio/marketplace-modules",
  },
  {
    slug: "premium-testimonial-media-hubspot-module",
    title: "Premium Testimonial Media — HubSpot Marketplace Module",
    category: "HubSpot CMS · Marketplace Module",
    liveUrl: `${MARKETPLACE_BASE}/modules/premium-testimonial-media-module-by-magazine-makers`,
    order: 28,
    before: "Text-only testimonials failed to leverage video and rich media social proof on HubSpot pages.",
    after: "Premium testimonial module supporting video, headshots, quotes, and company logos.",
    metric: "Video + image testimonials · logo slots · carousel-ready layout",
    problem:
      "Marketing teams wanted testimonial sections with embedded video, customer photos, and logo marks — but stitching together native HubSpot modules produced inconsistent layouts and poor mobile behavior.",
    solution:
      "Shipped Premium Testimonial Media by Magazine Makers on the HubSpot Marketplace: repeatable testimonial items with video or image media, quote text, name/title/company fields, optional logo marks, and layout controls for grids or stacked mobile presentations.",
    tags: ["HubSpot", "HubL", "JavaScript", "UI", "Design", "HubSpot CMS"],
    previewUrl: `${MARKETPLACE_BASE}/modules/premium-testimonial-media-module-by-magazine-makers`,
    screenshotFolder: "portfolio/marketplace-modules",
  },
];

async function uploadScreenshot(buffer, publicId, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
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
    await page.goto(project.previewUrl, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForTimeout(5000);

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
      let images = [];

      try {
        images = await captureScreenshots(browser, project);
      } catch (err) {
        console.warn(`Screenshot failed for ${project.slug}:`, err.message);
        const existing = await Project.findOne({ slug: project.slug });
        if (existing?.images?.length) {
          images = existing.images;
        }
      }

      if (!images.length) {
        console.warn(`Skipping ${project.slug} — no images available`);
        continue;
      }

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
