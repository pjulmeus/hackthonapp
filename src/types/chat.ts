export interface Message {
  type: 'user' | 'assistant';
  content: string;
}

export interface QuoteState {
  originAddress?: string;
  destinationAddress?: string;
  moveDate?: string;
  homeSize?: string;
  hasStairs?: boolean;
  flightCount?: number;
}