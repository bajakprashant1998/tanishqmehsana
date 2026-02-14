import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2, ShieldCheck, RefreshCw, Truck, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { allProducts } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Product Not Found</h1>
          <Link to="/products" className="text-primary font-body mt-4 inline-block">← Back to Products</Link>
        </div>
      </Layout>
    );
  }

  const similar = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <section className="py-6 md:py-10 bg-background">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground font-body mb-6 flex items-center gap-1">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/products" className="hover:text-primary">All Jewelry</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/products?category=${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <span className="text-xs tracking-[0.3em] uppercase text-primary font-body">{product.category}</span>
              <h1 className="font-display text-2xl md:text-3xl font-bold mt-1">{product.name}</h1>

              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
                <span className="text-xs text-muted-foreground font-body ml-2">{product.rating}/5</span>
              </div>

              <p className="text-3xl font-bold text-primary mt-4 font-body">{product.price}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">Inclusive of all taxes</p>

              <p className="text-sm text-foreground/80 font-body mt-6 leading-relaxed">{product.description}</p>

              {/* Specs */}
              <div className="mt-6 border border-border rounded-xl p-4 space-y-3">
                <h3 className="font-display text-sm font-semibold">Specifications</h3>
                <div className="grid grid-cols-2 gap-3 text-sm font-body">
                  <div><span className="text-muted-foreground">Metal:</span> <span className="font-medium">{product.metal}</span></div>
                  <div><span className="text-muted-foreground">Purity:</span> <span className="font-medium">{product.purity}</span></div>
                  <div><span className="text-muted-foreground">Weight:</span> <span className="font-medium">{product.weight}</span></div>
                  <div><span className="text-muted-foreground">Dimensions:</span> <span className="font-medium">{product.dimensions}</span></div>
                  <div><span className="text-muted-foreground">Occasion:</span> <span className="font-medium">{product.occasion}</span></div>
                  <div><span className="text-muted-foreground">In Stock:</span> <span className="font-medium text-primary">Yes</span></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-gold-dark font-body">
                  Book Appointment
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheck, label: "BIS Hallmark" },
                  { icon: RefreshCw, label: "Lifetime Exchange" },
                  { icon: Truck, label: "Free Shipping" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50 text-center">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-body text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Similar Products */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {similar.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group block bg-background rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold line-clamp-1">{p.name}</h3>
                      <p className="text-xs text-muted-foreground font-body mt-1">{p.metal}</p>
                      <p className="text-base font-semibold text-primary mt-2 font-body">{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
