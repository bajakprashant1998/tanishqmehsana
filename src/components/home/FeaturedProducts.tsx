import { Heart, Star, Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";

const tabs = ["All", "Rings", "Necklaces", "Earrings", "Gold", "Diamond"];
const featured = allProducts.slice(0, 8);

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState("All");

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = activeTab === "All"
    ? featured
    : featured.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-body">Curated for you</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">Featured Pieces</h2>
            <div className="w-14 h-[2px] bg-gradient-to-r from-primary to-primary/30 mt-4" />
          </div>
          <Link to="/products" className="text-sm font-body text-primary hover:text-gold-dark transition-colors hidden md:flex items-center gap-2 group">
            View All
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none"
        >
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-body tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-luxury"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {(filtered.length > 0 ? filtered : featured).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              layout
            >
              <div className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-luxury hover:border-primary/20 transition-all duration-500">
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover overlay with actions */}
                    <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="p-3 rounded-full bg-background/95 backdrop-blur-md shadow-elegant hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        title="Quick View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="p-3 rounded-full bg-background/95 backdrop-blur-md shadow-elegant hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-sm transition-all z-10 group/heart"
                    >
                      <Heart className={`h-4 w-4 transition-all duration-300 ${wishlist.has(product.id) ? "fill-primary text-primary scale-110" : "text-foreground/40 group-hover/heart:text-primary"}`} />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-background/90 text-primary font-body backdrop-blur-md">
                        {product.category}
                      </span>
                      {product.isNew && (
                        <span className="text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-primary text-primary-foreground font-body shadow-luxury">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="p-4 md:p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-sm md:text-base font-semibold line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-[11px] text-muted-foreground font-body mt-1.5">{product.metal} · {product.weight}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < product.rating ? "fill-primary text-primary" : "text-border"}`} />
                    ))}
                    <span className="text-[10px] text-muted-foreground font-body ml-1.5">({product.rating})</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-primary font-body">{product.price}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/products" className="flex justify-center mt-12 md:hidden">
          <Button variant="outline" className="font-body border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8">
            View All Products →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
