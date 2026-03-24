import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Create new user (role is "user" by default)
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      name,
      role: "user",
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      token,
      user: newUser.toJSON(),
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during registration" },
      { status: 500 }
    );
  }
}
