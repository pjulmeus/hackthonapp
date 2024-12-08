import React, { useState } from 'react';
import { Icons } from '../../utils/icons';
import { useSupabaseContext } from '../../context/SupabaseContext';
import { CreditCardForm, type CardData } from './CreditCardForm';
import { LegalAgreement } from './LegalAgreement';
import type { Profile } from '../../types/database';

interface UserProfileFormProps {
  moveDetails: any;
  estimateDetails: any;
  onComplete: () => void;
  inventoryItems: any[];
}

export function UserProfileForm({ moveDetails, estimateDetails, onComplete, inventoryItems }: UserProfileFormProps) {
  const { createMove } = useSupabaseContext();
  const [profile, setProfile] = useState<Omit<Profile, 'id' | 'created_at'>>({
    email: '',
    name: '',
    phone: '',
    address: '',
  });
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardData) {
      setError('Please enter your payment information.');
      return;
    }

    if (!agreementAccepted) {
      setError('Please accept the non-binding estimate agreement.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const moveData = {
        origin_address: moveDetails.origin.street,
        destination_address: moveDetails.destinations[0].street,
        move_date: moveDetails.moveDate,
        estimated_cost: estimateDetails.totalEstimate,
        status: 'pending' as const,
        inventory_items: inventoryItems,
      };

      const move = await createMove(moveData);
      
      if (move) {
        onComplete();
      } else {
        setError('Failed to save move details. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Save Your Quote</h2>
        
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Current Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Credit Card Form */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            <CreditCardForm onSubmit={setCardData} />
          </div>

          {/* Legal Agreement */}
          <LegalAgreement
            accepted={agreementAccepted}
            onAccept={setAgreementAccepted}
            inventoryItems={inventoryItems}
          />

          <button
            type="submit"
            disabled={isSubmitting || !cardData || !agreementAccepted}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Icons.Loader className="w-5 h-5 animate-spin mr-2" />
                Saving...
              </span>
            ) : (
              'Save Quote'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}