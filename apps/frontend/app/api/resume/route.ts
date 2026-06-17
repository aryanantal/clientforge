import { NextResponse } from "next/server";
import Resume from "@/lib/models/Resume";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// GET resume (public)
export async function GET(request: Request) {
  try {
    await connectDB();
    
    let resume = await Resume.findOne();
    
    if (!resume) {
      // Create default resume if none exists
      resume = await Resume.create({
        profile: {
          name: "Aryan Antal",
          title: "Frontend Engineer · Next.js & HubSpot CMS Developer",
          summary:
            "Frontend Engineer with 3+ years of experience building high-performance Next.js applications and HubSpot CMS websites.",
          contactInfo: {
            email: "aryanantal2301@gmail.com",
            phone: "+91 88649 94444",
            linkedin: "https://www.linkedin.com/in/aryan-antal-74310920b",
            github: "https://github.com/aryanantal",
            location: "Noida, Uttar Pradesh, India",
          },
        },
        experience: [],
        education: [],
        skills: [],
        certifications: [],
      });
    }
    
    return NextResponse.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve resume" },
      { status: 500 }
    );
  }
}

// PUT update resume (admin only)
export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const resumeData = await request.json();

    // Find and update resume or create new one
    let resume = await Resume.findOne();
    
    if (resume) {
      resume = await Resume.findByIdAndUpdate(resume._id, resumeData, { new: true });
    } else {
      resume = await Resume.create(resumeData);
    }

    return NextResponse.json({
      success: true,
      data: resume,
      message: "Resume updated successfully"
    });
  } catch (error) {
    console.error("Update resume error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
