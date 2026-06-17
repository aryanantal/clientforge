import dotenv from "dotenv";
import mongoose from "mongoose";
import { chromium } from "playwright";
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

/** Lower number = appears first on portfolio. Edit in admin anytime. */
const ORDER_BY_SLUG = {
  "empkhet-organic-farming-e-commerce-platform": 1,
  "prognos-health-hubspot-website": 2,
  "odw-logistics-maka-power-theme": 3,
  "north-coast-container-maka-power-theme": 4,
  "contegix-wordpress-to-hubspot-migration": 5,
  "rj-lee-group-enterprise-migration": 6,
  "cameron-mfg-hubspot-theme-migration": 7,
  "orderease-hubspot-revamp": 8,
  "rise-and-shine-leading-hubspot-website": 9,
  "otb-packaging-hubspot-theme": 10,
  "unison-alberta-hubspot-theme-migration": 11,
  "sdapp-hubspot-website-landing-pages": 12,
  "eco-multistep-calculator": 13,
  "iot-smart-farming-dashboard": 14,
  "startable-blog-hubspot": 15,
  "advance-video-popup-hubspot-module": 20,
  "sticky-sidebar-accordion-hubspot-module": 21,
  "typewriter-hubspot-marketplace-module": 22,
  "aura-ui-concept": 30,
  "personal-portfolio-website-conversion-focused": 31,
};

