import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Gift, ArrowRight } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-5">
          {/* AI Try-On Banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-navy p-8 md:p-10 text-secondary-foreground"
          >
            {/* Animated glow */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body tracking-wider mb-4">
                <Sparkles className="h-3 w-3" /> AI POWERED
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Virtual Try-On</h3>
              <p className="text-sm text-secondary-foreground/60 font-body mb-6 max-w-xs leading-relaxed">
                See how jewelry looks on you before visiting our showroom. Upload a selfie and try on any piece.
              </p>
              <Link to="/ai-studio">
                <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-body group/btn">
                  Try Now Free
                  <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Seasonal Offer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent to-cream p-8 md:p-10"
          >
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute top-4 right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body tracking-wider mb-4">
                <Gift className="h-3 w-3" /> LIMITED TIME
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Making Charges at 10%</h3>
              <p className="text-sm text-muted-foreground font-body mb-6 max-w-xs leading-relaxed">
                Special making charges on select gold jewelry this festive season. Visit our showroom today.
              </p>
              <Link to="/offers">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body group/btn">
                  View Offers
                  <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
