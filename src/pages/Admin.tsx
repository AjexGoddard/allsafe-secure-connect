import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Users, FileText, Mail, Image, BookOpen, Briefcase, Settings, UserCog, FormInput } from "lucide-react";
import logo from "@/assets/logo.png";
import LeadsManager from "@/components/admin/LeadsManager";
import ContentManager from "@/components/admin/ContentManager";
import SmtpSettings from "@/components/admin/SmtpSettings";
import TrustedLogosManager from "@/components/admin/TrustedLogosManager";
import CaseStudiesManager from "@/components/admin/CaseStudiesManager";
import ServicesManager from "@/components/admin/ServicesManager";
import FooterManager from "@/components/admin/FooterManager";
import FormConfigManager from "@/components/admin/FormConfigManager";
import UserManager from "@/components/admin/UserManager";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/admin/login");
      } else if (!isAdmin) {
        navigate("/admin/login");
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AllSafesecure" className="h-8" />
            <span className="text-lg font-semibold text-foreground">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="form" className="flex items-center gap-2">
              <FormInput className="w-4 h-4" />
              <span className="hidden sm:inline">Form</span>
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Footer</span>
            </TabsTrigger>
            <TabsTrigger value="logos" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Logos</span>
            </TabsTrigger>
            <TabsTrigger value="casestudies" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Case Studies</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="smtp" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">SMTP</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <LeadsManager />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="form">
            <FormConfigManager />
          </TabsContent>

          <TabsContent value="footer">
            <FooterManager />
          </TabsContent>

          <TabsContent value="logos">
            <TrustedLogosManager />
          </TabsContent>

          <TabsContent value="casestudies">
            <CaseStudiesManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>

          <TabsContent value="smtp">
            <SmtpSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;