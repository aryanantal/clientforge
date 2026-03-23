"use client";

import { useRouter } from "next/navigation";
import { LogOut, X, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function AdminTopBar({ user }: { user: User | null }) {
  const router = useRouter();
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    // Listen for toast events from localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "adminToast") {
        const data = e.newValue;
        if (data) {
          try {
            const toastData = JSON.parse(data);
            setToast(toastData);
            // Auto-remove after 3 seconds
            setTimeout(() => setToast(null), 3000);
            // Clear from localStorage
            localStorage.removeItem("adminToast");
          } catch (err) {
            console.error("Error parsing toast:", err);
          }
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Also check for toast on mount (for same-page navigation)
  useEffect(() => {
    const checkStoredToast = () => {
      const storedToast = localStorage.getItem("adminToast");
      if (storedToast) {
        try {
          const toastData = JSON.parse(storedToast);
          // Use requestAnimationFrame to defer the state update
          requestAnimationFrame(() => {
            setToast(toastData);
            setTimeout(() => setToast(null), 3000);
          });
          localStorage.removeItem("adminToast");
        } catch (err) {
          console.error("Error parsing toast:", err);
        }
      }
    };
    
    // Defer the check to the next tick
    requestAnimationFrame(checkStoredToast);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const dismissToast = () => setToast(null);

  return (
    <div className="relative">
      {/* Toast Notification - Positioned above the header */}
      {toast && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
          <div 
            className={`pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg border-2 ${
              toast.type === "success" 
                ? "bg-green-100 border-green-600 text-green-800" 
                : "bg-red-100 border-red-600 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-bold">{toast.message}</span>
            <button 
              onClick={dismissToast}
              className="ml-2 hover:opacity-70"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="relative top-20 left-0 right-0 z-40 bg-foreground text-background border-r-2 border-foreground">
        <div className="container mx-auto  px-6 py-4 flex items-center justify-between">
          
          {/* LEFT - USER INFO */}
          {user && (
            <div>
              <p className="text-sm ">Logged in as</p>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-xs ">{user.email}</p>
            </div>
          )}

          {/* RIGHT - LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to show toast from anywhere
export function showToast(type: "success" | "error", message: string) {
  const toast = { id: Date.now().toString(), type, message };
  localStorage.setItem("adminToast", JSON.stringify(toast));
  // Dispatch event for same-page handling
  window.dispatchEvent(new StorageEvent("storage", {
    key: "adminToast",
    newValue: JSON.stringify(toast)
  }));
}
