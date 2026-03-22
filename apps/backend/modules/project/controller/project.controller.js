import Project from "../../../models/Project.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: projects,
      message: "Projects retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects"
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log('Getting project with projectId:', projectId);

    // First try to find by slug
    let project = await Project.findOne({ slug: projectId });
    console.log('Found by slug:', project);

    if (!project) {
      // If not found by slug, try by id
      const numericId = Number(projectId);
      console.log('Trying by id:', numericId);
      project = await Project.findOne({ id: numericId });
      console.log('Found by id:', project);
    }

    if (!project) {
      console.log('Project not found');
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    res.status(200).json({
      success: true,
      data: project,
      message: "Project retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve project"
    });
  }
};

export const createProject = async (req, res) => {
  try {
    // Only admin can create projects
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can create projects",
      });
    }

    const projectData = req.body;

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      projectData.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    // Normalize incoming images (existing compatibility)
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
        return res.status(400).json({
          success: false,
          message: 'Project ID must be a valid number',
        });
      }
    }

    // Validate required fields
    const requiredFields = ['id', 'slug', 'title', 'category', 'before', 'after', 'metric', 'problem', 'solution', 'images', 'tags'];
    for (const field of requiredFields) {
      if (projectData[field] === undefined || projectData[field] === null || projectData[field] === "") {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    // Parse tags if it's a string
    if (typeof projectData.tags === 'string') {
      projectData.tags = JSON.parse(projectData.tags);
    }

    // Check if project with this id already exists
    const existingProject = await Project.findOne({ id: projectData.id });
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project with this ID already exists",
      });
    }

    // Check if project with this slug already exists
    const existingSlug = await Project.findOne({ slug: projectData.slug });
    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "Project with this slug already exists",
      });
    }

    const newProject = new Project(projectData);
    await newProject.save();

    res.status(201).json({
      success: true,
      data: newProject,
      message: "Project created successfully"
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project"
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    // Only admin can update projects
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can update projects",
      });
    }

    const { projectId } = req.params;
    const updateData = req.body;

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const uploadedImages = req.files.map((file) => `/uploads/${file.filename}`);
      updateData.images = uploadedImages;
    }

    // Keep existing images if not replaced
    if (typeof updateData.images === 'string') {
      updateData.images = JSON.parse(updateData.images);
    }
    if (updateData.image && !updateData.images) {
      updateData.images = [updateData.image];
    }

    // Parse tags if it's a string
    if (typeof updateData.tags === 'string') {
      updateData.tags = JSON.parse(updateData.tags);
    }

    // Ensure ID remains numeric if provided
    if (updateData.id) {
      updateData.id = Number(updateData.id);
      if (Number.isNaN(updateData.id)) {
        return res.status(400).json({
          success: false,
          message: 'Project ID must be a valid number',
        });
      }
    }

    // Check if slug already exists for another project
    if (updateData.slug) {
      const existingSlugProject = await Project.findOne({
        slug: updateData.slug,
        _id: { $ne: projectId }
      });
      if (existingSlugProject) {
        return res.status(400).json({
          success: false,
          message: "A project with this slug already exists",
        });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProject,
      message: "Project updated successfully"
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project"
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    // Only admin can delete projects
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can delete projects",
      });
    }

    const { projectId } = req.params;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project"
    });
  }
};