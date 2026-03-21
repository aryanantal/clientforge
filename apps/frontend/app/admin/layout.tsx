"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminTopBar from "./AdminTopBar";

interface User {
  email: string;
  name: string;
  role: string;
  _id: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="min-h-screen">
      {/* ✅ NEW TOP BAR */}
      <AdminTopBar user={user} />

      <main className="relative pt-32 pb-20 md:pt-36 md:pb-24 px-6 md:px-10">
        {children}
      </main>
    </div>
  );
}