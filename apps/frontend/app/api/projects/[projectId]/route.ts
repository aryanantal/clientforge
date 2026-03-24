import { NextResponse } from "next/server";
import Project from "@/lib/models/Project";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// GET single project by ID or slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    await connectDB();
    
    const { projectId } = await params;

    // First try to find by slug
    let project = await Project.findOne({ slug: projectId });

    if (!project) {
      // If not found by slug, try by id
      const numericId = Number(projectId);
      project = await Project.findOne({ id: numericId });
    }

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
      message: "Project retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve project" },
      { status: 500 }
    );
  }
}

// PUT update project (admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
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

    const { projectId } = await params;
    const projectData = await request.json();

    // Handle images - convert single image to array
    if (projectData.image && !projectData.images) {
      projectData.images = [projectData.image];
    }
    if (typeof projectData.images === 'string') {
      projectData.images = JSON.parse(projectData.images);
    }

    // Parse tags if it's a string
    if (typeof projectData.tags === 'string') {
      projectData.tags = JSON.parse(projectData.tags);
    }

    // Find and update project - try both id and slug
    let project = await Project.findOneAndUpdate(
      { $or: [{ id: Number(projectId) }, { slug: projectId }] },
      projectData,
      { new: true }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
      message: "Project updated successfully"
    });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE project (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
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

    const { projectId } = await params;

    // Find and delete project - try both id and slug
    const project = await Project.findOneAndDelete(
      { $or: [{ id: Number(projectId) }, { slug: projectId }] }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
