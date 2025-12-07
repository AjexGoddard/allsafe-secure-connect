import { Shield, Lock, Eye, Radar, Fingerprint, Server } from "lucide-react";
import { motion } from "framer-motion";

const FloatingElements = () => {
  const elements = [
    { Icon: Shield, delay: 0, x: "85%", y: "15%" },
    { Icon: Lock, delay: 0.5, x: "90%", y: "40%" },
    { Icon: Eye, delay: 1, x: "80%", y: "65%" },
    { Icon: Radar, delay: 1.5, x: "75%", y: "25%" },
    { Icon: Fingerprint, delay: 2, x: "88%", y: "55%" },
    { Icon: Server, delay: 2.5, x: "70%", y: "45%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Central Shield Graphic */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          {/* Outer Ring */}
          <div className="w-72 h-72 rounded-full border border-primary/30 animate-rotate-slow" />
          
          {/* Middle Ring */}
          <div className="absolute inset-4 rounded-full border border-primary/20 animate-pulse-glow" />
          
          {/* Inner Circle */}
          <div className="absolute inset-8 rounded-full bg-primary/5 border border-primary/40 flex items-center justify-center">
            <Shield className="w-20 h-20 text-primary/80" />
          </div>
          
          {/* Dots on Ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
            <div
              key={rotation}
              className="absolute w-2 h-2 bg-primary rounded-full animate-pulse-glow"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${rotation}deg) translateX(140px) translateY(-50%)`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating Icons */}
      {elements.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay }}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
        >
          <div className="animate-float p-3 rounded-xl glass border-glow" style={{ animationDelay: `${delay}s` }}>
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;