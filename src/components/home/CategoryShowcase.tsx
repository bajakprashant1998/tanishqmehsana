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
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />
      <div className="absolute bottom-20 left-0 w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-body">Browse by</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">Our Collections</h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-5" />
        </motion.div>

        {/* Bento-grid layout - enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {categories.map((cat, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={isLarge ? "row-span-2" : ""}
              >
                <Link
                  to={cat.href}
                  className="group relative flex flex-col justify-end h-full rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-out"
                    loading="lazy"
                  />
                  {/* Multi-layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent group-hover:from-secondary/95 transition-all duration-500" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />

                  {/* Animated gold border on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-5 md:p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-secondary-foreground group-hover:text-primary transition-colors duration-300">{cat.name}</h3>
                        <p className="text-xs text-secondary-foreground/50 font-body mt-1">{cat.desc}</p>
                        <span className="inline-block text-[10px] font-body text-primary/70 mt-2 tracking-[0.2em] uppercase">{cat.count} DESIGNS</span>
                      </div>
                      <div className="p-2.5 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 backdrop-blur-sm">
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
