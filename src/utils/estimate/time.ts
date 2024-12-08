const baseTimes = {
  'studio': 3,
  '1-bedroom': 4,
  '1.5-bedroom': 5,
  '2-bedroom': 6,
  '3-bedroom': 8,
  '4-bedroom': 10,
  '5plus-bedroom': 12,
} as const;

export const calculateEstimatedHours = (moveSize: keyof typeof baseTimes, itemCount: number): number => {
  const baseTime = baseTimes[moveSize];
  const itemFactor = Math.ceil(itemCount / 15); // Additional hour per 15 items
  return baseTime + itemFactor;
};