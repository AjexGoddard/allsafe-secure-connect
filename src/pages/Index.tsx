import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import WhyMDR from "@/components/WhyMDR";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <WhyMDR />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;