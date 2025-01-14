import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}