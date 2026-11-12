/**
 * Luxtress Hair Studio
 * "Elegance Meets Confidence"
 * Hair, braids, nails and beauty salon in Kenya for women, men and kids.
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-[#2B0F3F] text-white flex flex-col font-sans selection:bg-[#6A35A8] selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Full-Screen Hero Section */}
        <Hero />

        {/* Slow, Infinite Marquee Strip on plum-900 */}
        <MarqueeStrip />

        {/* Detailed Interactive Services Section */}
        <ServicesSection />

        {/* Dynamic Studio Artistry Gallery with Auto Filter Pills */}
        <GallerySection />

        {/* Dedicated Visit Section with Storefront Night Sign & Map */}
        <VisitSection />
      </main>

      {/* Plum-900 Brand Footer */}
      <Footer />

      {/* Single Floating WhatsApp Button (Purple-600) */}
      <FloatingWhatsApp />
    </div>
  );
}
