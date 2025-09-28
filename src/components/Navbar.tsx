"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Image
                  src="/logo1.png"
                  alt="Baqir & Sons Logo"
                  width={50}
                  height={50}
                  className="relative rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 w-auto h-12"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Baqir & Sons
                </h1>
                <p className="hidden sm:block text-xs text-gray-500 font-medium">Manufacturing Excellence</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium rounded-lg transition-all duration-300 hover:bg-emerald-50 group"
                onClick={() => console.log('Clicked:', link.label)}
              >
                {link.label}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
              onClick={() => console.log('Get Quote clicked')}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => {
                console.log('Mobile menu toggled:', !isMenuOpen);
                setIsMenuOpen(!isMenuOpen);
              }}
              className="relative p-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out relative z-50 ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="py-4 space-y-2 bg-white rounded-b-2xl border-t border-gray-100">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={(_e) => {
                  console.log('Mobile link clicked:', link.label, 'href:', link.href);
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300 font-medium touch-manipulation"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                onClick={(_e) => {
                  console.log('Mobile Get Quote clicked');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay - temporarily disabled for testing */}
      {/* {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )} */}
    </nav>
  );
}