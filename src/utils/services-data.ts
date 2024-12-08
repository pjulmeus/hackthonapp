import type { Service } from '../types/services';

export const services: Service[] = [
  {
    id: 'packaging-service',
    type: 'packaging',
    name: 'Professional Packing Service',
    description: 'Expert packing service to ensure your belongings are safely prepared for moving. We use high-quality materials and proven techniques.',
    hourlyRate: 30,
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80',
  },
  {
    id: 'moving-help',
    type: 'moving',
    name: 'Moving Assistance',
    description: 'Professional movers to help with loading, unloading, and transporting your belongings. Experienced in handling items of all sizes.',
    hourlyRate: 50,
    imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80',
  },
  {
    id: 'furniture-assembly',
    type: 'assembly',
    name: 'Furniture Assembly',
    description: 'Expert furniture assembly and disassembly services. We handle all types of furniture with care and precision.',
    hourlyRate: 45,
    imageUrl: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80',
  },
];