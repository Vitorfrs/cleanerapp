import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Eye, Settings, Heart } from 'lucide-react';
import { BackgroundSlider } from '../components/BackgroundSlider';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-full pt-20 font-serif">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-80px)] w-full">
        <BackgroundSlider />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 leading-tight">
              Beyond Cleaning: Transforming Spaces
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
              Redefining spaces and lives through the art of cleaning and organisation
            </p>
            <button
              onClick={() => navigate('/services/1')}
              className="w-full sm:w-auto bg-[#C4A484] hover:bg-[#B8997D] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-sm transition-all text-sm sm:text-base tracking-wide"
            >
              Get a Quote in Seconds
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 mb-4">
              Premium Solutions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl sm:max-w-2xl mx-auto px-4">
              Experience high-end cleaning and organisation services, thoughtfully designed to meet the needs of every space.
            </p>
          </div>

          <div className="relative">
            <div className="flex overflow-x-auto pb-8 gap-8 snap-x snap-mandatory scroll-smooth">
                {[
                  {
                    icon: Eye,
                    title: "Meticulous Attention to Detail",
                    description: "Our 5-star service is not merely a tagline, it's a commitment to perfection."
                  },
                  {
                    icon: Settings,
                    title: "Tailored to Your Needs",
                    description: "Just as every residence is unique, so are your preferences and requirements."
                  },
                  {
                    icon: Heart,
                    title: "Respecting Your Space",
                    description: "We treat every home with the utmost care and respect it deserves."
                  }
                ].map((service, index) => (
                  <div key={index} className="flex-none w-[300px] sm:w-[400px] snap-start">
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all">
                      <div className="mb-6">
                        <service.icon className="w-12 h-12 text-[#C4A484] mx-auto" />
                      </div>
                      <h3 className="text-xl font-serif text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button className="w-8 h-1 bg-[#C4A484] rounded-full" />
              <button className="w-8 h-1 bg-gray-200 rounded-full" />
              <button className="w-8 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000"
                alt="Luxury Kitchen"
                className="rounded-lg shadow-xl w-full h-48 sm:h-64 lg:h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-wider text-[#C4A484] mb-4">
                LUXURY HOME CLEANING RATES
              </h2>
              <h3 className="text-3xl font-serif text-gray-900 mb-6">
                Experience 5-Star Residential Cleaning
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Experience the difference with exceptional service and personalised pricing. 
                Our highly trained team offers a wide range of home cleaning services to meet 
                your unique home's needs.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Starting from</span>
                  <div className="text-right">
                    <span className="text-3xl font-serif text-[#C4A484]">$240</span>
                    <span className="text-gray-500">+ GST</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  For 2 Professionals • 2 Hours
                </div>
              </div>
              <button 
                onClick={() => navigate('/services/1')}
                className="bg-[#C4A484] hover:bg-[#B8997D] text-white px-8 py-4 rounded-sm transition-all"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Details Slider */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-center text-gray-900 mb-16">
            What Makes CleanConnect a 5 Star Service?
          </h2>
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 gap-8 snap-x snap-mandatory scroll-smooth">
                {[
                  {
                    title: "Bedrooms/Study",
                    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a",
                    features: ["General tidy & straighten", "Full vac dust of furniture", "Window ledges & skirting cleaned"]
                  },
                  {
                    title: "Bathrooms",
                    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
                    features: ["Shower screen cleaned", "Vanity & mirror polished", "Floor cleaned & sanitized"]
                  },
                  {
                    title: "Kitchen",
                    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
                    features: ["All surfaces cleaned & polished", "Appliances cleaned inside & out", "Floor mopped & sanitized"]
                  }
                ].map((service, index) => (
                  <div key={index} className="flex-none w-[300px] sm:w-[400px] snap-start">
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-all">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-64 object-cover mb-8 rounded-sm"
                      />
                      <h3 className="text-xl font-serif text-gray-900 mb-4">{service.title}</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C4A484]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button className="w-8 h-1 bg-[#C4A484] rounded-full" />
              <button className="w-8 h-1 bg-gray-200 rounded-full" />
              <button className="w-8 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-center text-gray-900 mb-16">
            Our Clients Love Us
          </h2>
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 gap-8 snap-x snap-mandatory scroll-smooth">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-none w-[300px] sm:w-[400px] snap-start">
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6">
                        "Exceptional service! The attention to detail and professionalism exceeded
                        our expectations. Our home has never looked better."
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#C4A484] rounded-full" />
                        <div>
                          <p className="font-medium text-gray-900">Sarah Johnson</p>
                          <p className="text-sm text-gray-500">Gold Coast</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button className="w-8 h-1 bg-[#C4A484] rounded-full" />
              <button className="w-8 h-1 bg-gray-200 rounded-full" />
              <button className="w-8 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif text-white mb-6 sm:mb-8">
            Experience Luxury Cleaning Services
          </h2>
          <button
            onClick={() => navigate('/services/1')}
            className="bg-[#C4A484] hover:bg-[#B8997D] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-sm transition-all text-sm sm:text-base"
          >
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}