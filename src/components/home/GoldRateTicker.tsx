import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type MetalRate = {
  label: string;
  price: string;
  priceNum: number;
  up: boolean;
};

const fallbackRates: MetalRate[] = [
  { label: "Gold 24K", price: "₹7,450/g", priceNum: 7450, up: true },
  { label: "Gold 22K", price: "₹6,830/g", priceNum: 6830, up: true },
  { label: "Gold 18K", price: "₹5,590/g", priceNum: 5590, up: true },
  { label: "Silver", price: "₹95/g", priceNum: 95, up: false },
  { label: "Platinum", price: "₹3,120/g", priceNum: 3120, up: true },
];

const formatPrice = (num: number) => `₹${num.toLocaleString("en-IN")}/g`;

const GoldRateTicker = () => {
  const [rates, setRates] = useState<MetalRate[]>(fallbackRates);
  const [source, setSource] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/fetch-gold-rates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });
      const data = await resp.json();
      if (data.rates) {
        const r = data.rates;
        const newRates: MetalRate[] = [
          { label: "Gold 24K", price: formatPrice(r.gold_24k_per_gram), priceNum: r.gold_24k_per_gram, up: true },
          { label: "Gold 22K", price: formatPrice(r.gold_22k_per_gram), priceNum: r.gold_22k_per_gram, up: true },
          { label: "Gold 18K", price: formatPrice(r.gold_18k_per_gram), priceNum: r.gold_18k_per_gram, up: true },
          { label: "Silver", price: formatPrice(r.silver_per_gram), priceNum: r.silver_per_gram, up: r.silver_per_gram > 90 },
          { label: "Platinum", price: formatPrice(r.platinum_per_gram), priceNum: r.platinum_per_gram, up: true },
        ];
        setRates(newRates);
        setSource(data.source === "fallback" ? "" : "tanishq.co.in");
      }
    } catch (err) {
      console.error("Failed to fetch gold rates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Refresh every 30 minutes
    const interval = setInterval(fetchRates, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
            </span>
            {i === 0 && source && (
              <span className="text-[9px] font-body text-secondary-foreground/40 ml-1">
                Source: {source}
              </span>
            )}
            <span className="text-secondary-foreground/20 ml-4">|</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GoldRateTicker;
