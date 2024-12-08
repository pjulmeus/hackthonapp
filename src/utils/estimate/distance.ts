export const calculateDistance = (originZip: string, destinationZip: string): number => {
  // In a real implementation, this would use a mapping API
  // For now, returning a mock distance based on zip difference
  return Math.abs(parseInt(originZip) - parseInt(destinationZip)) / 100;
};