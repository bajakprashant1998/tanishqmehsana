import { ShieldCheck, RefreshCw, Award, Truck } from "lucide-react";
import { motion } from "framer-motion";

const indicators = [
  { icon: ShieldCheck, title: "BIS Hallmark", desc: "Every piece is BIS hallmark certified for purity" },
  { icon: Award, title: "GIA Certified", desc: "All diamonds come with international certification" },
  { icon: RefreshCw, title: "Easy Exchange", desc: "Lifetime exchange policy on gold jewelry" },
  { icon: Truck, title: "Insured Shipping", desc: "Free insured delivery across India" },
];

const TrustIndicators = () => {
  return (
    <section className="py-12 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 text-secondary-foreground"
            >
              <div className="p-2.5 rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-display font-semibold">{item.title}</h4>
                <p className="text-xs text-secondary-foreground/60 font-body">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
