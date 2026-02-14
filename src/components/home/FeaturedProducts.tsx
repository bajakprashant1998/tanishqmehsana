import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { allProducts } from "@/data/products";

const featured = allProducts.slice(0, 8);

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
          {featured.map((product, i) => (
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
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                  <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <Heart className="h-4 w-4 text-foreground/60 hover:text-primary" />
                  </button>
                  <span className="absolute top-3 left-3 text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-primary/10 text-primary font-body backdrop-blur-sm">
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
