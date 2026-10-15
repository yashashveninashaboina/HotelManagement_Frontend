import { useState, useEffect, useCallback } from 'react';
import Header       from './components/Header';
import HeroBanner   from './components/HeroBanner';
import StatsGrid    from './components/StatsGrid';
import RoomsView    from './components/RoomsView';
import BookingsView from './components/BookingsView';
import CustomersView from './components/CustomersView';
import PaymentsView from './components/PaymentsView';
import AuthModal    from './components/AuthModal';
import BookingModal from './components/BookingModal';
import { ToastContainer, useToast } from './components/Toast';
import {
  fetchStats, fetchRooms, fetchBookings,
  fetchCustomers, fetchPayments,
} from './api/hotelApi';

export default function App() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [stats,     setStats]     = useState(null);
  const [rooms,     setRooms]     = useState([]);
  const [bookings,  setBookings]  = useState([]);
  const [customers, setCustomers] = useState([]);
  const [payments,  setPayments]  = useState([]);

  const [currentUser, setCurrentUser]   = useState(null);
  const [authOpen,    setAuthOpen]      = useState(false);
  const [bookingRoom, setBookingRoom]   = useState(null); // room selected for booking

  const { toasts, showToast } = useToast();

  // ── Load all data ──────────────────────────────────────
  const loadAll = useCallback(async () => {
    const [s, r, b, c, p] = await Promise.all([
      fetchStats(), fetchRooms(), fetchBookings(), fetchCustomers(), fetchPayments(),
    ]);
    if (s) setStats(s);
    setRooms(r);
    setBookings(b);
    setCustomers(c);
    setPayments(p);
  }, []);

  useEffect(() => {
    // Restore saved session
    try {
      const saved = localStorage.getItem('hotel_user');
      if (saved) setCurrentUser(JSON.parse(saved));
    } catch { localStorage.removeItem('hotel_user'); }

    loadAll();
  }, [loadAll]);

  // ── Auth handlers ──────────────────────────────────────
  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem('hotel_user');
    localStorage.removeItem('hotel_token');
    showToast('Logged out successfully', 'success');
  }

  // ── After booking, refresh rooms + bookings + stats ───
  function handleBooked() {
    loadAll();
  }

  // ── Refresh handler (passed to BookingsView) ──────────
  function handleRefresh() {
    loadAll();
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Tab Views */}
      {activeTab === 'rooms' && (
        <RoomsView rooms={rooms} onBook={room => setBookingRoom(room)} onRefresh={loadAll} />
      )}
      {activeTab === 'bookings' && (
        <BookingsView bookings={bookings} onRefresh={handleRefresh} showToast={showToast} />
      )}
      {activeTab === 'customers' && (
        <CustomersView customers={customers} />
      )}
      {activeTab === 'payments' && (
        <PaymentsView payments={payments} />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={user => setCurrentUser(user)}
        showToast={showToast}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!bookingRoom}
        room={bookingRoom}
        customers={customers}
        onClose={() => setBookingRoom(null)}
        onBooked={handleBooked}
        showToast={showToast}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
