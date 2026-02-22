import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import GoldRateTicker from "@/components/home/GoldRateTicker";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import InstagramFeed from "@/components/home/InstagramFeed";
import TrustIndicators from "@/components/home/TrustIndicators";

const Index = () => {
  return (
    <Layout>
      <GoldRateTicker />
      <HeroCarousel />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner />
      <BrandStory />
      <Testimonials />
      <InstagramFeed />
      <TrustIndicators />
    </Layout>
  );
};

export default Index;
