import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Clock, RefreshCw, LayoutGrid, LayoutList, MoreHorizontal, Phone, Mail, User, MessageSquare, FileText, Send, Trash2, MoreVertical } from 'lucide-react';
import { AssignCleanerModal } from '../../components/admin/AssignCleanerModal';
import { AssignmentStatusBadge } from '../../components/admin/AssignmentStatusBadge';
import { QuoteDetails } from '../../components/admin/QuoteDetails';
import { supabase } from '../../services/supabase';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Quote } from '../../types/admin';

interface LeadCardProps {
  quote: Quote;
  onView: () => void;
  onAssign: () => void;
}

interface ActionMenuProps {
  quote: Quote;
  onClose: () => void;
}

function ActionMenu({ quote, onClose }: ActionMenuProps) {
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(null);

  const cleaners = [
    {
      id: '1',
      name: 'Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      rating: 4.8,
      reviewCount: 127,
      services: ['Home Cleaning', 'Office Cleaning']
    }
  ];

  const handleAssign = async () => {
    if (!selectedCleaner || !selectedDate || !selectedTime) return;
    
    try {
      // Call your assign cleaner API here
      console.log('Assigning cleaner:', {
        cleanerId: selectedCleaner,
        date: selectedDate,
        time: selectedTime
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to assign cleaner:', error);
    }
  };

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
      label: 'Assign Cleaner', 
      onClick: () => setShowAssignForm(true),
      color: 'text-indigo-500'
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

  if (showAssignForm) {
    return (
      <div className="absolute right-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Assign Cleaner</h3>
          <button onClick={() => setShowAssignForm(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Cleaner Selection */}
          <div>
            {cleaners.map((cleaner) => (
              <button
                key={cleaner.id}
                onClick={() => setSelectedCleaner(cleaner.id)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                  selectedCleaner === cleaner.id
                    ? 'bg-pink-50 border-2 border-pink-500'
                    : 'bg-white border-2 border-gray-100 hover:border-pink-200'
                }`}
              >
                <img
                  src={cleaner.photo}
                  alt={cleaner.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{cleaner.name}</div>
                  <div className="text-sm text-gray-500">
                    Rating: {cleaner.rating} ({cleaner.reviewCount} reviews)
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>
          </div>

          <button
            onClick={handleAssign}
            disabled={!selectedCleaner || !selectedDate || !selectedTime}
            className="w-full bg-[#C4A484] hover:bg-[#B8997D] text-white py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Cleaner
          </button>
        </div>
      </div>
    );
  }
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

function LeadCard({ quote, onView, onAssign }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: quote.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const [showActions, setShowActions] = useState(false);

  const actions = [
    { icon: Phone, label: 'Call', onClick: () => window.open(`tel:${quote.client_phone}`), color: 'text-blue-500' },
    { icon: Mail, label: 'Email', onClick: () => window.open(`mailto:${quote.client_email}`), color: 'text-green-500' },
    { icon: FileText, label: 'Invoice', onClick: () => console.log('Generate invoice'), color: 'text-purple-500' },
    { icon: Send, label: 'Request Review', onClick: () => console.log('Request review'), color: 'text-yellow-500' },
    { icon: MessageSquare, label: 'Message', onClick: () => console.log('Message'), color: 'text-pink-500' },
    { icon: User, label: 'Assign', onClick: onAssign, color: 'text-indigo-500' },
    { icon: Trash2, label: 'Delete', onClick: () => console.log('Delete'), color: 'text-red-500', divider: true }
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{quote.client_name}</h3>
          <p className="text-sm text-gray-500">{quote.service_type}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 divide-y divide-gray-100">
              {actions.map((action) => (
                <div key={action.label}>
                  {action.divider && <div className="my-1" />}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick();
                      setShowActions(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                    <span className="text-sm text-gray-700">{action.label}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{quote.estimated_hours}h</span>
        </div>
        {quote.scheduled_date && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(quote.scheduled_date).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
        className="mt-3 w-full text-center text-sm text-pink-500 hover:text-pink-600 font-medium"
      >
        View Details
      </button>
    </div>
  );
}
export function Quotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Quote['status'] | 'all'>('all');
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [viewingQuote, setViewingQuote] = useState<Quote | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [refreshing, setRefreshing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      // Update quotes list with fresh data
      setQuotes(data);
    } catch (error) {
      console.error('Error refreshing quotes:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote?.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote?.client_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'assigned':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAssignClick = (quoteId: string) => {
    setSelectedQuote(quoteId);
  };

  const handleAssigned = () => {
    // In a real app, refresh quotes list
    setSelectedQuote(null);
  };

  const renderKanbanBoard = () => {
    const columns = [
      { status: 'new', label: 'New Leads', color: 'bg-blue-50 border-blue-200' },
      { status: 'contacted', label: 'In Contact', color: 'bg-yellow-50 border-yellow-200' },
      { status: 'qualified', label: 'Qualified', color: 'bg-green-50 border-green-200' },
      { status: 'booked', label: 'Booked', color: 'bg-purple-50 border-purple-200' },
      { status: 'lost', label: 'Lost', color: 'bg-gray-50 border-gray-200' }
    ];

    const handleDragEnd = (event: any) => {
      const { active, over } = event;
      
      if (active.id !== over?.id) {
        const activeQuote = quotes.find(q => q.id === active.id);
        const overQuote = quotes.find(q => q.id === over?.id);
        
        if (activeQuote && overQuote) {
          const activeStatus = activeQuote.lead_status;
          const overStatus = overQuote.lead_status;
          
          // Update quote status in database
          supabase
            .from('quotes')
            .update({ lead_status: overStatus })
            .eq('id', activeQuote.id)
            .then(() => {
              // Update local state
              setQuotes(prev => 
                prev.map(q => 
                  q.id === activeQuote.id 
                    ? { ...q, lead_status: overStatus }
                    : q
                )
              );
            });
        }
      }
    };
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-5 gap-4 mt-6">
          {columns.map(column => (
            <div 
              key={column.status} 
              className={`rounded-lg p-4 border ${column.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{column.label}</h3>
                <span className="text-sm text-gray-500">
                  {filteredQuotes.filter(q => q.lead_status === column.status).length}
                </span>
              </div>
              <div className="space-y-3">
                <SortableContext 
                  items={filteredQuotes
                    .filter(quote => quote.lead_status === column.status)
                    .map(quote => quote.id)}
                >
                  {filteredQuotes
                    .filter(quote => quote.lead_status === column.status)
                    .map(quote => (
                      <LeadCard
                        key={quote.id}
                        quote={quote}
                        onView={() => setViewingQuote(quote)}
                        onAssign={() => setSelectedQuote(quote.id)}
                      />
                    ))}
                </SortableContext>
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage your sales pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors ${
              refreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Quote['status'] | 'all')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          >
            <option value="all">All Status</option>
            <option value="pending">New Leads</option>
            <option value="contacted">In Contact</option>
            <option value="qualified">Qualified</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Lost</option>
          </select>
          <div className="border-l border-gray-200 pl-3 flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'text-pink-500 bg-pink-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'kanban'
                  ? 'text-pink-500 bg-pink-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        renderKanbanBoard()
      ) : (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-[2fr,2fr,1fr,auto] gap-6 p-4 border-b border-gray-200 font-medium text-gray-600">
          <div>Client Details</div>
          <div>Lead Info</div>
          <div>Status</div>
          <div className="w-10"></div>
        </div>

        {filteredQuotes.map((quote) => (
          <div key={quote.id} className="grid grid-cols-[2fr,2fr,1fr,auto] gap-6 p-4 border-b border-gray-200 items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {quote.client_name}
                </h3>
                {quote.lead_status === 'new' && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">New</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{quote.client_email}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{quote.estimated_hours}h</span>
                </div>
                {quote.scheduled_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(quote.scheduled_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-gray-600">
              {quote.service_type}
              <div className="text-sm text-gray-500">
                {quote.cleaning_level} clean
              </div>
            </div>

            <div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(quote.status)}`}>
                {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
              </span>
              {quote.status === 'assigned' && quote.assignmentStatus && (
                <div className="mt-2">
                  <AssignmentStatusBadge
                    status={quote.assignmentStatus.status}
                    deadline={quote.assignmentStatus.responseDeadline}
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQuote(quote.id === selectedQuote ? null : quote.id);
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
              {selectedQuote === quote.id && (
                <ActionMenu 
                  quote={quote}
                  onClose={() => setSelectedQuote(null)}
                />
              )}
            </div>
          </div>
        ))}

        {filteredQuotes.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No quotes found matching your criteria
          </div>
        )}
      </div>
      )}
      
      {viewingQuote && (
        <QuoteDetails
          quote={viewingQuote}
          onClose={() => setViewingQuote(null)}
        />
      )}
    </div>
  );
}