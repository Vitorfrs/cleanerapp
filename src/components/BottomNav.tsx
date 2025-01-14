import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-5xl mx-auto flex justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? 'text-pink-500' : 'text-gray-500'
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? 'text-pink-500' : 'text-gray-500'
            }`
          }
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1">Bookings</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? 'text-pink-500' : 'text-gray-500'
            }`
          }
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </div>
  );
}