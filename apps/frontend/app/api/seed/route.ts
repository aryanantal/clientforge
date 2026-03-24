import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

// Seed admin user - call this once to create the admin
export async function POST(request: Request) {
  try {
    await connectDB();

    // Check for secret key to prevent unauthorized seeding
    const { secret } = await request.json();
    
    if (secret !== "create-admin-now") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "aryanantal18@gmail.com" });

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: "Admin user already exists",
      });
    }

    // Create default admin user
    const admin = new User({
      email: "aryanantal18@gmail.com",
      password: "Aryan8864#",
      name: "Aryan Antal",
      role: "admin",
      isActive: true,
    });

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully!",
    });
  } catch (error) {
    console.error("Seed admin error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
