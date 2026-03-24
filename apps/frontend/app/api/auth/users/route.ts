import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";
import { verifyToken, requireAdmin } from "@/lib/middleware/auth";

// GET all users
export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Check authentication
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const users = await User.find().select("-password").sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// POST create new user
export async function POST(request: Request) {
  try {
    await connectDB();
    
    // Check authentication
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { email, password, name, role } = await request.json();

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

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      name,
      role: role || "user",
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: newUser.toJSON(),
    });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
