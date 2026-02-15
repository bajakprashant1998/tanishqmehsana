import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import catRings from "@/assets/categories/rings.jpg";
import catNecklaces from "@/assets/categories/necklaces.jpg";
import catEarrings from "@/assets/categories/earrings.jpg";
import catBridal from "@/assets/categories/bridal.jpg";
import catGold from "@/assets/categories/gold.jpg";
import catDiamond from "@/assets/categories/diamond.jpg";

const categories = [
  { name: "Rings", href: "/products?category=rings", image: catRings, desc: "Engagement & Everyday", count: "120+" },
  { name: "Necklaces", href: "/products?category=necklaces", image: catNecklaces, desc: "Chains & Pendants", count: "85+" },
  { name: "Earrings", href: "/products?category=earrings", image: catEarrings, desc: "Studs & Drops", count: "95+" },
  { name: "Bridal", href: "/products?category=bridal", image: catBridal, desc: "Wedding Collections", count: "60+" },
  { name: "Gold", href: "/products?category=gold", image: catGold, desc: "22K & 18K Gold", count: "200+" },
  { name: "Diamond", href: "/products?category=diamond", image: catDiamond, desc: "Certified Diamonds", count: "75+" },
];

const CategoryShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">Browse by</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Our Collections</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </motion.div>

        {/* Bento-grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {categories.map((cat, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={isLarge ? "row-span-2" : ""}
              >
                <Link
                  to={cat.href}
                  className="group relative flex flex-col justify-end h-full rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent group-hover:from-secondary/90 transition-all duration-500" />

                  {/* Animated gold border on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500" />

                  {/* Content */}
                  <div className="relative z-10 p-4 md:p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-lg md:text-xl font-bold text-secondary-foreground">{cat.name}</h3>
                        <p className="text-xs text-secondary-foreground/60 font-body mt-0.5">{cat.desc}</p>
                        <span className="inline-block text-[10px] font-body text-primary mt-1.5 tracking-wider">{cat.count} DESIGNS</span>
                      </div>
                      <div className="p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
