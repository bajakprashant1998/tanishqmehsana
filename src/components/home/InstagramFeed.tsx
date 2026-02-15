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
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-2">
            <Instagram className="h-5 w-5" />
            <span className="text-xs tracking-[0.3em] uppercase font-body">@tanishqmehsana</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">Follow Us on Instagram</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-3" />
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {posts.map((img, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/tanaboramehsana"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <img src={img} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-secondary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
