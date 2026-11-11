import React, { useState } from 'react';
import { SalonPhoto } from '../data/photos';

interface PhotoThumbnailProps {
  photo: SalonPhoto;
  onClick: () => void;
  aspectRatioClass?: string;
}

export const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({
  photo,
  onClick,
  aspectRatioClass = 'aspect-[4/5]',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Graceful fallback: If image is missing or errors out, hide it completely (no broken icon)
  if (hasError) {
    return null;
  }

  if (photo.isCircular) {
    return (
      <div
        onClick={onClick}
        className="w-52 sm:w-60 shrink-0 snap-start flex flex-col items-center cursor-pointer group/circle focus:outline-none focus:ring-2 focus:ring-[#6A35A8] rounded-full p-2"
        role="button"
        tabIndex={0}
        aria-label={`Open ${photo.alt} in full screen`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-[#D9C6F2] shadow-md transition-transform duration-300 group-hover/circle:scale-105 bg-transparent">
          {/* Soft Plum-to-Lavender Skeleton while loading */}
          {!isLoaded && (
            <div
              className="absolute inset-0 bg-gradient-to-tr from-[#2B0F3F]/30 via-[#6A35A8]/20 to-[#D9C6F2]/30 animate-pulse pointer-events-none"
              aria-hidden="true"
            />
          )}

          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover scale-[1.08] transition-opacity duration-300 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <p className="mt-2.5 text-xs font-body text-[#2B0F3F]/80 font-medium text-center max-w-[200px]">
          {photo.alt}
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="w-56 sm:w-64 shrink-0 snap-start flex flex-col cursor-pointer group/card focus:outline-none focus:ring-2 focus:ring-[#6A35A8] rounded-2xl"
      role="button"
      tabIndex={0}
      aria-label={`Open ${photo.alt} in full screen`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={`relative w-full ${aspectRatioClass} rounded-2xl overflow-hidden border border-[#D9C6F2] shadow-sm transition-transform duration-300 group-hover/card:scale-[1.02] group-hover/card:shadow-md bg-[#2B0F3F]/5`}
      >
        {/* Soft Plum-to-Lavender Skeleton while loading */}
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#2B0F3F]/30 via-[#6A35A8]/20 to-[#D9C6F2]/30 animate-pulse pointer-events-none"
            aria-hidden="true"
          />
        )}

        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${
            photo.objectPosition || 'object-center'
          } transition-all duration-500 ease-out group-hover/card:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <p className="mt-2 text-xs font-body text-[#2B0F3F]/80 font-medium line-clamp-1">
        {photo.alt}
      </p>
    </div>
  );
};
