import { Heart, Star, Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";

const featured = allProducts.slice(0, 8);

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="py-16 md:py-24 bg-cream relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">Curated for you</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Featured Pieces</h2>
            <div className="w-12 h-0.5 bg-primary mt-3" />
          </div>
          <Link to="/products" className="text-sm font-body text-primary hover:text-gold-dark transition-colors hidden md:flex items-center gap-1">
            View All <span className="text-lg">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="group relative bg-background rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-500">
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Hover overlay with actions */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="p-2.5 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                        title="Quick View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="p-2.5 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors z-10"
                    >
                      <Heart className={`h-4 w-4 transition-colors ${wishlist.has(product.id) ? "fill-primary text-primary" : "text-foreground/50 hover:text-primary"}`} />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-primary/10 text-primary font-body backdrop-blur-sm">
                        {product.category}
                      </span>
                      {product.isNew && (
                        <span className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-primary text-primary-foreground font-body">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-sm font-semibold line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground font-body mt-1">{product.metal} · {product.weight}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < product.rating ? "fill-primary text-primary" : "text-border"}`} />
                    ))}
                    <span className="text-[10px] text-muted-foreground font-body ml-1">({product.rating})</span>
                  </div>

                  <p className="text-base font-semibold text-primary mt-2 font-body">{product.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/products" className="flex justify-center mt-10 md:hidden">
          <Button variant="outline" className="font-body border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
            View All Products →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
