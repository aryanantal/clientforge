import { NextResponse } from "next/server";
import FAQ from "@/lib/models/FAQ";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// GET all FAQs (public)
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error("Get FAQs error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve FAQs" },
      { status: 500 }
    );
  }
}

// POST create new FAQ (admin only)
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { question, answer, category, order } = await request.json();

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, message: "Question and answer are required" },
        { status: 400 }
      );
    }

    const newFAQ = new FAQ({
      question,
      answer,
      category: category || "general",
      order: order || 0,
    });

    await newFAQ.save();

    return NextResponse.json({
      success: true,
      data: newFAQ,
      message: "FAQ created successfully"
    });
  } catch (error) {
    console.error("Create FAQ error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
