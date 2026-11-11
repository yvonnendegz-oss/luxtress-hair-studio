/**
 * Gallery Section for Luxtress Hair Studio.
 * - Reads directly from the central `src/data/photos.ts` registry.
 * - Filter pills are generated automatically from the categories that actually have photos, plus "All".
 * - Responsive grid with lazy loading, soft plum-to-lavender skeletons, and error fallback.
 * - Lightbox viewing with previous/next and keyboard navigation.
 * - Synchronizes with FloatingWhatsApp so the floating icon hides during lightbox preview.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  PHOTOS,
  SalonPhoto,
  PhotoCategory,
  getAvailableCategories,
  CATEGORY_LABELS,
} from '../data/photos';
import { PhotoThumbnail } from './PhotoThumbnail';
import { notifyLightboxChange } from '../utils/lightboxEvents';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'All'>('All');
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    currentIndex: number;
    photos: SalonPhoto[];
  }>({
    isOpen: false,
    currentIndex: 0,
    photos: [],
  });

  // Dynamically compute categories that actually have registered photos
  const availableCategories = useMemo(() => {
    return getAvailableCategories();
  }, []);

  // Filter photos based on selection
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') {
      return PHOTOS;
    }
    return PHOTOS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setLightboxState({
      isOpen: true,
      currentIndex: index,
      photos: filteredPhotos,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.photos.length,
    }));
  };

  const prevImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length,
    }));
  };

  // Synchronize lightbox open state with global event (hides Floating WhatsApp)
  useEffect(() => {
    notifyLightboxChange(lightboxState.isOpen);
    if (!lightboxState.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxState.isOpen, lightboxState.photos.length]);

  const currentPhoto = lightboxState.photos[lightboxState.currentIndex];

  return (
    <section
      id="gallery"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white text-[#2B0F3F] border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Studio Gallery"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Lockup */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-body tracking-[0.2em] uppercase font-semibold text-[#6A35A8] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#6A35A8]" />
            <span>GALLERY</span>
          </div>

          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight mb-3">
            Studio Artistry & Transformations
          </h2>

          <p className="font-body text-base sm:text-lg text-[#2B0F3F]/85 leading-relaxed">
            Real styling from our chairs in Kenya. Tap any photo to view full-screen.
          </p>
        </div>

        {/* Dynamic Category Filter Pills (Generated from categories that have photos + "All") */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium font-body transition-all duration-200 cursor-pointer min-h-[38px] ${
              selectedCategory === 'All'
                ? 'bg-[#6A35A8] text-white shadow-md'
                : 'border border-[#D9C6F2] text-[#2B0F3F] hover:border-[#6A35A8] hover:text-[#6A35A8] bg-transparent'
            }`}
          >
            All ({PHOTOS.length})
          </button>

          {availableCategories.map((cat) => {
            const count = PHOTOS.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium font-body transition-all duration-200 cursor-pointer min-h-[38px] ${
                  isSelected
                    ? 'bg-[#6A35A8] text-white shadow-md'
                    : 'border border-[#D9C6F2] text-[#2B0F3F] hover:border-[#6A35A8] hover:text-[#6A35A8] bg-transparent'
                }`}
              >
                {CATEGORY_LABELS[cat] || cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => (
              <div key={photo.id} className="w-full">
                <PhotoThumbnail
                  photo={photo}
                  onClick={() => openLightbox(index)}
                  aspectRatioClass="aspect-[4/5]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 px-6 rounded-2xl glass-panel text-center max-w-md mx-auto my-4 border border-[#D9C6F2]/30">
            <p className="font-heading font-semibold text-lg text-[#2B0F3F]">
              Photos coming soon
            </p>
            <p className="font-body text-xs text-[#2B0F3F]/70 mt-1">
              New client photos in this category will be added soon.
            </p>
          </div>
        )}
      </div>

      {/* Full-Screen Gallery Lightbox */}
      {lightboxState.isOpen && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo preview: ${currentPhoto.alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#2B0F3F]/90 backdrop-blur-xl animate-fade-in"
        >
          {/* Top Bar with Title, Counter and Close Button */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20">
            <div className="text-left">
              <span className="font-body text-xs tracking-wider uppercase text-[#D9C6F2]">
                Luxtress Studio Gallery
              </span>
              <p className="font-heading text-white text-base sm:text-lg font-semibold line-clamp-1">
                {currentPhoto.alt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#D9C6F2] font-mono hidden sm:inline-block">
                {lightboxState.currentIndex + 1} / {lightboxState.photos.length}
              </span>

              <button
                type="button"
                onClick={closeLightbox}
                className="w-11 h-11 rounded-full glass-button flex items-center justify-center text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9C6F2]"
                aria-label="Close photo preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          {lightboxState.photos.length > 1 && (
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-button flex items-center justify-center text-white hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9C6F2]"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Central Image View */}
          <div className="relative max-w-2xl max-h-[75vh] flex items-center justify-center p-2 rounded-3xl glass-panel shadow-2xl border border-[#D9C6F2]/30 bg-[#2B0F3F]/80">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className={`max-h-[70vh] w-auto object-contain ${
                currentPhoto.isCircular ? 'rounded-full aspect-square' : 'rounded-2xl'
              } shadow-2xl`}
            />
          </div>

          {/* Next Button */}
          {lightboxState.photos.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-button flex items-center justify-center text-white hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9C6F2]"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Caption Bar */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-4 max-w-lg mx-auto text-center z-20">
            <p className="font-body text-xs sm:text-sm text-[#D9C6F2] font-medium bg-[#2B0F3F]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#D9C6F2]/20 inline-block shadow-lg">
              {currentPhoto.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
