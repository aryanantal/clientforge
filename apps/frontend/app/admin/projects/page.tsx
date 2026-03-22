"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit2, Plus } from "lucide-react";
import { API } from "@/../shared/constants/api";
import { TAGS } from "@/../shared/constants/tags";

interface Project {
  _id: string;
  id: number;
  slug: string;
  title: string;
  category: string;
  before: string;
  after: string;
  metric: string;
  problem: string;
  solution: string;
  images: string[];
  image?: string;
  tags: string[];
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    slug: "",
    title: "",
    category: "",
    before: "",
    after: "",
    metric: "",
    problem: "",
    solution: "",
    image: "",
    images: [] as string[],
    tags: [] as string[],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);
  const [imageMetadata, setImageMetadata] = useState<{ size: string; type: string }[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 100);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      slug: "",
      title: "",
      category: "",
      before: "",
      after: "",
      metric: "",
      problem: "",
      solution: "",
      image: "",
      images: [],
      tags: [],
    });
    setImageFiles([]);
    setImagePreviews([]);
    setImageErrors([]);
    setImageMetadata([]);
    setTagSearch("");
    setEditingProject(null);
  };

  const handleAddProject = () => {
    resetForm();
    setShowForm(true);
  };

  const handleTitleChange = (newTitle: string) => {
    const slug = generateSlug(newTitle);
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug,
      id: prev.id || Date.now(),
    }));
  };

  const handleEditProject = (project: Project) => {
    const projectImages = project.images || [];
    const absoluteImages = projectImages.map((img) =>
      img.startsWith("http") ? img : `${API.BASE_URL}${img}`
    );

    setFormData({
      id: project.id,
      slug: project.slug || generateSlug(project.title),
      title: project.title,
      category: project.category,
      before: project.before,
      after: project.after,
      metric: project.metric,
      problem: project.problem,
      solution: project.solution,
      image: projectImages[0] || "",
      images: projectImages,
      tags: project.tags,
    });
    setImageFiles([]);
    setImagePreviews(absoluteImages);
    setImageErrors(absoluteImages.map(() => false));
    setImageMetadata(absoluteImages.map((img, i) => ({
      size: "",
      type: projectImages[i]?.split(".").pop() || "IMG",
    })));
    setTagSearch("");
    setEditingProject(project);
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    
    const newMetadata: { size: string; type: string }[] = [];
    const newErrors: boolean[] = [];
    
    // Create previews and metadata
    files.forEach((file) => {
      newMetadata.push({
        size: formatFileSize(file.size),
        type: file.type || "image/unknown",
      });
      newErrors.push(false);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    
    setImageMetadata((prev) => [...prev, ...newMetadata]);
    setImageErrors((prev) => [...prev, ...newErrors]);
  };

  const removeImagePreview = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImageErrors((prev) => prev.filter((_, i) => i !== index));
    setImageMetadata((prev) => prev.filter((_, i) => i !== index));
    // If all images removed, clear the current image
    if (imagePreviews.length === 1) {
      setFormData(prev => ({ ...prev, image: "" }));
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const filteredTags = TAGS.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const url = editingProject 
        ? `${API.BASE_URL}${API.PROJECTS}/${editingProject._id}`
        : `${API.BASE_URL}${API.PROJECTS}`;
      const method = editingProject ? "PUT" : "POST";

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tags' || key === 'images') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value as string);
        }
      });
      
      // Image files for upload (new files only)
      imageFiles.forEach((file) => {
        formDataToSend.append('image', file);
      });

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
        showToast(
          editingProject ? "Project updated successfully!" : "Project created successfully!",
          "success"
        );
        fetchProjects();
        setShowForm(false);
        resetForm();
      } else {
        showToast(data.message || "Failed to save project", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong", "error");
    }
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tags: checked 
        ? [...prev.tags, tag]
        : prev.tags.filter(t => t !== tag)
    }));
  };

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API.BASE_URL}${API.PROJECTS}`);
      const data = await res.json();

      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      showToast("Failed to fetch projects", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API.BASE_URL}${API.PROJECTS}/${projectId}`, {
        method: "DELETE",
        headers: token ? {
          Authorization: `Bearer ${token}`,
        } : {},
      });

      const data = await res.json();
      if (data.success) {
        showToast("Project deleted successfully!", "success");
        fetchProjects();
      } else {
        showToast(data.message || "Failed to delete project", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            MANAGE <span className="text-primary">PROJECTS</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            View and manage your portfolio projects
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddProject}
          className="px-8 py-4 bg-primary text-background font-bold uppercase hover:bg-foreground transition-all flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </motion.button>
      </motion.div>

      {/* Projects Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 bg-white border-2 border-foreground text-center">
          <p className="text-xl font-bold text-muted-foreground">
            No projects found. Add your first project!
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white border-2 border-foreground hover:border-primary transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-2">
                    Category: {project.category}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Before: {project.before} → After: {project.after} ({project.metric})
                  </p>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Problem: {project.problem}
                  </p>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Solution: {project.solution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary text-background text-xs font-bold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground ml-4">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => handleEditProject(project)}
                  className="p-3 bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold uppercase text-sm flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-3 bg-red-600 text-white hover:bg-red-700 transition-all font-bold uppercase text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white border-2 border-foreground w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b-2 border-foreground p-6">
              <h2 className="text-3xl font-black">
                {editingProject ? "EDIT PROJECT" : "ADD NEW PROJECT"}
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              {/* Hidden auto-generated fields */}
              <input type="hidden" name="id" value={formData.id} />
              <input type="hidden" name="slug" value={formData.slug} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold uppercase mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Before</label>
                  <input
                    type="text"
                    value={formData.before}
                    onChange={(e) => setFormData({ ...formData, before: e.target.value })}
                    className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">After</label>
                  <input
                    type="text"
                    value={formData.after}
                    onChange={(e) => setFormData({ ...formData, after: e.target.value })}
                    className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Metric</label>
                  <input
                    type="text"
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">Problem</label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">Solution</label>
                <textarea
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  required={!editingProject && imagePreviews.length === 0}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: JPEG, PNG, WebP, GIF, SVG (Max 5 images per project)
                </p>

                {imagePreviews.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-bold uppercase mb-3">Image Preview</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          {imageErrors[index] ? (
                            <div className="w-full h-32 border-2 border-red-500 bg-red-50 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-3xl mb-1">⚠️</div>
                                <p className="text-xs text-red-600 font-bold">Error Loading</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              {preview && (
                                <img
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-32 object-cover border-2 border-foreground"
                                  onError={() => handleImageError(index)}
                                />
                              )}
                            </>
                          )}
                          <div className="bg-gray-100 border-b-2 border-foreground p-1.5 text-xs">
                            <p className="font-bold truncate">{imageMetadata[index]?.type?.split("/")?.[1]?.toUpperCase() || "IMG"}</p>
                            <p className="text-gray-600">{imageMetadata[index]?.size}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImagePreview(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none mb-3"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto border-2 border-foreground p-3">
                  {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                      <label key={tag} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.tags.includes(tag)}
                          onChange={(e) => handleTagChange(tag, e.target.checked)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))
                  ) : (
                    <p className="col-span-full text-sm text-muted-foreground">
                      No tags found
                    </p>
                  )}
                </div>
                {formData.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary text-background text-xs font-bold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t-2 border-foreground p-4 flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-600 text-white hover:bg-gray-700 transition-all font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-background hover:bg-foreground transition-all font-bold uppercase"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className={`fixed top-32 left-1/2 -translate-x-1/2 p-6 rounded-lg font-bold text-white flex items-center gap-3 z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <span className="text-2xl">✓</span>
          ) : (
            <span className="text-2xl">✕</span>
          )}
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}
