import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Media", href: "/media" }
    ],
    products: [
      { label: "All Products", href: "/products" },
      
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/contact#faq" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/privacy-policy" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Company info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo1.png"
                  alt="Baqir & Sons Logo"
                  width={50}
                  height={50}
                  className="rounded-xl shadow-lg w-auto h-12"
                />
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Baqir & Sons
                  </h3>
                  <p className="text-gray-400 text-sm">Manufacturing Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Pioneering excellence in manufacturing with cutting-edge technology, 
                uncompromising quality, and innovative solutions since 1999.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-emerald-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-400">baqirsonsseeds@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-emerald-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-gray-400">R13 km, sargodha road, M.B. Din, Punjab,Pakistan</span>
                </div>
              </div>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social media and bottom bar */}
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <span className="text-gray-400">Connect with developer:</span>
              <div className="flex gap-4">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/maaz-siddiqui-88a90032b" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400">
              <p>&copy; {currentYear} Baqir & Sons. All rights reserved.</p>
              <div className="flex items-center gap-1">
                <span>Made by M. Maaz Siddiqui</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}