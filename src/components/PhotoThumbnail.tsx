import React, { useState } from 'react';
import { SalonPhoto } from '../data/photos';

interface PhotoThumbnailProps {
  photo: SalonPhoto;
  onClick: () => void;
  className?: string;
  widthClass?: string;
}

export const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({
  photo,
  onClick,
  className = '',
  widthClass = 'w-[72vw] sm:w-[260px]',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Graceful fallback: If image is missing or errors out, hide it completely (no broken icon)
  if (hasError) {
    return null;
  }

  // fade.jpg is a circular crop with black corners, so display as a normal 4:5 rectangle
  // scaled up (transform: scale(1.4), overflow hidden) with frame background #000 as fallback
  const isScaleRequired = photo.isCircular || photo.id === 'fade';

  return (
    <div
      onClick={onClick}
      className={`shrink-0 snap-start flex flex-col cursor-pointer group/card focus:outline-none focus:ring-2 focus:ring-[#6A35A8] rounded-none ${widthClass} ${className}`}
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
      {/* 4:5 portrait rectangle, border-radius 0, 1px lavender-200 border, object-fit: cover */}
      <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden border border-[#D9C6F2] shadow-sm bg-black">
        {/* Soft Plum-to-Lavender Skeleton while loading */}
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#2B0F3F]/40 via-[#6A35A8]/25 to-[#D9C6F2]/30 animate-pulse pointer-events-none z-10"
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
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
            isScaleRequired
              ? 'scale-[1.4] group-hover/card:scale-[1.45]'
              : 'scale-100 group-hover/card:scale-105'
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      {/* No caption text under photo per prompt specification; alt text retained for accessibility */}
    </div>
  );
};
