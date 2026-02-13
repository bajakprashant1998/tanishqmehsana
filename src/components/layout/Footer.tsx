import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-semibold">Stay in the Loop</h3>
            <p className="text-sm text-secondary-foreground/70 font-body mt-1">
              Subscribe for exclusive offers, new arrivals & styling tips
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <Input
              placeholder="Your email address"
              className="bg-secondary-foreground/5 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 max-w-xs"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-body shrink-0">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-primary">Shop</h4>
          <ul className="space-y-2 text-sm font-body text-secondary-foreground/70">
            <li><Link to="/products?category=rings" className="hover:text-primary transition-colors">Rings</Link></li>
            <li><Link to="/products?category=necklaces" className="hover:text-primary transition-colors">Necklaces</Link></li>
            <li><Link to="/products?category=earrings" className="hover:text-primary transition-colors">Earrings</Link></li>
            <li><Link to="/products?category=bridal" className="hover:text-primary transition-colors">Bridal</Link></li>
            <li><Link to="/products?category=gold" className="hover:text-primary transition-colors">Gold</Link></li>
            <li><Link to="/products?category=diamond" className="hover:text-primary transition-colors">Diamond</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-primary">Company</h4>
          <ul className="space-y-2 text-sm font-body text-secondary-foreground/70">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/showroom" className="hover:text-primary transition-colors">Our Showroom</Link></li>
            <li><Link to="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
            <li><Link to="/offers" className="hover:text-primary transition-colors">Offers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-primary">Support</h4>
          <ul className="space-y-2 text-sm font-body text-secondary-foreground/70">
            <li><Link to="/appointment" className="hover:text-primary transition-colors">Book Appointment</Link></li>
            <li><Link to="/ai-studio" className="hover:text-primary transition-colors">AI Try-On</Link></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">Exchange Policy</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">FAQs</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-primary">Visit Us</h4>
          <ul className="space-y-3 text-sm font-body text-secondary-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>Highway Road, Near City Pulse, Mehsana, Gujarat 384002</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>+91 2762 253 000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>tanishq.mehsana@titan.co.in</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>10 AM – 9 PM, All Days</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-gradient-gold">TANISHQ</span>
            <span className="text-xs text-secondary-foreground/50 font-body">Mehsana · A TATA Product</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-secondary-foreground/50 font-body">
            © 2026 Tanishq Mehsana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
