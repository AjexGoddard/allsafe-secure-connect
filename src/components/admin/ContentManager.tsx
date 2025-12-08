import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface ContentSection {
  section: string;
  fields: { key: string; label: string; type: "text" | "textarea" | "number" }[];
}

const contentSections: ContentSection[] = [
  {
    section: "hero",
    fields: [
      { key: "title", label: "Main Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "stat1_value", label: "Stat 1 Value", type: "text" },
      { key: "stat1_label", label: "Stat 1 Label", type: "text" },
      { key: "stat2_value", label: "Stat 2 Value", type: "text" },
      { key: "stat2_label", label: "Stat 2 Label", type: "text" },
      { key: "stat3_value", label: "Stat 3 Value", type: "text" },
      { key: "stat3_label", label: "Stat 3 Label", type: "text" },
    ],
  },
  {
    section: "about",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "story", label: "Company Story", type: "textarea" },
      { key: "years", label: "Years of Experience", type: "text" },
      { key: "clients", label: "Clients Protected", type: "text" },
      { key: "threats", label: "Threats Blocked", type: "text" },
      { key: "uptime", label: "Uptime SLA", type: "text" },
    ],
  },
  {
    section: "services",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "textarea" },
    ],
  },
  {
    section: "cta",
    fields: [
      { key: "title", label: "CTA Title", type: "text" },
      { key: "subtitle", label: "CTA Subtitle", type: "textarea" },
      { key: "button_text", label: "Button Text", type: "text" },
    ],
  },
  {
    section: "footer",
    fields: [
      { key: "company_description", label: "Company Description", type: "textarea" },
      { key: "address", label: "Address", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
    ],
  },
];

const ContentManager = () => {
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*");

    if (error) {
      toast.error("Failed to fetch content");
      console.error(error);
    } else {
      const contentMap: Record<string, Record<string, string>> = {};
      data?.forEach((item) => {
        if (!contentMap[item.section]) {
          contentMap[item.section] = {};
        }
        contentMap[item.section][item.key] = typeof item.value === "object" && item.value !== null && "text" in item.value 
          ? (item.value as { text: string }).text 
          : String(item.value);
      });
      setContent(contentMap);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleChange = (section: string, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const saveSection = async (section: string) => {
    setIsSaving(true);
    const sectionContent = content[section] || {};
    
    for (const [key, value] of Object.entries(sectionContent)) {
      const { error } = await supabase
        .from("site_content")
        .upsert({
          section,
          key,
          value: { text: value },
        }, {
          onConflict: "section,key",
        });

      if (error) {
        toast.error(`Failed to save ${key}`);
        console.error(error);
        setIsSaving(false);
        return;
      }
    }

    toast.success(`${section} section saved`);
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
        <CardTitle className="text-foreground">Content Management</CardTitle>
        <CardDescription>Edit your website content from here</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-4">
          {contentSections.map((section) => (
            <AccordionItem key={section.section} value={section.section} className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-foreground capitalize hover:no-underline">
                {section.section} Section
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {section.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={`${section.section}-${field.key}`}>{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={`${section.section}-${field.key}`}
                        value={content[section.section]?.[field.key] || ""}
                        onChange={(e) => handleChange(section.section, field.key, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <Input
                        id={`${section.section}-${field.key}`}
                        type={field.type}
                        value={content[section.section]?.[field.key] || ""}
                        onChange={(e) => handleChange(section.section, field.key, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
                <Button onClick={() => saveSection(section.section)} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save {section.section} Section
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ContentManager;
