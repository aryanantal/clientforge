import { NextResponse } from "next/server";
import Contact from "@/lib/models/Contact";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// GET all contacts (admin only)
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve contacts" },
      { status: 500 }
    );
  }
}

// POST create new contact (public)
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { name, email, company, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const newContact = new Contact({
      name,
      email,
      company,
      message,
    });

    await newContact.save();

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon."
    });
  } catch (error) {
    console.error("Create contact error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
