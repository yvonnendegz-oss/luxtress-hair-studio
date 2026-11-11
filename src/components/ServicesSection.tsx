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
import { SALON_CONFIG, Audience, ServiceItem } from '../config/salon';
import { getPhotosByServiceId, SalonPhoto } from '../data/photos';
import { PhotoThumbnail } from './PhotoThumbnail';
import { notifyLightboxChange } from '../utils/lightboxEvents';

type FilterType = 'All' | Audience;

export const ServicesSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
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

  // Filtered services list with sequential reflowing numbers
  const filteredServices = useMemo(() => {
    if (selectedFilter === 'All') {
      return SALON_CONFIG.services;
    }
    return SALON_CONFIG.services.filter((svc) =>
      svc.audiences.includes(selectedFilter)
    );
  }, [selectedFilter]);

  // When filter changes, if open service is no longer in the list, close it
  useEffect(() => {
    if (openServiceId) {
      const exists = filteredServices.some((s) => s.id === openServiceId);
      if (!exists) {
        setOpenServiceId(null);
      }
    }
  }, [filteredServices, openServiceId]);

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
      className="scroll-mt-20 bg-[#FBF8FE] text-[#2B0F3F] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Hair Studio Services"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="font-body text-xs sm:text-[13px] tracking-[0.2em] uppercase font-semibold text-[#6A35A8] block mb-3">
            SERVICES
          </span>

          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight mb-3">
            Our Services
          </h2>

          <p className="font-body text-base sm:text-lg text-[#2B0F3F]/85 leading-relaxed">
            Tap any service to see our work.
          </p>

          {/* Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-3 mt-7"
            role="tablist"
            aria-label="Audience filter"
          >
            {(['All', 'Women', 'Men', 'Kids'] as FilterType[]).map((pill) => {
              const isActive = selectedFilter === pill;
              return (
                <button
                  key={pill}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedFilter(pill)}
                  className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? 'bg-[#6A35A8] text-white shadow-md shadow-[#6A35A8]/20 ring-2 ring-[#6A35A8] ring-offset-2 ring-offset-[#FBF8FE]'
                      : 'border border-[#D9C6F2] bg-white text-[#2B0F3F] hover:border-[#6A35A8] hover:text-[#6A35A8] active:scale-95'
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>
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
                        ref={(el) => {
                          rowRefs.current[service.id] = el;
                        }}
                        className="flex flex-col"
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
                className="absolute left-0 sm:left-2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md active:scale-95 transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Stage Image */}
            {lightboxState.images[lightboxState.currentIndex] && (
              <div className="flex flex-col items-center">
                {lightboxState.images[lightboxState.currentIndex].isCircular ? (
                  <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-2 border-[#D9C6F2]/80 shadow-2xl bg-transparent flex items-center justify-center">
                    <img
                      src={lightboxState.images[lightboxState.currentIndex].src}
                      alt={lightboxState.images[lightboxState.currentIndex].alt}
                      className="w-full h-full object-cover scale-[1.08]"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-lg aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#D9C6F2]/40 bg-[#2B0F3F]">
                    <img
                      src={lightboxState.images[lightboxState.currentIndex].src}
                      alt={lightboxState.images[lightboxState.currentIndex].alt}
                      className={`w-full h-full object-cover ${
                        lightboxState.images[lightboxState.currentIndex].objectPosition ||
                        'object-center'
                      }`}
                    />
                  </div>
                )}
                <p className="font-body text-xs sm:text-sm text-[#D9C6F2] text-center mt-3 tracking-wide">
                  {lightboxState.images[lightboxState.currentIndex].alt}
                </p>
              </div>
            )}

            {/* Next Button (Only shown if multiple photos) */}
            {lightboxState.images.length > 1 && (
              <button
                type="button"
                onClick={nextLightboxImage}
                className="absolute right-0 sm:right-2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md active:scale-95 transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
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
  const photos = getPhotosByServiceId(service.id);
  const hasRealPhotos = photos.length > 0;

  return (
    <div className="space-y-6">
      {hasRealPhotos ? (
        /* Real Photos Strip (Only real photos, no placeholders) */
        <div>
          <p className="font-body text-xs uppercase tracking-wider text-[#2B0F3F]/60 mb-3 font-medium">
            Client Work ({photos.length}{' '}
            {photos.length === 1 ? 'Photo' : 'Photos'} · Tap to Enlarge)
          </p>

          <div className="flex items-center gap-5 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none">
            {photos.map((photo, idx) => (
              <PhotoThumbnail
                key={photo.id}
                photo={photo}
                onClick={() => onImageClick(idx)}
                aspectRatioClass="aspect-[4/5]"
              />
            ))}
          </div>
        </div>
      ) : (
        /* If service has no photos yet: single glass card with "Photos coming soon" */
        <div className="py-8 px-6 rounded-2xl glass-panel text-center max-w-md mx-auto my-1 border border-[#D9C6F2]/30 flex flex-col items-center justify-center space-y-2">
          <p className="font-heading font-semibold text-lg text-[#2B0F3F]">
            Photos coming soon
          </p>
          <p className="font-body text-xs text-[#2B0F3F]/70">
            We are currently photographing client work for {service.name}.
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
