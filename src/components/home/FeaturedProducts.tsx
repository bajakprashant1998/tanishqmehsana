import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Celestial Diamond Ring", price: "₹1,25,000", weight: "3.2g", metal: "18K White Gold", category: "Rings" },
  { id: 2, name: "Maharani Bridal Necklace", price: "₹3,85,000", weight: "42g", metal: "22K Gold", category: "Bridal" },
  { id: 3, name: "Aurora Pearl Earrings", price: "₹45,000", weight: "5.8g", metal: "18K Gold", category: "Earrings" },
  { id: 4, name: "Infinity Solitaire Pendant", price: "₹2,10,000", weight: "4.5g", metal: "Platinum", category: "Diamond" },
  { id: 5, name: "Heritage Gold Bangle", price: "₹1,80,000", weight: "28g", metal: "22K Gold", category: "Gold" },
  { id: 6, name: "Rose Gold Stackable Ring", price: "₹32,000", weight: "2.1g", metal: "18K Rose Gold", category: "Rings" },
  { id: 7, name: "Temple Jhumka Earrings", price: "₹68,000", weight: "12g", metal: "22K Gold", category: "Earrings" },
  { id: 8, name: "Diamond Tennis Bracelet", price: "₹4,50,000", weight: "15g", metal: "18K White Gold", category: "Diamond" },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">Curated for you</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Featured Pieces</h2>
          </div>
          <Link to="/products" className="text-sm font-body text-primary hover:text-gold-dark transition-colors hidden md:block">
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="group block bg-background rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="relative aspect-square bg-gradient-to-br from-muted to-accent overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-30">💎</span>
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                  <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <Heart className="h-4 w-4 text-foreground/60 hover:text-primary" />
                  </button>
                  <span className="absolute top-3 left-3 text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-primary/10 text-primary font-body">
                    {product.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1">{product.metal} · {product.weight}</p>
                  <p className="text-base font-semibold text-primary mt-2 font-body">{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link to="/products" className="block text-center mt-8 text-sm font-body text-primary hover:text-gold-dark transition-colors md:hidden">
          View All Products →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
