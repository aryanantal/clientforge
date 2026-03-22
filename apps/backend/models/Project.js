import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  before: { type: String, required: true },
  after: { type: String, required: true },
  metric: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  images: [{ type: String, required: true }],
  tags: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", projectSchema);