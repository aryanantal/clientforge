import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";
import { ORDER_BY_SLUG } from "./projectOrder.js";

dotenv.config();

async function main() {
  await connectDB();

  const all = await Project.find();
  const updated = [];

  for (const doc of all) {
    const order = ORDER_BY_SLUG[doc.slug];
    if (order !== undefined && doc.order !== order) {
      doc.order = order;
      await doc.save();
      updated.push({ slug: doc.slug, order });
    } else if (order === undefined) {
      doc.order = 50;
      await doc.save();
      updated.push({ slug: doc.slug, order: 50, note: "unmapped" });
    }
  }

  const sorted = await Project.find()
    .select("slug title order")
    .sort({ order: 1, title: 1 });

  console.log("Order sync complete:", updated.length, "projects updated");
  console.log(JSON.stringify(sorted, null, 2));

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
