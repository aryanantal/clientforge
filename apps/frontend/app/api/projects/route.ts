import { NextResponse } from "next/server";
import Project from "@/lib/models/Project";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/middleware/auth";

// GET all projects (public)
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const projects = await Project.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: projects,
      message: "Projects retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve projects" },
      { status: 500 }
    );
  }
}

// POST create new project (admin only)
export async function POST(request: Request) {
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

    const projectData = await request.json();

    // Handle images - convert single image to array
    if (projectData.image && !projectData.images) {
      projectData.images = [projectData.image];
    }
    if (typeof projectData.images === 'string') {
      projectData.images = JSON.parse(projectData.images);
    }

    // Ensure ID is numeric
    if (projectData.id) {
      projectData.id = Number(projectData.id);
      if (Number.isNaN(projectData.id)) {
        return NextResponse.json(
          { success: false, message: 'Project ID must be a valid number' },
          { status: 400 }
        );
      }
    }

    // Parse tags if it's a string
    if (typeof projectData.tags === 'string') {
      projectData.tags = JSON.parse(projectData.tags);
    }

    // Validate required fields
    const requiredFields = ['id', 'slug', 'title', 'category', 'before', 'after', 'metric', 'problem', 'solution', 'images', 'tags'];
    for (const field of requiredFields) {
      if (projectData[field] === undefined || projectData[field] === null || projectData[field] === "") {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if project with this id already exists
    const existingProject = await Project.findOne({ id: projectData.id });
    if (existingProject) {
      return NextResponse.json(
        { success: false, message: "Project with this ID already exists" },
        { status: 400 }
      );
    }

    // Check if project with this slug already exists
    const existingSlug = await Project.findOne({ slug: projectData.slug });
    if (existingSlug) {
      return NextResponse.json(
        { success: false, message: "Project with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the project
    const newProject = new Project(projectData);
    await newProject.save();

    return NextResponse.json({
      success: true,
      data: newProject,
      message: "Project created successfully"
    });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
