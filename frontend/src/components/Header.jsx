export default function Header({ activeTab, setActiveTab, currentUser, onOpenAuth, onLogout }) {
  const tabs = [
    { id: 'rooms',     label: 'Rooms',     icon: '🏨' },
    { id: 'bookings',  label: 'Bookings',  icon: '📋' },
    { id: 'customers', label: 'Customers', icon: '👤' },
    { id: 'payments',  label: 'Payments',  icon: '💳' },
  ];

  return (
    <header className="header">
      {/* Brand */}
      <div className="brand">
        <div className="brand-icon">🏰</div>
        <div className="brand-title">
          <h1>GRAND ROYALE</h1>
          <p>3D Luxury Hotel Portal</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </nav>

      {/* Auth Area */}
      <div className="user-auth-area">
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#FFF' }}>{currentUser.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--primary-cyan)', fontWeight: 700 }}>{currentUser.role}</div>
            </div>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="btn-secondary" id="auth-btn" onClick={onOpenAuth}>
            🔐 Sign In / Register
          </button>
        )}
      </div>
    </header>
  );
}
