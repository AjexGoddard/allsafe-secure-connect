import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, TestTube } from "lucide-react";

interface SmtpConfig {
  id?: string;
  host: string;
  port: number;
  username: string;
  password: string;
  from_email: string;
  from_name: string;
  is_active: boolean;
}

const SmtpSettings = () => {
  const [config, setConfig] = useState<SmtpConfig>({
    host: "",
    port: 587,
    username: "",
    password: "",
    from_email: "",
    from_name: "AllSafesecure",
    is_active: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const fetchConfig = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("smtp_config")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      toast.error("Failed to fetch SMTP config");
      console.error(error);
    } else if (data) {
      setConfig(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);

    if (config.id) {
      const { error } = await supabase
        .from("smtp_config")
        .update({
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          from_email: config.from_email,
          from_name: config.from_name,
          is_active: config.is_active,
        })
        .eq("id", config.id);

      if (error) {
        toast.error("Failed to update SMTP config");
        console.error(error);
      } else {
        toast.success("SMTP configuration updated");
      }
    } else {
      const { error } = await supabase
        .from("smtp_config")
        .insert({
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          from_email: config.from_email,
          from_name: config.from_name,
          is_active: config.is_active,
        });

      if (error) {
        toast.error("Failed to save SMTP config");
        console.error(error);
      } else {
        toast.success("SMTP configuration saved");
        fetchConfig();
      }
    }

    setIsSaving(false);
  };

  const handleTestEmail = async () => {
    setIsTesting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: {
          test: true,
          to: config.from_email,
        },
      });

      if (error) {
        toast.error("Test email failed: " + error.message);
      } else {
        toast.success("Test email sent successfully!");
      }
    } catch (err) {
      toast.error("Failed to send test email");
    }
    setIsTesting(false);
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
        <CardTitle className="text-foreground">SMTP Configuration</CardTitle>
        <CardDescription>Configure email notifications for lead submissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host">SMTP Host</Label>
            <Input
              id="host"
              placeholder="smtp.gmail.com"
              value={config.host}
              onChange={(e) => setConfig({ ...config, host: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">SMTP Port</Label>
            <Input
              id="port"
              type="number"
              placeholder="587"
              value={config.port}
              onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) || 587 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="your@email.com"
              value={config.username}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password / App Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={config.password}
              onChange={(e) => setConfig({ ...config, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from_email">From Email</Label>
            <Input
              id="from_email"
              type="email"
              placeholder="noreply@allsafesecure.com"
              value={config.from_email}
              onChange={(e) => setConfig({ ...config, from_email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from_name">From Name</Label>
            <Input
              id="from_name"
              placeholder="AllSafesecure"
              value={config.from_name}
              onChange={(e) => setConfig({ ...config, from_name: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={config.is_active}
            onCheckedChange={(checked) => setConfig({ ...config, is_active: checked })}
          />
          <Label htmlFor="is_active">Enable email notifications</Label>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Configuration"}
          </Button>
          <Button variant="outline" onClick={handleTestEmail} disabled={isTesting || !config.host}>
            <TestTube className="w-4 h-4 mr-2" />
            {isTesting ? "Sending..." : "Send Test Email"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          For Gmail, use an App Password instead of your regular password. 
          <a 
            href="https://support.google.com/accounts/answer/185833" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline ml-1"
          >
            Learn more
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default SmtpSettings;
