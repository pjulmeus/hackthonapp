export const categories = [
  { value: 'furniture', label: 'Furniture' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'appliances', label: 'Appliances' },
  { value: 'boxes', label: 'Boxes' },
  { value: 'specialty', label: 'Specialty Items' },
] as const;

export const sizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
] as const;

export const calculateInventoryStats = (items: any[]): any => {
  return items.reduce((stats, item) => ({
    totalItems: stats.totalItems + item.quantity,
    itemsByCategory: {
      ...stats.itemsByCategory,
      [item.category]: (stats.itemsByCategory[item.category] || 0) + item.quantity,
    },
    itemsBySize: {
      ...stats.itemsBySize,
      [item.size]: (stats.itemsBySize[item.size] || 0) + item.quantity,
    },
    fragileCount: stats.fragileCount + (item.isFragile ? item.quantity : 0),
    specialHandlingCount: stats.specialHandlingCount + (item.specialHandling ? item.quantity : 0),
    disassemblyCount: stats.disassemblyCount + (item.requiresDisassembly ? item.quantity : 0),
  }), {
    totalItems: 0,
    itemsByCategory: {},
    itemsBySize: {},
    fragileCount: 0,
    specialHandlingCount: 0,
    disassemblyCount: 0,
  });
};