export default function StatsGrid({ stats }) {
  const cards = [
    { icon: '🏨', color: 'var(--primary-cyan)',  value: stats?.totalRooms     ?? '—', label: 'Total Rooms'     },
    { icon: '✨', color: 'var(--accent-emerald)', value: stats?.availableRooms ?? '—', label: 'Available Rooms'  },
    { icon: '📋', color: 'var(--accent-gold)',    value: stats?.totalBookings  ?? '—', label: 'Total Bookings'   },
    { icon: '💰', color: 'var(--accent-purple)',
      value: stats?.totalRevenue != null
        ? `₹${Number(stats.totalRevenue).toLocaleString('en-IN')}`
        : '—',
      label: 'Total Revenue'
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, i) => (
        <div key={i} className="stat-card">
          <div className="stat-icon" style={{ color: card.color }}>{card.icon}</div>
          <div className="stat-value">{card.value}</div>
          <div className="stat-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
