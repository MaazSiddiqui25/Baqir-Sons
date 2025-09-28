// live.ts - Fixed version without experimental API
import { client } from './client'

// Regular fetch function that works reliably
export const sanityFetch = async (query: string, params = {}) => {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
};

// Empty component to prevent import errors
export const SanityLive = () => null;

// Debug function to test your connection
export const testSanityConnection = async () => {
  try {
    const result = await client.fetch('*[_type == "homePage"][0]{title}');
    console.log('Sanity connection test successful:', result);
    return result;
  } catch (error) {
    console.error('Sanity connection test failed:', error);
    return null;
  }
};