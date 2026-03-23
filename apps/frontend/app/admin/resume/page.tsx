"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X, AlertCircle, User, Briefcase, GraduationCap, Code, Award, FolderOpen } from "lucide-react";
import Link from "next/link";
import { API } from "@/../shared/constants/api";
import { showToast } from "../AdminTopBar";

interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}

interface Profile {
  name: string;
  title: string;
  summary: string;
  avatar?: string;
  contactInfo: ContactInfo;
}

interface Achievement {
  description: string;
}

interface Experience {
  _id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: Achievement[];
  order: number;
  isActive: boolean;
}

interface Education {
  _id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  details: string;
  order: number;
  isActive: boolean;
}

interface Skill {
  name: string;
}

interface SkillCategory {
  _id: string;
  category: string;
  skills: Skill[];
  order: number;
  isActive: boolean;
}

interface Certification {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  order: number;
  isActive: boolean;
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
}

interface Resume {
  _id: string;
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  certifications: Certification[];
  featuredProjects: Project[];
}

type ActiveTab = "profile" | "experience" | "education" | "skills" | "certifications" | "projects";

export default function ResumePage() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  
  // Form states
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form data
  const [profileForm, setProfileForm] = useState<Profile>({
    name: "",
    title: "",
    summary: "",
    contactInfo: {},
  });
  
  const [experienceForm, setExperienceForm] = useState({
    period: "",
    role: "",
    company: "",
    location: "",
    description: "",
    achievements: [] as string[],
  });
  
  const [educationForm, setEducationForm] = useState({
    period: "",
    degree: "",
    institution: "",
    location: "",
    details: "",
  });
  
  const [skillForm, setSkillForm] = useState({
    category: "",
    skills: [] as string[],
  });
  
  const [certificationForm, setCertificationForm] = useState({
    name: "",
    issuer: "",
    date: "",
  });

  // Selected projects for featured projects
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    fetchResume();
    if (token) {
      fetchProjects();
    }
  }, []);

  const fetchResume = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}`);
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        // Set selected featured projects
        if (data.data.featuredProjects) {
          setSelectedProjects(data.data.featuredProjects.map((p: Project) => p._id));
        }
      }
    } catch (err) {
      console.error("Error fetching resume:", err);
      showToast("error", "Failed to load resume. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Profile handlers
  const openProfileForm = () => {
    if (resume?.profile) {
      setProfileForm(resume.profile);
    }
    setShowProfileForm(true);
  };

  const handleProfileSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setSaving(true);
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        setShowProfileForm(false);
        showToast("success", "Profile updated successfully!");
      } else {
        showToast("error", data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      showToast("error", "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Experience handlers
  const openExperienceForm = (exp?: Experience) => {
    if (exp) {
      setEditingId(exp._id);
      setExperienceForm({
        period: exp.period,
        role: exp.role,
        company: exp.company,
        location: exp.location,
        description: exp.description,
        achievements: exp.achievements.map(a => a.description),
      });
    } else {
      setEditingId(null);
      setExperienceForm({ period: "", role: "", company: "", location: "", description: "", achievements: [] });
    }
    setShowExperienceForm(true);
  };

  const handleExperienceSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setSaving(true);
    setError(null);
    try {
      const url = editingId 
        ? `${API.BASE_URL}${API.RESUME}/experience/${editingId}`
        : `${API.BASE_URL}${API.RESUME}/experience`;
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...experienceForm,
          achievements: experienceForm.achievements.map(desc => ({ description: desc })),
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        setShowExperienceForm(false);
        setEditingId(null);
        showToast("success", "Experience saved successfully!");
        setShowExperienceForm(false);
        setEditingId(null);
      } else {
        showToast("error", data.message || "Failed to save experience");
      }
    } catch (err) {
      console.error("Error saving experience:", err);
      setError("Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  const handleExperienceDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}/experience/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
      }
    } catch (err) {
      console.error("Error deleting experience:", err);
      showToast("error", "Failed to delete experience");
    }
  };

  // Education handlers
  const openEducationForm = (edu?: Education) => {
    if (edu) {
      setEditingId(edu._id);
      setEducationForm({
        period: edu.period,
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        details: edu.details,
      });
    } else {
      setEditingId(null);
      setEducationForm({ period: "", degree: "", institution: "", location: "", details: "" });
    }
    setShowEducationForm(true);
  };

  const handleEducationSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setSaving(true);
    setError(null);
    try {
      const url = editingId 
        ? `${API.BASE_URL}${API.RESUME}/education/${editingId}`
        : `${API.BASE_URL}${API.RESUME}/education`;
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(educationForm),
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        setShowEducationForm(false);
        setEditingId(null);
        showToast("success", "Education saved successfully!");
        setShowEducationForm(false);
        setEditingId(null);
      } else {
        showToast("error", data.message || "Failed to save education");
      }
    } catch (err) {
      console.error("Error saving education:", err);
      setError("Failed to save education");
    } finally {
      setSaving(false);
    }
  };

  const handleEducationDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education?")) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}/education/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
      }
    } catch (err) {
      console.error("Error deleting education:", err);
      showToast("error", "Failed to delete education");
    }
  };

  // Skills handlers
  const openSkillForm = (skill?: SkillCategory) => {
    if (skill) {
      setEditingId(skill._id);
      setSkillForm({
        category: skill.category,
        skills: skill.skills.map(s => s.name),
      });
    } else {
      setEditingId(null);
      setSkillForm({ category: "", skills: [] });
    }
    setShowSkillForm(true);
  };

  const handleSkillSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setSaving(true);
    setError(null);
    try {
      const url = editingId 
        ? `${API.BASE_URL}${API.RESUME}/skills/${editingId}`
        : `${API.BASE_URL}${API.RESUME}/skills`;
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: skillForm.category,
          skills: skillForm.skills.map(name => ({ name })),
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        setShowSkillForm(false);
        setEditingId(null);
        showToast("success", "Skills saved successfully!");
        setShowSkillForm(false);
        setEditingId(null);
      } else {
        showToast("error", data.message || "Failed to save skills");
      }
    } catch (err) {
      console.error("Error saving skills:", err);
      setError("Failed to save skills");
    } finally {
      setSaving(false);
    }
  };

  const handleSkillDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
      }
    } catch (err) {
      console.error("Error deleting skills:", err);
      showToast("error", "Failed to delete skills");
    }
  };

  // Certification handlers
  const openCertificationForm = (cert?: Certification) => {
    if (cert) {
      setEditingId(cert._id);
      setCertificationForm({
        name: cert.name,
        issuer: cert.issuer,
        date: cert.date,
      });
    } else {
      setEditingId(null);
      setCertificationForm({ name: "", issuer: "", date: "" });
    }
    setShowCertificationForm(true);
  };

  const handleCertificationSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setSaving(true);
    setError(null);
    try {
      const url = editingId 
        ? `${API.BASE_URL}${API.RESUME}/certifications/${editingId}`
        : `${API.BASE_URL}${API.RESUME}/certifications`;
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(certificationForm),
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        setShowCertificationForm(false);
        setEditingId(null);
        showToast("success", "Certification saved successfully!");
        setShowCertificationForm(false);
        setEditingId(null);
      } else {
        showToast("error", data.message || "Failed to save certification");
      }
    } catch (err) {
      console.error("Error saving certification:", err);
      setError("Failed to save certification");
    } finally {
      setSaving(false);
    }
  };

  const handleCertificationDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}/certifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
      }
    } catch (err) {
      console.error("Error deleting certification:", err);
      showToast("error", "Failed to delete certification");
    }
  };

  // Featured Projects handlers
  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const handleSaveFeaturedProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setSaving(true);
    try {
      const res = await fetch(`${API.BASE_URL}${API.RESUME}/featured-projects`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featuredProjects: selectedProjects }),
      });
      
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        showToast("success", "Featured projects saved successfully!");
      } else {
        showToast("error", data.message || "Failed to save featured projects");
      }
    } catch (err) {
      console.error("Error saving featured projects:", err);
      showToast("error", "Failed to save featured projects");
    } finally {
      setSaving(false);
    }
  };

  const closeAllForms = () => {
    setShowProfileForm(false);
    setShowExperienceForm(false);
    setShowEducationForm(false);
    setShowSkillForm(false);
    setShowCertificationForm(false);
    setEditingId(null);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "projects", label: "Projects", icon: FolderOpen },
  ];

  return (
    <div className="container mx-auto  space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              MANAGE <span className="text-primary">RESUME</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Edit your profile, work experience, education, skills, and certifications
            </p>
          </div>
        </div>
      </motion.div>

      {/* Error handling is now done via toasts */}

      {/* Not Logged In Notice */}
      {!isAuthenticated && (
        <div className="flex items-center gap-4 p-4 bg-yellow-100 border-2 border-yellow-600 text-yellow-800">
          <AlertCircle className="w-6 h-6" />
          <div className="flex-1">
            <p className="font-bold">You are not logged in</p>
            <p className="text-sm">Log in to edit resume content.</p>
          </div>
          <Link href="/login" className="px-4 py-2 bg-yellow-600 text-white font-bold hover:bg-yellow-700">
            Log In
          </Link>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-foreground pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-2 px-4 py-2 font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            {isAuthenticated && (
              <button
                onClick={openProfileForm}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold hover:bg-primary/90"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
          
          {resume?.profile && (
            <div className="p-6 bg-card border-2 border-foreground">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Name</h3>
                  <p>{resume.profile.name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Title</h3>
                  <p>{resume.profile.title}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold mb-2">Summary</h3>
                  <p className="text-muted-foreground">{resume.profile.summary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Email</h3>
                  <p>{resume.profile.contactInfo?.email || "Not set"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Phone</h3>
                  <p>{resume.profile.contactInfo?.phone || "Not set"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">LinkedIn</h3>
                  <p>{resume.profile.contactInfo?.linkedin || "Not set"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">GitHub</h3>
                  <p>{resume.profile.contactInfo?.github || "Not set"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === "experience" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Work Experience</h2>
            {isAuthenticated && (
              <button
                onClick={() => openExperienceForm()}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            )}
          </div>
          
          {resume?.experience && resume.experience.length > 0 ? (
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp._id} className="p-6 bg-card border-2 border-foreground">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location} | {exp.period}</p>
                      <p className="mt-2">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.map((a, i) => (
                            <li key={i} className="text-sm text-muted-foreground">• {a.description}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {isAuthenticated && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => openExperienceForm(exp)}
                          className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleExperienceDelete(exp._id)}
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No experience added yet.</p>
          )}
        </div>
      )}

      {/* Education Tab */}
      {activeTab === "education" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Education</h2>
            {isAuthenticated && (
              <button
                onClick={() => openEducationForm()}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </button>
            )}
          </div>
          
          {resume?.education && resume.education.length > 0 ? (
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu._id} className="p-6 bg-card border-2 border-foreground">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-primary">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.location} | {edu.period}</p>
                      {edu.details && <p className="mt-2 text-muted-foreground">{edu.details}</p>}
                    </div>
                    {isAuthenticated && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => openEducationForm(edu)}
                          className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEducationDelete(edu._id)}
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No education added yet.</p>
          )}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Skills</h2>
            {isAuthenticated && (
              <button
                onClick={() => openSkillForm()}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Skill Category
              </button>
            )}
          </div>
          
          {resume?.skills && resume.skills.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {resume.skills.map((skill) => (
                <div key={skill._id} className="p-6 bg-card border-2 border-foreground">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{skill.category}</h3>
                    {isAuthenticated && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => openSkillForm(skill)}
                          className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSkillDelete(skill._id)}
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No skills added yet.</p>
          )}
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === "certifications" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Certifications</h2>
            {isAuthenticated && (
              <button
                onClick={() => openCertificationForm()}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Certification
              </button>
            )}
          </div>
          
          {resume?.certifications && resume.certifications.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {resume.certifications.map((cert) => (
                <div key={cert._id} className="p-6 bg-card border-2 border-foreground">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{cert.name}</h3>
                      {cert.issuer && <p className="text-primary">{cert.issuer}</p>}
                      {cert.date && <p className="text-sm text-muted-foreground">{cert.date}</p>}
                    </div>
                    {isAuthenticated && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => openCertificationForm(cert)}
                          className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCertificationDelete(cert._id)}
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No certifications added yet.</p>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <p className="text-muted-foreground">Select which projects to show on the resume page</p>
            </div>
            {isAuthenticated && (
              <button
                onClick={handleSaveFeaturedProjects}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Selection"}
              </button>
            )}
          </div>
          
          {projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div 
                  key={project._id} 
                  className={`p-6 border-2 cursor-pointer transition-all ${
                    selectedProjects.includes(project._id)
                      ? "border-primary bg-primary/10"
                      : "border-foreground bg-card hover:border-primary"
                  }`}
                  onClick={() => isAuthenticated && toggleProjectSelection(project._id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    </div>
                    {selectedProjects.includes(project._id) && (
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                        Selected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No projects available. Add projects first.</p>
          )}
        </div>
      )}

      {/* Profile Form Modal */}
      {showProfileForm && isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border-2 border-foreground p-6 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-black mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Summary</label>
                <textarea
                  value={profileForm.summary}
                  onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={profileForm.contactInfo?.email || ""}
                  onChange={(e) => setProfileForm({ 
                    ...profileForm, 
                    contactInfo: { ...profileForm.contactInfo, email: e.target.value } 
                  })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input
                  type="text"
                  value={profileForm.contactInfo?.phone || ""}
                  onChange={(e) => setProfileForm({ 
                    ...profileForm, 
                    contactInfo: { ...profileForm.contactInfo, phone: e.target.value } 
                  })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">LinkedIn</label>
                <input
                  type="text"
                  value={profileForm.contactInfo?.linkedin || ""}
                  onChange={(e) => setProfileForm({ 
                    ...profileForm, 
                    contactInfo: { ...profileForm.contactInfo, linkedin: e.target.value } 
                  })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">GitHub</label>
                <input
                  type="text"
                  value={profileForm.contactInfo?.github || ""}
                  onChange={(e) => setProfileForm({ 
                    ...profileForm, 
                    contactInfo: { ...profileForm.contactInfo, github: e.target.value } 
                  })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleProfileSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={closeAllForms}
                className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Experience Form Modal */}
      {showExperienceForm && isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border-2 border-foreground p-6 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-black mb-4">{editingId ? "Edit Experience" : "Add Experience"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Period</label>
                <input
                  type="text"
                  value={experienceForm.period}
                  onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  placeholder="e.g., Jan 2023 - Present"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Role</label>
                <input
                  type="text"
                  value={experienceForm.role}
                  onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Company</label>
                <input
                  type="text"
                  value={experienceForm.company}
                  onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Location</label>
                <input
                  type="text"
                  value={experienceForm.location}
                  onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea
                  value={experienceForm.description}
                  onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Achievements (one per line)</label>
                <textarea
                  value={experienceForm.achievements.join("\n")}
                  onChange={(e) => setExperienceForm({ 
                    ...experienceForm, 
                    achievements: e.target.value.split("\n").filter(s => s.trim()) 
                  })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none h-24"
                  placeholder="Achievement 1&#10;Achievement 2"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleExperienceSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={closeAllForms}
                className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Education Form Modal */}
      {showEducationForm && isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border-2 border-foreground p-6 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-black mb-4">{editingId ? "Edit Education" : "Add Education"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Period</label>
                <input
                  type="text"
                  value={educationForm.period}
                  onChange={(e) => setEducationForm({ ...educationForm, period: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  placeholder="e.g., 2017 - 2021"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Degree</label>
                <input
                  type="text"
                  value={educationForm.degree}
                  onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Institution</label>
                <input
                  type="text"
                  value={educationForm.institution}
                  onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Location</label>
                <input
                  type="text"
                  value={educationForm.location}
                  onChange={(e) => setEducationForm({ ...educationForm, location: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Details</label>
                <textarea
                  value={educationForm.details}
                  onChange={(e) => setEducationForm({ ...educationForm, details: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none h-24"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleEducationSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={closeAllForms}
                className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Skills Form Modal */}
      {showSkillForm && isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border-2 border-foreground p-6 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-black mb-4">{editingId ? "Edit Skill Category" : "Add Skill Category"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Category Name</label>
                <input
                  type="text"
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  placeholder="e.g., Frontend Development"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Skills (one per line)</label>
                <textarea
                  value={skillForm.skills.join("\n")}
                  onChange={(e) => setSkillForm({ 
                    ...skillForm, 
                    skills: e.target.value.split("\n").filter(s => s.trim()) 
                  })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none h-32"
                  placeholder="React&#10;Next.js&#10;TypeScript"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSkillSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={closeAllForms}
                className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Certification Form Modal */}
      {showCertificationForm && isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border-2 border-foreground p-6 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-black mb-4">{editingId ? "Edit Certification" : "Add Certification"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Certification Name</label>
                <input
                  type="text"
                  value={certificationForm.name}
                  onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Issuer</label>
                <input
                  type="text"
                  value={certificationForm.issuer}
                  onChange={(e) => setCertificationForm({ ...certificationForm, issuer: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Date</label>
                <input
                  type="text"
                  value={certificationForm.date}
                  onChange={(e) => setCertificationForm({ ...certificationForm, date: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  placeholder="e.g., 2023"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCertificationSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={closeAllForms}
                className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
