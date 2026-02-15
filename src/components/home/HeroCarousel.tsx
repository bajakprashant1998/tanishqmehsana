import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBridal from "@/assets/hero-bridal.jpg";
import heroDiamond from "@/assets/hero-diamond.jpg";
import heroGold from "@/assets/hero-gold.jpg";

const slides = [
  {
    title: "Timeless Elegance",
    subtitle: "Bridal Collection 2026",
    description: "Discover handcrafted bridal sets that celebrate your most precious moments",
    cta: "Explore Bridal",
    href: "/products?category=bridal",
    image: heroBridal,
    accent: "From ₹85,000",
  },
  {
    title: "Diamonds Forever",
    subtitle: "Certified Solitaire Collection",
    description: "GIA-certified diamonds set in 18K gold, designed to dazzle for a lifetime",
    cta: "Shop Diamonds",
    href: "/products?category=diamond",
    image: heroDiamond,
    accent: "Starting ₹45,000",
  },
  {
    title: "Gold Treasures",
    subtitle: "22K Pure Gold Jewelry",
    description: "BIS hallmark certified gold jewelry — investment you can wear",
    cta: "Shop Gold",
    href: "/products?category=gold",
    image: heroGold,
    accent: "Exchange Offers",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <section className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden bg-secondary">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/50 to-secondary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Floating gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ left: `${20 + i * 15}%`, top: `${30 + i * 8}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container h-full flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-8 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-secondary-foreground"
            >
              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-0.5 bg-primary mb-6"
              />

              <span className="inline-block text-xs tracking-[0.35em] uppercase text-primary font-body mb-3 border border-primary/20 px-3 py-1 rounded-full">
                {slides[current].subtitle}
              </span>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4">
                {slides[current].title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {i === 1 ? (
                      <span className="text-gradient-gold">{word}</span>
                    ) : word}
                  </motion.span>
                ))}
              </h1>

              <p className="text-base md:text-lg text-secondary-foreground/70 font-body mb-6 max-w-md leading-relaxed">
                {slides[current].description}
              </p>

              <div className="flex items-center gap-4">
                <Link to={slides[current].href}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-gold-dark font-body tracking-wide px-8 shadow-luxury">
                    {slides[current].cta}
                  </Button>
                </Link>
                <span className="text-xs font-body text-primary/80 border-l border-primary/30 pl-4">
                  {slides[current].accent}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group flex items-center gap-3"
          >
            <div className={`w-px transition-all duration-500 ${i === current ? "h-10 bg-primary" : "h-4 bg-secondary-foreground/20 group-hover:bg-secondary-foreground/40"}`} />
            <span className={`text-xs font-body transition-all ${i === current ? "text-primary opacity-100" : "opacity-0 group-hover:opacity-50 text-secondary-foreground"}`}>
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5">
        <button onClick={prev} className="p-2.5 rounded-full border border-secondary-foreground/20 hover:border-primary hover:bg-primary/10 transition-all text-secondary-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative"
            >
              <div className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-primary" : "w-3 bg-secondary-foreground/25 hover:bg-secondary-foreground/40"}`} />
              {i === current && (
                <motion.div
                  layoutId="hero-progress"
                  className="absolute inset-0 h-1 rounded-full bg-primary"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>
        <button onClick={next} className="p-2.5 rounded-full border border-secondary-foreground/20 hover:border-primary hover:bg-primary/10 transition-all text-secondary-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => setPaused(!paused)}
          className="p-2 rounded-full border border-secondary-foreground/15 hover:border-primary/40 transition-all text-secondary-foreground/50 hover:text-primary ml-1"
        >
          {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
