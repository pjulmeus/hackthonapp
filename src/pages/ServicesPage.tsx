import React, { useState } from 'react';
import { ServicesGrid } from '../components/services/ServicesGrid';
import { ServiceBookingForm } from '../components/services/ServiceBookingForm';
import { services } from '../utils/services-data';
import type { ServiceBooking } from '../types/services';

export function ServicesPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleBookingSubmit = (booking: ServiceBooking) => {
    // Here you would typically send the booking to your backend
    console.log('Booking submitted:', booking);
    setSelectedServiceId(null);
    // Show success message
    alert('Booking confirmed! We will contact you shortly.');
  };

  const selectedService = services.find(s => s.id === selectedServiceId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional moving services tailored to your needs. Book our expert team for a stress-free experience.
          </p>
        </div>

        {selectedService ? (
          <ServiceBookingForm
            service={selectedService}
            onSubmit={handleBookingSubmit}
            onCancel={() => setSelectedServiceId(null)}
          />
        ) : (
          <ServicesGrid onBookService={handleBookService} />
        )}
      </div>
    </div>
  );
}