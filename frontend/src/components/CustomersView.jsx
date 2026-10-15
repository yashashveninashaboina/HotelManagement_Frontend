export default function CustomersView({ customers }) {
  return (
    <section className="view-section">
      <div className="section-header">
        <h2 className="section-title"><span>👤</span> Registered Customers</h2>
      </div>

      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No customers registered yet.
                </td>
              </tr>
            ) : (
              customers.map(c => (
                <tr key={c.id}>
                  <td><strong>#{c.id}</strong></td>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
