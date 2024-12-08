import React, { useState } from 'react';
import { Icons } from '../../utils/icons';

interface CreditCardFormProps {
  onSubmit: (cardData: CardData) => void;
}

export interface CardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  billingZip: string;
}

export function CreditCardForm({ onSubmit }: CreditCardFormProps) {
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingZip: '',
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    const newCardData = { ...cardData, [name]: value };
    setCardData(newCardData);
    onSubmit(newCardData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          type="text"
          id="nameOnCard"
          name="nameOnCard"
          value={cardData.nameOnCard}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleChange}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            required
          />
          <Icons.CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={cardData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cardData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700">
            Billing ZIP
          </label>
          <input
            type="text"
            id="billingZip"
            name="billingZip"
            value={cardData.billingZip}
            onChange={handleChange}
            placeholder="12345"
            maxLength={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icons.Lock className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Secure Payment</h4>
            <p className="text-sm text-blue-700">
              Your payment information is encrypted and secure. We'll only charge your card when you confirm your move.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}