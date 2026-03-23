"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  FolderOpen,
  ArrowRight,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { API } from "@/../shared/constants/api";

interface Stats {
  users: number;
  contacts: number;
  projects: number;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  href,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
  >
    <Link href={href}>
      <div className="h-full p-8 bg-white border-2 border-foreground hover:border-primary transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              {label}
            </p>
            <p className="text-5xl font-black">{value}</p>
          </div>
          <div className="p-4 bg-primary/10 group-hover:bg-primary group-hover:text-primary transition-all">
            <Icon className="w-8 h-8 text-primary group-hover:text-background" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          View Details
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    contacts: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch users count
        const usersRes = await fetch(`${API.BASE_URL}${API.AUTH.USERS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = await usersRes.json();
        const usersCount = usersData.success ? usersData.data.length : 0;

        // Fetch contacts count (you'll need to create this endpoint in backend)
        // For now, we'll estimate it
        // const contactsRes = await fetch(`${API.BASE_URL}/api/contact/all`);
        // const contactsData = await contactsRes.json();

        // Fetch projects count
        const projectsRes = await fetch(`${API.BASE_URL}${API.PROJECTS}`);
        const projectsData = await projectsRes.json();
        const projectsCount = projectsData.success ? projectsData.data.length : 0;

        setStats({
          users: usersCount,
          contacts: 0, // Will be populated when you add the endpoint
          projects: projectsCount,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          ADMIN <span className="text-primary">DASHBOARD</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage users, contacts, and projects from here
        </p>
      </motion.div>

      {/* Stats Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin border-4 border-foreground border-t-primary w-12 h-12 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            label="Total Users"
            value={stats.users}
            icon={Users}
            href="/admin/users"
            delay={0}
          />
          <StatCard
            label="Total Contacts"
            value={stats.contacts}
            icon={MessageSquare}
            href="/admin/contacts"
            delay={0.1}
          />
          <StatCard
            label="Total Projects"
            value={stats.projects}
            icon={FolderOpen}
            href="/admin/projects"
            delay={0.2}
          />
        </div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-3xl font-black mb-6">QUICK ACTIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/users">
            <div className="p-8 bg-white border-2 border-foreground hover:border-primary transition-all cursor-pointer group">
              <h3 className="text-2xl font-black mb-3">Add New User</h3>
              <p className="text-muted-foreground mb-4">
                Create new admin or regular user accounts
              </p>
              <span className="text-primary font-bold flex items-center gap-2">
                Go to Users
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
          <Link href="/admin/contacts">
            <div className="p-8 bg-white border-2 border-foreground hover:border-primary transition-all cursor-pointer group">
              <h3 className="text-2xl font-black mb-3">View Contacts</h3>
              <p className="text-muted-foreground mb-4">
                See all contact form submissions and messages
              </p>
              <span className="text-primary font-bold flex items-center gap-2">
                Go to Contacts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
          <Link href="/admin/stats">
            <div className="p-8 bg-white border-2 border-foreground hover:border-primary transition-all cursor-pointer group">
              <h3 className="text-2xl font-black mb-3">Manage Stats</h3>
              <p className="text-muted-foreground mb-4">
                Add, edit, or delete statistics displayed on homepage and about page
              </p>
              <span className="text-primary font-bold flex items-center gap-2">
                Go to Stats
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
          <Link href="/admin/faq">
            <div className="p-8 bg-white border-2 border-foreground hover:border-primary transition-all cursor-pointer group">
              <h3 className="text-2xl font-black mb-3">Manage FAQs</h3>
              <p className="text-muted-foreground mb-4">
                Add, edit, or delete FAQs displayed on services and contact pages
              </p>
              <span className="text-primary font-bold flex items-center gap-2">
                Go to FAQs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
