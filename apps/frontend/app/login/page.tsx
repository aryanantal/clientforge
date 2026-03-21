"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "@/../shared/constants/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API.BASE_URL}${API.AUTH.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        showToast("Login successful!", "success");
        
        // Redirect to admin dashboard
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              ADMIN <span className="text-primary">LOGIN</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to your account to access the dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@example.com"
                className="w-full px-6 py-4 bg-white border-2 border-foreground focus:border-primary focus:outline-none text-lg font-bold transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-white border-2 border-foreground focus:border-primary focus:outline-none text-lg font-bold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full px-8 py-6 bg-foreground text-background font-black text-xl hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
              {!loading && (
                <LogIn className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              )}
            </button>
          </form>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Admin access only. Contact your administrator if you don&apos;t have credentials.
          </p>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-8 right-8 p-6 rounded-lg font-bold text-white flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-600"
                : "bg-red-600"
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
