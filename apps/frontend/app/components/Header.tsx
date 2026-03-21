"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HEADER_LINKS } from "@/../shared/constants";

export default function Header() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const pathname = usePathname();

// Scroll effect
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Active link
const isActive = (href: string) => {
  if (href === "/" && pathname === "/") return true;
  if (href !== "/" && pathname.startsWith(href)) return true;
  return false;
};

return (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-background shadow-md border-b-2 border-foreground"
        : "bg-background"
    }`}
  >
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="relative group">
          <motion.div
            className="text-foreground text-2xl font-black tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            ARYAN
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-5 py-2.5 font-bold tracking-tight transition-all ${
                isActive(link.href)
                  ? "text-background bg-primary"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-background border-t-2 border-foreground z-40"
          >
            <nav className="flex flex-col py-6 space-y-2">
              {HEADER_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-3 text-xl font-black ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-foreground hover:text-secondary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.header>
);
}