import { useEffect, useState } from "react";
import { Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

interface FooterContent {
  email: string;
  phone: string;
  address: string;
  description: string;
  twitter_url: string;
  linkedin_url: string;
  privacy_url: string;
  terms_url: string;
}

const Footer = () => {
  const [content, setContent] = useState<FooterContent>({
    email: "contact@allsafesecure.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    description: "Enterprise-grade Managed Detection and Response services protecting businesses from modern cyber threats 24/7.",
    twitter_url: "https://twitter.com",
    linkedin_url: "https://linkedin.com",
    privacy_url: "/privacy",
    terms_url: "/terms",
  });

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("key, value")
        .eq("section", "footer");

      if (data) {
        const newContent: Partial<FooterContent> = {};
        data.forEach((item) => {
          const key = item.key as keyof FooterContent;
          newContent[key] = typeof item.value === "string" ? item.value : JSON.stringify(item.value);
        });
        setContent((prev) => ({ ...prev, ...newContent }));
      }
    };
    fetchContent();
  }, []);

  const footerLinks = {
    services: [
      "MDR Services",
      "Threat Hunting",
      "Incident Response",
      "Endpoint Protection",
      "Vulnerability Management",
    ],
    company: [
      "About Us",
      "Careers",
      "Partners",
      "Blog",
      "Contact",
    ],
    resources: [
      "Security Insights",
      "Case Studies",
      "Whitepapers",
      "Webinars",
      "Documentation",
    ],
  };

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center mb-4">
              <img 
                src={logo} 
                alt="AllSafe Secure" 
                className="h-12 w-auto"
              />
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              {content.description}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                {content.email}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                {content.phone}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                {content.address}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AllSafesecure. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href={content.privacy_url} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy Policy
            </a>
            <a href={content.terms_url} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms of Service
            </a>
            <div className="flex gap-4">
              <a href={content.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={content.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;