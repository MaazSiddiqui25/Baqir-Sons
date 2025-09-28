"use client";
import { useState, useEffect } from "react";
import { client, getImageUrl, fetchWithCacheControl, SanityImageAsset } from '../sanity/lib/client';

interface BannerImage {
  image: SanityImageAsset;
  alt: string;
  title?: string;
}

interface BannerSliderProps {
  images: BannerImage[];
  autoSlideInterval?: number;
}

export default function BannerSlider({ images, autoSlideInterval = 3 }: BannerSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoSlideInterval * 1000);
    
    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 text-emerald-600">🏭</div>
          <p className="text-gray-600 text-lg">No banner images available</p>
          <p className="text-gray-500 text-sm mt-2">Add images in Sanity Studio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-900">
      {images.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image with blur for artistic effect */}
          <div 
            className="absolute inset-0 scale-110 blur-sm opacity-60"
            style={{
              backgroundImage: `url(${getImageUrl(item.image, 1200, 500, '/placeholder-factory.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Main image that fits without cropping */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={getImageUrl(item.image, 1200, 500, '/placeholder-factory.jpg')}
              alt={item.alt || 'Banner image'}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          
          {/* Title overlay */}
          {item.title && (
            <div className="absolute bottom-8 left-8 right-8 text-center md:text-left">
              <div className="bg-black/60 backdrop-blur-sm text-white px-6 py-4 rounded-lg inline-block max-w-md">
                <p className="text-xl md:text-2xl font-bold mb-1">{item.title}</p>
                <p className="text-sm opacity-90">Baqir & Sons</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${
                index === current
                  ? "w-8 h-3 bg-white rounded-full"
                  : "w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 group"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 group"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm z-20">
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
}