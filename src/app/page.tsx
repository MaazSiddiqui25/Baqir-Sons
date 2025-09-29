"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../components/ui/Container";
import BannerSlider from "../components/BannerSlider";
import { getImageUrl, fetchWithCacheControl, HomePageData } from '../sanity/lib/client';
import { homePageQuery } from "../lib/queries";
import { PortableText } from '@portabletext/react';

// PortableText components for rich text rendering
// PortableText components for rich text rendering
const portableTextComponents = {
  block: {
    normal: (props: any) => <p className="mb-4 text-gray-700 text-lg leading-relaxed">{props.children}</p>,
    h1: (props: any) => <h1 className="text-3xl font-bold mb-4">{props.children}</h1>,
    h2: (props: any) => <h2 className="text-2xl font-bold mb-4">{props.children}</h2>,
    h3: (props: any) => <h3 className="text-xl font-bold mb-3">{props.children}</h3>,
  },
  marks: {
    strong: (props: any) => <strong className="font-bold">{props.children}</strong>,
    em: (props: any) => <em className="italic">{props.children}</em>,
  },
};

export default function HomePage() {
  const [pageData, setPageData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      // Add timestamp to force fresh data in development
      const queryWithTimestamp = process.env.NODE_ENV === 'development' 
        ? `${homePageQuery} // ${Date.now()}`
        : homePageQuery;
        
      const data = await fetchWithCacheControl(queryWithTimestamp);
      console.log('Fetched Sanity data:', data);
      setPageData(data || {});
    } catch (error) {
      console.error('Error fetching home page data:', error);
      setError('Unable to load content');
      setPageData({});
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading homepage content...</p>
        </div>
      </div>
    );
  }

  // Error state with graceful fallback
  if (error && !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Content Unavailable</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Fallback data for when Sanity content isn't available or is incomplete
  const heroSection = pageData?.heroSection || {
    badge: "Leading Manufacturing Excellence",
    heading: "Welcome to Baqir & Sons",
    description: "Pioneering excellence in manufacturing with cutting-edge technology, uncompromising quality, and innovative solutions that shape tomorrow's industry standards.",
    ctaButtons: [
      { text: "Explore Products", link: "/products", isPrimary: true },
      { text: "Get in Touch", link: "/contact", isPrimary: false }
    ]
  };

  const stats = pageData?.stats || [
    { number: "25+", label: "Years of Excellence" },
    { number: "500+", label: "Happy Clients" },
    { number: "1000+", label: "Products Delivered" }
  ];

  const aboutSection = pageData?.aboutSection || {
    badge: "About Us",
    heading: "Crafting Excellence Since 1999",
    description: [],
    features: [
      { icon: "🏆", title: "ISO Certified", color: "emerald" },
      { icon: "⚡", title: "24/7 Support", color: "green" },
      { icon: "🌍", title: "Global Shipping", color: "emerald" },
      { icon: "🔧", title: "Custom Solutions", color: "green" }
    ]
  };

  const productsSection = pageData?.productsSection || {
    badge: "Our Products",
    heading: "Premium Product Range",
    description: "Discover our range of high-quality products designed to meet the most demanding requirements",
    featuredProducts: [
      {
        title: "Premium Series A",
        description: "Engineered for excellence with advanced materials and precision manufacturing",
        accent: "emerald",
        image: null as any
      },
      {
        title: "Professional Series B", 
        description: "Built for durability and performance in the most demanding environments",
        accent: "green",
        image: null as any
      },
      {
        title: "Innovation Series C",
        description: "Cutting-edge technology meets traditional craftsmanship for superior results", 
        accent: "emerald",
        image: null as any
      }
    ]
  };

  return (
    <>
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
      `}</style>

      {/* Banner Slider - Using Sanity images */}
      <BannerSlider 
        images={pageData?.bannerSlider?.images || []} 
        autoSlideInterval={pageData?.bannerSlider?.autoSlideInterval || 3}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden py-20">
        {/* Animated background elements */}
      {/* Replace the animated background elements section in your hero with this: */}
<div className="absolute inset-0 opacity-30">
  <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse-custom"></div>
  <div className="absolute top-40 right-10 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay-2s"></div>
  <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay-4s"></div>
</div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h20l-20 20v20z'/%3E%3Cpath d='m0 20l20-20h20l-20 20v20z'/%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
        
        <Container className="relative z-10">
          <div className="flex flex-col items-center justify-center text-center py-20">
            {/* Hero Content */}
            <div className="max-w-5xl mx-auto">
              {/* Dynamic Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                {heroSection.badge}
              </div>

              {/* Dynamic heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up animation-delay-200">
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                  {heroSection.heading}
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
                {heroSection.description}
              </p>
            </div>
            
            {/* Dynamic CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up animation-delay-600">
              {heroSection.ctaButtons?.map((button: { text: string; link: string; isPrimary: boolean }, index: number) => (
                <Link
                  key={index}
                  href={button.link}
                  className={`group relative px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden ${
                    button.isPrimary 
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
                      : 'bg-white/80 backdrop-blur-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {button.text}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  {button.isPrimary && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Dynamic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl animate-fade-in-up animation-delay-800">
              {stats.map((stat: { number: string; label: string }, index: number) => (
                <div key={index} className="group backdrop-blur-lg bg-white/90 rounded-2xl p-6 border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <h3 className="text-4xl font-bold text-emerald-600 mb-2 group-hover:scale-110 transition-transform">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Section - Now using proper Sanity image handling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={getImageUrl(aboutSection.factoryImage, 600, 400, "/factory.png")}
                  alt="Baqir & Sons Factory"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover w-full h-80"
                />
                <div className="absolute inset-8 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute bottom-12 left-12 text-white">
                  <h4 className="text-2xl font-bold mb-2">State-of-the-art Facility</h4>
                  <p className="text-gray-200">Modern manufacturing excellence</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  {aboutSection.badge}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  {aboutSection.heading?.split(' ').slice(0, -1).join(' ')}{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {aboutSection.heading?.split(' ').slice(-1)}
                  </span>
                </h2>
                
                {/* Rich text content from Sanity */}
                <div className="mb-6">
                  {aboutSection.description && aboutSection.description.length > 0 ? (
                    <PortableText 
                      value={aboutSection.description} 
                      components={portableTextComponents}
                    />
                  ) : (
                    <div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        With over two decades of manufacturing excellence, Baqir & Sons stands as a 
                        beacon of innovation and quality. Our state-of-the-art facility and dedicated 
                        team of experts deliver products that exceed industry standards and customer expectations.
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-8">
                        We combine traditional craftsmanship with cutting-edge technology to create 
                        solutions that drive success for businesses across various industries.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                {aboutSection.features?.map((feature: { icon: string; title: string; color: string }, index: number) => (
                  <div key={index} className="group flex items-center space-x-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</span>
                    <span className="text-gray-700 font-medium">{feature.title}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 group"
              >
                Learn More About Us
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Showcase - Now using proper Sanity images */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        {/* Background elements */}
        {/* Replace the background elements in your products section with this: */}
<div className="absolute inset-0 opacity-20">
  <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse-custom"></div>
  <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay-2s"></div>
  <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay-4s"></div>
</div>

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              {productsSection.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {productsSection.heading?.split(' ').slice(0, -2).join(' ')}{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                {productsSection.heading?.split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              {productsSection.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsSection.featuredProducts?.map((product: { title: string; description: string; accent: string; image: any }, index: number) => (
              <div key={index} className="group relative backdrop-blur-lg bg-white/90 rounded-3xl p-8 border border-gray-200/50 hover:bg-white hover:shadow-xl hover:border-emerald-300/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-100/50 to-green-100/50 rounded-2xl mb-6 overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-emerald-200/30 flex items-center justify-center">
  <Image
    src={getImageUrl(product.image, 300, 200, `/product${index + 1}.jpg`)}
    alt={product.title}
    width={300}
    height={200}
    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
  />
</div>
                  
                  <h3 className={`text-2xl font-bold mb-3 ${
                    product.accent === 'emerald' ? 'text-emerald-700' : 'text-green-700'
                  } group-hover:scale-105 transition-transform duration-300`}>
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <Link
                    href="/products"
                    className={`inline-flex items-center font-semibold transition-all duration-300 group/link ${
                      product.accent === 'emerald' ? 'text-emerald-600 hover:text-emerald-700' : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    Explore Details
                    <svg className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
            >
              View All Products
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

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
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation-name: fade-in-up;
    animation-duration: 0.8s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
  }
  
  .animation-delay-200 {
    animation-name: fade-in-up;
    animation-duration: 0.8s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-delay: 0.2s;
    opacity: 0;
  }
  
  .animation-delay-400 {
    animation-name: fade-in-up;
    animation-duration: 0.8s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-delay: 0.4s;
    opacity: 0;
  }
  
  .animation-delay-600 {
    animation-name: fade-in-up;
    animation-duration: 0.8s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-delay: 0.6s;
    opacity: 0;
  }
  
  .animation-delay-800 {
    animation-name: fade-in-up;
    animation-duration: 0.8s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-delay: 0.8s;
    opacity: 0;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  /* Pulse animation classes to avoid conflicts */
  .animate-pulse-custom {
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  
  .animate-pulse-delay-2s {
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-delay: 2s;
  }
  
  .animate-pulse-delay-4s {
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-delay: 4s;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
    `}
    </style>
    </>
  );
}