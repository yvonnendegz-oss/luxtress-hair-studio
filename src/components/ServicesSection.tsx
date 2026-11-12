/**
 * Services Section for Luxtress Hair Studio.
 * - Background: offwhite (#FBF8FE)
 * - Label: "SERVICES", Heading: "Our Services" (Playfair Display 600), Subtext: "Tap any service to see our work."
 * - Audience filter pills: All, Women, Men, Kids (active: purple-600, inactive: outlined in lavender-200)
 * - 3-col desktop / 2-col tablet / 1-col mobile numbered grid
 * - Numeral: italic Playfair Display in purple-600, reflowing with filters
 * - Service name: Playfair Display ~22px in plum-900, hover shifts to purple-600
 * - Thin divider in lavender-200, rotating + / × indicator
 * - Accordion details panel: full-width beneath tapped row on desktop, inline on mobile
 * - "Price: ask us on WhatsApp" line + minimal purple-600 "Book" button
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SALON_CONFIG, ServiceItem } from '../config/salon';
import { getPhotosByServiceId, SalonPhoto } from '../data/photos';
import { PhotoThumbnail } from './PhotoThumbnail';
import { notifyLightboxChange } from '../utils/lightboxEvents';

export const ServicesSection: React.FC = () => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const [columnCount, setColumnCount] = useState<number>(3);

  // Lightbox state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    serviceName: string;
    images: SalonPhoto[];
    currentIndex: number;
  }>({
    isOpen: false,
    serviceName: '',
    images: [],
    currentIndex: 0,
  });

  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Responsive column tracker for clean full-width desktop/tablet accordion positioning
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setColumnCount(3);
      } else if (window.innerWidth >= 768) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredServices = SALON_CONFIG.services;

  // Toggle service details accordion
  const handleToggleService = (serviceId: string) => {
    setOpenServiceId((prev) => (prev === serviceId ? null : serviceId));

    // On mobile, smoothly scroll opened row into view after state update
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const el = rowRefs.current[serviceId];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 150);
    }
  };

  // Lightbox handlers
  const openLightbox = (
    serviceName: string,
    images: SalonPhoto[],
    index: number
  ) => {
    setLightboxState({
      isOpen: true,
      serviceName,
      images,
      currentIndex: index,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextLightboxImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevLightboxImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  // Keyboard navigation & global synchronization for Lightbox
  useEffect(() => {
    notifyLightboxChange(lightboxState.isOpen);
    if (!lightboxState.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxState.isOpen, lightboxState.images.length]);

  // Break filtered services into rows based on columnCount
  const chunkedRows = useMemo(() => {
    const rows: ServiceItem[][] = [];
    for (let i = 0; i < filteredServices.length; i += columnCount) {
      rows.push(filteredServices.slice(i, i + columnCount));
    }
    return rows;
  }, [filteredServices, columnCount]);

  const activeService = useMemo(() => {
    return SALON_CONFIG.services.find((s) => s.id === openServiceId) || null;
  }, [openServiceId]);

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-[#FBF8FE] text-[#2B0F3F] py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Hair Studio Services"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Our Services */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight">
            Our Services
          </h2>
        </div>

        {/* Numbered Services Grid with Responsive Full-Width Expansion */}
        <div className="space-y-0 transition-opacity duration-300">
          {chunkedRows.map((row, rowIndex) => {
            // Check if any service in this row is currently open
            const isRowActive = row.some((svc) => svc.id === openServiceId);

            return (
              <div key={`row-${rowIndex}`} className="mb-0">
                {/* Row Grid: 3 cols (desktop), 2 cols (tablet), 1 col (mobile) */}
                <div
                  className={`grid gap-x-8 gap-y-0 ${
                    columnCount === 3
                      ? 'grid-cols-3'
                      : columnCount === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-1'
                  }`}
                >
                  {row.map((service) => {
                    // Reflowed number calculation based on current visible index
                    const globalIndex = filteredServices.findIndex(
                      (s) => s.id === service.id
                    );
                    const formattedNumber = String(globalIndex + 1).padStart(2, '0');
                    const isOpen = openServiceId === service.id;

                    return (
                      <div
                        key={service.id}
                        id={service.id === 'kids-hair' ? 'kids' : undefined}
                        ref={(el) => {
                          rowRefs.current[service.id] = el;
                        }}
                        className={`flex flex-col ${service.id === 'kids-hair' ? 'scroll-mt-24' : ''}`}
                      >
                        {/* Service Item Row Trigger */}
                        <button
                          type="button"
                          onClick={() => handleToggleService(service.id)}
                          aria-expanded={isOpen}
                          className={`w-full group text-left flex items-center justify-between min-h-[56px] py-4 border-b border-[#D9C6F2] transition-colors duration-200 cursor-pointer select-none ${
                            isOpen ? 'border-[#6A35A8]' : 'hover:border-[#6A35A8]'
                          }`}
                        >
                          <div className="flex items-baseline gap-3.5 sm:gap-4 pr-3">
                            {/* Italic Serif Numeral in purple-600 */}
                            <span className="font-heading italic font-semibold text-lg sm:text-xl text-[#6A35A8] shrink-0 select-none">
                              {formattedNumber}
                            </span>

                            {/* Service Name in Playfair Display ~22px */}
                            <span
                              className={`font-heading font-semibold text-[20px] sm:text-[22px] tracking-tight leading-snug transition-colors duration-200 ${
                                isOpen
                                  ? 'text-[#6A35A8]'
                                  : 'text-[#2B0F3F] group-hover:text-[#6A35A8]'
                              }`}
                            >
                              {service.name}
                            </span>
                          </div>

                          {/* + to × rotating icon indicator */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                              isOpen
                                ? 'bg-[#6A35A8] text-white border-[#6A35A8] rotate-45'
                                : 'border-[#D9C6F2] text-[#2B0F3F] group-hover:border-[#6A35A8] group-hover:text-[#6A35A8]'
                            }`}
                            aria-hidden="true"
                          >
                            <Plus className="w-4 h-4 stroke-[2.25]" />
                          </div>
                        </button>

                        {/* Mobile Inline Expansion (Below row on mobile) */}
                        {columnCount === 1 && isOpen && activeService && (
                          <div className="py-6 animate-fade-in border-b border-[#D9C6F2]">
                            <DetailsPanelContent
                              service={activeService}
                              onImageClick={(idx) =>
                                openLightbox(
                                  activeService.name,
                                  getPhotosByServiceId(activeService.id),
                                  idx
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Desktop & Tablet Full-Width Expanded Details Panel */}
                {columnCount > 1 && isRowActive && activeService && (
                  <div className="w-full my-6 p-6 sm:p-8 rounded-2xl bg-white border border-[#D9C6F2] shadow-xl shadow-[#2B0F3F]/5 animate-fade-in transition-all">
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#D9C6F2]/40">
                      <div>
                        <span className="font-body text-xs uppercase tracking-wider text-[#6A35A8] font-semibold">
                          Selected Service
                        </span>
                        <h3 className="font-heading font-semibold text-2xl text-[#2B0F3F]">
                          {activeService.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenServiceId(null)}
                        className="w-9 h-9 rounded-full bg-[#FBF8FE] border border-[#D9C6F2] text-[#2B0F3F] hover:bg-[#6A35A8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close details"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <DetailsPanelContent
                      service={activeService}
                      onImageClick={(idx) =>
                        openLightbox(
                          activeService.name,
                          getPhotosByServiceId(activeService.id),
                          idx
                        )
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxState.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2B0F3F]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 select-none"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxState.serviceName} photo showcase`}
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between text-white border-b border-[#D9C6F2]/20 pb-4 max-w-5xl mx-auto w-full">
            <div>
              <p className="font-heading font-semibold text-xl sm:text-2xl text-white">
                {lightboxState.serviceName}
              </p>
              <p className="font-body text-xs text-[#D9C6F2] tracking-wider uppercase mt-0.5">
                Photo {lightboxState.currentIndex + 1} of{' '}
                {lightboxState.images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="w-11 h-11 rounded-full bg-white/10 border border-[#D9C6F2]/30 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center Viewport with Prev / Next Affordances */}
          <div className="relative my-auto flex items-center justify-center max-w-4xl mx-auto w-full px-2 sm:px-12 py-4">
            {/* Prev Button (Only shown if multiple photos) */}
            {lightboxState.images.length > 1 && (
              <button
                type="button"
                onClick={prevLightboxImage}
                className="absolute left-0 sm:left-2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-none bg-[#2B0F3F] hover:bg-[#6A35A8] border border-[#D9C6F2] text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Main Stage Image: 4:5 portrait rectangle, sharp square corners, 1px lavender-200 border */}
            {lightboxState.images[lightboxState.currentIndex] && (
              <div className="relative max-w-sm sm:max-w-md w-full aspect-[4/5] rounded-none border border-[#D9C6F2] bg-black overflow-hidden shadow-2xl flex items-center justify-center">
                <img
                  src={lightboxState.images[lightboxState.currentIndex].src}
                  alt={lightboxState.images[lightboxState.currentIndex].alt}
                  className={`w-full h-full object-cover object-center ${
                    lightboxState.images[lightboxState.currentIndex].isCircular ||
                    lightboxState.images[lightboxState.currentIndex].id === 'fade'
                      ? 'scale-[1.4]'
                      : 'scale-100'
                  }`}
                />
              </div>
            )}

            {/* Next Button (Only shown if multiple photos) */}
            {lightboxState.images.length > 1 && (
              <button
                type="button"
                onClick={nextLightboxImage}
                className="absolute right-0 sm:right-2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-none bg-[#2B0F3F] hover:bg-[#6A35A8] border border-[#D9C6F2] text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Footer Controls */}
          <div className="max-w-xl mx-auto w-full pt-4 border-t border-[#D9C6F2]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="font-body text-sm text-[#D9C6F2]">
              Price: ask us on WhatsApp
            </span>

            <a
              href={SALON_CONFIG.getServiceBookingLink(lightboxState.serviceName)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book ${lightboxState.serviceName} on WhatsApp`}
              className="group inline-flex items-center gap-2 h-10 px-6 rounded-full border border-[#D9C6F2] text-[#D9C6F2] hover:bg-[#6A35A8] hover:border-[#6A35A8] hover:text-white font-body font-medium text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C6F2]"
            >
              <span>Book</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

/**
 * Reusable details panel content for both Desktop (full-width) and Mobile (inline)
 */
interface DetailsPanelContentProps {
  service: ServiceItem;
  onImageClick: (index: number) => void;
}

const DetailsPanelContent: React.FC<DetailsPanelContentProps> = ({
  service,
  onImageClick,
}) => {
  const isKidsService = service.id === 'kids-hair';
  const [kidsTab, setKidsTab] = useState<'girls' | 'boys'>('girls');

  // Read photos from photos.ts by service id
  const allPhotos = getPhotosByServiceId(service.id);
  // For kids service, optionally filter or show photos
  const photos = allPhotos;
  const hasRealPhotos = photos.length > 0;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  const scrollLeftBy = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRightBy = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Kids Hair: Two-Option Toggle (Girls / Boys) */}
      {isKidsService && (
        <div className="space-y-4 pb-2 border-b border-[#D9C6F2]/40">
          <div className="flex items-center gap-2">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#6A35A8] mr-2">
              Select:
            </span>
            <button
              type="button"
              onClick={() => setKidsTab('girls')}
              className={`px-5 py-1.5 rounded-none text-xs sm:text-sm font-body font-medium transition-colors cursor-pointer ${
                kidsTab === 'girls'
                  ? 'bg-[#6A35A8] text-white border border-[#6A35A8] shadow-xs'
                  : 'bg-transparent text-[#2B0F3F] border border-[#D9C6F2] hover:border-[#6A35A8]'
              }`}
            >
              Girls
            </button>
            <button
              type="button"
              onClick={() => setKidsTab('boys')}
              className={`px-5 py-1.5 rounded-none text-xs sm:text-sm font-body font-medium transition-colors cursor-pointer ${
                kidsTab === 'boys'
                  ? 'bg-[#6A35A8] text-white border border-[#6A35A8] shadow-xs'
                  : 'bg-transparent text-[#2B0F3F] border border-[#D9C6F2] hover:border-[#6A35A8]'
              }`}
            >
              Boys
            </button>
          </div>

          <p className="font-body text-sm text-[#2B0F3F]/85 leading-relaxed max-w-xl">
            {kidsTab === 'girls'
              ? 'Gentle detangling, braids, twists and styling for girls in a warm, patient environment.'
              : 'Neat cuts, fades and low-maintenance styles for boys in a calm, welcoming setting.'}
          </p>
        </div>
      )}

      {hasRealPhotos ? (
        /* Real Photos Horizontal Strip: ONE horizontal row that scrolls sideways, never stacked vertically */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs uppercase tracking-wider text-[#2B0F3F]/60 font-medium">
              Client Work ({photos.length}{' '}
              {photos.length === 1 ? 'Photo' : 'Photos'} · Tap to Enlarge)
            </p>

            {/* Desktop Small Square Prev/Next Arrow Buttons (thin white-on-plum, sharp corners) */}
            {photos.length > 1 && (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={scrollLeftBy}
                  className="w-8 h-8 rounded-none bg-[#2B0F3F] text-white border border-[#D9C6F2] hover:bg-[#6A35A8] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                  aria-label="Scroll photos left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollRightBy}
                  className="w-8 h-8 rounded-none bg-[#2B0F3F] text-white border border-[#D9C6F2] hover:bg-[#6A35A8] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                  aria-label="Scroll photos right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Horizontal Scroller with snap-x snap-mandatory */}
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex items-center gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar focus:outline-none"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {photos.map((photo, idx) => (
              <PhotoThumbnail
                key={photo.id}
                photo={photo}
                onClick={() => onImageClick(idx)}
                widthClass="w-[72vw] sm:w-[260px] max-w-[260px]"
              />
            ))}
          </div>

          {/* Thin Progress Line below scroller on desktop & mobile */}
          {photos.length > 1 && (
            <div className="w-full h-[2px] bg-[#D9C6F2]/30 relative overflow-hidden mt-1">
              <div
                className="h-full bg-[#6A35A8] transition-all duration-150"
                style={{
                  width: `${Math.max(20, 100 / photos.length)}%`,
                  transform: `translateX(${(scrollProgress * (photos.length - 1)) / 100 * 100}%)`,
                }}
              />
            </div>
          )}
        </div>
      ) : (
        /* If service has no photos yet: single glass card with "Photos coming soon" */
        <div className="py-8 px-6 rounded-none glass-panel text-center max-w-md mx-auto my-1 border border-[#D9C6F2] flex flex-col items-center justify-center space-y-2">
          <p className="font-heading font-semibold text-lg text-[#2B0F3F]">
            Photo coming soon
          </p>
          <p className="font-body text-xs text-[#2B0F3F]/70">
            {isKidsService
              ? `We are currently photographing client styles for kids ${kidsTab}.`
              : `We are currently photographing client work for ${service.name}.`}
          </p>
        </div>
      )}

      {/* Action Block: Price info and minimal left-aligned Book button */}
      <div className="pt-3 border-t border-[#D9C6F2]/40 flex flex-col items-start gap-3">
        <p className="font-body text-sm sm:text-base font-medium text-[#2B0F3F]/85">
          Price: ask us on WhatsApp
        </p>

        <a
          href={SALON_CONFIG.getServiceBookingLink(service.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book ${service.name} on WhatsApp`}
          className="group inline-flex items-center gap-2 h-10 px-6 rounded-full border border-[#6A35A8] text-[#6A35A8] bg-transparent hover:bg-[#6A35A8] hover:text-white font-body font-medium text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C6F2] focus-visible:ring-offset-2 select-none"
        >
          <span>Book</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};
