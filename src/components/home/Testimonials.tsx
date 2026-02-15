import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Priya Sharma", initials: "PS", text: "The bridal set I purchased was absolutely stunning. The craftsmanship is unmatched and the team helped me find the perfect pieces for my wedding.", rating: 5, occasion: "Wedding" },
  { name: "Rajesh Patel", initials: "RP", text: "Bought a diamond ring for our anniversary. The certification and quality gave me full confidence. Exceptional service at Mehsana showroom.", rating: 5, occasion: "Anniversary" },
  { name: "Anita Desai", initials: "AD", text: "Love the gold bangle collection! The designs are traditional yet modern. The exchange policy is very fair and transparent.", rating: 4, occasion: "Daily Wear" },
  { name: "Meera Joshi", initials: "MJ", text: "The AI try-on feature helped me visualize the necklace before visiting the store. Such innovative technology for jewelry shopping!", rating: 5, occasion: "Gift" },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">What our customers say</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Testimonials</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-luxury transition-all duration-500 relative"
            >
              {/* Quote mark */}
              <Quote className="h-8 w-8 text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>

              <p className="text-sm text-foreground/80 font-body leading-relaxed mb-5 italic">"{t.text}"</p>

              <div className="flex items-center gap-3">
                {/* Avatar initial */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-body font-semibold text-primary shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-display font-semibold block">{t.name}</span>
                  <span className="text-[10px] tracking-wider uppercase text-muted-foreground font-body">{t.occasion}</span>
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
