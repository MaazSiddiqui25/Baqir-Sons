"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// Update the import path if Container is located elsewhere, for example:
import Container from "../../components/ui/Container";
// Or, if the file does not exist, create 'src/components/ui/Container.tsx' with a basic Container component:

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Team members data
 

  // Values data
  const values = [
    {
      icon: "🏆",
      title: "Excellence",
      description: "We strive for perfection in every aspect of our work, setting industry benchmarks and exceeding expectations.",
      color: "emerald"
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "Built on trust and transparency, we maintain ethical practices in all our business relationships.",
      color: "green"
    },
    {
      icon: "🌟",
      title: "Innovation",
      description: "Continuously evolving with cutting-edge technology to deliver tomorrow's solutions today.",
      color: "emerald"
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "Committed to environmentally responsible manufacturing and sustainable business practices.",
      color: "green"
    },
    {
      icon: "⚡",
      title: "Efficiency",
      description: "Optimizing processes and resources to deliver maximum value and performance.",
      color: "emerald"
    },
    {
      icon: "❤️",
      title: "Customer Focus",
      description: "Your success is our mission. We build lasting partnerships through exceptional service.",
      color: "green"
    }
  ];

  // Milestones data
  const milestones = [
    {
      year: "1999",
      title: "Company Founded",
      description: "Started with a vision to revolutionize manufacturing standards",
      icon: "🚀"
    },
    {
      year: "2005",
      title: "ISO Certification",
      description: "Achieved international quality standards certification",
      icon: "🏅"
    },
    {
      year: "2010",
      title: "Global Expansion",
      description: "Extended operations to serve international markets",
      icon: "🌍"
    },
    {
      year: "2015",
      title: "Technology Integration",
      description: "Implemented cutting-edge automation and AI systems",
      icon: "⚙️"
    },
    {
      year: "2020",
      title: "Sustainable Manufacturing",
      description: "Launched eco-friendly production initiatives",
      icon: "🌱"
    },
    {
      year: "2024",
      title: "Digital Transformation",
      description: "Complete digitization of operations and customer experience",
      icon: "💻"
    }
  ];

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
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-500 { animation-delay: 0.5s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        .animation-delay-700 { animation-delay: 0.7s; opacity: 0; }
        .animation-delay-800 { animation-delay: 0.8s; opacity: 0; }
        
        .bg-animation-1 { animation-delay: 1s; }
        .bg-animation-2 { animation-delay: 3s; }
        .bg-animation-3 { animation-delay: 5s; }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-animation-1"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-animation-2"></div>
          <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-animation-3"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h20l-20 20v20z'/%3E%3Cpath d='m0 20l20-20h20l-20 20v20z'/%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
        
        <Container className="relative z-10">
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Our Story & Mission
              </div>

              {/* Main heading */}
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${isLoaded ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                  About
                </span>{" "}
                <span className="text-gray-900">Baqir & Sons</span>
              </h1>

              <p className={`text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed ${isLoaded ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
                To strengthen the family culture based business by producing, distributing and market the agriculture products (Seeds, Pesticides, Fertilizer, Micro Nutrient), developing the value of our brands, pledging ourselves to be:

Highly productive and people-oriented.
Innovative, Competitive and strongly focused towards the satisfaction of our stakeholders.
market leader in agriculture sector of Pakistan
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className={`space-y-8 ${isLoaded ? 'animate-slide-in-left animation-delay-600' : 'opacity-0'}`}>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Our Journey
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  From Vision to{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Reality
                  </span>
                </h2>
                
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    To strengthen our family culture–based business, we are fully committed to producing, distributing, and marketing a wide range of high-quality agricultural products, including seeds, pesticides, fertilizers, and micro-nutrients. Our goal is to create and continuously develop the value of our brands, ensuring that they are recognized for excellence, reliability, and trust.
                  </p>
                  <p>
                    We pledge ourselves to be highly productive, efficient, and people-oriented, fostering a culture that values teamwork, respect, and continuous growth. We strive to remain innovative and competitive, introducing advanced agricultural solutions that address the evolving needs of our farmers and the agricultural community. Our strong focus is on the complete satisfaction of our stakeholders, including farmers, partners, employees, and society at large.
                  </p>
                  <p>
                    With this commitment, we aim to become and sustain ourselves as the market leader in the agriculture sector of Pakistan, not only by providing superior products but also by contributing to the prosperity of our farmers, strengthening food security, and supporting the overall economic development of the country.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">25+</h3>
                  <p className="text-gray-600 text-sm font-medium">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-green-600 mb-2">500+</h3>
                  <p className="text-gray-600 text-sm font-medium">Happy Clients</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">1000+</h3>
                  <p className="text-gray-600 text-sm font-medium">Projects Delivered</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className={`relative group ${isLoaded ? 'animate-slide-in-right animation-delay-800' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/factory.png"
                  alt="Baqir & Sons Manufacturing Facility"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover w-full h-96"
                />
                <div className="absolute inset-8 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute bottom-12 left-12 text-white">
                  <h4 className="text-2xl font-bold mb-2">Modern Manufacturing</h4>
                  <p className="text-gray-200">Where innovation meets craftsmanship</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-animation-2"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Our Core Values
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              What Drives{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                Our Success
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Built on a foundation of strong values that guide every decision and action we take
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`group relative backdrop-blur-lg bg-white/90 rounded-3xl p-8 border border-gray-200/50 hover:bg-white hover:shadow-xl hover:border-emerald-300/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isLoaded ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : 'opacity-0'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  value.color === 'emerald' ? 'from-emerald-500/5 to-green-600/5' : 'from-green-500/5 to-emerald-600/5'
                } rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${
                    value.color === 'emerald' ? 'text-emerald-700' : 'text-green-700'
                  }`}>
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Key{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Celebrating the moments that shaped our journey to excellence
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-emerald-500 to-green-600"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                  }`}>
                    {/* Content */}
                    <div className={`${
                      index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16 lg:col-start-2'
                    }`}>
                      <div className={`inline-block p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                        index % 2 === 0 ? 'bg-emerald-50' : 'bg-green-50'
                      }`}>
                        <div className="text-4xl mb-4">{milestone.icon}</div>
                        <div className={`text-3xl font-bold mb-2 ${
                          index % 2 === 0 ? 'text-emerald-600' : 'text-green-600'
                        }`}>
                          {milestone.year}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Placeholder for visual balance */}
                    <div className={`${
                      index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16 lg:col-start-1'
                    } hidden lg:block`}>
                      <div className="w-full h-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
     <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
    <div className="absolute bottom-10 right-20 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
  </div>

  <Container className="relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        Our Leadership
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        Meet Our{" "}
        <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
          Director
        </span>
      </h2>
      <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
        Visionary leadership driving excellence and innovation in agricultural solutions
      </p>
    </div>

    {/* Single Director Card - Centered */}
    <div className="flex justify-center">
      <div className="group relative backdrop-blur-lg bg-white/90 rounded-3xl p-8 border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 max-w-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-500 border-4 border-emerald-200/50">
            <Image
  src="/director.jpg"
  alt="Umar Shehbaz Ranjha - Director"
  width={128}
  height={128}
  className="w-full h-full object-cover"
/>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Umar Shahbaz Ranjha
          </h3>
          
          <p className="text-emerald-600 font-semibold mb-4 text-lg">
            Director
          </p>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Leading Baqir & Sons with strategic vision and commitment to agricultural excellence, 
            driving innovation in seed production and quality assurance across Pakistan.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
              Leadership
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
              Agriculture
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
              Innovation
            </span>
          </div>
        </div>
      </div>
    </div>
  </Container>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Ready to Work Together?
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              "Let\'s Build Something Amazing Together"{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Whether you need premium products, custom solutions, or expert consultation, 
              we\'re here to help you achieve your goals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get In Touch
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
              
              <Link
                href="/products"
                className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  View Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20would%20like%20to%20know%20more%20about%20your%20company."
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.511-.077 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
          </svg>
        </a>
      </div>
    </>
  );
}