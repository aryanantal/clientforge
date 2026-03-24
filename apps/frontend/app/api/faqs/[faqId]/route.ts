import { NextResponse } from "next/server";
import FAQ from "@/lib/models/FAQ";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// PUT update FAQ
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ faqId: string }> }
) {
  try {
    await connectDB();
    
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { faqId } = await params;
    const updateData = await request.json();

    const faq = await FAQ.findByIdAndUpdate(faqId, updateData, { new: true });

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: faq,
      message: "FAQ updated successfully"
    });
  } catch (error) {
    console.error("Update FAQ error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE FAQ
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ faqId: string }> }
) {
  try {
    await connectDB();
    
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { faqId } = await params;

    const faq = await FAQ.findByIdAndDelete(faqId);

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully"
    });
  } catch (error) {
    console.error("Delete FAQ error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
