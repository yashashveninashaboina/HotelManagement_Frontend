import { useState, useEffect } from 'react';
import { createBooking } from '../api/hotelApi';

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function BookingModal({ isOpen, room, customers, onClose, onBooked, showToast }) {
  const today    = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 86400000));

  const [customerId, setCustomerId] = useState('');
  const [checkIn,  setCheckIn]  = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);

  // Reset dates when modal opens
  useEffect(() => {
    if (isOpen) {
      setCheckIn(today);
      setCheckOut(tomorrow);
      setCustomerId(customers[0]?.id?.toString() ?? '');
    }
  }, [isOpen, customers]);

  // Price calculation
  const nights = Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000));
  const rate   = room?.pricePerNight ?? 0;
  const total  = nights * rate;

  async function handleSubmit() {
    if (!customerId || !checkIn || !checkOut) { showToast('Please fill in all fields', 'error'); return; }
    if (nights <= 0) { showToast('Check-out must be after check-in', 'error'); return; }

    const { ok, data } = await createBooking({
      customerId: parseInt(customerId),
      roomId: room.id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
    });

    if (ok) {
      showToast(`Booking Created! ID: #${data.id}`, 'success');
      onClose();
      onBooked();
    } else {
      showToast(data.message || 'Booking Failed (Date Overlap)', 'error');
    }
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <h3 className="modal-title"><span>🏨</span> Reserve Room</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-grid">
          {/* Selected Room */}
          <div className="form-group">
            <label>Selected Room</label>
            <div id="modal-room-number" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-cyan)' }}>
              {room ? `Room ${room.roomNumber} (${room.roomType})` : '—'}
            </div>
          </div>

          {/* Customer Selector */}
          <div className="form-group">
            <label>Select Guest / Customer</label>
            <select id="booking-customer-id" className="select-field" value={customerId} onChange={e => setCustomerId(e.target.value)}>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
              ))}
            </select>
          </div>

          {/* Date Pickers */}
          <div className="form-row">
            <div className="form-group">
              <label>Check-In Date</label>
              <input id="booking-checkin" type="date" className="input-field" value={checkIn} min={today}
                onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Check-Out Date</label>
              <input id="booking-checkout" type="date" className="input-field" value={checkOut} min={checkIn}
                onChange={e => setCheckOut(e.target.value)} />
            </div>
          </div>

          {/* Price Summary */}
          <div className="price-summary">
            <div className="summary-row">
              <span>Duration</span>
              <strong id="calc-nights">{nights} Night(s)</strong>
            </div>
            <div className="summary-row">
              <span>Rate Per Night</span>
              <strong id="calc-rate">₹{Number(rate).toLocaleString('en-IN')}</strong>
            </div>
            <div className="summary-row total">
              <span>Total Payable Amount</span>
              <span id="calc-total">₹{Number(total).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button id="booking-confirm-btn" className="btn-primary" onClick={handleSubmit}>
            ✨ Confirm &amp; Create Booking
          </button>
        </div>
      </div>
    </div>
  );
}
