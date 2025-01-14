import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between h-20 px-6 lg:px-12">
          <Logo />
          
          <nav className={`hidden lg:flex items-center gap-12 ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}>
            <Link to="/services" className="text-sm tracking-wide hover:text-[#C4A484] transition-colors">Services</Link>
            <Link to="/about" className="text-sm tracking-wide hover:text-[#C4A484] transition-colors">About</Link>
            <Link to="/contact" className="text-sm tracking-wide hover:text-[#C4A484] transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-6">
            <a href="tel:0403206777" className={`hidden lg:flex items-center gap-2 hover:text-[#C4A484] transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              <Phone className="w-5 h-5" />
              <span className="text-sm">0403 206 777</span>
            </a>
            <Link to="/services/1" className="hidden lg:block bg-[#C4A484] hover:bg-[#B8997D] text-white px-6 py-3 text-sm tracking-wide transition-all">
              Book Now
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-6 py-8 space-y-6">
            <Link to="/services" className="text-gray-900 hover:text-[#C4A484]">Services</Link>
            <Link to="/about" className="text-gray-900 hover:text-[#C4A484]">About</Link>
            <Link to="/contact" className="text-gray-900 hover:text-[#C4A484]">Contact</Link>
            <Link to="/services/1" className="bg-[#C4A484] hover:bg-[#B8997D] text-white px-6 py-3 text-sm tracking-wide transition-all text-center">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}