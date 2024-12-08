export type ServiceType = 'packaging' | 'moving' | 'assembly';

export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  hourlyRate: number;
  imageUrl: string;
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  date: string;
  startTime: string;
  hours: number;
  notes: string;
}