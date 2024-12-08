import type { RoomInventory } from './types';

export interface ApartmentBenchmark {
  basePrice: number;
  inventory: RoomInventory;
  hourlyRate: number;
  estimatedHours: number;
}

// Base inventory for a single room
const baseRoomInventory: RoomInventory = {
  largeItems: 5,
  mediumItems: 6,
  smallItems: 9,
  boxes: {
    large: 5,
    medium: 8,
    small: 10
  },
  fragileItems: 4,
  specialHandling: 2
};

// Room multipliers for different apartment sizes
const roomMultipliers = {
  'studio': 0.75,
  '1-bedroom': 1,
  '2-bedroom': 1.75,
  '3-bedroom': 2.5,
  '4-bedroom': 3.25,
  '5plus-bedroom': 4
};

// Generate benchmark for different apartment sizes
export const apartmentBenchmarks = Object.entries(roomMultipliers).reduce((acc, [size, multiplier]) => {
  const inventory = {
    largeItems: Math.round(baseRoomInventory.largeItems * multiplier),
    mediumItems: Math.round(baseRoomInventory.mediumItems * multiplier),
    smallItems: Math.round(baseRoomInventory.smallItems * multiplier),
    boxes: {
      large: Math.round(baseRoomInventory.boxes.large * multiplier),
      medium: Math.round(baseRoomInventory.boxes.medium * multiplier),
      small: Math.round(baseRoomInventory.boxes.small * multiplier)
    },
    fragileItems: Math.round(baseRoomInventory.fragileItems * multiplier),
    specialHandling: Math.round(baseRoomInventory.specialHandling * multiplier)
  };

  acc[size] = {
    basePrice: 450 * multiplier,
    inventory,
    hourlyRate: 150,
    estimatedHours: Math.max(4, Math.round(4 * multiplier))
  };

  return acc;
}, {} as Record<string, ApartmentBenchmark>);

// Export the one bedroom benchmark for backward compatibility
export const oneBedBenchmark = apartmentBenchmarks['1-bedroom'];