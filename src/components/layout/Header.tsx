import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Rings", href: "/products?category=rings", subcategories: ["Engagement", "Wedding Bands", "Statement", "Everyday"] },
  { name: "Necklaces", href: "/products?category=necklaces", subcategories: ["Chains", "Pendants", "Chokers", "Layered"] },
  { name: "Earrings", href: "/products?category=earrings", subcategories: ["Studs", "Drops", "Hoops", "Jhumkas"] },
  { name: "Bridal", href: "/products?category=bridal", subcategories: ["Bridal Sets", "Mangalsutra", "Maang Tikka", "Nose Rings"] },
  { name: "Gold", href: "/products?category=gold", subcategories: ["22K Gold", "18K Gold", "Gold Coins", "Gold Bars"] },
  { name: "Diamond", href: "/products?category=diamond", subcategories: ["Solitaire", "Certified", "Lab-Grown", "Polki"] },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container flex h-8 items-center justify-between text-xs tracking-wider">
          <span className="hidden sm:block font-body">FREE INSURED SHIPPING | BIS HALLMARK CERTIFIED</span>
          <div className="flex items-center gap-4 font-body">
            <Link to="/showroom" className="hover:text-primary transition-colors">Store Locator</Link>
            <Link to="/offers" className="hover:text-primary transition-colors">Offers</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.jpeg"
              alt="Tanishq Mehsana Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
            {/* <div className="flex flex-col items-center"> */}
            {/* <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-gradient-gold">
                TANISHQ
              </span>
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground font-body uppercase">
                Mehsana
              </span> */}
            {/* </div> */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setActiveMenu(null)}>
            {categories.map((cat) => (
              <div key={cat.name} className="relative" onMouseEnter={() => setActiveMenu(cat.name)}>
                <Link
                  to={cat.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors font-body"
                >
                  {cat.name}
                  <ChevronDown className="h-3 w-3" />
                </Link>
                <AnimatePresence>
                  {activeMenu === cat.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 min-w-[200px] bg-background border border-border rounded-lg shadow-elegant p-4"
                    >
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`${cat.href}&sub=${sub.toLowerCase().replace(/ /g, "-")}`}
                          className="block px-3 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-accent rounded-md transition-colors font-body"
                        >
                          {sub}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link to="/collections" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors font-body">
              Collections
            </Link>
            <Link to="/ai-studio" className="px-3 py-2 text-sm font-medium text-primary hover:text-gold-dark transition-colors font-body">
              AI Studio ✨
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/wishlist" className="p-2 hover:text-primary transition-colors hidden sm:block">
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="p-2 hover:text-primary transition-colors hidden sm:block">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground font-body text-xs">
                <User className="h-4 w-4 mr-1" />
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="container py-3">
                <Input
                  placeholder="Search for gold necklaces, diamond rings, bridal sets..."
                  className="max-w-2xl mx-auto bg-muted/50 border-border focus:border-primary"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-[96px] z-40 bg-background lg:hidden overflow-y-auto"
          >
            <nav className="container py-6 space-y-2">
              {categories.map((cat) => (
                <div key={cat.name} className="border-b border-border pb-3">
                  <Link
                    to={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-lg font-display font-semibold text-foreground"
                  >
                    {cat.name}
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`${cat.href}&sub=${sub.toLowerCase()}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-body"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link to="/collections" onClick={() => setMobileOpen(false)} className="block py-2 text-lg font-display font-semibold">Collections</Link>
              <Link to="/ai-studio" onClick={() => setMobileOpen(false)} className="block py-2 text-lg font-display font-semibold text-primary">AI Studio ✨</Link>
              <Link to="/offers" onClick={() => setMobileOpen(false)} className="block py-2 text-lg font-display font-semibold">Offers</Link>
              <div className="flex gap-4 pt-4">
                <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-body"><Heart className="h-4 w-4" /> Wishlist</Link>
                <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-body"><ShoppingBag className="h-4 w-4" /> Cart</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
