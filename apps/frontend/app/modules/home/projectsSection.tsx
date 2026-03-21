"use client";

import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import { motion } from "framer-motion";
import Link from "next/dist/client/link";

export default function ProjectSection() {

const projects = [
{
id: "ecommerce-platform",
title: "E-Commerce Platform Redesign",
category: "E-Commerce",
before: "1.2% conversion",
after: "2.8% conversion",
metric: "+133%",
problem: "Slow checkout, high cart abandonment",
solution: "Rebuilt checkout flow, optimized images, simplified UX",
image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwc2hvcHBpbmd8ZW58MXx8fHwxNzczOTI2NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
tags: ["Next.js", "Performance", "UX"],
},
{
id: "saas-dashboard",
title: "Analytics SaaS Dashboard",
category: "SaaS",
before: "5.2s load time",
after: "1.8s load time",
metric: "-65%",
problem: "Slow performance killing user engagement",
solution: "Code splitting, lazy loading, optimized queries",
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3Mzk3OTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
tags: ["React", "TypeScript", "Real-time"],
},
{
id: "marketing-site",
title: "Marketing Website on HubSpot",
category: "HubSpot CMS",
before: "80 leads/month",
after: "280 leads/month",
metric: "+250%",
problem: "Website not converting traffic to leads",
solution: "HubSpot integration, lead magnets, automation",
image: "https://images.unsplash.com/photo-1764601842171-3d6fba7c3830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzczOTQwMDU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
tags: ["HubSpot", "SEO", "Automation"],
},
{
id: "fintech-app",
title: "FinTech Mobile App",
category: "Mobile",
before: "70% bounce rate",
after: "35% bounce rate",
metric: "-50%",
problem: "Complex onboarding scaring users away",
solution: "Simplified flow, progressive disclosure, instant feedback",
image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBmaW50ZWNofGVufDF8fHx8MTc3Mzk3OTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
tags: ["React Native", "Mobile", "UX"],
},
];

return (
<section className="py-24 md:py-32 bg-background overflow-hidden">
<div className="container mx-auto px-6 lg:px-12 mb-12">
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
>
<div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
    Real Results
</div>
<h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
    Before → After
</h2>
<p className="text-lg text-foreground">
    Client problems turned into measurable wins
</p>
</motion.div>
</div>

{/* Horizontal Scroll Container */}
<div className="relative">
<div className="overflow-x-auto scrollbar-hide horizontal-scroll pb-8">
<div className="flex gap-6 px-6 lg:px-12" style={{ width: 'max-content' }}>
    {projects.map((project, index) => (
    <motion.article
        key={project.id}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: index * 0.1 }}
        className="group bg-white border-4 border-foreground hover:shadow-2xl transition-all w-[400px] md:w-[480px] flex-shrink-0"
    >
        <Link href={`/case-study/${project.id}`}>
        <div className="aspect-[16/10] overflow-hidden bg-muted relative">
            <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 font-black text-2xl">
            {project.metric}
            </div>
        </div>
        
        <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1.5 bg-primary text-background">
                {project.category}
            </span>
            </div>

            <h3 className="text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors">
            {project.title}
            </h3>

            {/* Before / After */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b-2 border-muted">
            <div>
                <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Before</div>
                <div className="font-black text-lg text-foreground">{project.before}</div>
            </div>
            <div>
                <div className="text-xs font-bold uppercase text-primary mb-1">After</div>
                <div className="font-black text-lg text-primary">{project.after}</div>
            </div>
            </div>

            {/* Problem → Solution */}
            <div className="space-y-4 mb-6">
            <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                ❌ Problem
                </div>
                <p className="text-sm font-bold text-foreground">{project.problem}</p>
            </div>
            <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                ✅ Solution
                </div>
                <p className="text-sm font-bold text-foreground">{project.solution}</p>
            </div>
            </div>

            <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
                <span
                key={tag}
                className="text-xs px-3 py-1.5 bg-muted text-foreground font-bold"
                >
                {tag}
                </span>
            ))}
            </div>
        </div>
        </Link>
    </motion.article>
    ))}
</div>
</div>

{/* Scroll hint */}
<div className="text-center mt-6">
<span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
    ← Scroll to see more projects →
</span>
</div>
</div>
</section>
);
}