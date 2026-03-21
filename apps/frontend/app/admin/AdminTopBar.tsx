"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface User {
  email: string;
  name: string;
  role: string;
}

export default function AdminTopBar({ user }: { user: User | null }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="relative top-20 left-0 right-0 z-40 bg-foreground text-background border-r-2 border-foreground">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
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
  );
}