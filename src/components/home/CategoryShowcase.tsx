import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Rings", href: "/products?category=rings", icon: "💍", desc: "Engagement & Everyday" },
  { name: "Necklaces", href: "/products?category=necklaces", icon: "📿", desc: "Chains & Pendants" },
  { name: "Earrings", href: "/products?category=earrings", icon: "✨", desc: "Studs & Drops" },
  { name: "Bridal", href: "/products?category=bridal", icon: "👑", desc: "Wedding Collections" },
  { name: "Gold", href: "/products?category=gold", icon: "🏅", desc: "22K & 18K Gold" },
  { name: "Diamond", href: "/products?category=diamond", icon: "💎", desc: "Certified Diamonds" },
];

const CategoryShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">Browse by</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Categories</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={cat.href}
                className="group flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-luxury transition-all duration-300"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                <h3 className="font-display text-lg font-semibold">{cat.name}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
