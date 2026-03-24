import { NextResponse } from "next/server";
import Contact from "@/lib/models/Contact";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// DELETE contact
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ contactId: string }> }
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

    const { contactId } = await params;

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
