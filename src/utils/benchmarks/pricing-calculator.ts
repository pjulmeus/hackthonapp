import type { RoomInventory, ApartmentBenchmark } from './apartment-types';

const UPCHARGE_RATES = {
  ITEM_OVERFLOW: 0.15, // 15% upcharge for each 20% over benchmark
  FRAGILE: 25, // $25 per additional fragile item
  SPECIAL_HANDLING: 75, // $75 per additional special handling item
  ADDITIONAL_HOUR: 150, // $150 per additional estimated hour
};

export function calculateUpcharges(
  currentInventory: RoomInventory,
  benchmark: ApartmentBenchmark
): {
  basePrice: number;
  upcharges: Record<string, number>;
  totalPrice: number;
  estimatedHours: number;
} {
  const upcharges: Record<string, number> = {};
  let estimatedHours = benchmark.estimatedHours;

  // Calculate total items difference
  const benchmarkTotal = 
    benchmark.inventory.largeItems + 
    benchmark.inventory.mediumItems + 
    benchmark.inventory.smallItems;
  
  const currentTotal = 
    currentInventory.largeItems + 
    currentInventory.mediumItems + 
    currentInventory.smallItems;

  // Calculate item overflow percentage
  const overflowPercentage = Math.max(0, (currentTotal - benchmarkTotal) / benchmarkTotal);
  if (overflowPercentage > 0.2) { // Only apply if over 20% more items
    const overflowMultiplier = Math.floor(overflowPercentage / 0.2);
    upcharges.itemOverflow = benchmark.basePrice * (UPCHARGE_RATES.ITEM_OVERFLOW * overflowMultiplier);
    estimatedHours += overflowMultiplier;
  }

  // Calculate fragile items upcharge
  const additionalFragile = Math.max(0, currentInventory.fragileItems - benchmark.inventory.fragileItems);
  if (additionalFragile > 0) {
    upcharges.fragileItems = additionalFragile * UPCHARGE_RATES.FRAGILE;
  }

  // Calculate special handling upcharge
  const additionalSpecial = Math.max(0, currentInventory.specialHandling - benchmark.inventory.specialHandling);
  if (additionalSpecial > 0) {
    upcharges.specialHandling = additionalSpecial * UPCHARGE_RATES.SPECIAL_HANDLING;
  }

  // Calculate box upcharges
  const boxDifference = {
    large: currentInventory.boxes.large - benchmark.inventory.boxes.large,
    medium: currentInventory.boxes.medium - benchmark.inventory.boxes.medium,
    small: currentInventory.boxes.small - benchmark.inventory.boxes.small,
  };

  const totalExtraBoxes = Object.values(boxDifference).reduce((sum, diff) => sum + Math.max(0, diff), 0);
  if (totalExtraBoxes > 0) {
    const additionalBoxHours = Math.ceil(totalExtraBoxes / 15); // 1 extra hour per 15 boxes
    upcharges.additionalBoxes = additionalBoxHours * UPCHARGE_RATES.ADDITIONAL_HOUR;
    estimatedHours += additionalBoxHours;
  }

  // Calculate total price
  const totalUpcharges = Object.values(upcharges).reduce((sum, charge) => sum + charge, 0);
  const totalPrice = benchmark.basePrice + totalUpcharges;

  return {
    basePrice: benchmark.basePrice,
    upcharges,
    totalPrice,
    estimatedHours,
  };
}