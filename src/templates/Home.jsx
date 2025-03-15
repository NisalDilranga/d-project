import React from "react";
import { motion } from "framer-motion";
import SwipeCarousel from "../Components/SwipeCarousel";
import HeroSection from "../Components/HeroSection";
import SubSection from "../Components/SubSection";
import ShuffleHero from "../Components/ShuffleHero";
import { TextParallaxContentExample } from "../Components/TextParallaxContentExample";
import AppFooter from "../Components/AppFooter";
import SliderOne from "../Components/SliderOne";
import EcommerceNavbar from "../Components/EcommerceNavbar";
import FeaturedProducts from "../Components/FeaturedProducts";
import Tabs from "../Components/Tabs";
import Footer from "../Components/shared/Footer";
// Remove unused imports
// import Slider1 from '../Components/SliderOne'
// import Slikslider from '../Components/Slikslider'
// import LoginPage from '../Components/LoginPage'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Component with scroll animation
const AnimatedSection = ({ children, animation, className }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={animation || fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="w-full">
      <EcommerceNavbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SwipeCarousel />
      </motion.div>

      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection animation={fadeIn}>
        <SubSection />
      </AnimatedSection>

      <AnimatedSection>
        <Tabs />
      </AnimatedSection>

      <AnimatedSection
        animation={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
        }}
      >
        <ShuffleHero />
      </AnimatedSection>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeaturedProducts />
      </motion.div>

      <AnimatedSection
        animation={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
      >
        <SliderOne />
      </AnimatedSection>

      <TextParallaxContentExample />

      <AnimatedSection animation={fadeIn}>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Home;
