import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import ring1 from "@/assets/products/ring-1.jpg";
import necklace1 from "@/assets/products/necklace-1.jpg";
import earring1 from "@/assets/products/earring-1.jpg";
import bangle1 from "@/assets/products/bangle-1.jpg";
import ring2 from "@/assets/products/ring-2.jpg";
import earring2 from "@/assets/products/earring-2.jpg";

const posts = [ring1, necklace1, earring1, bangle1, ring2, earring2];

const InstagramFeed = () => {
  return (
    <section className="py-20 md:py-24 bg-cream relative overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 text-primary mb-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10"
          >
            <Instagram className="h-4 w-4" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-body font-medium">@yagnikjewellery</span>
          </motion.div>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Follow Us on Instagram</h2>
          <div className="w-14 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {posts.map((img, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img src={img} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                <div className="p-3 rounded-full bg-background/90 backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
