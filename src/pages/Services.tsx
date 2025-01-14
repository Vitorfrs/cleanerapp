import React from 'react';
import { Shield, Clock, Sparkles, Award, CheckCircle, Star } from 'lucide-react';

export function Services() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] w-full">
        <img
          src="https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Service"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Services</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Discover our comprehensive range of premium cleaning services, 
              tailored to meet the highest standards of luxury living.
            </p>
          </div>
        </div>
      </div>

      {/* Premium Services */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Residential Excellence",
                description: "Comprehensive cleaning solutions for luxury homes and apartments",
                features: ["Deep cleaning protocols", "Eco-friendly products", "Trained specialists"],
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Premium Property Care",
                description: "Specialized services for high-end properties and estates",
                features: ["Customized cleaning plans", "Premium equipment", "Detailed reporting"],
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Luxury Concierge",
                description: "Personalized cleaning and maintenance programs",
                features: ["24/7 availability", "Personal manager", "Bespoke solutions"],
                image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
              }
            ].map((service, index) => (
              <div key={index} className="group">
                <div className="relative h-64 mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#C4A484]" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Standards */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center text-gray-900 mb-16">
            Our Service Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Guaranteed Quality",
                description: "Our services are backed by a 100% satisfaction guarantee"
              },
              {
                icon: Clock,
                title: "Timely Service",
                description: "Punctual and efficient service delivery every time"
              },
              {
                icon: Sparkles,
                title: "Premium Products",
                description: "Using only the finest cleaning products and equipment"
              },
              {
                icon: Award,
                title: "Certified Teams",
                description: "Professionally trained and vetted cleaning specialists"
              }
            ].map((standard, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <standard.icon className="w-12 h-12 text-[#C4A484] mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{standard.title}</h3>
                <p className="text-gray-600">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}