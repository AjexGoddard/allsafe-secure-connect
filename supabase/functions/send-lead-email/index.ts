import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadEmailRequest {
  leadId?: string;
  test?: boolean;
  to?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { leadId, test, to }: LeadEmailRequest = await req.json();

    // Get SMTP config
    const { data: smtpConfig, error: smtpError } = await supabase
      .from("smtp_config")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (smtpError || !smtpConfig) {
      console.log("SMTP not configured or inactive");
      return new Response(
        JSON.stringify({ success: false, message: "SMTP not configured" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: smtpConfig.host,
        port: smtpConfig.port,
        tls: true,
        auth: {
          username: smtpConfig.username,
          password: smtpConfig.password,
        },
      },
    });

    if (test) {
      // Send test email
      await client.send({
        from: `${smtpConfig.from_name} <${smtpConfig.from_email}>`,
        to: to || smtpConfig.from_email,
        subject: "AllSafesecure - SMTP Test Email",
        content: "auto",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00d4ff;">SMTP Configuration Test</h1>
            <p>If you're reading this, your SMTP settings are configured correctly!</p>
            <p style="color: #666;">- AllSafesecure Admin Panel</p>
          </div>
        `,
      });

      await client.close();
      console.log("Test email sent successfully");

      return new Response(
        JSON.stringify({ success: true, message: "Test email sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from("lead_submissions")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      throw new Error("Lead not found");
    }

    // Send notification email
    await client.send({
      from: `${smtpConfig.from_name} <${smtpConfig.from_email}>`,
      to: smtpConfig.from_email,
      subject: `New Lead: ${lead.name} - AllSafesecure`,
      content: "auto",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); padding: 30px; border-radius: 10px;">
            <h1 style="color: #00d4ff; margin-bottom: 20px;">🛡️ New Security Assessment Request</h1>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #fff; margin-bottom: 15px;">Contact Information</h2>
              <p style="color: #ccc; margin: 8px 0;"><strong style="color: #00d4ff;">Name:</strong> ${lead.name}</p>
              <p style="color: #ccc; margin: 8px 0;"><strong style="color: #00d4ff;">Email:</strong> ${lead.email}</p>
              <p style="color: #ccc; margin: 8px 0;"><strong style="color: #00d4ff;">Phone:</strong> ${lead.phone || "Not provided"}</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px;">
              <h2 style="color: #fff; margin-bottom: 15px;">Project Details</h2>
              <p style="color: #ccc; margin: 8px 0;"><strong style="color: #00d4ff;">Endpoints:</strong> ${lead.endpoints || "Not specified"}</p>
              <p style="color: #ccc; margin: 8px 0;"><strong style="color: #00d4ff;">Budget:</strong> ${lead.budget || "Not specified"}</p>
            </div>
            
            <p style="color: #666; margin-top: 20px; font-size: 12px;">
              Submitted on ${new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      `,
    });

    await client.close();
    console.log("Lead notification email sent for:", lead.name);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-lead-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
