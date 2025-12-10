import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Plus, Trash2, Save, Building2, Users, TrendingUp, Globe, Shield } from "lucide-react";

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

const iconOptions = [
  { value: "Building2", label: "Building", icon: Building2 },
  { value: "Users", label: "Users", icon: Users },
  { value: "TrendingUp", label: "Trending Up", icon: TrendingUp },
  { value: "Globe", label: "Globe", icon: Globe },
  { value: "Shield", label: "Shield", icon: Shield },
];

const CaseStudiesManager = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchStudies = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast.error("Failed to fetch case studies");
      console.error(error);
    } else {
      setStudies(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const handleChange = (id: string, field: keyof CaseStudy, value: string | boolean | string[] | number) => {
    setStudies((prev) =>
      prev.map((study) => (study.id === id ? { ...study, [field]: value } : study))
    );
  };

  const handleTagsChange = (id: string, tagsString: string) => {
    const tags = tagsString.split(",").map((t) => t.trim()).filter(Boolean);
    handleChange(id, "tags", tags);
  };

  const addStudy = () => {
    const newStudy: CaseStudy = {
      id: `new-${Date.now()}`,
      company: "",
      industry: "",
      icon: "Building2",
      challenge: "",
      solution: "",
      quote: "",
      quote_author: "",
      quote_role: "",
      tags: [],
      result1_metric: "",
      result1_label: "",
      result2_metric: "",
      result2_label: "",
      result3_metric: "",
      result3_label: "",
      display_order: studies.length + 1,
      is_active: true,
    };
    setStudies([...studies, newStudy]);
  };

  const removeStudy = async (id: string) => {
    if (id.startsWith("new-")) {
      setStudies((prev) => prev.filter((s) => s.id !== id));
      return;
    }

    const { error } = await supabase.from("case_studies").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete case study");
    } else {
      setStudies((prev) => prev.filter((s) => s.id !== id));
      toast.success("Case study deleted");
    }
  };

  const saveStudy = async (study: CaseStudy) => {
    setIsSaving(true);

    const studyData = {
      company: study.company,
      industry: study.industry,
      icon: study.icon,
      challenge: study.challenge,
      solution: study.solution,
      quote: study.quote,
      quote_author: study.quote_author,
      quote_role: study.quote_role,
      tags: study.tags,
      result1_metric: study.result1_metric,
      result1_label: study.result1_label,
      result2_metric: study.result2_metric,
      result2_label: study.result2_label,
      result3_metric: study.result3_metric,
      result3_label: study.result3_label,
      display_order: study.display_order,
      is_active: study.is_active,
    };

    if (study.id.startsWith("new-")) {
      const { error } = await supabase.from("case_studies").insert(studyData);
      if (error) {
        toast.error(`Failed to add case study`);
        console.error(error);
      } else {
        toast.success("Case study added");
        fetchStudies();
      }
    } else {
      const { error } = await supabase
        .from("case_studies")
        .update(studyData)
        .eq("id", study.id);
      if (error) {
        toast.error(`Failed to update case study`);
        console.error(error);
      } else {
        toast.success("Case study updated");
      }
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground">Case Studies</CardTitle>
        <CardDescription>
          Manage the case studies displayed on the Case Studies page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="space-y-4">
          {studies.map((study) => (
            <AccordionItem
              key={study.id}
              value={study.id}
              className="border border-border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <span className="font-semibold">
                    {study.company || "New Case Study"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {study.industry}
                  </span>
                  {!study.is_active && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">Inactive</span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                      value={study.company}
                      onChange={(e) => handleChange(study.id, "company", e.target.value)}
                      placeholder="TechCorp Global"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input
                      value={study.industry}
                      onChange={(e) => handleChange(study.id, "industry", e.target.value)}
                      placeholder="Technology"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select
                      value={study.icon}
                      onValueChange={(value) => handleChange(study.id, "icon", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <opt.icon className="h-4 w-4" />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Challenge</Label>
                    <Textarea
                      value={study.challenge}
                      onChange={(e) => handleChange(study.id, "challenge", e.target.value)}
                      placeholder="Describe the client's challenge..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Solution</Label>
                    <Textarea
                      value={study.solution}
                      onChange={(e) => handleChange(study.id, "solution", e.target.value)}
                      placeholder="Describe how you solved it..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Quote */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Client Quote</Label>
                    <Textarea
                      value={study.quote}
                      onChange={(e) => handleChange(study.id, "quote", e.target.value)}
                      placeholder="Client testimonial quote..."
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Quote Author</Label>
                      <Input
                        value={study.quote_author}
                        onChange={(e) => handleChange(study.id, "quote_author", e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author Role</Label>
                      <Input
                        value={study.quote_role}
                        onChange={(e) => handleChange(study.id, "quote_role", e.target.value)}
                        placeholder="CISO, Company Name"
                      />
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  <Label>Key Results</Label>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <Input
                      value={study.result1_metric}
                      onChange={(e) => handleChange(study.id, "result1_metric", e.target.value)}
                      placeholder="99.8%"
                    />
                    <Input
                      value={study.result1_label}
                      onChange={(e) => handleChange(study.id, "result1_label", e.target.value)}
                      placeholder="Detection Rate"
                    />
                    <Input
                      value={study.result2_metric}
                      onChange={(e) => handleChange(study.id, "result2_metric", e.target.value)}
                      placeholder="< 5 min"
                    />
                    <Input
                      value={study.result2_label}
                      onChange={(e) => handleChange(study.id, "result2_label", e.target.value)}
                      placeholder="Response Time"
                    />
                    <Input
                      value={study.result3_metric}
                      onChange={(e) => handleChange(study.id, "result3_metric", e.target.value)}
                      placeholder="Zero"
                    />
                    <Input
                      value={study.result3_label}
                      onChange={(e) => handleChange(study.id, "result3_label", e.target.value)}
                      placeholder="Breaches"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={study.tags.join(", ")}
                    onChange={(e) => handleTagsChange(study.id, e.target.value)}
                    placeholder="Cloud Security, 24/7 Monitoring, Ransomware Protection"
                  />
                </div>

                {/* Order & Status */}
                <div className="flex items-center gap-6">
                  <div className="space-y-2">
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={study.display_order}
                      onChange={(e) => handleChange(study.id, "display_order", parseInt(e.target.value) || 0)}
                      className="w-24"
                      min="1"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch
                      checked={study.is_active}
                      onCheckedChange={(checked) => handleChange(study.id, "is_active", checked)}
                    />
                    <Label>Active</Label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button onClick={() => saveStudy(study)} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Case Study"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => removeStudy(study.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button variant="outline" onClick={addStudy} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Case Study
        </Button>
      </CardContent>
    </Card>
  );
};

export default CaseStudiesManager;
