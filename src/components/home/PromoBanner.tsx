import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Try-On Banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-navy p-8 md:p-10 text-secondary-foreground"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <Sparkles className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">AI Virtual Try-On</h3>
            <p className="text-sm text-secondary-foreground/70 font-body mb-6 max-w-xs">
              See how jewelry looks on you before visiting our showroom. Powered by AI.
            </p>
            <Link to="/ai-studio">
              <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-body">
                Try Now Free
              </Button>
            </Link>
          </motion.div>

          {/* Seasonal Offer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent to-cream p-8 md:p-10"
          >
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">Limited Time</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-2">Making Charges at 10%</h3>
            <p className="text-sm text-muted-foreground font-body mb-6 max-w-xs">
              Special making charges on select gold jewelry this festive season. Visit our showroom today.
            </p>
            <Link to="/offers">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body">
                View Offers
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
