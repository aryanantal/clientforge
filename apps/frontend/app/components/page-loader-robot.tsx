import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, Code2 } from "lucide-react";

export default function PageLoaderRobot({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

useEffect(() => {
  const startTime = Date.now();
  const MIN_DURATION = 3500; // 🔥 2.5 seconds minimum

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;

    setProgress((prev) => {
      // Smooth controlled increment
      let next = prev + 2; // 👈 slower speed

      if (next >= 100) next = 100;

      // ✅ Only finish when BOTH conditions met
      if (next === 100 && elapsed >= MIN_DURATION) {
        clearInterval(interval);

        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 400);

        return 100;
      }

      return next;
    });
  }, 40); // 👈 smooth animation

  return () => clearInterval(interval);
}, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-muted flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <motion.div
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, 
                  transparent, 
                  transparent 10px, 
                  rgba(0,0,0,0.03) 10px, 
                  rgba(0,0,0,0.03) 20px
                )
              `,
              backgroundSize: '200% 200%'
            }}
          />

          {/* Corner Brackets - Animated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="absolute top-12 left-12 md:top-20 md:left-20 w-16 h-16 md:w-24 md:h-24"
          >
            <motion.div
              animate={{ rotate: [0, 90, 90, 0] }}
              transition={{ duration: 2, repeat: Infinity, times: [0, 0.25, 0.75, 1] }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="absolute top-12 right-12 md:top-20 md:right-20 w-16 h-16 md:w-24 md:h-24"
          >
            <motion.div
              animate={{ rotate: [0, -90, -90, 0] }}
              transition={{ duration: 2, repeat: Infinity, times: [0, 0.25, 0.75, 1] }}
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-secondary"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-secondary"></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-12 left-12 md:bottom-20 md:left-20 w-16 h-16 md:w-24 md:h-24"
          >
            <motion.div
              animate={{ rotate: [0, 90, 90, 0] }}
              transition={{ duration: 2, repeat: Infinity, times: [0, 0.25, 0.75, 1] }}
            >
              <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"></div>
              <div className="absolute bottom-0 left-0 w-1 h-full bg-accent"></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="absolute bottom-12 right-12 md:bottom-20 md:right-20 w-16 h-16 md:w-24 md:h-24"
          >
            <motion.div
              animate={{ rotate: [0, -90, -90, 0] }}
              transition={{ duration: 2, repeat: Infinity, times: [0, 0.25, 0.75, 1] }}
            >
              <div className="absolute bottom-0 right-0 w-full h-1 bg-primary"></div>
              <div className="absolute bottom-0 right-0 w-1 h-full bg-primary"></div>
            </motion.div>
          </motion.div>

          {/* Robot Character */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              {/* Robot Body */}
              <div className="relative inline-block">
                {/* Head */}
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="w-32 h-32 bg-foreground border-4 border-foreground relative mx-auto mb-2">
                    {/* Eyes */}
                    <motion.div
                      animate={{ 
                        scaleY: [1, 0.1, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="absolute top-8 left-6 flex gap-8"
                    >
                      <div className="w-6 h-6 bg-secondary"></div>
                      <div className="w-6 h-6 bg-secondary"></div>
                    </motion.div>
                    
                    {/* Mouth - Animated */}
                    <motion.div
                      animate={{ 
                        scaleX: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-primary"></div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Antenna */}
                  <motion.div
                    animate={{ 
                      rotate: [-10, 10, -10],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-foreground"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                  </motion.div>
                </motion.div>

                {/* Body */}
                <div className="w-40 h-32 bg-foreground border-4 border-foreground mx-auto">
                  <div className="flex items-center justify-center h-full">
                    <Terminal className="w-12 h-12 text-background" />
                  </div>
                </div>

                {/* Arms */}
                <div className="absolute top-36 -left-12 w-10 h-20 bg-foreground border-4 border-foreground">
                  <motion.div
                    animate={{ rotate: [0, 180, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Code2 className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>
                <div className="absolute top-36 -right-12 w-10 h-20 bg-foreground border-4 border-foreground">
                  <motion.div
                    animate={{ rotate: [0, -180, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Code2 className="w-6 h-6 text-secondary" />
                  </motion.div>
                </div>

                {/* Legs */}
                <div className="flex justify-center gap-8 mt-2">
                  <motion.div
                    animate={{ scaleY: [1, 0.9, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="w-12 h-16 bg-foreground border-4 border-foreground"
                  />
                  <motion.div
                    animate={{ scaleY: [1, 0.9, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.25 }}
                    className="w-12 h-16 bg-foreground border-4 border-foreground"
                  />
                </div>
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mt-12"
            >
              <div className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {progress < 30 && "BOOTING UP..."}
                  {progress >= 30 && progress < 60 && "LOADING..."}
                  {progress >= 60 && progress < 90 && "ALMOST THERE..."}
                  {progress >= 90 && "READY!"}
                </motion.span>
              </div>

              {/* Progress Bar */}
              <div className="w-80 max-w-full mx-auto px-4">
                <div className="h-3 bg-white border-2 border-foreground overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="mt-2 text-sm font-bold uppercase tracking-wider text-foreground">
                  {Math.round(Math.min(progress, 100))}%
                </div>
              </div>

              {/* Status Dots */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-foreground"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
