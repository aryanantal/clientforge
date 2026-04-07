import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    console.log("Testing database connection...");
    await connectDB();
    console.log("Database connection successful");
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      status: mongoose.connection.readyState
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}