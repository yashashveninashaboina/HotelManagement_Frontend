import { checkIn, checkOut, cancelBooking } from '../api/hotelApi';

export default function BookingsView({ bookings, onRefresh, showToast }) {
  async function handleCheckIn(id) {
    const ok = await checkIn(id);
    if (ok) { showToast(`Guest Checked-In for Booking #${id}`, 'success'); onRefresh(); }
    else showToast('Check-in failed', 'error');
  }

  async function handleCheckOut(id) {
    const ok = await checkOut(id);
    if (ok) { showToast(`Checkout Completed for Booking #${id}`, 'success'); onRefresh(); }
    else showToast('Checkout failed', 'error');
  }

  async function handleCancel(id) {
    if (!window.confirm(`Are you sure you want to cancel Booking #${id}?`)) return;
    const ok = await cancelBooking(id);
    if (ok) { showToast(`Booking #${id} Cancelled. Room released!`, 'success'); onRefresh(); }
    else showToast('Cancellation failed', 'error');
  }

  return (
    <section className="view-section">
      <div className="section-header">
        <h2 className="section-title"><span>📋</span> Reservation History</h2>
      </div>

      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Room Details</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No booking records found.
                </td>
              </tr>
            ) : (
              bookings.map(b => {
                const statusKey = b.status.toLowerCase();
                return (
                  <tr key={b.id}>
                    <td><strong>#{b.id}</strong></td>
                    <td>
                      {b.customerName}<br />
                      <small style={{ color: 'var(--text-muted)' }}>{b.customerEmail}</small>
                    </td>
                    <td><strong>Room {b.roomNumber}</strong> ({b.roomType})</td>
                    <td>{b.checkInDate}</td>
                    <td>{b.checkOutDate}</td>
                    <td><strong style={{ color: 'var(--primary-cyan)' }}>₹{Number(b.totalAmount).toLocaleString('en-IN')}</strong></td>
                    <td><span className={`status-badge ${statusKey}`}>{b.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {b.status === 'BOOKED' && (
                          <button id={`checkin-${b.id}`} className="btn-success" onClick={() => handleCheckIn(b.id)}>Check In</button>
                        )}
                        {b.status === 'CHECKED_IN' && (
                          <button id={`checkout-${b.id}`} className="btn-primary" style={{ width: 'auto', padding: '7px 14px', fontSize: '12px' }} onClick={() => handleCheckOut(b.id)}>Check Out</button>
                        )}
                        {(b.status === 'BOOKED' || b.status === 'CHECKED_IN') && (
                          <button id={`cancel-${b.id}`} className="btn-danger" onClick={() => handleCancel(b.id)}>Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
