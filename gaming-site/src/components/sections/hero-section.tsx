'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';

const heroSlides = [
  {
    id: 1,
    title: 'Professional Gaming Gear',
    subtitle: 'Elevate Your Gaming Experience',
    description: 'Discover the latest in professional gaming equipment and accessories.',
    image: '/assets/hero-1.jpg',
    cta: 'Explore Games',
    ctaLink: '#products',
  },
  {
    id: 2,
    title: 'Next-Gen Controllers',
    subtitle: 'Precision at Your Fingertips',
    description: 'Experience ultimate control with our premium gaming controllers.',
    image: '/assets/hero-2.jpg',
    cta: 'Shop Controllers',
    ctaLink: '/products?category=controllers',
  },
  {
    id: 3,
    title: 'Gaming Headsets',
    subtitle: 'Immersive Audio Experience',
    description: 'Crystal clear communication and immersive sound quality.',
    image: '/assets/hero-3.jpg',
    cta: 'Browse Audio',
    ctaLink: '/products?category=audio',
  },
  {
    id: 4,
    title: 'Gaming Keyboards',
    subtitle: 'Mechanical Precision',
    description: 'Professional mechanical keyboards for competitive gaming.',
    image: '/assets/hero-4.jpg',
    cta: 'View Keyboards',
    ctaLink: '/products?category=keyboards',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-dark-950">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/40 to-transparent z-10" />
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h2
                  className="text-gaming-blue text-lg font-gaming font-bold mb-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.h2>
                
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                
                <motion.p
                  className="text-xl text-gray-300 mb-8 max-w-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href={heroSlides[currentSlide].ctaLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-gaming inline-flex items-center justify-center px-8 py-4 text-lg font-bold"
                  >
                    {heroSlides[currentSlide].cta}
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/30 rounded-lg hover:border-white/60 transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4">
          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary-500 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isAutoPlaying
                ? 'bg-primary-500 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
            aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            <Play className={`w-4 h-4 ${isAutoPlaying ? 'hidden' : 'block'}`} />
            <div className={`w-4 h-4 ${isAutoPlaying ? 'block' : 'hidden'}`}>
              <div className="w-1 h-4 bg-current inline-block mr-1"></div>
              <div className="w-1 h-4 bg-current inline-block"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 right-8 z-30"
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 rotate-90 origin-center">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-white/30"
          />
        </div>
      </motion.div>
    </section>
  );
}