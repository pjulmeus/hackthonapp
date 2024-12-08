import { RATES } from './base-rates';
import type { MoveDetails, InventoryItem } from '../../types';

export const calculateAdditionalFees = (
  moveDetails: MoveDetails,
  items: InventoryItem[],
  distance: number
): Record<string, number> => {
  const fees: Record<string, number> = {};

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
    fees.weekendFee = RATES.BASE_RATE * RATES.WEEKEND_RATE;
  }

  // Peak season rate (May-September)
  const moveMonth = moveDate.getMonth();
  if (moveMonth >= 4 && moveMonth <= 8) {
    fees.peakSeasonFee = RATES.BASE_RATE * RATES.PEAK_SEASON_RATE;
  }

  return fees;
};