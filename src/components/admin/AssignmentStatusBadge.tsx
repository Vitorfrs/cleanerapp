import React from 'react';
import { Clock, Check, X, AlertTriangle } from 'lucide-react';

interface AssignmentStatusBadgeProps {
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  deadline?: string;
}

export function AssignmentStatusBadge({ status, deadline }: AssignmentStatusBadgeProps) {
  const config = {
    pending: {
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-700',
      text: 'Pending Response'
    },
    accepted: {
      icon: Check,
      color: 'bg-green-100 text-green-700',
      text: 'Accepted'
    },
    declined: {
      icon: X,
      color: 'bg-red-100 text-red-700',
      text: 'Declined'
    },
    expired: {
      icon: AlertTriangle,
      color: 'bg-gray-100 text-gray-700',
      text: 'Expired'
    }
  }[status];

  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-1">
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${config.color}`}>
        <Icon className="w-4 h-4" />
        <span>{config.text}</span>
      </div>
      {status === 'pending' && deadline && (
        <div className="text-xs text-gray-500">
          Expires: {new Date(deadline).toLocaleString()}
        </div>
      )}
    </div>
  );
}