import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoaderAlt() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fast counter animation
    const counterInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 100);

    return () => clearInterval(counterInterval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center overflow-hidden"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Top Scan Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute top-2 left-0 right-0 h-0.5 bg-secondary origin-left"
          />

          {/* Bottom Scan Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-accent origin-right"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute bottom-2 left-0 right-0 h-0.5 bg-primary origin-right"
          />

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Large Counter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-[12rem] md:text-[20rem] font-black leading-none text-background tracking-tighter">
                {Math.min(count, 100)}
              </div>
              <motion.div
                className="h-2 w-full bg-background/20 mt-4 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(count, 100)}%` }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <div className="text-2xl md:text-4xl font-black text-primary uppercase tracking-wider">
                {count < 30 && "INITIALIZING"}
                {count >= 30 && count < 60 && "LOADING"}
                {count >= 60 && count < 90 && "PROCESSING"}
                {count >= 90 && "READY"}
              </div>
              
              <div className="flex items-center justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-secondary"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Corner Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-8 left-8 md:top-16 md:left-16 text-background font-mono text-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary animate-pulse"></div>
              <span className="uppercase tracking-wider">SYSTEM BOOT</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-8 right-8 md:top-16 md:right-16 text-background font-mono text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="uppercase tracking-wider">V2.0.26</span>
              <div className="w-2 h-2 bg-secondary animate-pulse"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-8 left-8 md:bottom-16 md:left-16 text-background font-mono text-xs uppercase tracking-wider"
          >
            ARYAN.DEV
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 right-8 md:bottom-16 md:right-16 text-background font-mono text-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent animate-pulse"></div>
              <span className="uppercase tracking-wider">LOADING ASSETS</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
