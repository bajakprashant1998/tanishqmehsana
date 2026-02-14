import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Heart, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { allProducts, categories, metals, occasions, sortOptions } from "@/data/products";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const mappedCategory = initialCategory
    ? categories.find((c) => c.toLowerCase() === initialCategory.toLowerCase()) || "All"
    : "All";

  const [selectedCategory, setSelectedCategory] = useState(mappedCategory);
  const [selectedMetal, setSelectedMetal] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [weightRange, setWeightRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = allProducts.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedMetal !== "All" && p.metal !== selectedMetal) return false;
      if (selectedOccasion !== "All" && p.occasion !== selectedOccasion) return false;
      if (p.priceNum < priceRange[0] || p.priceNum > priceRange[1]) return false;
      if (p.weightNum < weightRange[0] || p.weightNum > weightRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc": items.sort((a, b) => a.priceNum - b.priceNum); break;
      case "price-desc": items.sort((a, b) => b.priceNum - a.priceNum); break;
      case "weight-asc": items.sort((a, b) => a.weightNum - b.weightNum); break;
      case "weight-desc": items.sort((a, b) => b.weightNum - a.weightNum); break;
      case "newest": items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return items;
  }, [selectedCategory, selectedMetal, selectedOccasion, priceRange, weightRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedMetal("All");
    setSelectedOccasion("All");
    setPriceRange([0, 500000]);
    setWeightRange([0, 50]);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-full font-body transition-colors ${
                selectedCategory === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Metal Type</h4>
        <div className="flex flex-wrap gap-2">
          {metals.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetal(m)}
              className={`text-xs px-3 py-1.5 rounded-full font-body transition-colors ${
                selectedMetal === m
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Occasion</h4>
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <button
              key={o}
              onClick={() => setSelectedOccasion(o)}
              className={`text-xs px-3 py-1.5 rounded-full font-body transition-colors ${
                selectedOccasion === o
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-sm font-semibold mb-3">
          Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
        </h4>
        <Slider
          min={0} max={500000} step={5000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
      </div>

      <div>
        <h4 className="font-display text-sm font-semibold mb-3">
          Weight: {weightRange[0]}g - {weightRange[1]}g
        </h4>
        <Slider
          min={0} max={50} step={1}
          value={weightRange}
          onValueChange={setWeightRange}
          className="mt-2"
        />
      </div>

      <Button variant="outline" size="sm" onClick={clearFilters} className="w-full font-body">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-background min-h-screen">
        <div className="container">
          {/* Breadcrumb */}
          <div className="text-xs text-muted-foreground font-body mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">
              {selectedCategory !== "All" ? selectedCategory : "All Jewelry"}
            </span>
          </div>

          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                {selectedCategory !== "All" ? selectedCategory : "All Jewelry"}
              </h1>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {filtered.length} pieces found
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 text-sm font-body lg:hidden px-3 py-2 border border-border rounded-lg"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] text-xs font-body">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="text-xs font-body">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <FilterPanel />
            </aside>

            {/* Mobile Filters Overlay */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  className="fixed inset-0 z-50 bg-background p-6 overflow-y-auto lg:hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold">Filters</h3>
                    <button onClick={() => setFiltersOpen(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <FilterPanel />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground font-body">No products found matching your filters.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4 font-body">
                    Clear Filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
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
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                          >
                            <Heart className="h-4 w-4 text-foreground/60 hover:text-primary" />
                          </button>
                          <span className="absolute top-3 left-3 text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-primary/10 text-primary font-body backdrop-blur-sm">
                            {product.category}
                          </span>
                          {product.isNew && (
                            <span className="absolute bottom-3 left-3 text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-foreground text-background font-body">
                              New
                            </span>
                          )}
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
              ) : (
                <div className="space-y-4">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="group flex gap-4 bg-background rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-300 p-3"
                      >
                        <div className="w-28 h-28 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 py-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] tracking-wider uppercase text-primary font-body">{product.category}</span>
                              <h3 className="font-display text-base font-semibold mt-0.5">{product.name}</h3>
                            </div>
                            <Heart className="h-4 w-4 text-foreground/40 hover:text-primary shrink-0 mt-1" />
                          </div>
                          <p className="text-xs text-muted-foreground font-body mt-1">{product.metal} · {product.weight} · {product.occasion}</p>
                          <p className="text-lg font-semibold text-primary mt-2 font-body">{product.price}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
