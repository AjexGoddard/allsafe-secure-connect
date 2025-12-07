import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";
import LeadForm from "./LeadForm";
import FloatingElements from "./FloatingElements";

const Hero = () => {
  const features = [
    "24/7 Threat Monitoring",
    "Rapid Incident Response",
    "Advanced Threat Intelligence",
    "Endpoint Protection",
  ];

  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow mb-6"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Enterprise MDR Security</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-foreground">Protect Your Business</span>
              <br />
              <span className="text-gradient">with 24/7 MDR</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-lg">
              Enterprise-grade Managed Detection and Response services. Stop threats before they impact your business with our expert security team.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 lg:gap-8 pt-6 border-t border-border">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Protected Clients</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary">99.9%</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Threat Detection</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary">&lt;15min</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Response Time</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <div className="relative z-10 lg:pl-8">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;