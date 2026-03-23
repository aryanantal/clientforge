"use client";

import Link from "next/link";
import { Linkedin, Mail, ArrowUpRight, Github, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_INFO, FOOTER_LINKS, ROUTES, SOCIAL_LINKS } from "@/../shared/constants";

export default function Footer() {
const currentYear = new Date().getFullYear();

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  Phone: PhoneCall,
  mail: Mail,
};

return (
  <footer className="bg-foreground text-background border-t-4 border-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* TOP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

        {/* LEFT */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-secondary">
                [ LET&apos;S CONNECT ]
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Got a Project?
                <br />
                <span className="text-secondary">Let&apos;s Talk.</span>
              </h2>
            </div>

            <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="group inline-flex items-center gap-3 text-3xl md:text-4xl font-black hover:text-secondary"
            >
            {CONTACT_INFO.email}
            <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </a>

            {/* SOCIAL */}
            <div className="flex gap-4 pt-4">
{SOCIAL_LINKS.map((item) => {
  const Icon = iconMap[item.icon as keyof typeof iconMap];

  if (!Icon) return null; // ✅ prevent crash

  return (
    <a key={item.label} href={item.href} className="w-14 h-14 border-2 border-background flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
      <Icon size={24} />
    </a>
  );
})}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-12">

            {/* NAVIGATE */}
            <div>
              <h3 className="font-black text-lg mb-6 uppercase">Navigate</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-2 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="font-black text-lg mb-6 uppercase">Resources</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t-2 border-background/20 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="font-black text-2xl">ARYAN</div>
            <div className="text-sm">
              © {currentYear} All rights reserved.
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <Link
              href={ROUTES.PRIVACY}
              className="hover:text-primary font-bold uppercase"
            >
              Privacy
            </Link>

            <Link
              href={ROUTES.TERMS}
              className="hover:text-primary font-bold uppercase"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
  </footer>
);
}