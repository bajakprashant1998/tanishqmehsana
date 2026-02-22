import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Gift, ArrowRight, Diamond, Crown } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {/* AI Try-On Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-navy p-8 md:p-12 text-secondary-foreground min-h-[300px] flex flex-col justify-end"
          >
            {/* Animated glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px]" />
            
            {/* Decorative ring */}
            <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-primary/10 hidden md:block" />
            <div className="absolute top-12 right-12 w-16 h-16 rounded-full border border-primary/5 hidden md:block" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-body tracking-[0.3em] uppercase mb-5 backdrop-blur-sm border border-primary/10"
              >
                <Sparkles className="h-3 w-3" /> AI POWERED
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">Virtual Try-On</h3>
              <p className="text-sm text-secondary-foreground/50 font-body mb-8 max-w-sm leading-relaxed">
                See how jewelry looks on you before visiting our showroom. Upload a selfie and try on any piece instantly.
              </p>
              <Link to="/ai-studio">
                <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-body group/btn rounded-full px-8 shadow-luxury">
                  Try Now Free
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Seasonal Offer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.08] via-accent to-cream p-8 md:p-12 min-h-[300px] flex flex-col justify-end"
          >
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-primary/5 rounded-full blur-[80px]" />
            <div className="absolute top-6 right-6 w-28 h-28 bg-primary/5 rounded-full blur-[50px]" />

            {/* Decorative diamond */}
            <Diamond className="absolute top-8 right-8 h-8 w-8 text-primary/10 hidden md:block" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-body tracking-[0.3em] uppercase mb-5 border border-primary/10"
              >
                <Gift className="h-3 w-3" /> LIMITED TIME
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">Making Charges at 10%</h3>
              <p className="text-sm text-muted-foreground font-body mb-8 max-w-sm leading-relaxed">
                Special making charges on select gold jewelry this festive season. Visit our showroom today.
              </p>
              <Link to="/offers">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body group/btn rounded-full px-8">
                  View Offers
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Brand promise strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl bg-secondary/50 backdrop-blur-sm border border-border p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center"
        >
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-primary" />
            <span className="text-sm font-body text-foreground/70">25+ Years Legacy</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-3">
            <Diamond className="h-5 w-5 text-primary" />
            <span className="text-sm font-body text-foreground/70">GIA Certified Diamonds</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-primary" />
            <span className="text-sm font-body text-foreground/70">Lifetime Exchange</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
