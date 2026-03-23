import Resume from "../../../models/Resume.js";
import Project from "../../../models/Project.js";

// GET resume (public)
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.getResume();
    // Populate featured projects after getting the resume
    if (resume && resume.featuredProjects) {
      await resume.populate("featuredProjects");
    }
    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE profile (admin only)
export const updateProfile = async (req, res) => {
  try {
    const resume = await Resume.getResume();
    const { name, title, summary, avatar, contactInfo } = req.body;

    if (name) resume.profile.name = name;
    if (title) resume.profile.title = title;
    if (summary) resume.profile.summary = summary;
    if (avatar) resume.profile.avatar = avatar;
    if (contactInfo) resume.profile.contactInfo = { ...resume.profile.contactInfo, ...contactInfo };

    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD experience (admin only)
export const addExperience = async (req, res) => {
  try {
    const resume = await Resume.getResume();
    const { period, role, company, location, description, achievements, order } = req.body;

    const newExperience = {
      period,
      role,
      company,
      location,
      description,
      achievements: achievements || [],
      order: order || resume.experience.length,
    };

    resume.experience.push(newExperience);
    await resume.save();

    res.status(201).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE experience (admin only)
export const updateExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const resume = await Resume.getResume();
    
    const experience = resume.experience.id(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    const { period, role, company, location, description, achievements, order, isActive } = req.body;
    
    if (period) experience.period = period;
    if (role) experience.role = role;
    if (company) experience.company = company;
    if (location) experience.location = location;
    if (description) experience.description = description;
    if (achievements) experience.achievements = achievements;
    if (order !== undefined) experience.order = order;
    if (isActive !== undefined) experience.isActive = isActive;

    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE experience (admin only)
export const deleteExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const resume = await Resume.getResume();
    
    resume.experience.pull(experienceId);
    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD education (admin only)
export const addEducation = async (req, res) => {
  try {
    const resume = await Resume.getResume();
    const { period, degree, institution, location, details, order } = req.body;

    const newEducation = {
      period,
      degree,
      institution,
      location,
      details: details || "",
      order: order || resume.education.length,
    };

    resume.education.push(newEducation);
    await resume.save();

    res.status(201).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE education (admin only)
export const updateEducation = async (req, res) => {
  try {
    const { educationId } = req.params;
    const resume = await Resume.getResume();
    
    const education = resume.education.id(educationId);
    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    const { period, degree, institution, location, details, order, isActive } = req.body;
    
    if (period) education.period = period;
    if (degree) education.degree = degree;
    if (institution) education.institution = institution;
    if (location) education.location = location;
    if (details) education.details = details;
    if (order !== undefined) education.order = order;
    if (isActive !== undefined) education.isActive = isActive;

    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE education (admin only)
export const deleteEducation = async (req, res) => {
  try {
    const { educationId } = req.params;
    const resume = await Resume.getResume();
    
    resume.education.pull(educationId);
    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD skill category (admin only)
export const addSkillCategory = async (req, res) => {
  try {
    const resume = await Resume.getResume();
    const { category, skills, order } = req.body;

    const newSkillCategory = {
      category,
      skills: skills || [],
      order: order || resume.skills.length,
    };

    resume.skills.push(newSkillCategory);
    await resume.save();

    res.status(201).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE skill category (admin only)
export const updateSkillCategory = async (req, res) => {
  try {
    const { skillCategoryId } = req.params;
    const resume = await Resume.getResume();
    
    const skillCategory = resume.skills.id(skillCategoryId);
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill category not found",
      });
    }

    const { category, skills, order, isActive } = req.body;
    
    if (category) skillCategory.category = category;
    if (skills) skillCategory.skills = skills;
    if (order !== undefined) skillCategory.order = order;
    if (isActive !== undefined) skillCategory.isActive = isActive;

    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE skill category (admin only)
export const deleteSkillCategory = async (req, res) => {
  try {
    const { skillCategoryId } = req.params;
    const resume = await Resume.getResume();
    
    resume.skills.pull(skillCategoryId);
    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD certification (admin only)
export const addCertification = async (req, res) => {
  try {
    const resume = await Resume.getResume();
    const { name, issuer, date, order } = req.body;

    const newCertification = {
      name,
      issuer: issuer || "",
      date: date || "",
      order: order || resume.certifications.length,
    };

    resume.certifications.push(newCertification);
    await resume.save();

    res.status(201).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE certification (admin only)
export const updateCertification = async (req, res) => {
  try {
    const { certificationId } = req.params;
    const resume = await Resume.getResume();
    
    const certification = resume.certifications.id(certificationId);
    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    const { name, issuer, date, order, isActive } = req.body;
    
    if (name) certification.name = name;
    if (issuer) certification.issuer = issuer;
    if (date) certification.date = date;
    if (order !== undefined) certification.order = order;
    if (isActive !== undefined) certification.isActive = isActive;

    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE certification (admin only)
export const deleteCertification = async (req, res) => {
  try {
    const { certificationId } = req.params;
    const resume = await Resume.getResume();
    
    resume.certifications.pull(certificationId);
    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all projects for selection (admin only)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE featured projects (admin only)
export const updateFeaturedProjects = async (req, res) => {
  try {
    const resume = await Resume.getResume();
    const { featuredProjects } = req.body;
    
    // featuredProjects should be an array of project IDs
    resume.featuredProjects = featuredProjects || [];
    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
