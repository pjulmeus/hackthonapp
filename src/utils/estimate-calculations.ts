import { calculateQuickQuote } from './quick-quote';
import type { MoveDetails, InventoryItem } from '../types';
import type { RoomCount } from './quick-quote/types';

// Base rates for additional services
export const RATES = {
  MILEAGE_RATE: 2.5, // Per mile
  STAIR_RATE: 50, // Additional per flight of stairs
  HEAVY_ITEM_RATE: 75, // Per heavy/specialty item
  PACKING_RATE: 45, // Per hour for packing services
  WEEKEND_RATE: 1.2, // 20% increase for weekend moves
  PEAK_SEASON_RATE: 1.15, // 15% increase for peak season (May-September)
  INSURANCE_RATE: 0.006, // 0.6% of declared value
};

// Map home size to room count for quick quote
const sizeToRoomCount: Record<string, RoomCount> = {
  'studio': 'Studio',
  '1-bedroom': '1 Bedrooms',
  '2-bedroom': '2 Bedrooms',
  '3-bedroom': '3 Bedrooms',
  '4-bedroom': '4 Bedrooms',
  '5plus-bedroom': '5 Bedrooms',
};

// Calculate distance between two zip codes
export const calculateDistance = (originZip: string, destinationZip: string): number => {
  // In a real implementation, this would use a mapping API
  return Math.abs(parseInt(originZip) - parseInt(destinationZip)) / 100;
};

// Calculate time based on home size and items
export const calculateEstimatedHours = (moveDetails: MoveDetails, itemCount: number): number => {
  const baseTimes = {
    'studio': 3,
    '1-bedroom': 4,
    '1.5-bedroom': 5,
    '2-bedroom': 6,
    '3-bedroom': 8,
    '4-bedroom': 10,
    '5plus-bedroom': 12,
  };
  
  const baseTime = baseTimes[moveDetails.origin.size];
  const itemFactor = Math.ceil(itemCount / 15); // Additional hour per 15 items
  
  return baseTime + itemFactor;
};

// Calculate additional fees
export const calculateAdditionalFees = (
  moveDetails: MoveDetails,
  items: InventoryItem[],
  distance: number
): Record<string, number> => {
  const fees: Record<string, number> = {};

  // Get quick quote base price
  const quickQuoteResult = calculateQuickQuote(
    'Residential',
    distance > 50 ? 'Long Distance' : 'Local',
    sizeToRoomCount[moveDetails.origin.size] || 'Studio'
  );

  // Use quick quote as base price if applicable
  if (quickQuoteResult.isApplicable) {
    fees.baseQuote = quickQuoteResult.basePrice;
  }

  // Stair fees
  const totalFlights = 
    (moveDetails.origin.stairs.hasStairs ? moveDetails.origin.stairs.flightCount : 0) +
    moveDetails.destinations.reduce((acc, dest) => 
      acc + (dest.stairs.hasStairs ? dest.stairs.flightCount : 0), 0);
  
  if (totalFlights > 0) {
    fees.stairFee = totalFlights * RATES.STAIR_RATE;
  }

  // Heavy/Specialty items
  const specialtyItems = items.filter(item => 
    item.specialHandling || item.category === 'specialty'
  ).length;
  
  if (specialtyItems > 0) {
    fees.specialtyFee = specialtyItems * RATES.HEAVY_ITEM_RATE;
  }

  // Long distance fee
  if (distance > 50) {
    fees.longDistanceFee = distance * RATES.MILEAGE_RATE;
  }

  // Insurance (if requested)
  const totalValue = items.reduce((acc, item) => acc + (item.estimatedValue || 0), 0);
  if (totalValue > 0) {
    fees.insuranceFee = totalValue * RATES.INSURANCE_RATE;
  }

  // Weekend rate if applicable
  const moveDate = new Date(moveDetails.moveDate);
  if (moveDate.getDay() === 0 || moveDate.getDay() === 6) {
    fees.weekendFee = (fees.baseQuote || 0) * (RATES.WEEKEND_RATE - 1);
  }

  // Peak season rate (May-September)
  const moveMonth = moveDate.getMonth();
  if (moveMonth >= 4 && moveMonth <= 8) {
    fees.peakSeasonFee = (fees.baseQuote || 0) * (RATES.PEAK_SEASON_RATE - 1);
  }

  return fees;
};

export const calculateTotalEstimate = (
  moveDetails: MoveDetails,
  items: InventoryItem[],
): {
  baseRate: number;
  additionalFees: Record<string, number>;
  totalEstimate: number;
  estimatedHours: number;
  distance: number;
} => {
  const distance = calculateDistance(
    moveDetails.origin.zipCode,
    moveDetails.destinations[0].zipCode
  );
  
  const estimatedHours = calculateEstimatedHours(moveDetails, items.length);
  const additionalFees = calculateAdditionalFees(moveDetails, items, distance);
  
  // Use quick quote base price if available, otherwise calculate based on hours
  const baseRate = additionalFees.baseQuote || (estimatedHours * RATES.MILEAGE_RATE);
  delete additionalFees.baseQuote; // Remove from additional fees since it's our base rate

  const totalEstimate = baseRate + Object.values(additionalFees).reduce((a, b) => a + b, 0);

  return {
    baseRate,
    additionalFees,
    totalEstimate,
    estimatedHours,
    distance,
  };
};