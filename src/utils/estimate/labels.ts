export const formatFeeLabel = (key: string): string => {
  const labels: Record<string, string> = {
    stairFee: 'Stair Fee',
    specialtyFee: 'Specialty Items Fee',
    longDistanceFee: 'Long Distance Fee',
    insuranceFee: 'Insurance',
    weekendFee: 'Weekend Rate',
    peakSeasonFee: 'Peak Season Rate',
  };
  return labels[key] || key;
};