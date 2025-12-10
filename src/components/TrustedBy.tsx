import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TrustedLogo {
  id: string;
  name: string;
  logo_url: string | null;
  display_order: number;
  is_active: boolean;
}

const TrustedBy = () => {
  const [logos, setLogos] = useState<TrustedLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from("trusted_logos")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setLogos(data);
      }
      setIsLoading(false);
    };

    fetchLogos();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Trusted by Industry Leaders
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300"
            >
              {logo.logo_url ? (
                <img
                  src={logo.logo_url}
                  alt={logo.name}
                  className="h-8 lg:h-10 object-contain opacity-50 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="text-xl lg:text-2xl font-bold tracking-tight">
                  {logo.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
