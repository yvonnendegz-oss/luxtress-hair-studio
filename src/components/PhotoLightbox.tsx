/**
 * Reusable Full-Screen Photo Lightbox Viewer for Luxtress Hair Studio.
 * Shared between the "Our Work" Gallery and individual Service Pages.
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { notifyLightboxChange } from '../utils/lightboxEvents';

export interface LightboxPhoto {
  src: string;
  alt: string;
  label?: string;
  scaleOverride?: boolean;
}

interface PhotoLightboxProps {
  photo: LightboxPhoto | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photo, onClose }) => {
  useEffect(() => {
    notifyLightboxChange(!!photo);
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      notifyLightboxChange(false);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo preview: ${photo.alt}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2B0F3F]/95 backdrop-blur-xl animate-fade-in select-none"
    >
      {/* Top Bar with Title and Close Button */}
      <div
        className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-left">
          {photo.label && (
            <span className="font-body text-xs tracking-wider uppercase text-[#D9C6F2]">
              {photo.label}
            </span>
          )}
          <p className="font-heading text-white text-base sm:text-lg font-semibold line-clamp-1">
            {photo.alt}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-none bg-[#2B0F3F] border border-[#D9C6F2] text-white flex items-center justify-center hover:bg-[#6A35A8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9C6F2] cursor-pointer"
          aria-label="Close photo preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Central Image View with sharp corners, 4:5 aspect ratio */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full aspect-[4/5] rounded-none border border-[#D9C6F2] bg-black overflow-hidden shadow-2xl flex items-center justify-center"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full h-full object-cover object-center ${
            photo.scaleOverride ? 'scale-[1.4]' : 'scale-100'
          }`}
        />
      </div>

      {/* Bottom Caption Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-4 sm:bottom-6 inset-x-4 max-w-md mx-auto text-center z-20"
      >
        <p className="font-body text-xs sm:text-sm text-[#D9C6F2] font-medium bg-[#2B0F3F]/90 px-4 py-2 border border-[#D9C6F2]/30 inline-block shadow-lg">
          {photo.alt}
        </p>
      </div>
    </div>
  );
};
