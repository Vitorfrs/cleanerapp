import React, { useState } from 'react';
import { X, Clock, Calendar, MapPin, Mail, Phone, User, MoreVertical, FileText, Send, MessageSquare, Trash2 } from 'lucide-react';
import type { Quote } from '../../types/admin';

interface ActionMenuProps {
  quote: Quote;
  onClose: () => void;
}

function ActionMenu({ quote, onClose }: ActionMenuProps) {
  const actions = [
    { 
      icon: Phone, 
      label: 'Call', 
      onClick: () => window.open(`tel:${quote.client_phone}`),
      color: 'text-blue-500'
    },
    { 
      icon: Mail, 
      label: 'Email', 
      onClick: () => window.open(`mailto:${quote.client_email}`),
      color: 'text-green-500'
    },
    { 
      icon: FileText, 
      label: 'Invoice', 
      onClick: () => console.log('Generate invoice'),
      color: 'text-purple-500'
    },
    { 
      icon: Send, 
      label: 'Request review', 
      onClick: () => console.log('Request review'),
      color: 'text-yellow-500'
    },
    { 
      icon: MessageSquare, 
      label: 'Message', 
      onClick: () => console.log('Send message'),
      color: 'text-pink-500'
    },
    { 
      icon: User, 
      label: 'Manage', 
      onClick: () => console.log('Manage lead'),
      color: 'text-indigo-500'
    },
    { 
      icon: Trash2, 
      label: 'Delete', 
      onClick: () => console.log('Delete lead'),
      color: 'text-red-500',
      divider: true
    }
  ];

  return (
    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 divide-y divide-gray-100">
      {actions.map((action) => (
        <div key={action.label}>
          {action.divider && <div className="my-1" />}
          <button
            onClick={(e) => {
              e.stopPropagation();
              action.onClick();
              onClose();
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <action.icon className={`w-4 h-4 ${action.color}`} />
            <span className="text-sm text-gray-700">{action.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
interface QuoteDetailsProps {
  quote: Quote;
  onClose: () => void;
}

export function QuoteDetails({ quote, onClose }: QuoteDetailsProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Quote Details</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
                {showActions && (
                  <ActionMenu 
                    quote={quote}
                    onClose={() => setShowActions(false)}
                  />
                )}
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Client Information */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Client Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{quote.client_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{quote.client_email}</span>
              </div>
              {quote.client_phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{quote.client_phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Service Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Service Type</span>
                  <p className="font-medium text-gray-900">{quote.service_type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Cleaning Level</span>
                  <p className="font-medium text-gray-900">{quote.cleaning_level}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Estimated Hours</span>
                  <p className="font-medium text-gray-900">{quote.estimated_hours} hours</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Total Price</span>
                  <p className="font-medium text-gray-900">
                    ${(quote.estimated_hours * 40).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Space Details */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Space Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="font-medium text-gray-900">{quote.space_details.type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Bedrooms</span>
                  <p className="font-medium text-gray-900">{quote.space_details.bedrooms}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Bathrooms</span>
                  <p className="font-medium text-gray-900">{quote.space_details.bathrooms}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Floors</span>
                  <p className="font-medium text-gray-900">{quote.space_details.floors}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Created</span>
                  <p className="font-medium text-gray-900">
                    {new Date(quote.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    quote.lead_status === 'new' ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Lead Status</span>
                  <p className="font-medium text-gray-900">
                    {quote.lead_status.charAt(0).toUpperCase() + quote.lead_status.slice(1)}
                  </p>
                </div>
              </div>
              {quote.scheduled_date && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-500">Scheduled</span>
                    <p className="font-medium text-gray-900">
                      {new Date(quote.scheduled_date).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {quote.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">Notes</span>
                      <p className="mt-1 text-sm text-gray-600">{quote.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Close
          </button>
          {quote.status === 'pending' && (
            <button
              className="px-4 py-2 bg-[#C4A484] hover:bg-[#B8997D] text-white rounded-lg transition-colors"
            >
              Assign Cleaner
            </button>
          )}
        </div>
      </div>
    </div>
  );
}