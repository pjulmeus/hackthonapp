import React from 'react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80"
          alt="Moving boxes and furniture"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">Welcome to Coastal Breeze Moving</h1>
          <p className="text-xl mb-8">Experience the breeze of effortless moving. Get an instant quote for your move and let our professional team handle the rest. Reliable, stress-free moving services along the coast and beyond.</p>
          <a
            href="#quote"
            className="inline-block bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition duration-200"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}