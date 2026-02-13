

# Tanishq Mehsana — Luxury Jewelry Showroom Platform

A premium, fully-featured jewelry showroom website with AI capabilities and admin dashboard, built with a luxury 2026 aesthetic.

---

## Phase 1: Design System & Core Layout

- **Luxury design system**: Rich gold (#D4AF37) and deep navy palette, elegant serif + sans-serif typography (Playfair Display + Inter), soft shadows, subtle grain textures
- **Responsive shell**: Header with logo, mega-menu navigation (categories, collections, offers), search bar, wishlist/cart icons, login button, WhatsApp floating button
- **Footer**: Store info, links, social media, newsletter signup
- **Smooth animations**: Fade-ins, parallax scrolling, hover effects on cards

## Phase 2: Homepage

- **Hero carousel**: Full-width image slider with featured collections, seasonal offers, and CTAs with elegant transitions
- **Category showcase**: Visual grid for Rings, Necklaces, Bridal, Earrings, Gold, Diamond with hover animations
- **Featured products**: Curated product cards with price, weight, wishlist toggle
- **Promotional banners**: Seasonal offers and new arrivals
- **Testimonials section**: Customer reviews with ratings in an elegant carousel
- **Trust indicators**: Certifications, BIS hallmark, exchange policy highlights

## Phase 3: Product Browsing & Details

- **Product listing pages**: Grid/list view with filters (category, metal type, price range, occasion, weight) and sort options
- **Product cards**: Image, name, price, metal info, wishlist heart icon
- **Product detail page**: Image gallery with zoom, specifications (weight, purity, dimensions), pricing breakdown, similar products, add to wishlist, inquiry/booking CTA
- **Wishlist**: Saved favorites accessible from header icon

## Phase 4: Backend & Authentication (Lovable Cloud)

- **Database setup**: Tables for products, categories, collections, users/profiles, appointments, testimonials, banners, wishlists
- **Authentication**: Email/password signup & login with profile management
- **Demo data seeding**: Sample products across all categories with placeholder images and realistic pricing

## Phase 5: Showroom & Appointments

- **Showroom page**: Store details for Tanishq Mehsana (address, hours, contact), embedded Google Map
- **Appointment booking**: Date/time slot picker, occasion selection, preferred category, confirmation with email notification
- **Offers page**: Current promotions, exchange offers, seasonal deals

## Phase 6: AI Features (Lovable AI Integration)

- **Virtual try-on**: Upload a selfie, select jewelry pieces, AI generates a preview of how the jewelry looks on the user
- **AI jewelry concept generator**: Text prompt → AI-generated jewelry design concept images
- **Smart chatbot assistant**: Floating AI chat that helps users find products, answers FAQs, suggests pieces based on occasion/budget
- **AI product recommendations**: Personalized suggestions based on browsing history and preferences
- **Background removal**: Upload product photos and auto-remove backgrounds for clean presentation

## Phase 7: Admin Dashboard

- **Analytics overview**: Visitor stats, booking counts, AI feature usage, popular products (using Recharts)
- **Product management**: CRUD for products, bulk upload, category/collection assignment
- **Collection management**: Create/edit themed collections, assign products
- **Appointment management**: View/approve/reschedule bookings, calendar view
- **User management**: View registered users, roles
- **Content management**: Edit homepage banners, testimonials, offers, SEO meta tags
- **Notification center**: View chat messages, manage WhatsApp inquiries

## Phase 8: Polish & Optimization

- **SEO optimization**: Meta tags, structured data, sitemap, semantic HTML
- **Performance**: Lazy loading images, code splitting, optimized assets
- **Accessibility**: ARIA labels, keyboard navigation, contrast compliance
- **WhatsApp integration**: Click-to-chat with pre-filled message for inquiries
- **Mobile-first refinements**: Touch-optimized interactions, bottom navigation on mobile

---

### Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion for animations
- **Backend**: Lovable Cloud (Supabase) for database, auth, storage, and edge functions
- **AI**: Lovable AI Gateway (Gemini) for chatbot, recommendations, and image generation
- **Charts**: Recharts for admin analytics
- **Maps**: Google Maps embed for showroom location