const PROJECTS = [
  {
    slug: "north-coast-container-maka-power-theme",
    title: "North Coast Container — HubSpot Website",
    category: "HubSpot CMS · Maka Agency Power Theme",
    liveUrl: "https://www.northcoastcontainer.com/",
    order: 4,
    before: "Industrial manufacturer needed a scalable site for products, locations, and quote flows.",
    after: "Enterprise HubSpot site built on Maka Agency Power theme with nationwide supply positioning.",
    metric: "Multi-location IA · product catalog · quote conversion paths",
    problem:
      "North Coast Container, a leading steel drum manufacturer, needed a professional HubSpot web presence to showcase product lines (open head, tight head, ISO, specialty drums), five US facilities, industry verticals, and sustainability certifications — while driving quote requests from B2B buyers.",
    solution:
      "Developed the HubSpot CMS website using the Maka Agency Power theme as a foundation — customizing navigation, product grids, location pages, certification badges, and conversion modules for Contact Us and Request a Quote. Structured content for SEO, industries served, and resources (blogs, knowledge base, FAQs).",
    tags: ["HubSpot", "HubL", "UI", "Design", "JavaScript", "SEO"],
    previewUrl: "https://www.northcoastcontainer.com/",
  },
  {
    slug: "odw-logistics-maka-power-theme",
    title: "ODW Logistics — Integrated 3PL Website",
    category: "HubSpot CMS · Maka Agency Power Theme",
    liveUrl: "https://www.odwlogistics.com/",
    order: 3,
    before: "Complex 3PL service lines were difficult to present clearly to enterprise prospects.",
    after: "Conversion-focused HubSpot site on Maka Power theme with mega-menu service architecture.",
    metric: "Integrated logistics IA · case-study hub · 30% retail consolidation messaging",
    problem:
      "ODW Logistics required a HubSpot website that could communicate warehousing, transportation, e-commerce fulfillment, and supply chain innovation — plus vertical expertise (health & beauty, food & beverage, CPG) — to enterprise brands evaluating integrated 3PL partners.",
    solution:
      "Built on the Maka Agency Power theme with deep customization: mega-menu navigation, service vertical pages, case study highlights, discovery-to-improvement process storytelling, and quote request flows. Optimized for clarity across complex B2B logistics offerings and retail consolidation value props.",
    tags: ["HubSpot", "HubL", "UI", "JavaScript", "Enterprise", "Responsive layouts"],
    previewUrl: "https://www.odwlogistics.com/",
  },
  {
    slug: "contegix-wordpress-to-hubspot-migration",
    title: "Contegix — WordPress to HubSpot Migration",
    category: "Enterprise Migration · HubSpot CMS",
    liveUrl: "https://contegix.com/",
    order: 5,
    before: "WordPress site limited marketing agility for Atlassian services and MARS Atlas launch.",
    after: "Fully migrated HubSpot CMS with modular architecture and enterprise service positioning.",
    metric: "Full CMS migration · Atlassian partner positioning · modular page system",
    problem:
      "Contegix, an Atlassian Platinum Partner, needed to move off WordPress to HubSpot CMS for faster campaign launches, better lead capture, and a scalable structure for Jira, Confluence, ITSM, DevOps, and MARS Atlas product marketing.",
    solution:
      "Led end-to-end WordPress-to-HubSpot migration: custom theme development, reusable modules, service/solution page templates, case study and resource hubs, and performance-focused front-end delivery. Preserved SEO equity while modernizing navigation for Atlassian, professional services, and FedRAMP/cloud migration offerings.",
    tags: ["HubSpot", "HubL", "UI", "Performance", "Migration", "JavaScript"],
    previewUrl: "https://contegix.com/",
  },
  {
    slug: "orderease-hubspot-revamp",
    title: "OrderEase — HubSpot Website Revamp",
    category: "HubSpot CMS · Website Redesign",
    liveUrl: "https://www.orderease.com/",
    order: 8,
    before: "Outdated site failed to communicate product value and conversion paths for B2B buyers.",
    after: "Modern HubSpot redesign with clearer messaging, updated IA, and conversion-focused layout.",
    metric: "Full visual revamp · improved IA · HubSpot-native content modules",
    problem:
      "OrderEase needed a complete website revamp on HubSpot CMS to better communicate their platform value, refresh brand presentation, and improve lead generation for B2B ordering and commerce workflows.",
    solution:
      "Delivered a HubSpot CMS website redesign with new page structure, updated visual language, reusable custom modules, and optimized CTAs. Focused on clarity for product storytelling, trust signals, and marketing team self-service content updates.",
    tags: ["HubSpot", "HubL", "UI", "Design", "JavaScript", "SEO"],
    previewUrl: "https://www.orderease.com/",
  },
  {
    slug: "startable-blog-hubspot",
    title: "Startable — HubSpot Blog Development",
    category: "HubSpot CMS · Blog Development",
    liveUrl: "https://startable.ae/blog",
    order: 15,
    before: "No structured blog experience aligned with Startable's brand and content strategy.",
    after: "Custom HubSpot blog templates with readable layouts and marketing-ready publishing flows.",
    metric: "Custom blog templates · category/tag UX · mobile-first reading experience",
    problem:
      "Startable needed a dedicated HubSpot blog at startable.ae/blog with branded templates, clear article layouts, and an editorial structure marketing could maintain without developer dependency.",
    solution:
      "Built custom HubSpot blog listing and post templates with responsive typography, featured image treatment, category navigation, and SEO-friendly markup. Integrated with existing brand styling for a cohesive content hub.",
    tags: ["HubSpot", "HubL", "UI", "Design", "SEO", "JavaScript"],
    previewUrl: "https://startable.ae/blog",
  },
  {
    slug: "unison-alberta-hubspot-theme-migration",
    title: "Unison Alberta — HubSpot Theme & Migration",
    category: "HubSpot CMS · Theme Development",
    liveUrl: "https://unisonalberta.com/",
    order: 11,
    before: "Legacy site lacked flexible CMS editing and consistent brand presentation.",
    after: "Custom HubSpot theme with migration to modular, marketer-friendly page building.",
    metric: "Custom theme · CMS migration · drag-and-drop module system",
    problem:
      "Unison Alberta required HubSpot theme development and migration from a legacy setup — enabling non-technical teams to publish pages while maintaining brand consistency and accessible, responsive layouts.",
    solution:
      "Developed a custom HubSpot CMS theme with reusable modules, global styles, and migration of key page content. Built for long-term maintainability with clear content zones, responsive breakpoints, and marketer-friendly field groups.",
    tags: ["HubSpot", "HubL", "UI", "Migration", "Design", "JavaScript"],
    previewUrl: "https://unisonalberta.com/",
  },
  {
    slug: "rj-lee-group-enterprise-migration",
    updateOnly: true,
    title: "RJ Lee Group — Enterprise HubSpot Migration",
    category: "Enterprise Web Migration · HubSpot CMS",
    liveUrl: "https://www.rjlg.com/",
    order: 6,
    before: "Legacy system with limited scalability and outdated UI for enterprise audiences.",
    after: "Modern HubSpot CMS with custom modules, animations, and structured enterprise IA.",
    metric: "Full CMS migration · custom modules · improved performance & content velocity",
    problem:
      "RJ Lee Group's legacy web platform was difficult to maintain and failed to reflect their enterprise materials science and laboratory services positioning. Marketing needed HubSpot CMS flexibility without sacrificing brand polish.",
    solution:
      "Handled full HubSpot CMS migration and custom theme development: modular page components, animation-ready sections, structured service/industry navigation, and performance-conscious CSS. Enabled faster content updates for enterprise buyers and technical audiences.",
    tags: ["HubSpot", "UI", "Performance", "Migration", "JavaScript", "Enterprise"],
    previewUrl: "https://www.rjlg.com/",
  },
  {
    slug: "otb-packaging-hubspot-theme",
    title: "OTB Packaging Solutions — HubSpot Theme",
    category: "HubSpot CMS · Theme Development",
    liveUrl: "https://otbpackaging.com/",
    order: 10,
    before: "Packaging brand needed a HubSpot-native site with flexible marketing modules.",
    after: "Custom HubSpot theme tailored to packaging solutions and B2B lead generation.",
    metric: "Custom theme architecture · reusable modules · B2B conversion layout",
    problem:
      "OTB Packaging Solutions needed a HubSpot CMS theme that could showcase packaging capabilities, product/service lines, and trust signals while giving marketing teams independent control over landing pages and campaigns.",
    solution:
      "Built a custom HubSpot CMS theme with modular sections for services, industries, and contact flows. Designed for B2B packaging buyers with clean layouts, responsive grids, and editor-friendly module fields.",
    tags: ["HubSpot", "HubL", "UI", "Design", "JavaScript", "SEO"],
    previewUrl: "https://otbpackaging.com/",
  },
  {
    slug: "cameron-mfg-hubspot-theme-migration",
    title: "Cameron Manufacturing — HubSpot Theme & Migration",
    category: "HubSpot CMS · Theme Development",
    liveUrl: "https://www.cameronmfg.com/",
    order: 7,
    before: "Manufacturing site on legacy stack with slow content updates and inconsistent UX.",
    after: "HubSpot CMS theme with migration to scalable, marketer-controlled page building.",
    metric: "Theme + migration · manufacturing-focused IA · modular HubSpot pages",
    problem:
      "Cameron Manufacturing required HubSpot theme development and CMS migration to modernize their web presence for industrial buyers — with reliable performance, clear product/service paths, and simplified content management.",
    solution:
      "Delivered custom HubSpot theme development and content migration: reusable modules for capabilities, certifications, and contact CTAs; responsive manufacturing-focused layouts; and structured templates for marketing-led updates without developer bottlenecks.",
    tags: ["HubSpot", "HubL", "UI", "Migration", "Design", "JavaScript"],
    previewUrl: "https://www.cameronmfg.com/",
  },
];

