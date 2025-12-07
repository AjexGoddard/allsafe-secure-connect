import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    endpoints: "",
    budget: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you! Our security team will contact you within 24 hours.");
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 border-glow text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Request Received!</h3>
        <p className="text-muted-foreground">
          Our security experts will reach out within 24 hours to discuss your MDR needs.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 lg:p-8 border-glow space-y-5"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-1">Get a Free Security Assessment</h3>
        <p className="text-muted-foreground text-sm">Fill out the form and our experts will contact you</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Full Name</Label>
          <Input
            id="name"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">Work Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">Contact Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endpoints" className="text-foreground">Number of Endpoints</Label>
          <Select
            value={formData.endpoints}
            onValueChange={(value) => setFormData({ ...formData, endpoints: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select endpoint range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-50">1-50 endpoints</SelectItem>
              <SelectItem value="51-200">51-200 endpoints</SelectItem>
              <SelectItem value="201-500">201-500 endpoints</SelectItem>
              <SelectItem value="501-1000">501-1000 endpoints</SelectItem>
              <SelectItem value="1000+">1000+ endpoints</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-foreground">Monthly Budget</Label>
          <Select
            value={formData.budget}
            onValueChange={(value) => setFormData({ ...formData, budget: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-5k">Under $5,000</SelectItem>
              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
              <SelectItem value="50k+">$50,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Get Free Assessment
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to our Privacy Policy. We never share your data.
      </p>
    </motion.form>
  );
};

export default LeadForm;