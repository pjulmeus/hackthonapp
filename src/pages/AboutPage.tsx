import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../utils/icons';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 text-white py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600125693229-a0c34e0e0d0f?auto=format&fit=crop&q=80"
            alt="Moving company team"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About Coastal Breeze Moving</h1>
            <p className="text-xl text-blue-100">
              Your trusted partner in stress-free moving solutions since 2010. We bring expertise, 
              care, and professionalism to every move.
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to revolutionize the moving industry, Coastal Breeze Moving 
                has grown from a small local operation to a trusted name in professional moving 
                services.
              </p>
              <p className="text-gray-600">
                Our commitment to excellence, attention to detail, and customer-first approach 
                has earned us the trust of thousands of satisfied customers across the region.
              </p>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80"
                alt="Moving truck and team"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Icons.Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">
                Count on us to deliver consistent, professional service for every move, 
                big or small.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Icons.Package className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Care & Precision</h3>
              <p className="text-gray-600">
                Your belongings are treated with the utmost care, using professional 
                packing techniques.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Icons.MessageCircle className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Communication</h3>
              <p className="text-gray-600">
                Clear, consistent communication throughout your entire moving journey.
              </p>
            </div>
          </motion.div>

          {/* Team Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-xl p-8 mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-blue-100">Moves Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Team Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <TestimonialsSection />
        </div>
      </div>
    </div>
  );
}