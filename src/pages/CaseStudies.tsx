import { motion } from "framer-motion";
import { ArrowLeft, Shield, TrendingUp, Clock, Users, Building2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const caseStudies = [
  {
    id: 1,
    company: "TechCorp Global",
    industry: "Technology",
    logo: Building2,
    challenge: "Faced sophisticated ransomware attacks targeting their cloud infrastructure with 500+ endpoints across 12 countries.",
    solution: "Deployed 24/7 MDR with AI-powered threat detection and automated response protocols.",
    results: [
      { metric: "99.8%", label: "Threat Detection Rate" },
      { metric: "< 5 min", label: "Average Response Time" },
      { metric: "Zero", label: "Successful Breaches" },
    ],
    quote: "AllSafeSecure transformed our security posture. Their MDR team detected and neutralized threats we didn't even know existed.",
    author: "Sarah Chen",
    role: "CISO, TechCorp Global",
    tags: ["Ransomware Protection", "Cloud Security", "24/7 Monitoring"],
  },
  {
    id: 2,
    company: "HealthFirst Medical",
    industry: "Healthcare",
    logo: Users,
    challenge: "Needed HIPAA-compliant security for 2,000+ medical devices and patient data protection across 50 facilities.",
    solution: "Implemented comprehensive MDR with specialized healthcare threat intelligence and compliance reporting.",
    results: [
      { metric: "100%", label: "HIPAA Compliance" },
      { metric: "85%", label: "Reduction in Alerts" },
      { metric: "$2.5M", label: "Saved in Potential Breaches" },
    ],
    quote: "Patient data security is non-negotiable. AllSafeSecure gave us peace of mind with their specialized healthcare expertise.",
    author: "Dr. Michael Roberts",
    role: "CTO, HealthFirst Medical",
    tags: ["HIPAA Compliance", "Medical Devices", "Data Protection"],
  },
  {
    id: 3,
    company: "Global Finance Corp",
    industry: "Financial Services",
    logo: TrendingUp,
    challenge: "Experienced targeted APT attacks attempting to compromise trading systems and customer financial data.",
    solution: "Deployed advanced threat hunting with real-time transaction monitoring and behavioral analytics.",
    results: [
      { metric: "12", label: "APT Groups Blocked" },
      { metric: "< 2 min", label: "Incident Response" },
      { metric: "$50M+", label: "Assets Protected Daily" },
    ],
    quote: "The threat landscape in finance is brutal. AllSafeSecure's proactive hunting has stopped attacks before they even started.",
    author: "James Morrison",
    role: "Head of Security, Global Finance Corp",
    tags: ["APT Defense", "Financial Security", "Threat Hunting"],
  },
  {
    id: 4,
    company: "RetailMax International",
    industry: "Retail",
    logo: Globe,
    challenge: "POS systems across 300+ stores were vulnerable to card skimming and supply chain attacks.",
    solution: "Integrated MDR with POS-specific threat detection and vendor risk monitoring across all locations.",
    results: [
      { metric: "300+", label: "Stores Protected" },
      { metric: "Zero", label: "Card Data Breaches" },
      { metric: "40%", label: "Cost Reduction" },
    ],
    quote: "From single-store incidents to enterprise-wide protection, AllSafeSecure scaled with our growth seamlessly.",
    author: "Linda Park",
    role: "VP of IT, RetailMax International",
    tags: ["POS Security", "Supply Chain", "Retail Protection"],
  },
  {
    id: 5,
    company: "EduTech Academy",
    industry: "Education",
    logo: Users,
    challenge: "Remote learning expansion created 10,000+ new attack vectors with student and faculty devices.",
    solution: "Deployed lightweight MDR agents with student-friendly security policies and 24/7 monitoring.",
    results: [
      { metric: "10K+", label: "Endpoints Secured" },
      { metric: "99.9%", label: "Uptime Maintained" },
      { metric: "15K", label: "Threats Blocked Monthly" },
    ],
    quote: "Education shouldn't be disrupted by cyber threats. AllSafeSecure keeps our digital campus safe for everyone.",
    author: "Prof. David Kim",
    role: "Director of Technology, EduTech Academy",
    tags: ["Education Security", "Remote Learning", "Endpoint Protection"],
  },
  {
    id: 6,
    company: "ManufacturePro Industries",
    industry: "Manufacturing",
    logo: Building2,
    challenge: "OT/IT convergence exposed critical manufacturing systems to nation-state level threats.",
    solution: "Specialized OT security monitoring with air-gapped backup systems and industrial protocol protection.",
    results: [
      { metric: "Zero", label: "Production Downtime" },
      { metric: "100%", label: "OT Visibility" },
      { metric: "3", label: "Nation-State Attacks Stopped" },
    ],
    quote: "Our production lines can't afford downtime. AllSafeSecure understands manufacturing and protects what matters most.",
    author: "Robert Zhang",
    role: "Plant Director, ManufacturePro Industries",
    tags: ["OT Security", "Industrial Protection", "Critical Infrastructure"],
  },
  {
    id: 7,
    company: "CloudFirst SaaS",
    industry: "Software",
    logo: Shield,
    challenge: "Multi-tenant SaaS platform required isolation between customer environments while maintaining visibility.",
    solution: "Custom MDR deployment with tenant-aware monitoring and automated incident isolation protocols.",
    results: [
      { metric: "500+", label: "Tenants Protected" },
      { metric: "< 30 sec", label: "Threat Isolation" },
      { metric: "SOC 2", label: "Compliance Achieved" },
    ],
    quote: "Our customers trust us with their data. AllSafeSecure helps us maintain that trust with enterprise-grade security.",
    author: "Emily Watson",
    role: "CEO, CloudFirst SaaS",
    tags: ["SaaS Security", "Multi-Tenant", "SOC 2 Compliance"],
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-6 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Badge variant="secondary" className="mb-4">
              Success Stories
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Client <span className="text-primary">Case Studies</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover how organizations across industries have transformed their security 
              posture with AllSafeSecure's Managed Detection & Response services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors duration-300">
                  <CardHeader className="bg-muted/30 border-b border-border/50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <study.logo className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{study.company}</h3>
                          <p className="text-sm text-muted-foreground">{study.industry}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Challenge & Solution */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                            The Challenge
                          </h4>
                          <p className="text-muted-foreground">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                            Our Solution
                          </h4>
                          <p className="text-muted-foreground">{study.solution}</p>
                        </div>
                        
                        {/* Quote */}
                        <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/80">
                          "{study.quote}"
                          <footer className="mt-2 text-sm text-muted-foreground not-italic">
                            — {study.author}, {study.role}
                          </footer>
                        </blockquote>
                      </div>

                      {/* Results */}
                      <div className="lg:border-l lg:border-border/50 lg:pl-8">
                        <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                          Key Results
                        </h4>
                        <div className="space-y-4">
                          {study.results.map((result, i) => (
                            <div key={i} className="text-center lg:text-left">
                              <div className="text-3xl font-bold text-primary">{result.metric}</div>
                              <div className="text-sm text-muted-foreground">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join hundreds of organizations that trust AllSafeSecure to protect their 
              digital assets. Get your free security assessment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg" className="w-full sm:w-auto">
                  <Clock className="mr-2 h-4 w-4" />
                  Request Free Assessment
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More About MDR
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
