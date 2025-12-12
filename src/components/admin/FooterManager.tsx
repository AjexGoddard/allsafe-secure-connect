import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { toast } from "sonner";
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

const FooterManager = () => {
  const [content, setContent] = useState<FooterContent>({
    email: "",
    phone: "",
    address: "",
    description: "",
    twitter_url: "",
    linkedin_url: "",
    privacy_url: "",
    terms_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("key, value")
      .eq("section", "footer");

    if (data) {
      const newContent: Partial<FooterContent> = {};
      data.forEach((item) => {
        const key = item.key as keyof FooterContent;
        // Handle both {text: "value"} and plain string formats
        if (typeof item.value === "object" && item.value !== null && "text" in item.value) {
          newContent[key] = (item.value as { text: string }).text;
        } else if (typeof item.value === "string") {
          newContent[key] = item.value;
        }
      });
      setContent((prev) => ({ ...prev, ...newContent }));
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    
    const entries = Object.entries(content);
    for (const [key, value] of entries) {
      await supabase
        .from("site_content")
        .upsert({
          section: "footer",
          key,
          value: { text: value },
        }, { onConflict: "section,key" });
    }

    setSaving(false);
    toast.success("Footer content saved");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Footer Settings</CardTitle>
            <CardDescription>Update your website footer content and social links</CardDescription>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="font-medium">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={content.email}
                onChange={(e) => setContent({ ...content, email: e.target.value })}
                placeholder="contact@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={content.address}
              onChange={(e) => setContent({ ...content, address: e.target.value })}
              placeholder="San Francisco, CA"
            />
          </div>
          <div className="space-y-2">
            <Label>Company Description</Label>
            <Textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={3}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="font-medium">Social Media Links</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Twitter URL</Label>
              <Input
                value={content.twitter_url}
                onChange={(e) => setContent({ ...content, twitter_url: e.target.value })}
                placeholder="https://twitter.com/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input
                value={content.linkedin_url}
                onChange={(e) => setContent({ ...content, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="space-y-4">
          <h3 className="font-medium">Legal Pages</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Privacy Policy URL</Label>
              <Input
                value={content.privacy_url}
                onChange={(e) => setContent({ ...content, privacy_url: e.target.value })}
                placeholder="/privacy"
              />
            </div>
            <div className="space-y-2">
              <Label>Terms of Service URL</Label>
              <Input
                value={content.terms_url}
                onChange={(e) => setContent({ ...content, terms_url: e.target.value })}
                placeholder="/terms"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FooterManager;