import { motion } from "framer-motion";

const TrustedBy = () => {
  const logos = [
    "TechCorp",
    "FinanceHub",
    "HealthFirst",
    "RetailMax",
    "CloudSys",
    "DataFlow",
  ];

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
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300"
            >
              <span className="text-xl lg:text-2xl font-bold tracking-tight">{logo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;