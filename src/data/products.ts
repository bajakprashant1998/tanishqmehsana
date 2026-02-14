import ring1 from "@/assets/products/ring-1.jpg";
import necklace1 from "@/assets/products/necklace-1.jpg";
import earring1 from "@/assets/products/earring-1.jpg";
import pendant1 from "@/assets/products/pendant-1.jpg";
import bangle1 from "@/assets/products/bangle-1.jpg";
import ring2 from "@/assets/products/ring-2.jpg";
import earring2 from "@/assets/products/earring-2.jpg";
import bracelet1 from "@/assets/products/bracelet-1.jpg";

export interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  weight: string;
  weightNum: number;
  metal: string;
  category: string;
  occasion: string;
  purity: string;
  dimensions: string;
  description: string;
  image: string;
  images: string[];
  inStock: boolean;
  isNew: boolean;
  rating: number;
}

export const allProducts: Product[] = [
  {
    id: 1, name: "Celestial Diamond Ring", price: "₹1,25,000", priceNum: 125000,
    weight: "3.2g", weightNum: 3.2, metal: "18K White Gold", category: "Rings",
    occasion: "Engagement", purity: "18K (75% Gold)", dimensions: "Ring Size: 14",
    description: "A breathtaking solitaire ring featuring a brilliant-cut diamond set in 18K white gold. The celestial design captures light from every angle, making it the perfect symbol of eternal love.",
    image: ring1, images: [ring1, ring1, ring1], inStock: true, isNew: true, rating: 5,
  },
  {
    id: 2, name: "Maharani Bridal Necklace", price: "₹3,85,000", priceNum: 385000,
    weight: "42g", weightNum: 42, metal: "22K Gold", category: "Bridal",
    occasion: "Wedding", purity: "22K (91.6% Gold)", dimensions: "Length: 18 inches",
    description: "An opulent bridal necklace inspired by royal Rajasthani heritage. Crafted in 22K gold with intricate kundan work, polki diamonds, and delicate pearl drops.",
    image: necklace1, images: [necklace1, necklace1, necklace1], inStock: true, isNew: false, rating: 5,
  },
  {
    id: 3, name: "Aurora Pearl Earrings", price: "₹45,000", priceNum: 45000,
    weight: "5.8g", weightNum: 5.8, metal: "18K Gold", category: "Earrings",
    occasion: "Daily Wear", purity: "18K (75% Gold)", dimensions: "Drop: 2.5cm",
    description: "Elegant pearl drop earrings in an 18K gold setting. The aurora-inspired design adds a touch of sophistication to any outfit, from office wear to evening occasions.",
    image: earring1, images: [earring1, earring1, earring1], inStock: true, isNew: false, rating: 4,
  },
  {
    id: 4, name: "Infinity Solitaire Pendant", price: "₹2,10,000", priceNum: 210000,
    weight: "4.5g", weightNum: 4.5, metal: "Platinum", category: "Diamond",
    occasion: "Anniversary", purity: "Pt 950", dimensions: "Pendant: 1.2cm, Chain: 16 inches",
    description: "A stunning GIA-certified solitaire diamond pendant set in platinum. The infinity-inspired bail design symbolizes endless love and commitment.",
    image: pendant1, images: [pendant1, pendant1, pendant1], inStock: true, isNew: true, rating: 5,
  },
  {
    id: 5, name: "Heritage Gold Bangle", price: "₹1,80,000", priceNum: 180000,
    weight: "28g", weightNum: 28, metal: "22K Gold", category: "Gold",
    occasion: "Festive", purity: "22K (91.6% Gold)", dimensions: "Inner Diameter: 6.2cm",
    description: "A magnificent 22K gold bangle featuring traditional Indian filigree work. This heritage piece showcases the finest craftsmanship passed down through generations.",
    image: bangle1, images: [bangle1, bangle1, bangle1], inStock: true, isNew: false, rating: 5,
  },
  {
    id: 6, name: "Rose Gold Stackable Ring", price: "₹32,000", priceNum: 32000,
    weight: "2.1g", weightNum: 2.1, metal: "18K Rose Gold", category: "Rings",
    occasion: "Daily Wear", purity: "18K (75% Gold)", dimensions: "Ring Size: 12",
    description: "A delicate stackable ring in warm 18K rose gold with subtle diamond accents. Perfect for layering or wearing solo for an understated luxury look.",
    image: ring2, images: [ring2, ring2, ring2], inStock: true, isNew: true, rating: 4,
  },
  {
    id: 7, name: "Temple Jhumka Earrings", price: "₹68,000", priceNum: 68000,
    weight: "12g", weightNum: 12, metal: "22K Gold", category: "Earrings",
    occasion: "Festive", purity: "22K (91.6% Gold)", dimensions: "Drop: 4cm",
    description: "Traditional South Indian temple jhumka earrings crafted in 22K gold. Features intricate temple motifs with dangling gold balls for a classic festive look.",
    image: earring2, images: [earring2, earring2, earring2], inStock: true, isNew: false, rating: 5,
  },
  {
    id: 8, name: "Diamond Tennis Bracelet", price: "₹4,50,000", priceNum: 450000,
    weight: "15g", weightNum: 15, metal: "18K White Gold", category: "Diamond",
    occasion: "Anniversary", purity: "18K (75% Gold)", dimensions: "Length: 7 inches",
    description: "A timeless diamond tennis bracelet featuring 40 brilliant-cut diamonds set in 18K white gold. Each diamond is hand-selected for superior cut, clarity, and brilliance.",
    image: bracelet1, images: [bracelet1, bracelet1, bracelet1], inStock: true, isNew: false, rating: 5,
  },
  {
    id: 9, name: "Kundan Choker Necklace", price: "₹2,95,000", priceNum: 295000,
    weight: "35g", weightNum: 35, metal: "22K Gold", category: "Necklaces",
    occasion: "Wedding", purity: "22K (91.6% Gold)", dimensions: "Length: 14 inches",
    description: "An exquisite kundan choker necklace set in 22K gold with uncut diamonds and precious stones. A masterpiece of Mughal-era inspired jewelry design.",
    image: necklace1, images: [necklace1, necklace1, necklace1], inStock: true, isNew: true, rating: 5,
  },
  {
    id: 10, name: "Gold Chain Necklace", price: "₹1,45,000", priceNum: 145000,
    weight: "18g", weightNum: 18, metal: "22K Gold", category: "Necklaces",
    occasion: "Daily Wear", purity: "22K (91.6% Gold)", dimensions: "Length: 20 inches",
    description: "A classic 22K gold chain necklace with a modern twist. The interlocking links create a fluid, contemporary design suitable for everyday elegance.",
    image: bangle1, images: [bangle1, bangle1, bangle1], inStock: true, isNew: false, rating: 4,
  },
  {
    id: 11, name: "Diamond Halo Studs", price: "₹85,000", priceNum: 85000,
    weight: "3.6g", weightNum: 3.6, metal: "18K White Gold", category: "Diamond",
    occasion: "Daily Wear", purity: "18K (75% Gold)", dimensions: "Diameter: 0.8cm",
    description: "Classic diamond halo stud earrings with a center stone surrounded by a ring of smaller diamonds. Set in 18K white gold for maximum brilliance.",
    image: earring1, images: [earring1, earring1, earring1], inStock: true, isNew: false, rating: 5,
  },
  {
    id: 12, name: "Antique Gold Kada", price: "₹2,20,000", priceNum: 220000,
    weight: "32g", weightNum: 32, metal: "22K Gold", category: "Gold",
    occasion: "Festive", purity: "22K (91.6% Gold)", dimensions: "Inner Diameter: 6.5cm",
    description: "A stunning antique-finish gold kada with traditional motifs and textured detailing. This statement piece blends heritage artistry with contemporary wearability.",
    image: bangle1, images: [bangle1, bangle1, bangle1], inStock: true, isNew: false, rating: 4,
  },
];

export const categories = ["All", "Rings", "Necklaces", "Earrings", "Bridal", "Gold", "Diamond"];
export const metals = ["All", "22K Gold", "18K Gold", "18K White Gold", "18K Rose Gold", "Platinum"];
export const occasions = ["All", "Daily Wear", "Wedding", "Engagement", "Anniversary", "Festive"];
export const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Weight: Low to High", value: "weight-asc" },
  { label: "Weight: High to Low", value: "weight-desc" },
  { label: "Newest First", value: "newest" },
];
