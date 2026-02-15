import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const rates = [
  { label: "Gold 24K", price: "₹7,450/g", change: "+0.3%", up: true },
  { label: "Gold 22K", price: "₹6,830/g", change: "+0.2%", up: true },
  { label: "Gold 18K", price: "₹5,590/g", change: "+0.1%", up: true },
  { label: "Silver", price: "₹95/g", change: "-0.1%", up: false },
  { label: "Platinum", price: "₹3,120/g", change: "+0.5%", up: true },
];

const GoldRateTicker = () => {
  return (
    <div className="bg-secondary border-b border-secondary-foreground/10 overflow-hidden py-2.5">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...rates, ...rates].map((rate, i) => (
          <div key={i} className="flex items-center gap-2 text-secondary-foreground/70 shrink-0">
            <span className="text-xs font-body font-medium text-secondary-foreground/90">{rate.label}</span>
            <span className="text-xs font-body text-primary font-semibold">{rate.price}</span>
            <span className={`flex items-center gap-0.5 text-[10px] font-body ${rate.up ? "text-green-400" : "text-red-400"}`}>
              {rate.up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
              {rate.change}
            </span>
            <span className="text-secondary-foreground/20 ml-4">|</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GoldRateTicker;
