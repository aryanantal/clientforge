"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { API } from "@/../shared/constants/api";

interface Contact {
  _id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
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

  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Since the backend endpoint for fetching all contacts doesn't exist yet,
      // we'll create a temporary solution
      const res = await fetch(`${API.BASE_URL}/api/contact/all`, {
        headers: token ? {
          Authorization: `Bearer ${token}`,
        } : {},
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setContacts(data.data);
        }
      } else {
        // Fallback - show message that endpoint needs to be created
        showToast("Contacts endpoint needs to be created in backend", "error");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      // Don't show error for now as the endpoint doesn't exist yet
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API.BASE_URL}/api/contact/${contactId}`, {
        method: "DELETE",
        headers: token ? {
          Authorization: `Bearer ${token}`,
        } : {},
      });

      const data = await res.json();
      if (data.success) {
        showToast("Contact deleted successfully!", "success");
        fetchContacts();
      } else {
        showToast(data.message || "Failed to delete contact", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div className="container mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          CONTACT <span className="text-primary">SUBMISSIONS</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          View and manage all contact form submissions
        </p>
      </motion.div>

      {/* Contacts Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="p-12 bg-white border-2 border-foreground text-center">
          <p className="text-xl font-bold text-muted-foreground">
            No contact submissions yet
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white border-2 border-foreground hover:border-primary transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-black">{contact.name}</h3>
                  <p className="text-primary font-bold">{contact.email}</p>
                  {contact.company && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {contact.company}
                    </p>
                  )}
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  {new Date(contact.createdAt).toLocaleDateString()}
                  <br />
                  {new Date(contact.createdAt).toLocaleTimeString()}
                </div>
              </div>

              <div className="mb-4 p-4 bg-gray-50 border-l-4 border-primary">
                <p className="text-foreground font-bold whitespace-pre-wrap break-words">
                  {contact.message}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(contact._id)}
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
