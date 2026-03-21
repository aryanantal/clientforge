import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, Zap, Sparkles } from "lucide-react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Corner Brackets - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-8 left-8 md:top-16 md:left-16"
          >
            <div className="flex flex-col gap-2">
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-1 h-16 bg-primary"></div>
            </div>
          </motion.div>

          {/* Corner Brackets - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-8 right-8 md:top-16 md:right-16"
          >
            <div className="flex flex-col items-end gap-2">
              <div className="w-16 h-1 bg-secondary"></div>
              <div className="w-1 h-16 bg-secondary self-end"></div>
            </div>
          </motion.div>

          {/* Corner Brackets - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute bottom-8 left-8 md:bottom-16 md:left-16"
          >
            <div className="flex flex-col gap-2">
              <div className="w-1 h-16 bg-accent"></div>
              <div className="w-16 h-1 bg-accent"></div>
            </div>
          </motion.div>

          {/* Corner Brackets - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute bottom-8 right-8 md:bottom-16 md:right-16"
          >
            <div className="flex flex-col items-end gap-2">
              <div className="w-1 h-16 bg-primary self-end"></div>
              <div className="w-16 h-1 bg-primary"></div>
            </div>
          </motion.div>

          {/* Center Content */}
          <div className="relative z-10 text-center">
            {/* Animated Icons */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              {/* Background Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent rounded-full"
              />

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-foreground flex items-center justify-center">
                    <Code2 className="w-10 h-10 text-background" />
                  </div>
                  
                  {/* Floating Sparkles */}
                  <motion.div
                    animate={{ 
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [10, -10, 10],
                      x: [5, -5, 5],
                      rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute -bottom-2 -left-2"
                  >
                    <Zap className="w-6 h-6 text-secondary" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-primary"
                >
                  LOADING
                </motion.span>
              </h2>
              
              {/* Progress Bar */}
              <div className="w-64 mx-auto">
                <div className="h-2 bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-3 text-sm font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {Math.round(Math.min(progress, 100))}%
                </motion.div>
              </div>

              {/* Loading Messages */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-6"
              >
                {progress < 30 && "INITIALIZING..."}
                {progress >= 30 && progress < 60 && "LOADING ASSETS..."}
                {progress >= 60 && progress < 90 && "ALMOST THERE..."}
                {progress >= 90 && "READY!"}
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
