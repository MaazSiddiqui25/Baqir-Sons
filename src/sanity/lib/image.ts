
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'
import { client } from './client'

const imageBuilder = imageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | string) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

// Re-export the enhanced helper from client


const builder = imageUrlBuilder(client)

// Type definitions for better TypeScript support
interface SanityImageAsset {
  _id: string;
  _ref?: string;
  _type?: string;
  url?: string;
}

interface SanityImage {
  asset: SanityImageAsset;
}

interface ImageSource {
  image?: SanityImage | null;
}

/**
 * Enhanced image URL generator that handles your specific Sanity data structure
 */
export function getImageUrl(
  source: string | ImageSource | SanityImage | SanityImageAsset | null | undefined,
  width?: number,
  height?: number,
  fallback: string | null = null
): string {
  // Return fallback if no source provided
  if (!source) {
    console.log('No image source provided, using fallback:', fallback);
    return fallback || '/placeholder-image.jpg';
  }
  
  // If source is already a complete URL string, return it
  if (typeof source === 'string') {
    if (source.startsWith('http') || source.startsWith('/')) {
      return source;
    }
  }
  
  try {
    let imageAsset: SanityImageAsset | null = null;
    
    // Handle different possible source structures from your queries
    if (typeof source === 'object' && source !== null) {
      // Case 1: Direct asset from your homepage queries: { asset: { _id, url } }
      if ('asset' in source && source.asset) {
        imageAsset = source.asset as SanityImageAsset;
      }
      // Case 2: Nested image structure: { image: { asset: {...} } }
      else if ('image' in source && source.image?.asset) {
        imageAsset = source.image.asset;
      }
      // Case 3: Direct asset structure (for fallback data)
      else if ('_id' in source || '_ref' in source || 'url' in source) {
        imageAsset = source as SanityImageAsset;
      }
    }
    
    if (!imageAsset) {
      console.log('No valid image asset found, using fallback:', fallback);
      return fallback || '/placeholder-image.jpg';
    }
    
    // For fallback data with direct URLs, use them directly
    if (imageAsset.url && imageAsset.url.startsWith('/')) {
      console.log('Using direct URL:', imageAsset.url);
      return imageAsset.url;
    }
    
    // For proper Sanity assets with _id, use the image builder
    if (imageAsset._id) {
      try {
        let imageBuilder = builder.image(imageAsset);
        
        if (width) {
          imageBuilder = imageBuilder.width(width);
        }
        
        if (height) {
          imageBuilder = imageBuilder.height(height);
        }
        
        // Add optimizations
        imageBuilder = imageBuilder
          .format('webp')
          .quality(80);
        
        const url = imageBuilder.url();
        console.log('Generated Sanity URL:', url);
        return url;
      } catch (sanityError) {
        console.warn('Error with Sanity image builder:', sanityError);
        // Fall through to fallback
      }
    }
    
    // If we have a direct URL from Sanity, use it
    if (imageAsset.url) {
      console.log('Using Sanity asset URL:', imageAsset.url);
      return imageAsset.url;
    }
    
    // Final fallback
    console.log('No usable image data found, using fallback:', fallback);
    return fallback || '/placeholder-image.jpg';
    
  } catch (error) {
    console.error('Error generating image URL:', error);
    console.log('Using fallback due to error:', fallback);
    return fallback || '/placeholder-image.jpg';
  }
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(
  source: string | ImageSource | SanityImage | SanityImageAsset | null | undefined,
  fallback: string | null = null
): { src: string; srcSet: string; sizes: string } {
  const baseSrc = getImageUrl(source, 800, 600, fallback);
  
  if (!source || typeof source === 'string' || baseSrc === fallback) {
    return { 
      src: baseSrc, 
      srcSet: '', 
      sizes: '100vw'
    };
  }
  
  try {
    let imageAsset: SanityImageAsset | null = null;
    
    // Extract asset (same logic as above)
    if (typeof source === 'object' && source !== null) {
      if ('asset' in source && source.asset) {
        imageAsset = source.asset as SanityImageAsset;
      } else if ('image' in source && source.image?.asset) {
        imageAsset = source.image.asset;
      } else if ('_id' in source || '_ref' in source) {
        imageAsset = source as SanityImageAsset;
      }
    }
    
    // For fallback data with direct URLs, return simple response
    if (imageAsset?.url && imageAsset.url.startsWith('/')) {
      return { 
        src: imageAsset.url, 
        srcSet: '', 
        sizes: '100vw'
      };
    }
    
    // For proper Sanity assets with _id, generate responsive URLs
    if (imageAsset?._id) {
      const baseBuilder = builder.image(imageAsset)
        .format('webp')
        .quality(80);
      
      const breakpoints = [400, 600, 800, 1200, 1600];
      const srcSet = breakpoints
        .map(size => `${baseBuilder.width(size).url()} ${size}w`)
        .join(', ');
      
      const sizes = [
        '(max-width: 640px) 100vw',
        '(max-width: 1024px) 50vw',
        '(max-width: 1280px) 33vw',
        '400px'
      ].join(', ');
      
      return {
        src: baseBuilder.width(800).url(),
        srcSet: srcSet,
        sizes: sizes
      };
    }
    
    return { 
      src: baseSrc, 
      srcSet: '', 
      sizes: '100vw'
    };
    
  } catch (error) {
    console.error('Error generating responsive image URLs:', error);
    return { 
      src: baseSrc, 
      srcSet: '', 
      sizes: '100vw'
    };
  }
}

/**
 * Check if an image source is valid
 */
export function isValidImageSource(source: any): boolean {
  if (!source) return false;
  
  if (typeof source === 'string') {
    return source.startsWith('http') || source.startsWith('/');
  }
  
  if (typeof source === 'object') {
    // Check direct asset
    if (source.asset) {
      const asset = source.asset;
      return !!(asset._id || asset.url);
    }
    
    // Check nested structure
    if (source.image?.asset) {
      const asset = source.image.asset;
      return !!(asset._id || asset.url);
    }
    
    // Check if source is asset itself
    return !!(source._id || source.url);
  }
  
  return false;
}