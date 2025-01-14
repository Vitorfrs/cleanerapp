import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 mt-4">
              Delivering exceptional cleaning services that exceed expectations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/admin/dashboard" className="text-sm text-gray-600 hover:text-[#C4A484]">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-[#C4A484]">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-[#C4A484]">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-[#C4A484]">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>0403 206 777</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>info@cleanconnect.com.au</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Gold Coast, Queensland</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Business Hours</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">
                <span className="font-medium">Mon - Fri:</span> 7am - 6pm
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-medium">Saturday:</span> 8am - 4pm
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-medium">Sunday:</span> Closed
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} CleanConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}