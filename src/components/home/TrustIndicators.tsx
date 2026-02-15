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
    const duration = 1500;
    const steps = 40;
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

  const formatted = value >= 1000 ? `${(display / 1000).toFixed(display >= value ? 0 : 0)}K` : display.toString();
  const finalFormatted = value >= 1000 && display >= value ? `${value / 1000}K` : display >= value ? display.toString() : formatted;

  return (
    <span ref={ref} className="font-display text-2xl md:text-3xl font-bold text-primary">
      {value >= 10000 ? `${Math.floor(display / 1000)}K` : display}{suffix}
    </span>
  );
};

const TrustIndicators = () => {
  return (
    <section className="bg-secondary relative overflow-hidden">
      {/* Stats bar */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-xs text-secondary-foreground/50 font-body mt-1 tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="container py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 text-secondary-foreground group"
            >
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-display font-semibold">{item.title}</h4>
                <p className="text-xs text-secondary-foreground/50 font-body leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
