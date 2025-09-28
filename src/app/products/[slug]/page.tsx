"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../../components/ui/Container";
import { client, getImageUrl, fetchWithCacheControl } from '../../../sanity/lib/client';
import { singleProductQuery, productsListQuery } from "../../../lib/queries";

interface Product {
  _id: string;
  title: string;
  titleUrdu?: string;
  slug: { current: string };
  description: string;
  descriptionUrdu?: string;
  detailedDescription?: string; // Add this field
  detailedDescriptionUrdu?: string; // Add this field for Urdu
  price: number;
  mainImage: {
    image: {
      asset: { _id: string; _ref: string; _type: string; url: string };
    };
    alt: string;
  } | null;
  gallery?: {
    image: {
      asset: { _id: string; _ref: string; _type: string; url: string };
    };
    alt: string;
  }[];
  category: string;
  
  featured: boolean;
  specifications?: {
    name: string;
    nameUrdu?: string;
    value: string;
    valueUrdu?: string;
  }[];
  features?: {
    text: string;
    textUrdu?: string;
  }[] | string[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current product
        const productData = await client.fetch(singleProductQuery, { slug });
        
        if (!productData) {
          // Enhanced fallback data with Urdu translations
          const fallbackProducts: Record<string, Product> = {
            "premium-manufacturing-unit-a1": {
              _id: "1",
              title: "Premium Manufacturing Unit A1",
              titleUrdu: "پریمیم مینوفیکچرنگ یونٹ اے ون",
              slug: { current: "premium-manufacturing-unit-a1" },
              description: "High-precision manufacturing unit designed for demanding industrial applications with advanced automation capabilities. This state-of-the-art equipment delivers exceptional performance and reliability for your most critical manufacturing processes.",
              descriptionUrdu: "یہ جدید صنعتی آلہ انتہائی درستگی کے ساتھ کام کرنے والا مینوفیکچرنگ یونٹ ہے جو مشکل صنعتی استعمال کے لیے ڈیزائن کیا گیا ہے۔ اس میں جدید خودکار نظام موجود ہے جو آپ کے اہم ترین مینوفیکچرنگ عمل میں بہترین کارکردگی اور قابل اعتماد نتائج فراہم کرتا ہے۔",
               detailedDescription: "This premium manufacturing unit represents the pinnacle of industrial engineering excellence. Designed with cutting-edge technology and precision manufacturing, it delivers unmatched performance for the most demanding applications.\n\nThe unit features advanced automation capabilities that streamline production processes while maintaining the highest quality standards. Its robust construction ensures reliable operation even in challenging industrial environments, making it the preferred choice for professionals who demand excellence.\n\nWith its energy-efficient design and intelligent monitoring systems, this unit not only delivers superior performance but also helps reduce operational costs and environmental impact.",
              detailedDescriptionUrdu: "یہ پریمیم مینوفیکچرنگ یونٹ صنعتی انجینئرنگ کی بہترین مثال ہے۔ جدید ترین ٹیکنالوجی اور درست مینوفیکچرنگ کے ساتھ ڈیزائن کیا گیا، یہ انتہائی مشکل استعمال کے لیے بے مثال کارکردگی فراہم کرتا ہے۔\n\nیہ یونٹ جدید خودکار نظام سے لیس ہے جو پیداواری عمل کو آسان بناتا ہے اور بہترین معیار برقرار رکھتا ہے۔ اس کی مضبوط ساخت مشکل صنعتی ماحول میں بھی قابل اعتماد کارکردگی یقینی بناتی ہے۔\n\nتوانائی کی بچت والے ڈیزائن اور ذہین نگرانی کے نظام کے ساتھ، یہ یونٹ نہ صرف بہترین کارکردگی فراہم کرتا ہے بلکہ آپریشنل اخراجات اور ماحولیاتی اثرات کو کم کرنے میں بھی مدد کرتا ہے۔",
               price: 25000,
              mainImage: {
                image: {
                  asset: { _id: "img1", _ref: "image-img1", _type: "sanity.imageAsset", url: `/product-1.jpg` }
                },
                alt: "Premium Unit A1"
              },
              gallery: [
                {
                  image: {
                    asset: { _id: "img1-2", _ref: "image-img1-2", _type: "sanity.imageAsset", url: `/product-1.jpg` }
                  },
                  alt: "Premium Unit A1 - Front View"
                },
                {
                  image: {
                    asset: { _id: "img1-3", _ref: "image-img1-3", _type: "sanity.imageAsset", url: `/product-2.jpg` }
                  },
                  alt: "Premium Unit A1 - Side View"
                }
              ],
              category: "Premium Series",
              
              featured: true,
              specifications: [
                { name: "Power Output", nameUrdu: "پاور آؤٹ پٹ", value: "15 kW", valueUrdu: "۱۵ کلو واٹ" },
                { name: "Dimensions", nameUrdu: "پیمائش", value: "200 x 150 x 180 cm", valueUrdu: "۲۰۰ x ۱۵۰ x ۱۸۰ سینٹی میٹر" },
                { name: "Weight", nameUrdu: "وزن", value: "2,500 kg", valueUrdu: "۲۵۰۰ کلو گرام" },
                { name: "Operating Temperature", nameUrdu: "آپریٹنگ ٹمپریچر", value: "-10°C to 60°C", valueUrdu: "-۱۰°C سے ۶۰°C" },
                { name: "Precision", nameUrdu: "درستگی", value: "±0.01mm", valueUrdu: "±۰.۰۱ ملی میٹر" }
              ],
              features: [
                { text: "Advanced automation capabilities", textUrdu: "جدید خودکار صلاحیات" },
                { text: "High-precision manufacturing", textUrdu: "اعلیٰ درستگی کے ساتھ مینوفیکچرنگ" },
                { text: "Energy-efficient operation", textUrdu: "توانائی کی بچت والا آپریشن" },
                { text: "Remote monitoring support", textUrdu: "دور سے نگرانی کی سہولت" },
                { text: "24/7 technical support included", textUrdu: "۲۴/۷ تکنیکی سپورٹ شامل" }
              ]
            },
            "professional-cnc-machine-b2": {
              _id: "2",
              title: "Professional CNC Machine B2",
              titleUrdu: "پروفیشنل سی این سی مشین بی ٹو",
              slug: { current: "professional-cnc-machine-b2" },
              description: "State-of-the-art CNC machine with multi-axis capability for precision machining and complex geometries. Perfect for high-volume production with consistent quality and exceptional accuracy.",
              descriptionUrdu: "جدید ترین سی این سی مشین جو کثیر محوری صلاحیت کے ساتھ درست مشینی کام اور پیچیدہ ہندسی شکل بنانے کے لیے موزوں ہے۔ زیادہ پیداوار کے لیے مسلسل معیار اور بہترین درستگی کے ساتھ کام کرتا ہے۔",
              price: 45000,
              mainImage: {
                image: {
                  asset: { _id: "img2", _ref: "image-img2", _type: "sanity.imageAsset", url: `/product-2.jpg` }
                },
                alt: "CNC Machine B2"
              },
              gallery: [
                {
                  image: {
                    asset: { _id: "img2-2", _ref: "image-img2-2", _type: "sanity.imageAsset", url: `/product-2.jpg` }
                  },
                  alt: "CNC Machine B2 - Control Panel"
                },
                {
                  image: {
                    asset: { _id: "img2-3", _ref: "image-img2-3", _type: "sanity.imageAsset", url: `/product-3.jpg` }
                  },
                  alt: "CNC Machine B2 - Work Area"
                }
              ],
              category: "Professional Series",
              
              featured: true,
              specifications: [
                { name: "Spindle Speed", nameUrdu: "اسپنڈل کی رفتار", value: "12,000 RPM", valueUrdu: "۱۲،۰۰۰ آر پی ایم" },
                { name: "Travel", nameUrdu: "حرکت", value: "X: 1000mm, Y: 500mm, Z: 400mm", valueUrdu: "X: ۱۰۰۰ملی میٹر، Y: ۵۰۰ملی میٹر، Z: ۴۰۰ملی میٹر" },
                { name: "Tool Capacity", nameUrdu: "ٹول کی گنجائش", value: "20 tools", valueUrdu: "۲۰ اوزار" },
                { name: "Repeatability", nameUrdu: "تکرار کی صلاحیت", value: "±0.005mm", valueUrdu: "±۰.۰۰۵ ملی میٹر" },
                { name: "Power Consumption", nameUrdu: "بجلی کا استعمال", value: "25 kW", valueUrdu: "۲۵ کلو واٹ" }
              ],
              features: [
                { text: "Multi-axis capability", textUrdu: "کثیر محوری صلاحیت" },
                { text: "Precision machining", textUrdu: "درست مشینی کام" },
                { text: "Complex geometry support", textUrdu: "پیچیدہ ہندسی شکل کی سپورٹ" },
                { text: "Automated tool changing", textUrdu: "خودکار اوزار تبدیلی" },
                { text: "Real-time monitoring", textUrdu: "حقیقی وقت میں نگرانی" }
              ]
            },
            "innovation-series-smart-controller-c3": {
              _id: "3",
              title: "Innovation Series Smart Controller C3",
              titleUrdu: "انوویشن سیریز سمارٹ کنٹرولر سی تھری",
              slug: { current: "innovation-series-smart-controller-c3" },
              description: "Next-generation smart controller with AI-powered optimization and real-time monitoring capabilities. Revolutionize your production with intelligent automation and predictive maintenance.",
              descriptionUrdu: "نئی نسل کا سمارٹ کنٹرولر جو مصنوعی ذہانت سے چلنے والی بہتری اور حقیقی وقت میں نگرانی کی صلاحیات سے لیس ہے۔ ذہین خودکاری اور پیشن گوئی کی دیکھ بھال سے اپنی پیداوار میں انقلاب لائیں۔",
              price: 15000,
              mainImage: {
                image: {
                  asset: { _id: "img3", _ref: "image-img3", _type: "sanity.imageAsset", url: `/product-3.jpg` }
                },
                alt: "Smart Controller C3"
              },
              category: "Innovation Series",
              
              featured: false,
              specifications: [
                { name: "Processing Power", nameUrdu: "پروسیسنگ پاور", value: "Quad-core ARM Cortex-A78", valueUrdu: "کواڈ کور اے آر ایم کورٹیکس-اے۷۸" },
                { name: "Memory", nameUrdu: "میموری", value: "8GB RAM, 128GB Storage", valueUrdu: "۸جی بی ریم، ۱۲۸جی بی اسٹوریج" },
                { name: "Connectivity", nameUrdu: "رابطہ", value: "WiFi 6, Bluetooth 5.2, Ethernet", valueUrdu: "وائی فائی ۶، بلوٹوتھ ۵.۲، ایتھرنیٹ" },
                { name: "Display", nameUrdu: "ڈسپلے", value: "10.1\" Touchscreen", valueUrdu: "۱۰.۱ انچ ٹچ اسکرین" },
                { name: "Operating System", nameUrdu: "آپریٹنگ سسٹم", value: "Industrial Linux", valueUrdu: "انڈسٹریل لینکس" }
              ],
              features: [
                { text: "AI-powered optimization", textUrdu: "مصنوعی ذہانت سے چلنے والی بہتری" },
                { text: "Real-time monitoring", textUrdu: "حقیقی وقت میں نگرانی" },
                { text: "Predictive maintenance", textUrdu: "پیشن گوئی کی دیکھ بھال" },
                { text: "Remote access capability", textUrdu: "دور سے رسائی کی صلاحیت" },
                { text: "Cloud integration", textUrdu: "کلاؤڈ انٹیگریشن" }
              ]
            }
          };
          
          const fallbackProduct = fallbackProducts[slug];
          if (!fallbackProduct) {
            notFound();
            return;
          }
          setProduct(fallbackProduct);
          
          // Set other products as recommended
          const otherProducts = Object.values(fallbackProducts).filter(p => p._id !== fallbackProduct._id);
          setRecommendedProducts(otherProducts.slice(0, 3));
        } else {
          setProduct(productData);
          
          // Fetch recommended products (same category or featured products)
          try {
            const allProducts = await client.fetch(productsListQuery);
            const recommended = allProducts
              ?.filter((p: Product) => p._id !== productData._id && (p.category === productData.category || p.featured))
              .slice(0, 3) || [];
            setRecommendedProducts(recommended);
          } catch (recError) {
            console.error('Error fetching recommended products:', recError);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Unable to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Helper function to safely get image URL
  const safeGetImageUrl = (
    imageData: Product['mainImage'] | { image: { asset: { _id: string; _ref: string; _type: string; url: string } }; alt: string } | null,
    fallbackIndex: number = 1
  ) => {
    if (!imageData?.image?.asset) {
      return `/product-${fallbackIndex}.jpg`;
    }
    
    if (imageData.image.asset._ref && imageData.image.asset._type) {
      return getImageUrl(imageData.image, 800, 600, `/product-${fallbackIndex}.jpg`);
    }
    
    return imageData.image.asset.url || `/product-${fallbackIndex}.jpg`;
  };

  // Helper to get localized text
  const getLocalizedText = (english: string, urdu?: string) => {
    return language === 'ur' && urdu ? urdu : english;
  };

  // Helper to normalize features array
  const normalizeFeatures = (features?: { text: string; textUrdu?: string; }[] | string[]) => {
    if (!features) return [];
    
    return features.map(feature => {
      if (typeof feature === 'string') {
        return { text: feature, textUrdu: undefined };
      }
      return feature;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested product could not be found.'}</p>
          <Link 
            href="/products"
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [
    product.mainImage,
    ...(product.gallery || [])
  ].filter(Boolean);

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
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        .animate-zoom-in {
          animation: zoomIn 0.5s ease-out forwards;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .gradient-border {
          background: linear-gradient(white, white) padding-box, 
                      linear-gradient(135deg, #10b981, #059669) border-box;
          border: 2px solid transparent;
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          .prose p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.prose p:last-child {
  margin-bottom: 0;
}

.gradient-text {
  background: linear-gradient(135deg, #10b981, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
        }
      `}</style>

      {/* Language Toggle & Breadcrumb */}
      <section className="py-4 bg-gradient-to-r from-gray-50 to-emerald-50/30 border-b border-gray-100">
        <Container>
          <div className="flex items-center justify-between">
            <nav className="animate-slide-in">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-emerald-600 transition-colors font-medium">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/products" className="hover:text-emerald-600 transition-colors font-medium">Products</Link></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-emerald-600 font-semibold max-w-xs truncate">{getLocalizedText(product.title, product.titleUrdu)}</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-2 glass-effect rounded-lg p-1 animate-slide-in animation-delay-100">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  language === 'en' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  language === 'ur' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Detail Section */}
      <section className="py-16 bg-gradient-to-br from-white via-emerald-50/20 to-green-50/20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-200/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Product Images */}
            <div className="space-y-6 animate-fade-in-up">
              {/* Featured Badge */}
              {product.featured && (
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-sm font-medium text-emerald-800 animate-zoom-in">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  {language === 'ur' ? 'خصوصی پروڈکٹ' : 'Featured Product'}
                </div>
              )}

              {/* Main Image */}
              <div className="relative h-64 gradient-border rounded-3xl overflow-hidden group cursor-zoom-in flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100" onClick={() => setIsImageModalOpen(true)}>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-green-100/30"></div>
                <Image
                  src={safeGetImageUrl(allImages[selectedImageIndex], selectedImageIndex + 1)}
                  alt={allImages[selectedImageIndex]?.alt || getLocalizedText(product.title, product.titleUrdu)}
                  width={800}
                  height={600}
                  className="relative z-10 max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Image Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4 animate-fade-in-up animation-delay-200">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square gradient-border rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                        selectedImageIndex === index
                          ? 'ring-2 ring-emerald-500 shadow-lg scale-105'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <Image
                        src={safeGetImageUrl(image, index + 1)}
                        alt={image?.alt || `${getLocalizedText(product.title, product.titleUrdu)} - Image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-emerald-500/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={`space-y-8 animate-fade-in-up animation-delay-200 ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
              <div>
                
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-shadow animate-slide-in animation-delay-200">
                  {getLocalizedText(product.title, product.titleUrdu)}
                </h1>
                
                <div className="prose prose-lg max-w-none animate-fade-in-up animation-delay-300">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {getLocalizedText(product.description, product.descriptionUrdu)}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="gradient-border rounded-2xl p-6 bg-gradient-to-r from-emerald-50/50 to-green-50/50 animate-zoom-in animation-delay-400">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
  {product.price?.toLocaleString() ? `PKR ${product.price.toLocaleString()}` : (language === 'ur' ? 'قیمت کے لیے رابطہ کریں' : 'Contact for price')}
</div>
                
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="animate-fade-in-up animation-delay-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-shadow">
                    {language === 'ur' ? 'اہم خصوصیات' : 'Key Features'}
                  </h3>
                  <ul className="space-y-4">
                    {normalizeFeatures(product.features).map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 group animate-slide-in" style={{animationDelay: `${(index + 1) * 100}ms`}}>
                        <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200 flex-1">
                          {getLocalizedText(feature.text, feature.textUrdu)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 pt-4 animate-zoom-in animation-delay-400 ${language === 'ur' ? 'sm:flex-row-reverse' : ''}`}>
                <Link
                  href="/contact"
                  className="flex-1 group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 text-center"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {language === 'ur' ? 'قیمت کی درخواست کریں' : 'Request Quote'}
                    <svg className={`w-5 h-5 transition-transform ${language === 'ur' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                
                <a
                  href={`https://wa.me/1234567890?text=Hello%20Baqir%20%26%20Sons%2C%20I%20need%20information%20about%20the%20product:%20${product.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 group relative overflow-hidden px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 text-center"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.630"/>
                    </svg>
                    {language === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
       
      </section>
       {/* Detailed Description Section */}
{(product.detailedDescription || product.detailedDescriptionUrdu) && (
  <section className="py-16 bg-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
    
    <Container className="relative z-10">
      <div className={`max-w-4xl mx-auto ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-shadow animate-fade-in-up">
            {language === 'ur' ? 'تفصیلی وضاحت' : 'Detailed Description'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full animate-fade-in-up animation-delay-100"></div>
        </div>
        
        <div className="gradient-border rounded-3xl p-8 md:p-12 bg-gradient-to-br from-emerald-50/30 to-green-50/30 animate-zoom-in animation-delay-200">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
              {getLocalizedText(
                product.detailedDescription || product.description, 
                product.detailedDescriptionUrdu || product.descriptionUrdu
              )
                .split('\n')
                .map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="animate-slide-in" style={{animationDelay: `${index * 100}ms`}}>
                      {paragraph.trim()}
                    </p>
                  )
                ))
              }
            </div>
          </div>
          
          {/* Additional product highlights */}
          <div className="mt-8 pt-8 border-t border-emerald-200/50">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group animate-fade-in-up animation-delay-300">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'ur' ? 'معیار کی یقین دہانی' : 'Quality Assured'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ur' ? 'بین الاقوامی معیار کے مطابق' : 'International standards compliance'}
                </p>
              </div>
              
              <div className="text-center group animate-fade-in-up animation-delay-400">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'ur' ? '۲۴/۷ سپورٹ' : '24/7 Support'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ur' ? 'مسلسل تکنیکی مدد' : 'Continuous technical assistance'}
                </p>
              </div>
              
              <div className="text-center group animate-fade-in-up animation-delay-500">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'ur' ? 'فوری ڈیلیوری' : 'Fast Delivery'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ur' ? 'تیز رفتار ترسیل' : 'Quick and reliable shipping'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
)}

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          <Container className="relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className={`text-center mb-12 ${language === 'ur' ? 'text-right' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-shadow animate-fade-in-up">
                  {language === 'ur' ? 'تکنیکی تفصیلات' : 'Technical Specifications'}
                </h2>
                <p className="text-gray-600 text-lg animate-fade-in-up animation-delay-100">
                  {language === 'ur' 
                    ? 'تفصیلی تکنیکی معلومات اور خصوصیات' 
                    : 'Detailed technical information and features'}
                </p>
              </div>
              
              <div className="gradient-border rounded-3xl p-8 bg-gradient-to-br from-emerald-50/30 to-green-50/30 animate-zoom-in animation-delay-200" dir={language === 'ur' ? 'rtl' : 'ltr'}>
                <div className="grid md:grid-cols-2 gap-6">
                  {product.specifications.map((spec, index) => (
                    <div 
                      key={index} 
                      className="group flex justify-between items-center py-4 px-6 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-200/30 hover:bg-white/80 hover:shadow-md transition-all duration-300 animate-slide-in"
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        {getLocalizedText(spec.name, spec.nameUrdu)}
                      </span>
                      <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-lg group-hover:bg-emerald-100 transition-colors">
                        {getLocalizedText(spec.value, spec.valueUrdu)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-green-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <Container className="relative z-10">
            <div className={`text-center mb-16 ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect text-emerald-800 rounded-full text-sm font-medium mb-6 animate-zoom-in">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                {language === 'ur' ? 'تجویز کردہ پروڈکٹس' : 'Recommended Products'}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-shadow animate-fade-in-up animation-delay-100">
                {language === 'ur' ? 'آپ کو یہ بھی پسند آ سکتے ہیں' : 'You Might Also Like'}
              </h2>
              
              <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                {language === 'ur' 
                  ? 'اسی کیٹگری کے دیگر بہترین پروڈکٹس دیکھیں' 
                  : 'Explore other premium products from the same category'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedProducts.map((recProduct, index) => (
                <div
                  key={recProduct._id}
                  className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Image
                      src={safeGetImageUrl(recProduct.mainImage, index + 1)}
                      alt={recProduct.mainImage?.alt || recProduct.title}
                      width={400}
                      height={300}
                      className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/product-${index + 1}.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
                    
                    {recProduct.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 glass-effect text-emerald-700 text-xs font-medium rounded-full">
                        {language === 'ur' ? 'خصوصی' : 'Featured'}
                      </div>
                    )}
                  </div>
                  
                  <div className={`relative z-20 p-6 ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
                    
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
                      {getLocalizedText(recProduct.title, recProduct.titleUrdu)}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {getLocalizedText(recProduct.description, recProduct.descriptionUrdu)}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-emerald-600">
                        {recProduct.price?.toLocaleString() || (language === 'ur' ? 'رابطہ کریں' : 'Contact')}
                      </div>
                    </div>
                    
                    <Link
                      href={`/products/${recProduct.slug?.current || recProduct._id}`}
                      className="group/btn relative inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                      
                      <span className="relative z-10 flex items-center gap-2">
                        {language === 'ur' ? 'تفصیلات دیکھیں' : 'View Details'}
                        <svg className={`w-4 h-4 transition-transform duration-300 ${language === 'ur' ? 'group-hover/btn:-translate-x-1 rotate-180' : 'group-hover/btn:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 animate-fade-in-up animation-delay-400">
              <Link
                href="/products"
                className="group inline-flex items-center px-8 py-4 glass-effect border-2 border-emerald-600 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className={`flex items-center gap-2 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  {language === 'ur' ? 'تمام پروڈکٹس دیکھیں' : 'View All Products'}
                  <svg className={`w-5 h-5 transition-transform duration-300 ${language === 'ur' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/15 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <Container className={`relative z-10 text-center text-white ${language === 'ur' ? 'text-right' : ''}`}>
          <div dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow animate-fade-in-up">
              {language === 'ur' ? 'شروع کرنے کے لیے تیار ہیں؟' : 'Ready to Get Started?'}
            </h2>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed animate-fade-in-up animation-delay-100">
              {language === 'ur' 
                ? 'ہمارے ماہرین کی ٹیم آپ کی ضروریات کے لیے بہترین حل تلاش کرنے میں آپ کی مدد کے لیے تیار ہے۔ ذاتی مشاورت کے لیے آج ہی رابطہ کریں۔'
                : 'Our team of experts is ready to help you find the perfect solution for your needs. Get in touch today for a personalized consultation.'}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center animate-zoom-in animation-delay-200 ${language === 'ur' ? 'sm:flex-row-reverse' : ''}`}>
              <Link
                href="/products"
                className="group px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {language === 'ur' ? 'تمام پروڈکٹس دیکھیں' : 'View All Products'}
                  <svg className={`w-5 h-5 transition-transform duration-300 ${language === 'ur' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              
              <Link
                href="/contact"
                className="group px-8 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {language === 'ur' ? 'سیلز ٹیم سے رابطہ' : 'Contact Sales Team'}
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up" onClick={() => setIsImageModalOpen(false)}>
          <div className="relative max-w-5xl w-full animate-zoom-in">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={safeGetImageUrl(allImages[selectedImageIndex], selectedImageIndex + 1)}
              alt={allImages[selectedImageIndex]?.alt || getLocalizedText(product.title, product.titleUrdu)}
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
      
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20would%20like%20to%20inquire%20about%20${getLocalizedText(product.title, product.titleUrdu)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce"
          aria-label={`Contact us on WhatsApp about ${getLocalizedText(product.title, product.titleUrdu)}`}
        >
          <svg
            className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.630"/>
          </svg>
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></div>
        </a>
      </div>
    </>
  );
}