import { motion } from "framer-motion";

export default function ProjectHero() {
  return (
    <section className="py-24 md:py-32 border-b-4 border-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <div className="inline-block mb-8 px-5 py-3 bg-foreground text-background font-black uppercase tracking-wider text-sm">
            Portfolio
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-10 text-foreground">
            Selected <span className="text-primary">Projects</span>
          </h1>

<p className="text-xl md:text-2xl text-foreground leading-relaxed max-w-3xl font-bold">
  High-performance{" "}
  <span className="underline decoration-primary decoration-4 underline-offset-8">HubSpot CMS builds</span> and{" "}
  <span className="underline decoration-primary decoration-4 underline-offset-8">Next.js applications</span> — aligned with my resume and client work.
</p>
        </motion.div>
      </div>
    </section>
  );
}