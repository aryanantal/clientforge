import { NextResponse } from "next/server";
import Project from "@/lib/models/Project";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";
import mongoose from "mongoose";

// PUT update project (admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection established");
    
    // Check if Project model is available
    if (!mongoose.models.Project) {
      console.error("Project model not found in mongoose.models");
      throw new Error("Project model not initialized");
    }
    
    // Check authentication and admin role
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { projectId } = await params;

    // Parse multipart form data or JSON
    let projectData: Record<string, unknown>;
    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      projectData = {};
      
      for (const [key, value] of formData.entries()) {
        if (key === "tags" || key === "images") {
          try {
            projectData[key] = JSON.parse(value as string);
          } catch {
            projectData[key] = [];
          }
        } else if (key === "id") {
          projectData[key] = Number(value);
        } else {
          projectData[key] = value;
        }
      }
    } else {
      projectData = await request.json();
      
      // Handle images - convert single image to array
      if (projectData.image && !projectData.images) {
        projectData.images = [projectData.image];
      }
      if (typeof projectData.images === "string") {
        try {
          projectData.images = JSON.parse(projectData.images);
        } catch {}
      }
      
      // Ensure ID is numeric
      if (projectData.id) {
        projectData.id = Number(projectData.id);
      }
      
      // Parse tags if it's a string
      if (typeof projectData.tags === "string") {
        try {
          projectData.tags = JSON.parse(projectData.tags);
        } catch {}
      }
    }

    // Find and update project - try both MongoDB _id and custom id/slug
    let project;
    try {
      // First try MongoDB _id
      if (mongoose.Types.ObjectId.isValid(projectId)) {
        project = await Project.findByIdAndUpdate(
          projectId,
          projectData,
          { new: true }
        );
      }
      
      // If not found, try custom id
      if (!project) {
        const numericId = Number(projectId);
        if (!Number.isNaN(numericId)) {
          project = await Project.findOneAndUpdate(
            { id: numericId },
            projectData,
            { new: true }
          );
        }
      }
      
      // If still not found, try slug
      if (!project) {
        project = await Project.findOneAndUpdate(
          { slug: projectId },
          projectData,
          { new: true }
        );
      }
    } catch (findError) {
      console.error("Error updating project:", findError);
      throw findError;
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
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection established");
    
    // Check if Project model is available
    if (!mongoose.models.Project) {
      console.error("Project model not found in mongoose.models");
      throw new Error("Project model not initialized");
    }
    
    // Check authentication and admin role
    const authResult = requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { projectId } = await params;

    // Find and delete project - try MongoDB _id, custom id, or slug
    let project;
    try {
      // First try MongoDB _id
      if (mongoose.Types.ObjectId.isValid(projectId)) {
        project = await Project.findByIdAndDelete(projectId);
      }
      
      // If not found, try custom id
      if (!project) {
        const numericId = Number(projectId);
        if (!Number.isNaN(numericId)) {
          project = await Project.findOneAndDelete({ id: numericId });
        }
      }
      
      // If still not found, try slug
      if (!project) {
        project = await Project.findOneAndDelete({ slug: projectId });
      }
    } catch (findError) {
      console.error("Error deleting project:", findError);
      throw findError;
    }

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

