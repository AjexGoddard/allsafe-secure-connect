import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Eye, Trash2, RefreshCw } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  endpoints: string | null;
  budget: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("lead_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch leads");
      console.error(error);
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateLeadStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("lead_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      fetchLeads();
    }
  };

  const updateLeadNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from("lead_submissions")
      .update({ notes })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update notes");
    } else {
      toast.success("Notes updated");
      fetchLeads();
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    const { error } = await supabase
      .from("lead_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete lead");
    } else {
      toast.success("Lead deleted");
      fetchLeads();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "contacted": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "qualified": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "closed": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <Card className="glass border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Lead Submissions</CardTitle>
            <CardDescription>Manage and track your lead inquiries</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchLeads}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No leads yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Endpoints</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone || "-"}</TableCell>
                    <TableCell>{lead.endpoints || "-"}</TableCell>
                    <TableCell>{lead.budget || "-"}</TableCell>
                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => updateLeadStatus(lead.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedLead(lead)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Lead Details - {lead.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-muted-foreground">Email:</span> {lead.email}</div>
                                <div><span className="text-muted-foreground">Phone:</span> {lead.phone || "-"}</div>
                                <div><span className="text-muted-foreground">Endpoints:</span> {lead.endpoints || "-"}</div>
                                <div><span className="text-muted-foreground">Budget:</span> {lead.budget || "-"}</div>
                              </div>
                              <div>
                                <label className="text-sm text-muted-foreground">Notes</label>
                                <Textarea
                                  defaultValue={lead.notes || ""}
                                  placeholder="Add notes about this lead..."
                                  onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" onClick={() => deleteLead(lead.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadsManager;
