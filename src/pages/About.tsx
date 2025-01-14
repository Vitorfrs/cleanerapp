import React from 'react';
import { Star, Users, Award, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] w-full">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">About Us</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Setting new standards in luxury cleaning services with uncompromising attention to detail.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded on the principles of excellence and dedication, CleanConnect has 
                established itself as the premier provider of luxury cleaning services. 
                Our journey began with a simple yet powerful vision: to deliver an 
                unparalleled standard of cleanliness that transforms spaces and exceeds 
                expectations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to uphold these values, combining traditional 
                attention to detail with modern techniques and eco-friendly practices. 
                Our team of dedicated professionals shares our commitment to excellence, 
                ensuring every project receives the highest level of care and attention.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
                alt="Our Work"
                className="w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=800"
                alt="Our Team"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center text-gray-900 mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Excellence",
                description: "Striving for perfection in every detail"
              },
              {
                icon: Users,
                title: "Professionalism",
                description: "Trained experts delivering superior service"
              },
              {
                icon: Award,
                title: "Quality",
                description: "Using premium products and techniques"
              },
              {
                icon: Heart,
                title: "Care",
                description: "Treating every space with respect"
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <value.icon className="w-12 h-12 text-[#C4A484] mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center text-gray-900 mb-16">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
              },
              {
                name: "Michael Chen",
                role: "Operations Director",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
              },
              {
                name: "Emily Williams",
                role: "Client Relations Manager",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}