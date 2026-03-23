import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "../../../../shared/constants";

export default function ProjectCTA() {
  return (
    <section className="py-32 bg-primary text-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Ready To See<br />
            <span className="text-secondary">Your Results?</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={`${ROUTES.CONTACT}`}
              className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-background text-foreground font-black text-xl hover:bg-secondary transition-all"
            >
              START A PROJECT
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href={`${ROUTES.SERVICES}`}
              className="inline-flex items-center justify-center gap-3 px-12 py-6 border-4 border-background font-black text-xl hover:bg-background hover:text-foreground transition-all"
            >
              VIEW SERVICES
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}