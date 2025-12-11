import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order");
    
    if (error) {
      toast.error("Failed to load services");
      return;
    }
    setServices(data || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    const newService = {
      title: "New Service",
      description: "Service description",
      icon: "Shield",
      display_order: services.length,
      is_active: true,
    };

    const { data, error } = await supabase
      .from("services")
      .insert(newService)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add service");
      return;
    }

    setServices([...services, data]);
    toast.success("Service added");
  };

  const handleUpdate = async (id: string, updates: Partial<Service>) => {
    setServices(services.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleSave = async (service: Service) => {
    setSaving(true);
    const { error } = await supabase
      .from("services")
      .update({
        title: service.title,
        description: service.description,
        icon: service.icon,
        display_order: service.display_order,
        is_active: service.is_active,
      })
      .eq("id", service.id);

    setSaving(false);
    if (error) {
      toast.error("Failed to save service");
      return;
    }
    toast.success("Service saved");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete service");
      return;
    }

    setServices(services.filter((s) => s.id !== id));
    toast.success("Service deleted");
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
            <CardTitle>Services Manager</CardTitle>
            <CardDescription>Manage the services displayed on your website</CardDescription>
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service, index) => (
          <div key={service.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Service #{index + 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`active-${service.id}`} className="text-sm">Active</Label>
                  <Switch
                    id={`active-${service.id}`}
                    checked={service.is_active}
                    onCheckedChange={(checked) => handleUpdate(service.id, { is_active: checked })}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave(service)}
                  disabled={saving}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={service.title}
                  onChange={(e) => handleUpdate(service.id, { title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon (Lucide icon name)</Label>
                <Input
                  value={service.icon}
                  onChange={(e) => handleUpdate(service.id, { icon: e.target.value })}
                  placeholder="Shield, Eye, Lock, etc."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={service.description}
                onChange={(e) => handleUpdate(service.id, { description: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No services yet. Click "Add Service" to create one.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesManager;