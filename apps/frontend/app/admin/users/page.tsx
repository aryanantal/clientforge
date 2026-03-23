"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { API } from "@/../shared/constants/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
}

const roleColors = {
  admin: "bg-red-600",
  user: "bg-blue-600",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API.BASE_URL}${API.AUTH.USERS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingUser) {
        // Update user
        const res = await fetch(
          `${API.BASE_URL}/api/auth/users/${editingUser._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        if (data.success) {
          showToast("User updated successfully!", "success");
          setShowModal(false);
          setEditingUser(null);
          fetchUsers();
        } else {
          showToast(data.message || "Failed to update user", "error");
        }
      } else {
        // Create new user
        const res = await fetch(
          `${API.BASE_URL}${API.AUTH.CREATE_USER}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        if (data.success) {
          showToast("User created successfully!", "success");
          setShowModal(false);
          setFormData({ name: "", email: "", password: "", role: "user" });
          fetchUsers();
        } else {
          showToast(data.message || "Failed to create user", "error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong", "error");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowModal(true);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API.BASE_URL}/api/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        showToast("User deleted successfully!", "success");
        fetchUsers();
      } else {
        showToast(data.message || "Failed to delete user", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong", "error");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "user" });
    setEditingUser(null);
  };

  return (
    <div className="container mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            MANAGE <span className="text-primary">USERS</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Add, edit, and manage user accounts
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-8 py-4 bg-primary text-background font-bold uppercase hover:bg-foreground transition-all flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          Add User
        </motion.button>
      </motion.div>

      {/* Users Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
          </div>
        </div>
      ) : users.length === 0 ? (
        <div className="p-12 bg-white border-2 border-foreground text-center">
          <p className="text-xl font-bold text-muted-foreground">
            No users found. Create the first user!
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full bg-white border-2 border-foreground">
            <thead className="bg-foreground text-background">
              <tr>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Name
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Email
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Role
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Joined
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-foreground">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-background text-xs font-bold uppercase ${
                        roleColors[user.role]
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-background text-xs font-bold uppercase ${
                        user.isActive ? "bg-green-600" : "bg-gray-600"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 bg-blue-600 text-white hover:bg-blue-700 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 bg-red-600 text-white hover:bg-red-700 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-md w-full p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">
                  {editingUser ? "EDIT USER" : "ADD NEW USER"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border-2 border-foreground focus:border-primary focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={!!editingUser}
                    className="w-full px-4 py-3 border-2 border-foreground focus:border-primary focus:outline-none font-bold disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Password {editingUser && "(leave empty to keep current)"}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required={!editingUser}
                    className="w-full px-4 py-3 border-2 border-foreground focus:border-primary focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-foreground focus:border-primary focus:outline-none font-bold"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-3 border-2 border-foreground font-bold uppercase hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-primary text-background font-bold uppercase hover:bg-foreground transition-all"
                  >
                    {editingUser ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
}
