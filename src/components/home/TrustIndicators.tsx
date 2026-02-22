import { ShieldCheck, RefreshCw, Award, Truck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const indicators = [
  { icon: ShieldCheck, title: "BIS Hallmark", desc: "Every piece is BIS hallmark certified for purity" },
  { icon: Award, title: "GIA Certified", desc: "All diamonds come with international certification" },
  { icon: RefreshCw, title: "Easy Exchange", desc: "Lifetime exchange policy on gold jewelry" },
  { icon: Truck, title: "Insured Shipping", desc: "Free insured delivery across India" },
];

const stats = [
  { value: 25, suffix: "+", label: "Years of Trust" },
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 10000, suffix: "+", label: "Designs" },
  { value: 100, suffix: "%", label: "Certified Purity" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
      {value >= 10000 ? `${Math.floor(display / 1000)}K` : display}{suffix}
    </span>
  );
};

const TrustIndicators = () => {
  return (
    <section className="bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Stats bar */}
      <div className="border-b border-secondary-foreground/8">
        <div className="container py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center relative"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-[10px] text-secondary-foreground/40 font-body mt-2 tracking-[0.25em] uppercase">{stat.label}</p>
                {/* Divider between items on desktop */}
                {i < stats.length - 1 && (
                  <div className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 w-px h-10 bg-secondary-foreground/8 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="container py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {indicators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 text-secondary-foreground group p-4 rounded-xl hover:bg-secondary-foreground/[0.03] transition-all duration-300"
            >
              <div className="p-3.5 rounded-2xl bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-luxury transition-all duration-300 shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-display font-semibold">{item.title}</h4>
                <p className="text-[11px] text-secondary-foreground/40 font-body leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
