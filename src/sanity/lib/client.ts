import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Main client with CDN for general use
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Keep this for performance on static content
})

// Fresh client for real-time updates (no CDN)
export const freshClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

// TypeScript interfaces for your data structure
export interface SanityImageAsset {
  _ref?: string;
  _type?: string;
  _id?: string;
  url?: string;
  asset?: {
    _ref: string;
    _type: string;
    _id: string;
    url: string;
  };
}

export interface HomePageData {
  title?: string;
  heroSection?: {
    badge?: string;
    heading?: string;
    description?: string;
    ctaButtons?: Array<{
      text: string;
      link: string;
      isPrimary: boolean;
    }>;
  };
  bannerSlider?: {
    images?: Array<{
      image: SanityImageAsset;
      alt: string;
      title?: string;
    }>;
    autoSlideInterval?: number;
  };
  stats?: Array<{
    number: string;
    label: string;
  }>;
  aboutSection?: {
    badge?: string;
    heading?: string;
    description?: any[]; // PortableText array
    factoryImage?: SanityImageAsset;
    features?: Array<{
      icon: string;
      title: string;
      color: string;
    }>;
  };
  productsSection?: {
    badge?: string;
    heading?: string;
    description?: string;
    featuredProducts?: Array<{
      title: string;
      description: string;
      image: SanityImageAsset;
      accent: string;
    }>;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageAsset;
  };
}

// Enhanced helper function for your specific data structure
export const getImageUrl = (
  image: any,
  width: number = 600,
  height: number = 400,
  fallback: string = ''
): string => {
  // Return fallback immediately if no image
  if (!image) {
    console.log('No image provided, using fallback:', fallback);
    return fallback;
  }

  try {
    // Handle your homepage structure: { asset: { _id, url } }
    if (image.asset && image.asset._id) {
      // If it has a URL, use it directly (for your current data)
      if (image.asset.url && image.asset.url.startsWith('/')) {
        console.log('Using direct asset URL:', image.asset.url);
        return image.asset.url;
      }
      
      // For proper Sanity assets, build URL
      if (image.asset._id.startsWith('image-')) {
        try {
          const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${image.asset._id.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`;
          console.log('Built Sanity URL:', imageUrl);
          return imageUrl;
        } catch (buildError) {
          console.warn('Error building Sanity URL:', buildError);
        }
      }
    }

    // Handle nested structure: { image: { asset: { _id, _ref } } }
    if (image.image && image.image.asset) {
      return getImageUrl(image.image, width, height, fallback);
    }

    // Handle direct asset reference
    if (image._id && image._id.startsWith('image-')) {
      try {
        const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${image._id.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`;
        console.log('Built direct Sanity URL:', imageUrl);
        return imageUrl;
      } catch (buildError) {
        console.warn('Error building direct Sanity URL:', buildError);
      }
    }

    // If it's already a URL string
    if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('/'))) {
      return image;
    }

    console.log('No valid image structure found, using fallback:', fallback);
    return fallback;

  } catch (error) {
    console.error('Error generating image URL:', error);
    console.log('Using fallback due to error:', fallback);
    return fallback;
  }
};

// Enhanced helper function for cache control with multiple strategies
interface FetchWithCacheControlOptions {
  forceFresh?: boolean;
  maxAge?: number;
  clientToUse?: any;
}

export const fetchWithCacheControl = async (
  query: string,
  params = {},
  options: FetchWithCacheControlOptions = {}
) => {
  const { 
    forceFresh = false, 
    maxAge = 30,
    clientToUse = null 
  } = options;
  
  try {
    // Use specified client or choose based on forceFresh flag
    const clientInstance = clientToUse || (forceFresh ? freshClient : client);
    
    if (process.env.NODE_ENV === 'development' || forceFresh) {
      // Force no caching in development or when explicitly requested
      console.log('Fetching with no cache...');
      return await clientInstance.fetch(query, params, {
        cache: 'no-store',
        next: { revalidate: 0 }
      });
    } else {
      // Production caching with shorter revalidation
      console.log(`Fetching with ${maxAge}s cache...`);
      return await clientInstance.fetch(query, params, {
        next: { revalidate: maxAge }
      });
    }
  } catch (error) {
    console.error('Error in fetchWithCacheControl:', error);
    throw error;
  }
};

// Utility function to fetch fresh data with timestamp
export const fetchFreshData = async (query: string, params = {}) => {
  try {
    // Add timestamp to force cache busting
    const timestampedQuery = `${query} | order(_updatedAt desc)`;
    const timestamp = Date.now();
    
    console.log('Fetching fresh data with timestamp:', timestamp);
    
    // Use fresh client with no CDN
    const data = await freshClient.fetch(timestampedQuery, {
      ...params,
      _timestamp: timestamp
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching fresh data:', error);
    throw error;
  }
};

// Direct API fetch as fallback
export const fetchViaAPI = async (query: string, params = {}) => {
  try {
    const timestamp = Date.now();
    const encodedQuery = encodeURIComponent(query);
    const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}&perspective=published&_t=${timestamp}`;
    
    console.log('Fetching via direct API:', url);
    
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error in direct API fetch:', error);
    throw error;
  }
};