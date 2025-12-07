import { motion } from "framer-motion";
import { Shield, Eye, Radar, AlertTriangle, Server, Lock, Clock, Zap, FileSearch } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Eye,
      title: "24/7 Threat Monitoring",
      description: "Continuous surveillance of your entire network by our expert SOC analysts.",
    },
    {
      icon: Radar,
      title: "Threat Hunting",
      description: "Proactive search for hidden threats that evade traditional security tools.",
    },
    {
      icon: AlertTriangle,
      title: "Incident Response",
      description: "Rapid containment and remediation when threats are detected.",
    },
    {
      icon: Shield,
      title: "Endpoint Protection",
      description: "Advanced EDR deployment and management across all endpoints.",
    },
    {
      icon: Server,
      title: "SIEM Management",
      description: "Full management of security information and event monitoring systems.",
    },
    {
      icon: Lock,
      title: "Vulnerability Management",
      description: "Continuous assessment and prioritization of security vulnerabilities.",
    },
    {
      icon: FileSearch,
      title: "Forensic Analysis",
      description: "Deep-dive investigation and root cause analysis of security incidents.",
    },
    {
      icon: Clock,
      title: "Compliance Support",
      description: "Meet regulatory requirements with comprehensive security documentation.",
    },
    {
      icon: Zap,
      title: "Threat Intelligence",
      description: "Real-time feeds and analysis of emerging threats targeting your industry.",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive MDR Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Full-spectrum security operations designed to protect your organization from modern cyber threats.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl glass hover:border-glow transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;