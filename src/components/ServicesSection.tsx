/**
 * Services Section for Luxtress Hair Studio.
 * Restyled to Hair Creations style:
 * - Centred container (max-w-[720px], margin 1.5rem on mobile, ~8% on desktop).
 * - Heading "Our Services" in Playfair Display.
 * - Single-column stacked list of all 14 services.
 * - Each row:
 *   - Number: small italic serif, lavender, ~0.9rem in a fixed 2.5rem column.
 *   - Service name: Playfair Display ~1.2rem, weight 400-500, in dark plum.
 *   - + button: 36px circle with a hairline lavender border.
 *   - Divider: 1px hairline in soft lavender under each row, lining up with the contents.
 *   - Row height: ~56-60px on mobile (vertical padding ~1.1rem).
 * - Tap-to-expand details panel with photos, price note, and WhatsApp booking button.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SALON_CONFIG, ServiceItem } from '../config/salon';
import { getPhotosByServiceId, SalonPhoto } from '../data/photos';
import { PhotoThumbnail } from './PhotoThumbnail';
import { notifyLightboxChange } from '../utils/lightboxEvents';

export const ServicesSection: React.FC = () => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

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

  const services = SALON_CONFIG.services;

  // Toggle service details accordion
  const handleToggleService = (serviceId: string) => {
    setOpenServiceId((prev) => (prev === serviceId ? null : serviceId));

    // Smoothly scroll opened row into view after state update
    setTimeout(() => {
      const el = rowRefs.current[serviceId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
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

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-[#FBF8FE] text-[#2B0F3F] py-14 sm:py-20 lg:py-24 border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Hair Studio Services"
    >
      {/* Centred Container with 1.5rem margin on mobile, max-width 720px on desktop */}
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        {/* Section Header: Our Services */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight">
            Our Services
          </h2>
        </div>

        {/* Hair Creations Style Numbered Services List */}
        <div className="border-t border-[#D9C6F2]">
          {services.map((service, index) => {
            const formattedNumber = String(index + 1).padStart(2, '0');
            const isOpen = openServiceId === service.id;

            return (
              <div
                key={service.id}
                id={service.id === 'kids-hair' ? 'kids' : undefined}
                ref={(el) => {
                  rowRefs.current[service.id] = el;
                }}
                className={`border-b border-[#D9C6F2] transition-colors duration-200 ${
                  service.id === 'kids-hair' ? 'scroll-mt-24' : ''
                }`}
              >
                {/* Service Item Row Trigger */}
                <button
                  type="button"
                  onClick={() => handleToggleService(service.id)}
                  aria-expanded={isOpen}
                  className="w-full group text-left flex items-center justify-between min-h-[56px] sm:min-h-[60px] py-[1.1rem] transition-colors duration-200 cursor-pointer select-none"
                >
                  <div className="flex items-center min-w-0 pr-4">
                    {/* Fixed-width column (~2.5rem): small italic serif, lavender, ~0.9rem */}
                    <span className="w-[2.5rem] shrink-0 text-left font-heading italic text-[0.9rem] text-[#6A35A8] select-none">
                      {formattedNumber}
                    </span>

                    {/* Service Name: Playfair Display ~1.2rem, weight 400 to 500, in dark plum */}
                    <span
                      className={`font-heading font-normal sm:font-medium text-[1.15rem] sm:text-[1.2rem] tracking-tight leading-tight transition-colors duration-200 truncate ${
                        isOpen
                          ? 'text-[#6A35A8]'
                          : 'text-[#2B0F3F] group-hover:text-[#6A35A8]'
                      }`}
                    >
                      {service.name}
                    </span>
                  </div>

                  {/* + button: 36px circle with a hairline lavender border */}
                  <div
                    className={`w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#6A35A8] text-white border-[#6A35A8] rotate-45'
                        : 'border-[#D9C6F2] text-[#2B0F3F] group-hover:border-[#6A35A8] group-hover:text-[#6A35A8]'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                </button>

                {/* Inline Details Panel directly below row */}
                {isOpen && (
                  <div className="pb-6 pt-2 animate-fade-in">
                    <DetailsPanelContent
                      service={service}
                      onImageClick={(idx) =>
                        openLightbox(
                          service.name,
                          getPhotosByServiceId(service.id),
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
 * Reusable details panel content
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
    <div className="space-y-6 pt-2">
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
        /* Real Photos Horizontal Strip: ONE horizontal row that scrolls sideways */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs uppercase tracking-wider text-[#2B0F3F]/60 font-medium">
              Client Work ({photos.length}{' '}
              {photos.length === 1 ? 'Photo' : 'Photos'} · Tap to Enlarge)
            </p>

            {/* Desktop Small Square Prev/Next Arrow Buttons */}
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

          {/* Thin Progress Line below scroller */}
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
        /* If service has no photos yet: single card with "Photo coming soon" */
        <div className="py-7 px-6 rounded-none glass-panel text-center max-w-md mx-auto my-1 border border-[#D9C6F2] flex flex-col items-center justify-center space-y-2">
          <p className="font-heading font-semibold text-base text-[#2B0F3F]">
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
        <p className="font-body text-sm font-medium text-[#2B0F3F]/85">
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
