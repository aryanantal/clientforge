"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { API } from "@/../shared/constants/api";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    order: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.FAQS}`);
      const data = await res.json();
      setFaqs(data.success ? data.data : []);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setError("Failed to load FAQs. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.question || !formData.answer) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to add FAQs");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API.BASE_URL}${API.FAQS}`, {
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
        setFaqs([...faqs, data.data]);
        setShowAddForm(false);
        setFormData({ question: "", answer: "", category: "general", order: 0 });
      } else {
        setError(data.message || "Failed to add FAQ");
      }
    } catch (err) {
      console.error("Error adding FAQ:", err);
      setError("Failed to add FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.question || !formData.answer) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to update FAQs");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API.BASE_URL}${API.FAQS}/${id}`, {
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
        setFaqs(faqs.map((f) => (f._id === id ? data.data : f)));
        setEditingId(null);
        setFormData({ question: "", answer: "", category: "general", order: 0 });
      } else {
        setError(data.message || "Failed to update FAQ");
      }
    } catch (err) {
      console.error("Error updating FAQ:", err);
      setError("Failed to update FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to delete FAQs");
      return;
    }

    try {
      const res = await fetch(`${API.BASE_URL}${API.FAQS}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        setError("Your session has expired. Please log in again.");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setFaqs(faqs.filter((f) => f._id !== id));
      }
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      setError("Failed to delete FAQ");
    }
  };

  const startEdit = (faq: FAQ) => {
    setEditingId(faq._id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ question: "", answer: "", category: "general", order: 0 });
    setError(null);
  };

  // Filter categories
  const categories = ["general", "services", "contact"];

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
              MANAGE <span className="text-primary">FAQS</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Add, edit, or delete FAQs displayed on services and contact pages
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add FAQ
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
            <p className="text-sm">Log in to add, edit, or delete FAQs.</p>
          </div>
          <Link href="/login" className="px-4 py-2 bg-yellow-600 text-white font-bold hover:bg-yellow-700">
            Log In
          </Link>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingId) && isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border-2 border-foreground p-6"
          >
            <h3 className="text-2xl font-black mb-4">
              {editingId ? "Edit FAQ" : "Add New FAQ"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Question</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                  placeholder="e.g., What services do you offer?"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Answer</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full p-3 border-2 border-foreground focus:border-primary outline-none min-h-[100px]"
                  placeholder="Enter the answer to the question"
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
            <div className="flex gap-4 mt-6">
              {editingId ? (
                <button
                  onClick={() => handleUpdate(editingId)}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Updating..." : "Update"}
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Saving..." : "Save"}
                </button>
              )}
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-bold hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* FAQs List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
          </div>
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No FAQs found. Add your first FAQ!</p>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add FAQ
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white border-2 border-foreground hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold">
                      {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">Order: {faq.order}</span>
                  </div>
                  <div className="text-lg font-bold mb-2">{faq.question}</div>
                  <div className="text-muted-foreground">{faq.answer}</div>
                </div>
                {isAuthenticated && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => startEdit(faq)}
                      className="p-3 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="p-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}