import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FormConfig {
  form_title: string;
  form_subtitle: string;
  submit_button_text: string;
  success_title: string;
  success_message: string;
  currency_symbol: string;
  budget_options: { value: string; label: string }[];
  endpoint_options: { value: string; label: string }[];
}

const defaultConfig: FormConfig = {
  form_title: "Get a Free Security Assessment",
  form_subtitle: "Fill out the form and our experts will contact you",
  submit_button_text: "Get Free Assessment",
  success_title: "Request Received!",
  success_message: "Our security experts will reach out within 24 hours to discuss your MDR needs.",
  currency_symbol: "$",
  budget_options: [
    { value: "under-5k", label: "Under 5,000" },
    { value: "5k-10k", label: "5,000 - 10,000" },
    { value: "10k-25k", label: "10,000 - 25,000" },
    { value: "25k-50k", label: "25,000 - 50,000" },
    { value: "50k+", label: "50,000+" },
  ],
  endpoint_options: [
    { value: "1-50", label: "1-50 endpoints" },
    { value: "51-200", label: "51-200 endpoints" },
    { value: "201-500", label: "201-500 endpoints" },
    { value: "501-1000", label: "501-1000 endpoints" },
    { value: "1000+", label: "1000+ endpoints" },
  ],
};

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [config, setConfig] = useState<FormConfig>(defaultConfig);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    endpoints: "",
    budget: "",
  });

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase
        .from("form_config")
        .select("*")
        .limit(1)
        .maybeSingle();
      
      if (data) {
        setConfig({
          form_title: data.form_title,
          form_subtitle: data.form_subtitle,
          submit_button_text: data.submit_button_text,
          success_title: data.success_title,
          success_message: data.success_message,
          currency_symbol: data.currency_symbol,
          budget_options: data.budget_options as { value: string; label: string }[],
          endpoint_options: data.endpoint_options as { value: string; label: string }[],
        });
      }
    };
    fetchConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data: lead, error } = await supabase
        .from("lead_submissions")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          endpoints: formData.endpoints || null,
          budget: formData.budget || null,
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to submit lead:", error);
        toast.error("Failed to submit form. Please try again.");
        setIsSubmitting(false);
        return;
      }

      supabase.functions.invoke("send-lead-email", {
        body: { leadId: lead.id },
      }).catch(console.error);

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you! Our security team will contact you within 24 hours.");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 border-glow text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">{config.success_title}</h3>
        <p className="text-muted-foreground">{config.success_message}</p>
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
        <h3 className="text-xl font-semibold text-foreground mb-1">{config.form_title}</h3>
        <p className="text-muted-foreground text-sm">{config.form_subtitle}</p>
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
              {config.endpoint_options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
              {config.budget_options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {config.currency_symbol}{option.label}
                </SelectItem>
              ))}
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
            {config.submit_button_text}
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