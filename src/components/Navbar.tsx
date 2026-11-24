/**
 * Sticky Glass Navbar for Luxtress Hair Studio.
 * - Transparent over Hero when at top on Home page; solid deep plum on scroll or on any Service Page.
 * - Circular logo icon on left, menu links aligned right (Our Work, Services, Meet the Team, Location).
 * - Hides Meet the Team link automatically when TEAM has fewer than 2 entries.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { SALON_CONFIG, SOCIAL_LINKS } from '../config/salon';
import { TEAM } from '../data/team';
import { Logo } from './Logo';
import {
  InstagramOutlineIcon,
  TikTokOutlineIcon,
  FacebookOutlineIcon,
} from './SocialIcons';

// WhatsApp icon SVG for high fidelity
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.3C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.54C8.86 7.54 8.57 7.61 8.32 7.88C8.07 8.15 7.37 8.81 7.37 10.15C7.37 11.5 8.35 12.79 8.49 12.98C8.63 13.16 10.42 15.92 13.16 17.11C15.44 18.09 15.91 17.9 16.41 17.85C16.91 17.8 18.02 17.19 18.25 16.55C18.49 15.9 18.49 15.35 18.42 15.23C18.35 15.12 18.17 15.05 17.9 14.91C17.62 14.78 16.32 14.13 16.08 14.05C15.84 13.96 15.68 13.92 15.51 14.17C15.34 14.42 14.86 15 14.71 15.17C14.56 15.34 14.41 15.36 14.14 15.23C13.87 15.09 13.01 14.81 11.98 13.89C11.18 13.17 10.64 12.28 10.5 12.01C10.36 11.74 10.48 11.59 10.62 11.45C10.74 11.33 10.89 11.13 11.03 10.97C11.17 10.81 11.22 10.69 11.31 10.51C11.4 10.33 11.35 10.17 11.29 10.05C11.22 9.93 10.74 8.74 10.54 8.24C10.34 7.76 10.14 7.82 9.99 7.82C9.85 7.81 9.69 7.81 9.53 7.81C9.36 7.81 9.09 7.88 8.86 8.12" />
  </svg>
);

interface NavbarProps {
  forceSolid?: boolean;
  activeServiceSlug?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  forceSolid = false,
  activeServiceSlug = null,
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const isTeamVisible = TEAM.length >= 2;

  const visibleNavLinks = useMemo(
    () =>
      SALON_CONFIG.navLinks.filter((link) => {
        if (link.id === 'team') return isTeamVisible;
        return true;
      }),
    [isTeamVisible]
  );

  // Sync active indicator when viewing a service page
  useEffect(() => {
    if (activeServiceSlug) {
      setActiveSection('services');
    }
  }, [activeServiceSlug]);

  // Monitor scroll for glass opacity increase & home page section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (activeServiceSlug) return;

      const sectionIds = visibleNavLinks.map((link) => link.id);
      const scrollPos = window.scrollY + 200;

      let matched = 'home';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          if (elTop <= scrollPos) {
            matched = id;
            break;
          }
        }
      }
      setActiveSection(matched);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeServiceSlug, visibleNavLinks]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    e.preventDefault();
    const wasMobileOpen = mobileMenuOpen;
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.body.style.overflow = '';

    const navigateAndScroll = () => {
      const wasOnServicePage = Boolean(activeServiceSlug);
      if (window.location.hash !== href) {
        window.location.hash = href;
      }

      if (wasOnServicePage) {
        return;
      }

      if (id === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const topOffset = 88;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - topOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    if (wasMobileOpen) {
      requestAnimationFrame(() => navigateAndScroll());
    } else {
      navigateAndScroll();
    }
  };

  const isSolidHeader = forceSolid || scrolled;

  return (
    <>
      {/* Sticky Header Container: transparent over hero, solid deep plum on scroll or service pages */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isSolidHeader
            ? 'bg-[#2B0F3F]/95 backdrop-blur-md border-b border-[#D9C6F2]/20 shadow-md py-3'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Circular Logo Icon only */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home', 'home')}
              className="flex items-center shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C6F2] rounded-full"
              aria-label="Luxtress Hair Studio Home"
            >
              <Logo size="md" showWordmark={false} />
            </a>

            {/* Desktop Navigation Links aligned to the right */}
            <nav className="hidden md:flex items-center gap-8 ml-auto text-sm font-medium">
              {visibleNavLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`relative py-1 font-body text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-[#D9C6F2]/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6A35A8] via-[#D9C6F2] to-[#6A35A8] rounded-full animate-fade-in" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center ml-auto">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 border border-[#D9C6F2]/30 text-white hover:bg-white/15 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9C6F2]"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Plum Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[#2B0F3F] flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Mobile Overlay Header */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#D9C6F2]/20">
            <Logo size="sm" showWordmark={false} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 border border-[#D9C6F2]/30 text-white active:scale-95"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Nav Links */}
          <div className="px-6 py-8 flex flex-col gap-6">
            <span className="label-uppercase text-xs">Navigation</span>
            <div className="flex flex-col gap-4">
              {visibleNavLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`font-heading font-semibold text-2xl tracking-wide py-2 flex items-center justify-between border-b border-white/5 transition-colors ${
                      isActive
                        ? 'text-[#D9C6F2] pl-2 border-l-2 border-[#D9C6F2]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="text-xs uppercase tracking-widest text-[#D9C6F2] font-body">
                        Active
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile Overlay Footer with Social Icons & Hours */}
          <div className="p-6 border-t border-[#D9C6F2]/20 bg-black/25 space-y-4">
            <div className="flex items-center justify-center gap-6">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Luxtress Instagram"
                className="text-[#D9C6F2] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <InstagramOutlineIcon className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Luxtress TikTok"
                className="text-[#D9C6F2] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <TikTokOutlineIcon className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Luxtress Facebook"
                className="text-[#D9C6F2] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <FacebookOutlineIcon className="w-6 h-6" />
              </a>
            </div>

            <div className="text-center text-xs text-[#D9C6F2]/80 font-body">
              <p>{SALON_CONFIG.contact.hours}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
