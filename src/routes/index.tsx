import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ProviderProfile } from '../pages/ProviderProfile';
import { Booking } from '../pages/Booking';
import { PaymentPage } from '../pages/Payment';
import { ServiceProviders } from '../pages/ServiceProviders';
import { Bookings } from '../pages/Bookings';
import { Subscription } from '../pages/Subscription';
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminLayout } from '../components/admin/Layout';
import { Quotes } from '../pages/admin/Quotes';
import { CleanerProfile } from '../pages/admin/CleanerProfile';
import { Cleaners } from '../pages/admin/Cleaners';
import { Finance } from '../pages/admin/Finance';
import { Settings } from '../pages/admin/Settings';
import { UserProfile } from '../pages/UserProfile';
import { Layout } from '../components/Layout';
import { QuotePage } from '../pages/QuotePage';
import { PaymentSuccess } from '../pages/PaymentSuccess';
import { Contact } from '../pages/Contact';
import { Services } from '../pages/Services';
import { Marketing } from '../pages/admin/Marketing';
import { About } from '../pages/About';
import { ClientInfo } from '../pages/ClientInfo';
import { SmartBooking } from '../pages/SmartBooking';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'services/:serviceId', element: <QuotePage /> },
      { path: 'provider/:id', element: <ProviderProfile /> },
      { path: 'booking', element: <SmartBooking /> },
      { path: 'client-info', element: <ClientInfo /> },
      { path: 'bookings', element: <Bookings /> },
      { path: 'booking/:providerId', element: <Booking /> },
      { path: 'payment/:bookingId', element: <PaymentPage /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'subscription', element: <Subscription /> },
      { path: 'payment-success', element: <PaymentSuccess /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'quotes', element: <Quotes /> },
      { path: 'cleaners', element: <Cleaners /> },
      { path: 'cleaners/:id', element: <CleanerProfile /> },
      { path: 'finance', element: <Finance /> },
      { path: 'marketing', element: <Marketing /> },
      { path: 'settings', element: <Settings /> }
    ],
  },
]);