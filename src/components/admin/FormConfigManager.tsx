import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FormConfig {
  id: string;
  form_title: string;
  form_subtitle: string;
  submit_button_text: string;
  success_title: string;
  success_message: string;
  currency_symbol: string;
  budget_options: { value: string; label: string }[];
  endpoint_options: { value: string; label: string }[];
}

const FormConfigManager = () => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    const { data } = await supabase
      .from("form_config")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (data) {
      setConfig({
        ...data,
        budget_options: data.budget_options as { value: string; label: string }[],
        endpoint_options: data.endpoint_options as { value: string; label: string }[],
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);

    const { error } = await supabase
      .from("form_config")
      .update({
        form_title: config.form_title,
        form_subtitle: config.form_subtitle,
        submit_button_text: config.submit_button_text,
        success_title: config.success_title,
        success_message: config.success_message,
        currency_symbol: config.currency_symbol,
        budget_options: config.budget_options,
        endpoint_options: config.endpoint_options,
      })
      .eq("id", config.id);

    setSaving(false);
    if (error) {
      toast.error("Failed to save form config");
      return;
    }
    toast.success("Form configuration saved");
  };

  const addBudgetOption = () => {
    if (!config) return;
    setConfig({
      ...config,
      budget_options: [...config.budget_options, { value: "", label: "" }],
    });
  };

  const updateBudgetOption = (index: number, field: "value" | "label", value: string) => {
    if (!config) return;
    const newOptions = [...config.budget_options];
    newOptions[index][field] = value;
    setConfig({ ...config, budget_options: newOptions });
  };

  const removeBudgetOption = (index: number) => {
    if (!config) return;
    const newOptions = config.budget_options.filter((_, i) => i !== index);
    setConfig({ ...config, budget_options: newOptions });
  };

  const addEndpointOption = () => {
    if (!config) return;
    setConfig({
      ...config,
      endpoint_options: [...config.endpoint_options, { value: "", label: "" }],
    });
  };

  const updateEndpointOption = (index: number, field: "value" | "label", value: string) => {
    if (!config) return;
    const newOptions = [...config.endpoint_options];
    newOptions[index][field] = value;
    setConfig({ ...config, endpoint_options: newOptions });
  };

  const removeEndpointOption = (index: number) => {
    if (!config) return;
    const newOptions = config.endpoint_options.filter((_, i) => i !== index);
    setConfig({ ...config, endpoint_options: newOptions });
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

  if (!config) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No form configuration found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lead Form Settings</CardTitle>
            <CardDescription>Customize the hero section lead capture form</CardDescription>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form Text */}
        <div className="space-y-4">
          <h3 className="font-medium">Form Text</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Form Title</Label>
              <Input
                value={config.form_title}
                onChange={(e) => setConfig({ ...config, form_title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Submit Button Text</Label>
              <Input
                value={config.submit_button_text}
                onChange={(e) => setConfig({ ...config, submit_button_text: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Form Subtitle</Label>
            <Input
              value={config.form_subtitle}
              onChange={(e) => setConfig({ ...config, form_subtitle: e.target.value })}
            />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h3 className="font-medium">Success Message</h3>
          <div className="space-y-2">
            <Label>Success Title</Label>
            <Input
              value={config.success_title}
              onChange={(e) => setConfig({ ...config, success_title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Success Message</Label>
            <Textarea
              value={config.success_message}
              onChange={(e) => setConfig({ ...config, success_message: e.target.value })}
              rows={2}
            />
          </div>
        </div>

        {/* Currency */}
        <div className="space-y-4">
          <h3 className="font-medium">Currency Settings</h3>
          <div className="space-y-2 max-w-xs">
            <Label>Currency Symbol</Label>
            <Input
              value={config.currency_symbol}
              onChange={(e) => setConfig({ ...config, currency_symbol: e.target.value })}
              placeholder="$"
            />
          </div>
        </div>

        {/* Budget Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Budget Options</h3>
            <Button variant="outline" size="sm" onClick={addBudgetOption}>
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </div>
          {config.budget_options.map((option, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Input
                  value={option.value}
                  onChange={(e) => updateBudgetOption(index, "value", e.target.value)}
                  placeholder="Value (e.g., under-5k)"
                />
                <Input
                  value={option.label}
                  onChange={(e) => updateBudgetOption(index, "label", e.target.value)}
                  placeholder="Label (e.g., Under 5,000)"
                />
              </div>
              <Button variant="destructive" size="icon" onClick={() => removeBudgetOption(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Endpoint Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Endpoint Options</h3>
            <Button variant="outline" size="sm" onClick={addEndpointOption}>
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </div>
          {config.endpoint_options.map((option, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Input
                  value={option.value}
                  onChange={(e) => updateEndpointOption(index, "value", e.target.value)}
                  placeholder="Value (e.g., 1-50)"
                />
                <Input
                  value={option.label}
                  onChange={(e) => updateEndpointOption(index, "label", e.target.value)}
                  placeholder="Label (e.g., 1-50 endpoints)"
                />
              </div>
              <Button variant="destructive" size="icon" onClick={() => removeEndpointOption(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormConfigManager;