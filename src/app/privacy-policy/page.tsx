"use client";
import { useState, useEffect } from "react";
import Container from "../../components/ui/Container";

export default function PrivacyPolicyPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading to match your theme pattern
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Loading state matching your theme
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading privacy policy...</p>
        </div>
      </div>
    );
  }

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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h20l-20 20v20z'/%3E%3Cpath d='m0 20l20-20h20l-20 20v20z'/%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
        
        <Container className="relative z-10">
          <div className="flex flex-col items-center justify-center text-center py-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Privacy & Data Protection
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight animation-delay-200">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animation-delay-400">
              Your privacy and trust are fundamental to Baqir & Sons. Learn how we protect and handle your information.
            </p>

            {/* Last Updated */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full text-sm text-gray-600 animation-delay-400">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Last Updated: September 29, 2025
            </div>
          </div>
        </Container>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-12">
              <div className="group backdrop-blur-lg bg-emerald-50/50 rounded-3xl p-8 border border-emerald-200/50 hover:bg-emerald-50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Commitment to Your Privacy</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  At Baqir & Sons, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  As a leading seed company specializing in wheat, paddy, and other agricultural seeds, we understand the importance 
                  of maintaining your trust through transparent data practices.
                </p>
              </div>
            </div>

            {/* Privacy Policy Sections */}
            <div className="space-y-12">
              {/* Information We Collect */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Information We Collect</h3>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-emerald-700 mb-4">Personal Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Name and contact details
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Farm location and size
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Crop preferences and history
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Purchase history
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Payment information
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Communication preferences
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-emerald-700 mb-4">Agricultural Information</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect information about your farming practices, soil conditions, climate data, 
                    and crop yield information to better serve your agricultural needs and recommend suitable seed varieties.
                  </p>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-emerald-600 font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">How We Use Your Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 hover:bg-emerald-100/50 transition-colors duration-300">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">🌱 Product & Services</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Recommend suitable seed varieties</li>
                      <li>• Process and fulfill orders</li>
                      <li>• Provide agricultural guidance</li>
                      <li>• Customer support services</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 hover:bg-green-100/50 transition-colors duration-300">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">📊 Business Operations</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Market research and analysis</li>
                      <li>• Improve our products</li>
                      <li>• Seasonal planning notifications</li>
                      <li>• Quality assurance programs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-emerald-600 font-bold">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Information Sharing & Disclosure</h3>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>We do not sell, rent, or lease your personal information to third parties.</strong> 
                    We may share your information only in the following circumstances:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Service Providers</p>
                        <p className="text-gray-600 text-sm">Trusted partners who help us deliver our services (logistics, payment processing)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Legal Requirements</p>
                        <p className="text-gray-600 text-sm">When required by law or to protect our rights and safety</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Agricultural Research</p>
                        <p className="text-gray-600 text-sm">Anonymous, aggregated data for improving seed varieties (with your consent)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-emerald-600 font-bold">4</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Data Security</h3>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We implement appropriate technical and organizational measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-emerald-200">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Encryption</h4>
                      <p className="text-sm text-gray-600">Data encrypted in transit and at rest</p>
                    </div>
                    
                    <div className="text-center p-4 bg-white rounded-xl border border-emerald-200">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Access Control</h4>
                      <p className="text-sm text-gray-600">Limited access to authorized personnel</p>
                    </div>
                    
                    <div className="text-center p-4 bg-white rounded-xl border border-emerald-200">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Regular Updates</h4>
                      <p className="text-sm text-gray-600">Security systems regularly updated</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-emerald-600 font-bold">5</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Your Rights & Choices</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-800 mb-1">Access Your Data</h4>
                        <p className="text-sm text-gray-600">Request a copy of your personal information</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-800 mb-1">Update Information</h4>
                        <p className="text-sm text-gray-600">Correct or update your personal details</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">Delete Data</h4>
                        <p className="text-sm text-gray-600">Request deletion of your personal information</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L12 12m6.364 6.364L12 12m0 0L5.636 5.636M12 12l6.364-6.364M12 12l-6.364 6.364" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">Opt-Out</h4>
                        <p className="text-sm text-gray-600">Unsubscribe from marketing communications</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-emerald-600 font-bold">6</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 text-white">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold mb-4">Privacy Officer</h4>
                      <p className="mb-6 text-emerald-100">
                        If you have any questions about this Privacy Policy or wish to exercise your rights, 
                        please contact our Privacy Officer.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span>privacy@baqirandsons.com</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <span>+92 345 8440115</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold mb-4">Response Time</h4>
                      <p className="mb-4 text-emerald-100">
                        We are committed to responding to your privacy-related inquiries promptly.
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                          <span>Privacy Requests:</span>
                          <span className="font-semibold">Within 30 days</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                          <span>General Inquiries:</span>
                          <span className="font-semibold">Within 3-5 days</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                          <span>Urgent Matters:</span>
                          <span className="font-semibold">Within 24 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-16 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Policy Updates</h3>
                <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                  We will notify you of any material changes by posting the updated policy on our website and updating the &quot;Last Updated&quot; date.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Effective Date: September 29, 2025
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Questions or Concerns?
            </div>
            
           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
  We&apos;re Here to{" "}
  <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
    Help
  </span>
</h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
  If you have any questions about our Privacy Policy or how we handle your data, 
  don&apos;t hesitate to reach out to our team.
</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-emerald-600 text-emerald-600 rounded-2xl font-semibold hover:bg-emerald-50 hover:border-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 group"
              >
                General Contact
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923458440115?text=Hello%20Baqir%20%26%20Sons%2C%20I%20have%20a%20question%20about%20your%20privacy%20policy."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce"
          aria-label="Contact us on WhatsApp about privacy"
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
    </>
  );
}