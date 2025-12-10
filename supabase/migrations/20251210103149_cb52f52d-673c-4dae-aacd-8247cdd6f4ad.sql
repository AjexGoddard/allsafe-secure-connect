-- Create trusted_logos table for the "Trusted By" section
CREATE TABLE public.trusted_logos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case_studies table
CREATE TABLE public.case_studies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company TEXT NOT NULL,
    industry TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Building2',
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    quote TEXT NOT NULL,
    quote_author TEXT NOT NULL,
    quote_role TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    result1_metric TEXT NOT NULL,
    result1_label TEXT NOT NULL,
    result2_metric TEXT NOT NULL,
    result2_label TEXT NOT NULL,
    result3_metric TEXT NOT NULL,
    result3_label TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.trusted_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Public read access for both tables
CREATE POLICY "Anyone can read trusted logos" 
ON public.trusted_logos 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can read case studies" 
ON public.case_studies 
FOR SELECT 
USING (true);

-- Admin can manage trusted logos
CREATE POLICY "Admins can manage trusted logos" 
ON public.trusted_logos 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin can manage case studies
CREATE POLICY "Admins can manage case studies" 
ON public.case_studies 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_trusted_logos_updated_at
BEFORE UPDATE ON public.trusted_logos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default trusted logos
INSERT INTO public.trusted_logos (name, display_order) VALUES
('TechCorp', 1),
('FinanceHub', 2),
('HealthFirst', 3),
('RetailMax', 4),
('CloudSys', 5),
('DataFlow', 6);

-- Insert default case studies
INSERT INTO public.case_studies (
    company, industry, icon, challenge, solution, quote, quote_author, quote_role, tags,
    result1_metric, result1_label, result2_metric, result2_label, result3_metric, result3_label, display_order
) VALUES
('TechCorp Global', 'Technology', 'Building2', 
 'Faced sophisticated ransomware attacks targeting their cloud infrastructure with 500+ endpoints across 12 countries.',
 'Deployed 24/7 MDR with AI-powered threat detection and automated response protocols.',
 'AllSafeSecure transformed our security posture. Their MDR team detected and neutralized threats we didn''t even know existed.',
 'Sarah Chen', 'CISO, TechCorp Global', ARRAY['Ransomware Protection', 'Cloud Security', '24/7 Monitoring'],
 '99.8%', 'Threat Detection Rate', '< 5 min', 'Average Response Time', 'Zero', 'Successful Breaches', 1),

('HealthFirst Medical', 'Healthcare', 'Users',
 'Needed HIPAA-compliant security for 2,000+ medical devices and patient data protection across 50 facilities.',
 'Implemented comprehensive MDR with specialized healthcare threat intelligence and compliance reporting.',
 'Patient data security is non-negotiable. AllSafeSecure gave us peace of mind with their specialized healthcare expertise.',
 'Dr. Michael Roberts', 'CTO, HealthFirst Medical', ARRAY['HIPAA Compliance', 'Medical Devices', 'Data Protection'],
 '100%', 'HIPAA Compliance', '85%', 'Reduction in Alerts', '$2.5M', 'Saved in Potential Breaches', 2),

('Global Finance Corp', 'Financial Services', 'TrendingUp',
 'Experienced targeted APT attacks attempting to compromise trading systems and customer financial data.',
 'Deployed advanced threat hunting with real-time transaction monitoring and behavioral analytics.',
 'The threat landscape in finance is brutal. AllSafeSecure''s proactive hunting has stopped attacks before they even started.',
 'James Morrison', 'Head of Security, Global Finance Corp', ARRAY['APT Defense', 'Financial Security', 'Threat Hunting'],
 '12', 'APT Groups Blocked', '< 2 min', 'Incident Response', '$50M+', 'Assets Protected Daily', 3),

('RetailMax International', 'Retail', 'Globe',
 'POS systems across 300+ stores were vulnerable to card skimming and supply chain attacks.',
 'Integrated MDR with POS-specific threat detection and vendor risk monitoring across all locations.',
 'From single-store incidents to enterprise-wide protection, AllSafeSecure scaled with our growth seamlessly.',
 'Linda Park', 'VP of IT, RetailMax International', ARRAY['POS Security', 'Supply Chain', 'Retail Protection'],
 '300+', 'Stores Protected', 'Zero', 'Card Data Breaches', '40%', 'Cost Reduction', 4),

('EduTech Academy', 'Education', 'Users',
 'Remote learning expansion created 10,000+ new attack vectors with student and faculty devices.',
 'Deployed lightweight MDR agents with student-friendly security policies and 24/7 monitoring.',
 'Education shouldn''t be disrupted by cyber threats. AllSafeSecure keeps our digital campus safe for everyone.',
 'Prof. David Kim', 'Director of Technology, EduTech Academy', ARRAY['Education Security', 'Remote Learning', 'Endpoint Protection'],
 '10K+', 'Endpoints Secured', '99.9%', 'Uptime Maintained', '15K', 'Threats Blocked Monthly', 5),

('ManufacturePro Industries', 'Manufacturing', 'Building2',
 'OT/IT convergence exposed critical manufacturing systems to nation-state level threats.',
 'Specialized OT security monitoring with air-gapped backup systems and industrial protocol protection.',
 'Our production lines can''t afford downtime. AllSafeSecure understands manufacturing and protects what matters most.',
 'Robert Zhang', 'Plant Director, ManufacturePro Industries', ARRAY['OT Security', 'Industrial Protection', 'Critical Infrastructure'],
 'Zero', 'Production Downtime', '100%', 'OT Visibility', '3', 'Nation-State Attacks Stopped', 6),

('CloudFirst SaaS', 'Software', 'Shield',
 'Multi-tenant SaaS platform required isolation between customer environments while maintaining visibility.',
 'Custom MDR deployment with tenant-aware monitoring and automated incident isolation protocols.',
 'Our customers trust us with their data. AllSafeSecure helps us maintain that trust with enterprise-grade security.',
 'Emily Watson', 'CEO, CloudFirst SaaS', ARRAY['SaaS Security', 'Multi-Tenant', 'SOC 2 Compliance'],
 '500+', 'Tenants Protected', '< 30 sec', 'Threat Isolation', 'SOC 2', 'Compliance Achieved', 7);