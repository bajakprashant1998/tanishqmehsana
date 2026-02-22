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
    <section className="relative w-full h-[80vh] md:h-[92vh] overflow-hidden bg-secondary">
      {/* Background Images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.03 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <motion.img
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: [1.03, 1.08] }}
            transition={{ duration: 8, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/60 to-secondary/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-secondary/20" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Floating gold particles - enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              left: `${8 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 5 + (i % 4) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Diamond sparkle effect */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-1 h-1 bg-primary/60 rounded-full hidden md:block"
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.div
        className="absolute top-[35%] right-[25%] w-0.5 h-0.5 bg-primary/40 rounded-full hidden md:block"
        animate={{
          scale: [0, 2, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4, delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 container h-full flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-8 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-secondary-foreground"
            >
              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-[2px] bg-gradient-to-r from-primary to-primary/30 mb-8"
              />

              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary font-body mb-4 border border-primary/20 px-4 py-1.5 rounded-full backdrop-blur-sm bg-primary/5"
              >
                {slides[current].subtitle}
              </motion.span>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1] mb-5">
                {slides[current].title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.35 + i * 0.12, duration: 0.6 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {i === 1 ? (
                      <span className="text-gradient-gold">{word}</span>
                    ) : word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-lg text-secondary-foreground/60 font-body mb-8 max-w-lg leading-relaxed"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="flex items-center gap-5"
              >
                <Link to={slides[current].href}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-gold-dark font-body tracking-wider px-10 py-6 text-sm shadow-luxury rounded-full">
                    {slides[current].cta}
                  </Button>
                </Link>
                <span className="text-xs font-body text-primary/70 border-l border-primary/20 pl-5 tracking-wide">
                  {slides[current].accent}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right-side decorative element */}
          <div className="hidden lg:flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative"
            >
              <div className="w-48 h-48 rounded-full border border-primary/10 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border border-primary/15 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block font-display text-3xl font-bold text-gradient-gold">
                      0{current + 1}
                    </span>
                    <span className="text-[10px] tracking-[0.3em] text-secondary-foreground/40 font-body uppercase">
                      / 0{slides.length}
                    </span>
                  </div>
                </div>
              </div>
              {/* Orbiting dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{ top: 0, left: "50%", marginLeft: -4 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                key={`orbit-${current}`}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide counter - right side */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group flex items-center gap-3"
          >
            <div className={`w-px transition-all duration-700 ${i === current ? "h-12 bg-primary" : "h-4 bg-secondary-foreground/15 group-hover:bg-secondary-foreground/30"}`} />
            <span className={`text-[10px] font-body transition-all duration-300 ${i === current ? "text-primary opacity-100" : "opacity-0 group-hover:opacity-40 text-secondary-foreground"}`}>
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation - redesigned */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6">
        <button onClick={prev} className="p-3 rounded-full border border-secondary-foreground/15 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-secondary-foreground/70 hover:text-primary">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="relative h-1">
              <div className={`rounded-full transition-all duration-700 ${i === current ? "w-12 bg-primary h-1" : "w-3 bg-secondary-foreground/20 hover:bg-secondary-foreground/35 h-1"}`} />
            </button>
          ))}
        </div>
        <button onClick={next} className="p-3 rounded-full border border-secondary-foreground/15 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-secondary-foreground/70 hover:text-primary">
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => setPaused(!paused)}
          className="p-2.5 rounded-full border border-secondary-foreground/10 hover:border-primary/30 transition-all text-secondary-foreground/40 hover:text-primary ml-2"
        >
          {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
        </button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-8 hidden md:flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[9px] tracking-[0.3em] text-secondary-foreground/30 font-body uppercase rotate-90 origin-center mb-6">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
