import { RATES } from './base-rates';
import { calculateDistance } from './distance';
import { calculateEstimatedHours } from './time';
import { calculateAdditionalFees } from './fees';
import type { MoveDetails, InventoryItem } from '../../types';

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
  
  const estimatedHours = calculateEstimatedHours(moveDetails.origin.size, items.length);
  const baseRate = estimatedHours * RATES.BASE_RATE;
  const additionalFees = calculateAdditionalFees(moveDetails, items, distance);
  
  const totalEstimate = baseRate + Object.values(additionalFees).reduce((a, b) => a + b, 0);

  return {
    baseRate,
    additionalFees,
    totalEstimate,
    estimatedHours,
    distance,
  };
};