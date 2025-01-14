import React from 'react';
import { Settings, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

export function UserProfile() {
  const menuItems = [
    { icon: User, label: 'Personal Information', href: '#' },
    { icon: Bell, label: 'Notifications', href: '#' },
    { icon: Shield, label: 'Privacy & Security', href: '#' },
    { icon: HelpCircle, label: 'Help & Support', href: '#' },
  ];

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <item.icon className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700 font-medium">{item.label}</span>
          </a>
        ))}
      </div>

      <button className="flex items-center gap-4 p-4 w-full mt-6 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
        <LogOut className="w-6 h-6" />
        <span className="font-medium">Log Out</span>
      </button>
    </div>
  );
}