export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  size: 'studio' | '1-bedroom' | '1.5-bedroom' | '2-bedroom' | '3-bedroom' | '4-bedroom' | '5plus-bedroom';
  stairs: {
    hasStairs: boolean;
    flightCount: number;
  };
}

export interface MoveDetails {
  moveDate: string;
  preferredTime: 'morning' | 'afternoon' | 'evening' | '';
  requiresCOI: boolean;
  origin: Address;
  destinations: Address[];
}