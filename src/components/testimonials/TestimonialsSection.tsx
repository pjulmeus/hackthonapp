import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  date: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    date: "Nov 6, 2023",
    rating: 5,
    text: "Cool Breeze Moving was extremely professional and helpful for my quick office move. They brought all the supplies necessary, and was efficient with their time. I would highly recommend Cool Breeze Moving for any future tasks!"
  },
  {
    date: "Nov 1, 2023",
    rating: 5,
    text: "Cool Breeze Moving was so amazing and helpful, would definitely recommend them to anyone!"
  },
  {
    date: "Oct 19, 2023",
    rating: 5,
    text: "So wonderful and kind. Thank you so much for your help!"
  },
  {
    date: "Oct 9, 2023",
    rating: 5,
    text: "Cool Breeze Moving was fantastic! They handled everything with care and made our move stress-free."
  }
];

const stats = {
  totalReviews: 180,
  averageRating: 5.0
};

export function TestimonialsSection() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-4xl font-bold text-gray-900">
                {stats.averageRating.toFixed(1)}
              </span>
              <div className="flex">
                {renderStars(stats.averageRating)}
              </div>
              <span className="text-gray-600">
                ({stats.totalReviews} reviews)
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white p-6 rounded-xl mb-12">
            <h3 className="text-lg font-semibold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Star className="w-5 h-5 mt-1 fill-yellow-400 text-yellow-400" />
                <span>Professional and efficient service</span>
              </li>
              <li className="flex items-start space-x-2">
                <Star className="w-5 h-5 mt-1 fill-yellow-400 text-yellow-400" />
                <span>All necessary supplies provided</span>
              </li>
              <li className="flex items-start space-x-2">
                <Star className="w-5 h-5 mt-1 fill-yellow-400 text-yellow-400" />
                <span>Highly recommended by customers</span>
              </li>
              <li className="flex items-start space-x-2">
                <Star className="w-5 h-5 mt-1 fill-yellow-400 text-yellow-400" />
                <span>Stress-free moving experience</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}