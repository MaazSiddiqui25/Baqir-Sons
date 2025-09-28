"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../../components/ui/Container";
import { client, freshClient, getImageUrl, fetchFreshData, fetchViaAPI } from '../../sanity/lib/client';
import { productsListQuery } from "../../lib/queries";

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  price: number;
  mainImage: {
    image: {
      asset: { 
        _id: string; 
        _ref: string;
        _type: string;
        url: string;
      };
    };
    alt: string;
  } | null;
  category: string;
  featured: boolean;
}

const categories = [
  "All Products",
  "Premium Series",
  "Professional Series", 
  "Innovation Series",
  "Industrial Equipment",
  "Custom Solutions"
];

const sortOptions = [
  { label: "Featured First", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
  { label: "A to Z", value: "name-asc" }
];

// Products per page based on total count
const getProductsPerPage = (totalProducts: number) => {
  if (totalProducts <= 4) return totalProducts;
  if (totalProducts <= 12) return 8;
  return 12;
};

// Responsive grid classes based on product count
const getGridClasses = (productCount: number) => {
  if (productCount === 1) return "grid-cols-1 max-w-md mx-auto";
  if (productCount === 2) return "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto";
  if (productCount === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto";
  if (productCount <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [retryCount, setRetryCount] = useState(0);

  // Fallback products for when Sanity is unavailable
  const getFallbackProducts = (): Product[] => [
    {
      _id: "1",
      title: "Premium Manufacturing Unit A1",
      slug: { current: "premium-manufacturing-unit-a1" },
      description: "High-precision manufacturing unit designed for demanding industrial applications with advanced automation capabilities.",
      price: 25000,
      mainImage: {
        image: {
          asset: { 
            _id: "image-img1", 
            _ref: "image-img1-jpg",
            _type: "sanity.imageAsset",
            url: `/product-1.jpg` 
          }
        },
        alt: "Premium Unit A1"
      },
      category: "Premium Series",
      featured: true
    },
    {
      _id: "2", 
      title: "Professional CNC Machine B2",
      slug: { current: "professional-cnc-machine-b2" },
      description: "State-of-the-art CNC machine with multi-axis capability for precision machining and complex geometries.",
      price: 45000,
      mainImage: {
        image: {
          asset: { 
            _id: "image-img2", 
            _ref: "image-img2-jpg",
            _type: "sanity.imageAsset",
            url: `/product-2.jpg` 
          }
        },
        alt: "CNC Machine B2"
      },
      category: "Professional Series",
      featured: true
    },
    {
      _id: "3",
      title: "Innovation Series Smart Controller C3", 
      slug: { current: "innovation-series-smart-controller-c3" },
      description: "Next-generation smart controller with AI-powered optimization and real-time monitoring capabilities.",
      price: 15000,
      mainImage: {
        image: {
          asset: { 
            _id: "image-img3", 
            _ref: "image-img3-jpg",
            _type: "sanity.imageAsset",
            url: `/product-3.jpg` 
          }
        },
        alt: "Smart Controller C3"
      },
      category: "Innovation Series",
      featured: false
    },
    {
      _id: "4",
      title: "Industrial Automation System D4",
      slug: { current: "industrial-automation-system-d4" },
      description: "Complete automation solution for streamlined production workflows and enhanced efficiency.",
      price: 65000,
      mainImage: {
        image: {
          asset: { 
            _id: "image-img4", 
            _ref: "image-img4-jpg",
            _type: "sanity.imageAsset",
            url: `/product-4.jpg` 
          }
        },
        alt: "Automation System D4"
      },
      category: "Industrial Equipment",
      featured: true
    },
    {
      _id: "5",
      title: "Custom Engineering Solution E5",
      slug: { current: "custom-engineering-solution-e5" },
      description: "Tailored engineering solution designed to meet specific industrial requirements and challenges.",
      price: 35000,
      mainImage: {
        image: {
          asset: { 
            _id: "image-img5", 
            _ref: "image-img5-jpg",
            _type: "sanity.imageAsset",
            url: `/product-5.jpg` 
          }
        },
        alt: "Custom Solution E5"
      },
      category: "Custom Solutions", 
      featured: false
    },
    {
      _id: "6",
      title: "Premium Quality Assurance Unit F6",
      slug: { current: "premium-quality-assurance-unit-f6" },
      description: "Advanced quality control system ensuring consistent product excellence and compliance standards.",
      price: 28000,
      mainImage: {
        image: {
          asset: { 
            _id: "image-img6", 
            _ref: "image-img6-jpg",
            _type: "sanity.imageAsset",
            url: `/product-6.jpg` 
          }
        },
        alt: "QA Unit F6"
      },
      category: "Premium Series",
      featured: false
    }
  ];

  // Enhanced fetch function with multiple retry strategies
  const fetchProducts = useCallback(async (forceFresh = false) => {
    console.log(`Fetching products... (forceFresh: ${forceFresh}, retry: ${retryCount})`);
    setLoading(true);
    setError(null);
    
    const timestamp = Date.now();
    
    try {
      let data = null;
      
      // Strategy 1: Try fresh client first if forced or on retry
      if (forceFresh || retryCount > 0) {
        console.log('Attempting fresh client fetch...');
        try {
          data = await fetchFreshData(productsListQuery);
          console.log('Fresh client fetch successful:', data?.length || 0, 'products');
        } catch (freshError) {
          console.warn('Fresh client fetch failed:', freshError);
        }
      }
      
      // Strategy 2: Try direct API fetch if fresh client failed
      if (!data && retryCount > 1) {
        console.log('Attempting direct API fetch...');
        try {
          data = await fetchViaAPI(productsListQuery);
          console.log('Direct API fetch successful:', data?.length || 0, 'products');
        } catch (apiError) {
          console.warn('Direct API fetch failed:', apiError);
        }
      }
      
      // Strategy 3: Try regular client as last resort
      if (!data) {
        console.log('Attempting regular client fetch...');
        data = await client.fetch(productsListQuery);
        console.log('Regular client fetch result:', data?.length || 0, 'products');
      }
      
      // Success - reset retry count and set data
      if (data && Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);
        setLastFetch(timestamp);
        setRetryCount(0);
        console.log('Successfully fetched', data.length, 'products');
      } else {
        throw new Error('No valid data received from any fetch method');
      }
      
    } catch (error) {
      console.error('All fetch methods failed:', error);
      
      // If this is the first few retries, increment retry count and try again
      if (retryCount < 3) {
        console.log(`Retry ${retryCount + 1}/3 in 2 seconds...`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          fetchProducts(true);
        }, 2000);
        return;
      }
      
      // After max retries, use fallback data
      console.log('Using fallback data after max retries');
      setError('Unable to load products from server. Showing cached data.');
      const fallbackData = getFallbackProducts();
      setProducts(fallbackData);
      setFilteredProducts(fallbackData);
      setRetryCount(0);
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  // Enhanced refresh with user feedback
  const handleRefresh = async () => {
    setRetryCount(0); // Reset retry count for manual refresh
    await fetchProducts(true);
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Auto-refresh on page focus (only if data is stale)
  useEffect(() => {
    const handleFocus = () => {
      if (Date.now() - lastFetch > 30000) { // 30 seconds
        console.log('Page focused, refreshing stale data...');
        fetchProducts(true);
      }
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [lastFetch, fetchProducts]);

  // Filtering and sorting (keep existing logic)
  useEffect(() => {
    let filtered = [...products];

    if (activeCategory !== "All Products") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredProducts(filtered);
    const newProductsPerPage = getProductsPerPage(filtered.length);
    setProductsPerPage(newProductsPerPage);
    setCurrentPage(1);
  }, [products, activeCategory, searchTerm, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Enhanced image URL helper function
  const safeGetImageUrl = (mainImage: Product['mainImage'], fallbackIndex: number): string => {
    if (!mainImage?.image?.asset) {
      return `/product-${fallbackIndex}.jpg`;
    }
    
    try {
      if (mainImage.image.asset.url && mainImage.image.asset.url.startsWith('/')) {
        return mainImage.image.asset.url;
      }
      
      const imageUrl = getImageUrl(mainImage.image, 400, 300, `/product-${fallbackIndex}.jpg`);
      return imageUrl || `/product-${fallbackIndex}.jpg`;
    } catch (error) {
      console.error('Error getting image URL:', error);
      return `/product-${fallbackIndex}.jpg`;
    }
  };

  // Pagination component
  const PaginationComponent = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex items-center justify-center mt-16 space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={typeof page !== 'number'}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === currentPage
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                : typeof page === 'number'
                ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'text-gray-400 cursor-default'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Next
        </button>
      </div>
    );
  };

  // Loading state with retry information
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-600 mt-6 text-lg font-medium">
            Loading products...
            {retryCount > 0 && ` (Attempt ${retryCount + 1}/4)`}
          </p>
          {lastFetch > 0 && (
            <p className="text-sm text-gray-400 mt-2">
              Last updated: {new Date(lastFetch).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h20l-20 20v20z'/%3E%3Cpath d='m0 20l20-20h20l-20 20v20z'/%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
        
        <Container className="relative z-10">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-emerald-600 transition-colors duration-200 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-emerald-600 font-semibold">Products</li>
            </ol>
          </nav>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Our Product Catalog
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent leading-tight md:leading-snug">
  Premium seeds for healthier crops and higher yields.
</h1>

            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Explore our trusted solutions for sustainable and profitable farming.
            </p>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                placeholder="Search products..."
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort Dropdown and Enhanced Refresh Button */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-gray-700"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {/* Enhanced Refresh Button */}
              <div className="relative group">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                    error 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                  title={`${error ? 'Connection issues - ' : ''}Refresh products${lastFetch ? ` (Last updated: ${new Date(lastFetch).toLocaleTimeString()})` : ''}`}
                >
                  <svg 
                    className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {loading ? 'Refreshing...' : error ? 'Retry' : 'Refresh'}
                  {retryCount > 0 && ` (${retryCount + 1}/4)`}
                </button>
                
                {/* Status tooltip */}
                {lastFetch > 0 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {error ? 'Using cached data' : `Last updated: ${new Date(lastFetch).toLocaleTimeString()}`}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Count and Status Indicators */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600 flex items-center gap-4">
              <span>
                Showing <span className="font-bold text-emerald-600">{startIndex + 1}</span> - <span className="font-bold text-emerald-600">{Math.min(endIndex, filteredProducts.length)}</span> of <span className="font-bold text-emerald-600">{filteredProducts.length}</span> products
                {totalPages > 1 && (
                  <span className="ml-2 text-gray-500">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </span>
              
              {/* Connection status indicator */}
              <div className="flex items-center gap-2">
                {error ? (
                  <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Offline Mode
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    Live Data
                  </div>
                )}
              </div>
            </div>
            
            {searchTerm && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Searching for:</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md font-medium">
                  "{searchTerm}"
                </span>
              </div>
            )}
          </div>

          {/* Error banner */}
          {error && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-orange-800 text-sm font-medium">{error}</span>
                <button
                  onClick={handleRefresh}
                  className="ml-auto text-orange-600 hover:text-orange-700 text-sm underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Products Grid Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-green-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>

        <Container className="relative z-10">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-10 text-lg max-w-md mx-auto leading-relaxed">
                We couldn't find any products matching your search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All Products");
                }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className={`grid ${getGridClasses(currentProducts.length)} gap-8`}>
                {currentProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                    style={{
  animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms`,
}}

                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                    
                    <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center">
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 group-hover:from-emerald-100/50 group-hover:to-green-100/50 transition-all duration-500"></div>
  
  <Image
    src={safeGetImageUrl(product.mainImage, (startIndex + index) + 1)}
    alt={product.mainImage?.alt || product.title}
    width={400}
    height={400}
    className="relative z-10 max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = `/product-${(startIndex + index) + 1}.jpg`;
    }}
  />
                      
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
                    </div>
                    
                    <div className="relative z-20 p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
                        {product.title}
                      </h3>
                      
                      <Link
                        href={`/products/${product.slug?.current || product._id}`}
                        className="group/btn relative inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                        
                        <span className="relative z-10 flex items-center gap-2">
                          Read more
                          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
          </svg>
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></div>
        </a>
      </div>

              {/* Pagination */}
              <PaginationComponent />
            </>
          )}
        </Container>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}