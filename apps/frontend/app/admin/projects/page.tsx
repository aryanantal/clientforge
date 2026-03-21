"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit2, Plus } from "lucide-react";
import { API } from "@/../shared/constants/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
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
                  <p className="text-muted-foreground mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary text-background text-xs font-bold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground ml-4">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button className="p-3 bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold uppercase text-sm flex items-center gap-2">
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

      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className={`fixed bottom-8 right-8 p-6 rounded-lg font-bold text-white flex items-center gap-3 ${
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
