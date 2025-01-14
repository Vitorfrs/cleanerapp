import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import type { Transaction, FinancialMetrics } from '../../types/admin';

// Mock financial metrics
const mockMetrics: FinancialMetrics = {
  revenue: 45680,
  expenses: 28450,
  profit: 17230,
  growth: 12.5,
  projectedRevenue: 52000,
  averageBookingValue: 185,
  topServices: [
    { name: 'Deep Cleaning', revenue: 15600, bookings: 78 },
    { name: 'Regular Cleaning', revenue: 12400, bookings: 124 },
    { name: 'Move-out Cleaning', revenue: 8900, bookings: 32 }
  ],
  revenueByCategory: {
    cleaning: 36800,
    supplies: 4200,
    commission: 3680,
    other: 1000
  }
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    category: 'cleaning',
    amount: 120.00,
    status: 'completed',
    date: '2024-03-20T10:00:00Z',
    description: 'Deep cleaning service',
    customer: 'John Smith',
    paymentMethod: 'credit_card',
    fees: 3.50,
    taxRate: 0.08,
    reference: 'INV-2024-001'
  },
  {
    id: '2',
    type: 'payout',
    category: 'salary',
    amount: 85.00,
    status: 'pending',
    date: '2024-03-19T15:30:00Z',
    description: 'Cleaner payout',
    cleaner: 'Sarah Johnson',
    reference: 'PAY-2024-001'
  }
];

export function Finance() {
  const [dateRange, setDateRange] = useState('week');
  const [transactionType, setTransactionType] = useState('all');
  const [view, setView] = useState<'overview' | 'transactions' | 'analytics'>('overview');

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (transactionType === 'all') return true;
    return transaction.type === transactionType;
  });

  const renderMetricsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Revenue"
        value={`$${mockMetrics.revenue.toLocaleString()}`}
        change={mockMetrics.growth}
        icon={DollarSign}
        color="text-green-500"
      />
      <MetricCard
        label="Total Expenses"
        value={`$${mockMetrics.expenses.toLocaleString()}`}
        change={-2.3}
        icon={TrendingUp}
        color="text-red-500"
      />
      <MetricCard
        label="Net Profit"
        value={`$${mockMetrics.profit.toLocaleString()}`}
        change={8.4}
        icon={TrendingUp}
        color="text-blue-500"
      />
      <MetricCard
        label="Projected Revenue"
        value={`$${mockMetrics.projectedRevenue.toLocaleString()}`}
        change={15.2}
        icon={BarChart3}
        color="text-purple-500"
      />
    </div>
  );

  const renderAnalytics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h3>
        <div className="space-y-4">
          {Object.entries(mockMetrics.revenueByCategory).map(([category, amount]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-gray-600 capitalize">{category}</span>
              </div>
              <span className="font-medium">${amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Services</h3>
        <div className="space-y-4">
          {mockMetrics.topServices.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{service.name}</div>
                <div className="text-sm text-gray-500">{service.bookings} bookings</div>
              </div>
              <span className="font-medium text-green-500">
                ${service.revenue.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
        <div className="flex items-center gap-3">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as typeof view)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          >
            <option value="overview">Overview</option>
            <option value="transactions">Transactions</option>
            <option value="analytics">Analytics</option>
          </select>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {view === 'overview' && (
          <>
            {renderMetricsCards()}
            {renderAnalytics()}
          </>
        )}

        {view === 'transactions' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
                <div className="flex items-center gap-4">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  >
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="year">Last year</option>
                  </select>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  >
                    <option value="all">All Types</option>
                    <option value="payment">Payments</option>
                    <option value="payout">Payouts</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="px-6 py-4 font-medium">Reference</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {transaction.reference}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {transaction.description}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.customer || transaction.cleaner}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize">{transaction.category}</span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        <div className="text-gray-900">
                          ${transaction.amount.toFixed(2)}
                        </div>
                        {transaction.fees && (
                          <div className="text-sm text-gray-500">
                            Fee: ${transaction.fees.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'analytics' && (
          <div className="space-y-6">
            {renderAnalytics()}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Average Booking Value</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${mockMetrics.averageBookingValue}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Monthly Growth Rate</div>
                  <div className="text-2xl font-bold text-green-500">
                    +{mockMetrics.growth}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Profit Margin</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {((mockMetrics.profit / mockMetrics.revenue) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

function MetricCard({ label, value, change, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="flex items-center gap-1">
          {change >= 0 ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}