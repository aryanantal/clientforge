import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  description: { type: String, required: true },
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  period: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  achievements: [achievementSchema],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const educationSchema = new mongoose.Schema({
  period: { type: String, required: true },
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
}, { _id: false });

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [skillItemSchema],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String },
  date: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const contactInfoSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  linkedin: { type: String },
  github: { type: String },
  location: { type: String },
}, { _id: false });

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  avatar: { type: String },
  contactInfo: contactInfoSchema,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const resumeSchema = new mongoose.Schema({
  profile: {
    type: profileSchema,
    required: true,
  },
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [skillCategorySchema],
  certifications: [certificationSchema],
  featuredProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }]
}, {
  timestamps: true,
});

// Static method to get or create resume
resumeSchema.statics.getResume = async function() {
  let resume = await this.findOne();
  if (!resume) {
    resume = await this.create({
      profile: {
        name: "Arjun Kumar",
        title: "Full Stack Engineer & HubSpot Specialist",
        summary: "Results-driven Full Stack Engineer with 3+ years of experience in building scalable web applications.",
        contactInfo: {
          email: "hello@arjun.dev",
          linkedin: "https://linkedin.com",
          github: "https://github.com",
        },
      },
      experience: [],
      education: [],
      skills: [],
      certifications: [],
    });
  }
  return resume;
};

export default mongoose.model("Resume", resumeSchema);
