import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { Clock } from 'lucide-react';

interface OpdLiveBadgeProps {
  showDetails?: boolean;
  className?: string;
}

export const OpdLiveBadge: React.FC<OpdLiveBadgeProps> = ({ showDetails = true, className = '' }) => {
  const { opdStatus } = useClinic();

  return (
    <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs font-medium ${opdStatus.badgeClass} ${className}`}>
      <span className="relative flex h-2 w-2">
        {opdStatus.isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            opdStatus.isOpen ? 'bg-emerald-600' : 'bg-amber-600'
          }`}
        />
      </span>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 opacity-70" />
        <span className="font-semibold tracking-wide">{opdStatus.statusText}</span>
        {showDetails && opdStatus.subText && (
          <span className="opacity-80 hidden sm:inline">· {opdStatus.subText}</span>
        )}
      </div>
    </div>
  );
};
