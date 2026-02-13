import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import TrustIndicators from "@/components/home/TrustIndicators";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
      <TrustIndicators />
    </Layout>
  );
};

export default Index;
