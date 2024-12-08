import React from 'react';
import { ServiceCard } from './ServiceCard';
import { services } from '../../utils/services-data';

interface ServicesGridProps {
  onBookService: (serviceId: string) => void;
}

export function ServicesGrid({ onBookService }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onBook={onBookService}
        />
      ))}
    </div>
  );
}