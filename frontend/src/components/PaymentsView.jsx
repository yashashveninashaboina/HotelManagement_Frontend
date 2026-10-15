export default function PaymentsView({ payments }) {
  return (
    <section className="view-section">
      <div className="section-header">
        <h2 className="section-title"><span>💳</span> Transaction Records</h2>
      </div>

      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Amount Paid</th>
              <th>Status</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map(p => (
                <tr key={p.id}>
                  <td><strong>#{p.id}</strong></td>
                  <td>#{p.bookingId}</td>
                  <td>{p.customerName}</td>
                  <td>Room {p.roomNumber}</td>
                  <td><strong style={{ color: 'var(--accent-emerald)' }}>₹{Number(p.amount).toLocaleString('en-IN')}</strong></td>
                  <td><span className={`status-badge ${p.paymentStatus?.toLowerCase()}`}>{p.paymentStatus}</span></td>
                  <td><strong>{p.paymentMethod}</strong></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
