import { motion } from "framer-motion";
import { Gem, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BrandStory = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/15"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-15, 15, -15], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-body">Our Story</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground mt-3 leading-tight">
              Crafting <span className="text-gradient-gold">Legacy</span> in Every Piece
            </h2>
            <div className="w-14 h-[2px] bg-gradient-to-r from-primary to-primary/30 mt-5 mb-6" />
            <p className="text-secondary-foreground/50 font-body leading-relaxed mb-4">
              For over 25 years, Yagnik Jewellery has been Mehsana's most trusted name in fine jewelry. 
              Every piece we create carries our commitment to purity, craftsmanship, and timeless design.
            </p>
            <p className="text-secondary-foreground/40 font-body leading-relaxed mb-8">
              From traditional bridal sets to contemporary diamond jewelry, our master artisans blend 
              heritage techniques with modern aesthetics to create pieces that tell your story.
            </p>
            <Link to="/about">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-body rounded-full px-8 text-sm">
                Learn More About Us
              </Button>
            </Link>
          </motion.div>

          {/* Right: Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { icon: Gem, title: "Master Craftsmanship", desc: "Each piece is handcrafted by artisans with decades of experience, ensuring unparalleled quality." },
              { icon: Heart, title: "Customer First", desc: "Transparent pricing, lifetime exchange, and personalized service — your trust is our foundation." },
              { icon: Sparkles, title: "Innovation Meets Tradition", desc: "From AI try-ons to heritage karigari, we blend the best of both worlds." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="group flex gap-5 p-5 rounded-2xl border border-secondary-foreground/8 hover:border-primary/20 hover:bg-secondary-foreground/[0.02] transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0 h-fit">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-secondary-foreground mb-1">{item.title}</h4>
                  <p className="text-[12px] text-secondary-foreground/40 font-body leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