async function uploadScreenshot(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/hubspot-clients",
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

    await page.evaluate(() => window.scrollTo(0, Math.min(window.innerHeight, document.body.scrollHeight * 0.4)));
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

  if (project.updateOnly) {
    throw new Error(`Project not found for update: ${project.slug}`);
  }

  const created = await Project.create({
    ...payload,
    id: Date.now() + Math.floor(Math.random() * 1000),
    slug: project.slug,
  });
  return { action: "created", slug: project.slug, id: created._id };
}

async function syncAllOrders() {
  const all = await Project.find();
  let synced = 0;

  for (const doc of all) {
    const order = ORDER_BY_SLUG[doc.slug];
    if (order !== undefined && doc.order !== order) {
      doc.order = order;
      await doc.save();
      synced++;
    } else if (order === undefined && (doc.order === undefined || doc.order === null)) {
      doc.order = 50;
      await doc.save();
      synced++;
    }
  }

  return synced;
}

async function main() {
  await connectDB();
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const project of PROJECTS) {
      console.log(`Processing: ${project.title}`);
      let images = project.existingImages;

      if (!images?.length) {
        try {
          images = await captureScreenshots(browser, project);
        } catch (err) {
          console.warn(`Screenshot failed for ${project.slug}, keeping existing if any:`, err.message);
          if (project.updateOnly) {
            const existing = await Project.findOne({ slug: project.slug });
            images = existing?.images?.length ? existing.images : [];
          }
          if (!images?.length) throw err;
        }
      }

      const result = await upsertProject(project, images);
      results.push({ ...result, order: project.order, liveUrl: project.liveUrl });
      console.log(`${result.action}: ${project.slug}`);
    }

    const synced = await syncAllOrders();
    console.log(`Synced order on ${synced} projects`);
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
