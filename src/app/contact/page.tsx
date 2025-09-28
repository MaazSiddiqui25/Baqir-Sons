"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
// Update the import path if Container is located elsewhere
import Container from "../../components/ui/Container";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Contact methods data
  const contactMethods = [
    {
      icon: "📞",
      title: "Call Us",
      subtitle: "Mon-Fri 8AM-6PM PKT",
      info: "+92  345 844 0115",
      action: "tel:+923458440115",
      color: "emerald"
    },
    {
      icon: "✉️",
      title: "Email Us",
      subtitle: "24/7 Support",
      info: "baqirsonsseeds@gmail.com",
      action: "https://mail.google.com/mail/?view=cm&fs=1&to=baqirsonsseeds@gmail.com",
      color: "green"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      subtitle: "Quick Response",
      info: "+92 345 844 0115",
      action: "https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
      color: "emerald"
    },
    {
      icon: "📍",
      title: "Visit Us",
      subtitle: "Manufacturing Facility",
      info: "13 km, sargodha road, M.B. Din, Punjab",
      action: "https://www.google.com/maps/search/?api=1&query=13+km+sargodha+road+M.B.+Din+Punjab+Pakistan",
      color: "green"
    }
  ];

  // Office locations data
  const offices = [
    {
      title: "Head Office & Manufacturing",
      address: "Industrial Area, GT Road",
      city: "13 km, sargodha road, M.B. Din, Punjab",
      country: "Pakistan",
      phone: "+92  345 844 0115",
      email: "baqirsonsseeds@gmail.com",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM"
    },
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
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
                Get In Touch
              </div>

              {/* Main heading */}
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${isLoaded ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                  Contact
                </span>{" "}
                <span className="text-gray-900">Baqir & Sons</span>
              </h1>

              <p className={`text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed ${isLoaded ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
                Ready to start your next project? We're here to help you achieve excellence 
                with innovative solutions tailored to your needs. Let's build something amazing together.
              </p>

              {/* Quick Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isLoaded ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
                <a
                  href="tel:+923458440115"
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    📞 Call Now
                  </span>
                </a>
                <a
                  href="https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    💬 WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              How to Reach Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Multiple Ways to{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Choose your preferred method of communication and we'll respond promptly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : '_self'}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`group relative backdrop-blur-lg bg-white/90 rounded-3xl p-8 border border-gray-200/50 hover:bg-white hover:shadow-xl hover:border-${method.color}-300/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isLoaded ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : 'opacity-0'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  method.color === 'emerald' ? 'from-emerald-500/5 to-green-600/5' : 'from-green-500/5 to-emerald-600/5'
                } rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${
                    method.color === 'emerald' ? 'text-emerald-700' : 'text-green-700'
                  }`}>
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-3">
                    {method.subtitle}
                  </p>
                  
                  <p className="text-gray-900 font-semibold">
                    {method.info}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Visit Our Offices Section - Centered */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-animation-2"></div>
        </div>

        <Container className="relative z-10">
          {/* Centered Content */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Our Location
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900">
              Visit Our{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Office
              </span>
            </h2>

            {/* Office Card - Centered */}
            <div className="max-w-2xl mx-auto mb-12">
              {offices.map((office, index) => (
                <div 
                  key={index}
                  className={`group backdrop-blur-lg bg-white/90 rounded-3xl p-8 border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                    isLoaded ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-emerald-700 mb-6">
                      {office.title}
                    </h3>
                    
                    <div className="space-y-4 text-gray-600">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">📍</span>
                        <div>
                          <p className="font-medium text-gray-900">{office.address}</p>
                          <p className="text-lg">{office.city}</p>
                          <p>{office.country}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">📞</span>
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-emerald-600 hover:text-emerald-700 font-medium text-lg">
                          {office.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">✉️</span>
                        <a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${office.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-lg"
                        >
                          {office.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">🕒</span>
                        <p>{office.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Section - Centered */}
            <div className={`max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
              <div className="group backdrop-blur-lg bg-white/90 rounded-3xl p-8 border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-emerald-700 mb-6">
                    Find Us on Map
                  </h3>
                  
                  {/* Embedded Google Map */}
                  <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-4 mb-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.8!2d72.6!3d32.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDM2JzAwLjAiTiA3MsKwMzYnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                      width="100%"
                      height="300"
                      style={{border: 0, borderRadius: '1rem'}}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full rounded-2xl"
                    ></iframe>
                  </div>
                  
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=13+km+sargodha+road+M.B.+Din+Punjab+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                  >
                    Open in Google Maps
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Frequently Asked Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Quick{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Answers
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Find answers to commonly asked questions about our services and processes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What is your typical response time for inquiries?",
                answer: "We respond to all inquiries within 24 hours during business days, and often much sooner. For urgent matters, please call us directly or use WhatsApp for immediate assistance."
              },
              {
                question: "Do you offer custom manufacturing solutions?",
                answer: "Yes, we specialize in custom manufacturing solutions tailored to your specific requirements. Our engineering team works closely with clients to develop products that meet exact specifications."
              },
              {
                question: "What quality certifications do you have?",
                answer: "We are ISO certified and maintain strict quality control standards throughout our manufacturing processes. All products undergo rigorous testing before delivery."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we serve clients globally and have extensive experience in international shipping and logistics. We ensure safe and timely delivery worldwide."
              }
            ].map((faq, index) => (
              <div key={index} className="group backdrop-blur-lg bg-white/90 rounded-2xl p-6 border border-gray-200/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-animation-1"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-animation-3"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Ready to Get Started?
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Let's Discuss Your{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Next Project
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Whether you need premium products, custom manufacturing solutions, or expert consultation, 
              our team is ready to help you achieve excellence. Get in touch today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+923458440115"
                className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  📞 Call Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              
              <a
                href="https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  💬 WhatsApp Chat
                </span>
              </a>
            </div>

            {/* Contact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-emerald-600 mb-1">24hrs</h3>
                <p className="text-gray-600 text-sm">Response Time</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-green-600 mb-1">500+</h3>
                <p className="text-gray-600 text-sm">Happy Clients</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-emerald-600 mb-1">25+</h3>
                <p className="text-gray-600 text-sm">Years Experience</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-green-600 mb-1">100%</h3>
                <p className="text-gray-600 text-sm">Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
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