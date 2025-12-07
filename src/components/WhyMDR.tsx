import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, Shield, Target, Layers } from "lucide-react";

const WhyMDR = () => {
  const reasons = [
    {
      icon: TrendingUp,
      title: "Reduce Risk by 90%",
      description: "Organizations using MDR experience significantly fewer successful breaches.",
    },
    {
      icon: Users,
      title: "Expert Security Team",
      description: "Access a full SOC team without the cost of hiring in-house specialists.",
    },
    {
      icon: Clock,
      title: "24/7 Coverage",
      description: "Threats don't wait for business hours. Neither do we.",
    },
    {
      icon: Target,
      title: "Proactive Defense",
      description: "We hunt threats before they can cause damage to your business.",
    },
    {
      icon: Shield,
      title: "Advanced Technology",
      description: "Enterprise-grade tools and AI-powered threat detection.",
    },
    {
      icon: Layers,
      title: "Scalable Solution",
      description: "Grows with your business from 50 to 50,000+ endpoints.",
    },
  ];

  return (
    <section id="why-mdr" className="py-20 lg:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Why Choose MDR
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Stop Breaches Before They Start
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Traditional security tools catch less than 50% of threats. Our MDR service combines advanced technology with human expertise to detect and respond to threats in real-time.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg glass">
                <div className="text-4xl font-bold text-primary">287</div>
                <div>
                  <div className="font-semibold text-foreground">Days Average</div>
                  <div className="text-sm text-muted-foreground">Time to detect a breach without MDR</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg glass border-glow">
                <div className="text-4xl font-bold text-success">&lt;1</div>
                <div>
                  <div className="font-semibold text-foreground">Hour Average</div>
                  <div className="text-sm text-muted-foreground">Time to detect with AllSafesecure MDR</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 rounded-xl glass hover:border-glow transition-all duration-300"
              >
                <reason.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1 text-sm">{reason.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMDR;