import type { MoveType, Distance, RoomCount, QuickQuoteResult } from './types';

const BASE_PRICES: Record<RoomCount, number> = {
  'Studio': 360,
  '1 Bedrooms': 420,
  '2 Bedrooms': 880,
  '3 Bedrooms': 1260,
  '4 Bedrooms': 1800,
  '5 Bedrooms': 2400,
};

export function calculateQuickQuote(
  moveType: MoveType,
  distance: Distance,
  roomCount: RoomCount
): QuickQuoteResult {
  if (moveType === 'Residential') {
    const basePrice = BASE_PRICES[roomCount];
    
    if (basePrice) {
      // Apply long distance multiplier if applicable
      const finalPrice = distance === 'Long Distance' ? basePrice * 1.5 : basePrice;
      
      return {
        basePrice: finalPrice,
        isApplicable: true,
      };
    }
    
    return {
      basePrice: 0,
      isApplicable: false,
      message: 'Room type not applicable',
    };
  }

  return {
    basePrice: 0,
    isApplicable: false,
    message: 'Only applicable for residential moves',
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function quickQuoteFunction(
  type_of_move: string,
  is_long_distance: string,
  amount_of_rooms: string
): string {
  const moveType = type_of_move as MoveType;
  const distance = is_long_distance === 'No' ? 'Local' : 'Long Distance';
  const roomCount = amount_of_rooms as RoomCount;

  const result = calculateQuickQuote(moveType, distance, roomCount);
  
  if (result.isApplicable) {
    return formatPrice(result.basePrice);
  }
  
  return result.message || 'Not Applicable';
}