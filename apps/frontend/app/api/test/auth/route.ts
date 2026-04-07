import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/middleware/auth";

export async function GET(request: Request) {
  try {
    console.log("Testing authentication...");
    const result = verifyToken(request);
    
    return NextResponse.json({
      success: true,
      message: "Authentication test successful",
      result: result
    });
  } catch (error) {
    console.error("Authentication test error:", error);
    return NextResponse.json({
      success: false,
      message: "Authentication test failed",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}