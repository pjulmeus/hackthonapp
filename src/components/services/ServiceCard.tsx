import React from 'react';
import { Icons } from '../../utils/icons';
import type { Service } from '../../types/services';

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-teal-600">
            <Icons.DollarSign size={20} className="mr-1" />
            <span className="font-semibold">${service.hourlyRate}/hour</span>
          </div>
          <div className="flex items-center text-blue-600">
            <Icons.Clock size={20} className="mr-1" />
            <span>Flexible Hours</span>
          </div>
        </div>

        <button
          onClick={() => onBook(service.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}