import { motion } from "framer-motion";
import { Shield, Users, Award, Target, Clock, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Enterprise Clients" },
    { icon: Shield, value: "10M+", label: "Threats Blocked" },
    { icon: Clock, value: "24/7", label: "SOC Operations" },
    { icon: Globe, value: "45+", label: "Countries Served" },
  ];

  const values = [
    {
      icon: Target,
      title: "Proactive Defense",
      description: "We don't wait for threats to strike. Our team actively hunts for vulnerabilities and emerging threats before they can impact your business.",
    },
    {
      icon: Award,
      title: "Industry Excellence",
      description: "Recognized by Gartner, Forrester, and leading cybersecurity organizations for our innovative approach to managed detection and response.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our security analysts bring decades of combined experience from military, government, and Fortune 500 security operations centers.",
    },
  ];


  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Protecting What Matters Most
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Founded in 2018, AllSafe Secure has grown from a small team of passionate security experts 
            to a global leader in managed detection and response services, protecting organizations 
            across every industry.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Story
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AllSafe Secure was born from a simple observation: traditional security tools 
                weren't keeping pace with increasingly sophisticated cyber threats. Our founders, 
                veterans of government intelligence agencies and enterprise security teams, 
                saw organizations struggling with alert fatigue, talent shortages, and 
                fragmented security stacks.
              </p>
              <p>
                We built AllSafe Secure to be different. By combining cutting-edge AI technology 
                with elite human expertise, we created a managed detection and response platform 
                that actually works—detecting threats in minutes, not months, and responding 
                with precision that prevents damage.
              </p>
              <p>
                Today, we protect over 500 enterprises across 45 countries, from fast-growing 
                startups to Fortune 500 companies. Our 24/7 Security Operations Center processes 
                billions of security events daily, turning noise into actionable intelligence.
              </p>
            </div>
          </div>
          <div className="relative">
            {/* Creative Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {/* Animated grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                                    linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
              {/* Glowing orbs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
              <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }} />
              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
            
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-background/50 to-accent/20 p-8 flex items-center justify-center border border-primary/20 relative">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm relative z-10">
                <div className="bg-card/70 backdrop-blur-md rounded-2xl p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="text-4xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="bg-card/70 backdrop-blur-md rounded-2xl p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="text-4xl font-bold text-primary mb-1">&lt;15m</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="bg-card/70 backdrop-blur-md rounded-2xl p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="text-4xl font-bold text-primary mb-1">0</div>
                  <div className="text-sm text-muted-foreground">Breaches (Clients)</div>
                </div>
                <div className="bg-card/70 backdrop-blur-md rounded-2xl p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="text-4xl font-bold text-primary mb-1">ISO</div>
                  <div className="text-sm text-muted-foreground">27001 Certified</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
