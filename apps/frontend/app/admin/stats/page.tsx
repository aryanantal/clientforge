"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { API } from "@/../shared/constants/api";

interface Stat {
  _id: string;
  label: string;
  value: string;
  order: number;
  isActive: boolean;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ label: "", value: "", order: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Public endpoint - no auth required for GET
      const res = await fetch(`${API.BASE_URL}${API.STATS}`);
      const data = await res.json();
      setStats(data.success ? data.data : []);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to load stats. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.label || !formData.value) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to add stats");
      return;
    }
    
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API.BASE_URL}${API.STATS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (res.status === 401) {
        setError("Your session has expired. Please log in again.");
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        setStats([...stats, data.data]);
        setShowAddForm(false);
        setFormData({ label: "", value: "", order: 0 });
      } else {
        setError(data.message || "Failed to add stat");
      }
    } catch (err) {
      console.error("Error adding stat:", err);
      setError("Failed to add stat");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.label || !formData.value) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to update stats");
      return;
    }
    
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API.BASE_URL}${API.STATS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (res.status === 401) {
        setError("Your session has expired. Please log in again.");
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        setStats(stats.map((s) => (s._id === id ? data.data : s)));
        setEditingId(null);
        setFormData({ label: "", value: "", order: 0 });
      } else {
        setError(data.message || "Failed to update stat");
      }
    } catch (err) {
      console.error("Error updating stat:", err);
      setError("Failed to update stat");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to delete stats");
      return;
    }
    
    try {
      const res = await fetch(`${API.BASE_URL}${API.STATS}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        setError("Your session has expired. Please log in again.");
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        setStats(stats.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error("Error deleting stat:", err);
      setError("Failed to delete stat");
    }
  };

  const startEdit = (stat: Stat) => {
    setEditingId(stat._id);
    setFormData({ label: stat.label, value: stat.value, order: stat.order });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ label: "", value: "", order: 0 });
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              MANAGE <span className="text-primary">STATS</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Add, edit, or delete statistics displayed on the homepage and about page
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Stat
            </button>
          )}
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-4 p-4 bg-red-100 border-2 border-red-600 text-red-600">
          <AlertCircle className="w-6 h-6" />
          <div className="flex-1">
            <p className="font-bold">{error}</p>
          </div>
          {!isAuthenticated && (
            <Link href="/login" className="px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700">
              Log In
            </Link>
          )}
        </div>
      )}

      {/* Not Logged In Notice */}
      {!isAuthenticated && (
        <div className="flex items-center gap-4 p-4 bg-yellow-100 border-2 border-yellow-600 text-yellow-800">
          <AlertCircle className="w-6 h-6" />
          <div className="flex-1">
            <p className="font-bold">You are not logged in</p>
            <p className="text-sm">Log in to add, edit, or delete stats.</p>
          </div>
          <Link href="/login" className="px-4 py-2 bg-yellow-600 text-white font-bold hover:bg-yellow-700">
            Log In
          </Link>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white border-2 border-foreground"
        >
          <h3 className="text-2xl font-black mb-4">Add New Stat</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Label</label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                placeholder="e.g., Projects Completed"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Value</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                placeholder="e.g., 50+"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80 transition-colors"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
          </div>
        </div>
      ) : stats.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No stats found. Add your first stat!</p>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Stat
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white border-2 border-foreground hover:border-primary transition-colors"
            >
              {editingId === stat._id && isAuthenticated ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Label</label>
                    <input
                      type="text"
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Value</label>
                    <input
                      type="text"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                    />
                  </div>
                  <div className="md:col-span-3 flex gap-4 mt-4">
                    <button
                      onClick={() => handleUpdate(stat._id)}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-5 h-5" />
                      {saving ? "Saving..." : "Update"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80 transition-colors"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-2xl font-black text-primary">{stat.value}</div>
                    <div>
                      <div className="text-lg font-bold">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">Order: {stat.order}</div>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(stat)}
                        className="p-3 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(stat._id)}
                        className="p-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}