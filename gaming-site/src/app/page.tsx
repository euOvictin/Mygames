'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { ProductGrid } from '@/components/sections/product-grid';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/layout/footer';
import { Chatbot } from '@/components/chatbot/chatbot';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-dark-950 dark-transition"
    >
      <Navbar />
      
      <main>
        <HeroSection />
        <ProductGrid />
        <ContactSection />
      </main>
      
      <Footer />
      <Chatbot />
    </motion.div>
  );
}