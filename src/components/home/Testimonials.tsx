import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Priya Sharma", text: "The bridal set I purchased was absolutely stunning. The craftsmanship is unmatched and the team helped me find the perfect pieces for my wedding.", rating: 5, occasion: "Wedding" },
  { name: "Rajesh Patel", text: "Bought a diamond ring for our anniversary. The certification and quality gave me full confidence. Exceptional service at Mehsana showroom.", rating: 5, occasion: "Anniversary" },
  { name: "Anita Desai", text: "Love the gold bangle collection! The designs are traditional yet modern. The exchange policy is very fair and transparent.", rating: 4, occasion: "Daily Wear" },
  { name: "Meera Joshi", text: "The AI try-on feature helped me visualize the necklace before visiting the store. Such innovative technology for jewelry shopping!", rating: 5, occasion: "Gift" },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">What our customers say</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Testimonials</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:shadow-luxury transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>
              <p className="text-sm text-foreground/80 font-body leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-display font-semibold">{t.name}</span>
                <span className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-accent text-accent-foreground font-body">{t.occasion}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
