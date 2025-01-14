import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Building2, 
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const metrics: Metric[] = [
  { 
    label: 'Total Revenue', 
    value: '$45,680', 
    change: 12.5,
    icon: DollarSign, 
    color: 'text-emerald-500' 
  },
  { 
    label: 'Active Cleaners', 
    value: '24', 
    change: 8.1,
    icon: Users, 
    color: 'text-blue-500' 
  },
  { 
    label: 'Customer Rating', 
    value: '4.8', 
    change: 4.2,
    icon: Star, 
    color: 'text-yellow-500' 
  },
  { 
    label: 'Properties Served', 
    value: '156', 
    change: 15.3,
    icon: Building2, 
    color: 'text-purple-500' 
  }
];

interface ChartData {
  month: string;
  revenue: number;
  bookings: number;
}

const chartData: ChartData[] = [
  { month: 'Jan', revenue: 45000, bookings: 125 },
  { month: 'Feb', revenue: 52000, bookings: 145 },
  { month: 'Mar', revenue: 49000, bookings: 132 },
  { month: 'Apr', revenue: 47000, bookings: 128 },
  { month: 'May', revenue: 55000, bookings: 155 },
  { month: 'Jun', revenue: 58000, bookings: 162 }
];

interface TopService {
  name: string;
  revenue: number;
  bookings: number;
  growth: number;
}

const topServices: TopService[] = [
  { 
    name: 'Deep Cleaning',
    revenue: 15600,
    bookings: 78,
    growth: 12.5
  },
  { 
    name: 'Regular Cleaning',
    revenue: 12400,
    bookings: 124,
    growth: 8.3
  },
  { 
    name: 'Move-out Cleaning',
    revenue: 8900,
    bookings: 32,
    growth: 15.7
  }
];
export function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Track your business performance and growth</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${metric.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="flex items-center gap-1">
                {metric.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${metric.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">{metric.value}</h3>
            <p className="text-gray-600">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-900">Revenue</button>
              <button className="text-sm text-gray-500 hover:text-gray-900">Bookings</button>
            </div>
          </div>
          <div className="h-[300px] flex items-end justify-between">
            {chartData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center gap-2">
                <div className="w-12 bg-pink-500 rounded-t-lg" 
                  style={{ height: `${(data.revenue / 60000) * 100}%` }} 
                />
                <span className="text-sm text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Services */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Services</h2>
          <div className="space-y-6">
            {topServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{service.bookings} bookings</span>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                      <span className="text-sm text-emerald-500">+{service.growth}%</span>
                    </div>
                  </div>
                </div>
                <span className="font-medium text-gray-900">
                  ${service.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-sm text-pink-500 hover:text-pink-600">View all</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">New booking completed</h3>
                <p className="text-sm text-gray-500">Sarah Johnson completed a deep cleaning service</p>
              </div>
              <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}