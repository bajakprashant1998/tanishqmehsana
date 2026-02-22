import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  { name: "Priya Sharma", initials: "PS", text: "The bridal set I purchased was absolutely stunning. The craftsmanship is unmatched and the team helped me find the perfect pieces for my wedding.", rating: 5, occasion: "Wedding" },
  { name: "Rajesh Patel", initials: "RP", text: "Bought a diamond ring for our anniversary. The certification and quality gave me full confidence. Exceptional service at Mehsana showroom.", rating: 5, occasion: "Anniversary" },
  { name: "Anita Desai", initials: "AD", text: "Love the gold bangle collection! The designs are traditional yet modern. The exchange policy is very fair and transparent.", rating: 4, occasion: "Daily Wear" },
  { name: "Meera Joshi", initials: "MJ", text: "The AI try-on feature helped me visualize the necklace before visiting the store. Such innovative technology for jewelry shopping!", rating: 5, occasion: "Gift" },
];

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-primary/15 to-transparent hidden md:block" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-body">What our customers say</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">Testimonials</h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-5" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group p-7 rounded-2xl bg-card border transition-all duration-500 relative ${
                hoveredIndex === i
                  ? "border-primary/40 shadow-luxury scale-[1.02]"
                  : "border-border hover:border-primary/20"
              }`}
            >
              {/* Quote mark */}
              <Quote className={`h-10 w-10 absolute top-5 right-5 transition-all duration-500 ${
                hoveredIndex === i ? "text-primary/20" : "text-primary/8"
              }`} />

              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>

              <p className="text-sm text-foreground/75 font-body leading-relaxed mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-body font-semibold shrink-0 transition-all duration-300 ${
                  hoveredIndex === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-display font-semibold block">{t.name}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">{t.occasion}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
