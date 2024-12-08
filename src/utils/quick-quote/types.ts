export type MoveType = 'Residential' | 'Commercial';
export type Distance = 'Local' | 'Long Distance';
export type RoomCount = 'Studio' | '1 Bedrooms' | '2 Bedrooms' | '3 Bedrooms' | '4 Bedrooms' | '5 Bedrooms';

export interface QuickQuoteResult {
  basePrice: number;
  isApplicable: boolean;
  message?: string;
}