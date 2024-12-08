import React from 'react';
import { Icons } from '../../../utils/icons';

interface EstimateSummaryCardProps {
  icon: keyof typeof Icons;
  value: string | number;
  label: string;
}

export function EstimateSummaryCard({ icon: Icon, value, label }: EstimateSummaryCardProps) {
  const IconComponent = Icons[Icon];
  
  return (
    <div className="bg-white/10 rounded-xl p-4">
      <IconComponent className="w-8 h-8 mb-2" />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}