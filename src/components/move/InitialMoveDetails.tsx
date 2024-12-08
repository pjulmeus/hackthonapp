import React from 'react';
import { MoveDate } from './MoveDate';
import { TimePreference } from './TimePreference';
import { COIRequirement } from './COIRequirement';

interface InitialMoveDetailsProps {
  moveDate: string;
  preferredTime: string;
  requiresCOI: boolean;
  onMoveDataChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onCOIChange: (requiresCOI: boolean) => void;
}

export function InitialMoveDetails({
  moveDate,
  preferredTime,
  requiresCOI,
  onMoveDataChange,
  onTimeChange,
  onCOIChange,
}: InitialMoveDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Move Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoveDate value={moveDate} onChange={onMoveDataChange} />
        <TimePreference value={preferredTime} onChange={onTimeChange} />
      </div>
      <div className="pt-4 border-t">
        <COIRequirement value={requiresCOI} onChange={onCOIChange} />
      </div>
    </div>
  );
}