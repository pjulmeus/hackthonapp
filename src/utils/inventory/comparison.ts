import { apartmentBenchmarks } from '../benchmarks/apartment-types';
import type { InventoryItem } from '../../types/inventory';
import type { Address } from '../../types';

export function isLargeInventory(items: InventoryItem[], moveSize: Address['size'] = '1-bedroom'): boolean {
  // Get the appropriate benchmark based on move size
  const benchmark = apartmentBenchmarks[moveSize]?.inventory || apartmentBenchmarks['1-bedroom'].inventory;

  // Count items by size
  const itemCounts = items.reduce(
    (acc, item) => {
      acc[item.size] += item.quantity;
      return acc;
    },
    { small: 0, medium: 0, large: 0 }
  );

  // Compare with size-adjusted benchmark
  const exceedsThreshold = 
    itemCounts.large > benchmark.largeItems ||
    itemCounts.medium > benchmark.mediumItems ||
    itemCounts.small > benchmark.smallItems;

  // Check special handling items
  const specialHandlingCount = items.filter(item => item.specialHandling).length;
  const exceedsSpecialHandling = specialHandlingCount > benchmark.specialHandling;

  // Check fragile items
  const fragileCount = items.filter(item => item.isFragile).length;
  const exceedsFragile = fragileCount > benchmark.fragileItems;

  // Calculate total percentage over benchmark
  const totalItems = itemCounts.large + itemCounts.medium + itemCounts.small;
  const benchmarkTotal = benchmark.largeItems + benchmark.mediumItems + benchmark.smallItems;
  const percentageOver = (totalItems - benchmarkTotal) / benchmarkTotal;

  // Return true if significantly over any threshold
  return (
    exceedsThreshold ||
    exceedsSpecialHandling ||
    exceedsFragile ||
    percentageOver > 0.2 // More than 20% over total benchmark
  );
}