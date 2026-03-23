import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "aryanantal18@gmail.com" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create default admin user
    const admin = new User({
      email: "aryanantal18@gmail.com",
      password: "Aryan8864#", // This will be hashed before saving
      name: "Aryan Antal",
      role: "admin",
      isActive: true,
    });

    await admin.save();
    console.log("\n✅ Default admin user created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email: aryanantal18@gmail.com");
    console.log("Password: Aryan8864#");
    console.log("Role: admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\nNote: This is the primary admin account.");
    console.log("Password is hashed in the database and never exposed.");

    process.exit(0);
  } catch (error) {
    console.error("Error creating default admin:", error);
    process.exit(1);
  }
};

seedDefaultAdmin();
