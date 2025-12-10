import { motion } from "framer-motion";
import { ArrowLeft, Shield, TrendingUp, Clock, Users, Building2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  icon: string;
  challenge: string;
  solution: string;
  quote: string;
  quote_author: string;
  quote_role: string;
  tags: string[];
  result1_metric: string;
  result1_label: string;
  result2_metric: string;
  result2_label: string;
  result3_metric: string;
  result3_label: string;
  display_order: number;
  is_active: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Users,
  TrendingUp,
  Globe,
  Shield,
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setCaseStudies(data);
      }
      setIsLoading(false);
    };

    fetchStudies();
  }, []);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Building2;
  };

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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No case studies available yet.
            </div>
          ) : (
            <div className="grid gap-8">
              {caseStudies.map((study, index) => {
                const IconComponent = getIcon(study.icon);
                return (
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
                              <IconComponent className="h-7 w-7 text-primary" />
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
                                — {study.quote_author}, {study.quote_role}
                              </footer>
                            </blockquote>
                          </div>

                          {/* Results */}
                          <div className="lg:border-l lg:border-border/50 lg:pl-8">
                            <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                              Key Results
                            </h4>
                            <div className="space-y-4">
                              <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-primary">{study.result1_metric}</div>
                                <div className="text-sm text-muted-foreground">{study.result1_label}</div>
                              </div>
                              <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-primary">{study.result2_metric}</div>
                                <div className="text-sm text-muted-foreground">{study.result2_label}</div>
                              </div>
                              <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-primary">{study.result3_metric}</div>
                                <div className="text-sm text-muted-foreground">{study.result3_label}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
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
