/**
 * Luxtress Hair Studio
 * "Elegance Meets Confidence"
 * Simple hash-based in-app routing:
 * - Service pages: #braiding, #haircuts, #kids, etc. (scrolls to top on open)
 * - Home section anchors: #home, #work, #services, #team, #location
 */

import React, { useState, useEffect, useRef } from 'react';
import { SALON_CONFIG } from './config/salon';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { GallerySection } from './components/GallerySection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { TeamSection } from './components/TeamSection';
import { VisitSection } from './components/VisitSection';
import { ServicePage } from './components/ServicePage';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function getHashSlug(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
}

export default function App() {
  const [hashSlug, setHashSlug] = useState<string>(() => getHashSlug());
  const prevServiceSlugRef = useRef<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setHashSlug(getHashSlug());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeService =
    SALON_CONFIG.services.find((svc) => svc.slug === hashSlug) || null;

  // Handle scroll positioning on route transitions (to top on service page, to anchor when returning to home)
  useEffect(() => {
    const wasOnServicePage = Boolean(prevServiceSlugRef.current);

    if (activeService) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else if (
      hashSlug === 'work' ||
      hashSlug === 'services' ||
      hashSlug === 'team' ||
      hashSlug === 'location'
    ) {
      requestAnimationFrame(() => {
        const target = document.getElementById(hashSlug);
        if (target) {
          const topOffset = 88; // header height + 16px
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - topOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: wasOnServicePage ? 'auto' : 'smooth',
          });
        }
      });
    } else if (wasOnServicePage || hashSlug === 'home') {
      window.scrollTo({ top: 0, behavior: wasOnServicePage ? 'auto' : 'smooth' });
    }

    prevServiceSlugRef.current = activeService ? activeService.slug : null;
  }, [activeService, hashSlug]);

  return (
    <div className="min-h-screen bg-[#2B0F3F] text-white flex flex-col font-sans selection:bg-[#6A35A8] selection:text-white">
      {/* Sticky Header: solid deep plum on service pages, transparent over hero at top of Home */}
      <Navbar
        forceSolid={Boolean(activeService)}
        activeServiceSlug={activeService ? activeService.slug : null}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeService ? (
          <ServicePage service={activeService} />
        ) : (
          <>
            {/* Full-Screen Hero Section */}
            <Hero />

            {/* Slow, Infinite Marquee Strip on plum-900 */}
            <MarqueeStrip />

            {/* Our Work Gallery Section (#work) */}
            <GallerySection />

            {/* Numbered Services Link List (#services) */}
            <ServicesSection />

            {/* Client Reviews Section (hidden until 3+ entries) */}
            <ReviewsSection />

            {/* Meet the Team Section (#team, hidden until 2+ entries) */}
            <TeamSection />

            {/* Location Section with Map (#location) */}
            <VisitSection />
          </>
        )}
      </main>

      {/* Plum-900 Brand Footer */}
      <Footer />

      {/* Single Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
