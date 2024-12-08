import React, { useState } from 'react';
import type { Service, ServiceBooking } from '../../types/services';
import { Icons } from '../../utils/icons';
import { UserProfileForm } from '../profile/UserProfileForm';

interface ServiceBookingFormProps {
  service: Service;
  onSubmit: (booking: ServiceBooking) => void;
  onCancel: () => void;
}

export function ServiceBookingForm({ service, onSubmit, onCancel }: ServiceBookingFormProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [booking, setBooking] = useState<Omit<ServiceBooking, 'id' | 'serviceId'>>({
    date: '',
    startTime: '',
    hours: 2,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowProfile(true);
  };

  const handleSaveComplete = () => {
    onSubmit({
      ...booking,
      id: Math.random().toString(36).substring(7),
      serviceId: service.id,
    });
  };

  const estimatedCost = booking.hours * service.hourlyRate;

  if (showProfile) {
    return (
      <UserProfileForm
        moveDetails={{
          moveDate: booking.date,
          service: service.name,
          hours: booking.hours,
        }}
        estimateDetails={{
          totalEstimate: estimatedCost,
          serviceType: service.type,
        }}
        onComplete={handleSaveComplete}
      />
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Book {service.name}</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Icons.Calendar className="inline-block w-4 h-4 mr-2" />
              Date
            </label>
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Icons.Clock className="inline-block w-4 h-4 mr-2" />
              Start Time
            </label>
            <select
              value={booking.startTime}
              onChange={(e) => setBooking({ ...booking, startTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select time...</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Hours
          </label>
          <input
            type="number"
            min="2"
            max="8"
            value={booking.hours}
            onChange={(e) => setBooking({ ...booking, hours: parseInt(e.target.value) })}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Minimum 2 hours required</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Notes
          </label>
          <textarea
            value={booking.notes}
            onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Any special instructions or requirements..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Estimated Cost:</span>
            <span className="text-teal-600">${estimatedCost}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Final cost may vary based on actual time spent
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Continue to Save Quote
        </button>
      </form>
    </div>
  );
}