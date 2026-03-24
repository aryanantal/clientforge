import { NextResponse } from "next/server";
import Stats from "@/lib/models/Stats";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// PUT update stat
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ statId: string }> }
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

    const { statId } = await params;
    const updateData = await request.json();

    const stat = await Stats.findByIdAndUpdate(statId, updateData, { new: true });

    if (!stat) {
      return NextResponse.json(
        { success: false, message: "Stat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stat,
      message: "Stat updated successfully"
    });
  } catch (error) {
    console.error("Update stat error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE stat
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ statId: string }> }
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

    const { statId } = await params;

    const stat = await Stats.findByIdAndDelete(statId);

    if (!stat) {
      return NextResponse.json(
        { success: false, message: "Stat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Stat deleted successfully"
    });
  } catch (error) {
    console.error("Delete stat error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
