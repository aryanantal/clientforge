import { NextResponse } from "next/server";
import Stats from "@/lib/models/Stats";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// GET all stats (public)
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const stats = await Stats.find().sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get stats error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve stats" },
      { status: 500 }
    );
  }
}

// POST create new stat (admin only)
export async function POST(request: Request) {
  try {
    await connectDB();
    
    // Check authentication and admin role
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { label, value, order } = await request.json();

    if (!label || !value) {
      return NextResponse.json(
        { success: false, message: "Label and value are required" },
        { status: 400 }
      );
    }

    const newStat = new Stats({
      label,
      value,
      order: order || 0,
    });

    await newStat.save();

    return NextResponse.json({
      success: true,
      data: newStat,
      message: "Stat created successfully"
    });
  } catch (error) {
    console.error("Create stat error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
