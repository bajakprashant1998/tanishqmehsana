import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Timeless Elegance",
    subtitle: "Bridal Collection 2026",
    description: "Discover handcrafted bridal sets that celebrate your most precious moments",
    cta: "Explore Bridal",
    href: "/products?category=bridal",
    gradient: "from-amber-900/80 via-amber-800/60 to-transparent",
  },
  {
    title: "Diamonds Forever",
    subtitle: "Certified Solitaire Collection",
    description: "GIA-certified diamonds set in 18K gold, designed to dazzle for a lifetime",
    cta: "Shop Diamonds",
    href: "/products?category=diamond",
    gradient: "from-slate-900/80 via-slate-800/60 to-transparent",
  },
  {
    title: "Gold Treasures",
    subtitle: "22K Pure Gold Jewelry",
    description: "BIS hallmark certified gold jewelry — investment you can wear",
    cta: "Shop Gold",
    href: "/products?category=gold",
    gradient: "from-yellow-900/80 via-yellow-800/60 to-transparent",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-secondary">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-r ${slides[current].gradient}`}
        >
          {/* Placeholder shimmer background */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-navy/80 to-secondary" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--gold)/0.15)_0%,_transparent_70%)]" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-secondary-foreground"
          >
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-body mb-3">
              {slides[current].subtitle}
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              {slides[current].title}
            </h1>
            <p className="text-base md:text-lg text-secondary-foreground/80 font-body mb-8 max-w-md">
              {slides[current].description}
            </p>
            <Link to={slides[current].href}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-gold-dark font-body tracking-wide px-8">
                {slides[current].cta}
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6">
        <button onClick={prev} className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors text-secondary-foreground">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-4 bg-secondary-foreground/30"
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors text-secondary-foreground">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
