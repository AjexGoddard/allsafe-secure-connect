import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";

interface TrustedLogo {
  id: string;
  name: string;
  logo_url: string | null;
  display_order: number;
  is_active: boolean;
}

const TrustedLogosManager = () => {
  const [logos, setLogos] = useState<TrustedLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchLogos = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("trusted_logos")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast.error("Failed to fetch logos");
      console.error(error);
    } else {
      setLogos(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleChange = (id: string, field: keyof TrustedLogo, value: string | boolean) => {
    setLogos((prev) =>
      prev.map((logo) => (logo.id === id ? { ...logo, [field]: value } : logo))
    );
  };

  const addLogo = () => {
    const newLogo: TrustedLogo = {
      id: `new-${Date.now()}`,
      name: "",
      logo_url: null,
      display_order: logos.length + 1,
      is_active: true,
    };
    setLogos([...logos, newLogo]);
  };

  const removeLogo = async (id: string) => {
    if (id.startsWith("new-")) {
      setLogos((prev) => prev.filter((logo) => logo.id !== id));
      return;
    }

    const { error } = await supabase.from("trusted_logos").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete logo");
    } else {
      setLogos((prev) => prev.filter((logo) => logo.id !== id));
      toast.success("Logo deleted");
    }
  };

  const saveAll = async () => {
    setIsSaving(true);
    
    for (const logo of logos) {
      if (!logo.name.trim()) {
        toast.error("All logos must have a name");
        setIsSaving(false);
        return;
      }

      const logoData = {
        name: logo.name,
        logo_url: logo.logo_url,
        display_order: logo.display_order,
        is_active: logo.is_active,
      };

      if (logo.id.startsWith("new-")) {
        const { error } = await supabase.from("trusted_logos").insert(logoData);
        if (error) {
          toast.error(`Failed to add ${logo.name}`);
          console.error(error);
          setIsSaving(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from("trusted_logos")
          .update(logoData)
          .eq("id", logo.id);
        if (error) {
          toast.error(`Failed to update ${logo.name}`);
          console.error(error);
          setIsSaving(false);
          return;
        }
      }
    }

    toast.success("All logos saved successfully");
    fetchLogos();
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
        <CardTitle className="text-foreground">Trusted By Logos</CardTitle>
        <CardDescription>
          Manage the logos displayed in the "Trusted by Industry Leaders" section
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {logos.map((logo, index) => (
          <div
            key={logo.id}
            className="flex items-center gap-4 p-4 border border-border rounded-lg bg-muted/30"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={logo.name}
                  onChange={(e) => handleChange(logo.id, "name", e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Logo URL (optional)</Label>
                <Input
                  value={logo.logo_url || ""}
                  onChange={(e) => handleChange(logo.id, "logo_url", e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  value={logo.display_order}
                  onChange={(e) => handleChange(logo.id, "display_order", e.target.value)}
                  min="1"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={logo.is_active}
                  onCheckedChange={(checked) => handleChange(logo.id, "is_active", checked)}
                />
                <Label className="text-sm">Active</Label>
              </div>
              
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeLogo(logo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex gap-4 pt-4">
          <Button variant="outline" onClick={addLogo}>
            <Plus className="h-4 w-4 mr-2" />
            Add Logo
          </Button>
          
          <Button onClick={saveAll} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustedLogosManager;
