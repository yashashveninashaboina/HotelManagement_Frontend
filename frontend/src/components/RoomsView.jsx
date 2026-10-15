import { useState, useEffect } from 'react';
import { fetchAvailableRooms } from '../api/hotelApi';

export default function RoomsView({ rooms, onBook, onRefresh }) {
  const [filterType, setFilterType]       = useState('');
  const [filterCheckIn, setFilterCheckIn] = useState('');
  const [filterCheckOut, setFilterCheckOut] = useState('');
  const [displayRooms, setDisplayRooms]   = useState(rooms);

  // Sync with parent rooms when they update
  useEffect(() => { setDisplayRooms(rooms); }, [rooms]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let cancelled = false;
    async function applyFilters() {
      const filtered = await fetchAvailableRooms(filterType, filterCheckIn, filterCheckOut);
      if (!cancelled) setDisplayRooms(filtered);
    }
    if (filterType || filterCheckIn || filterCheckOut) {
      applyFilters();
    } else {
      setDisplayRooms(rooms);
    }
    return () => { cancelled = true; };
  }, [filterType, filterCheckIn, filterCheckOut, rooms]);

  return (
    <section className="view-section">
      <div className="section-header">
        <h2 className="section-title"><span>🛋️</span> Explore &amp; Book Rooms</h2>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Room Type</label>
          <select
            id="filter-room-type"
            className="select-field"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="SINGLE">Single</option>
            <option value="DOUBLE">Double</option>
            <option value="DELUXE">Deluxe</option>
            <option value="SUITE">Suite</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Check-In Date</label>
          <input
            id="filter-checkin"
            type="date"
            className="input-field"
            value={filterCheckIn}
            onChange={e => setFilterCheckIn(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Check-Out Date</label>
          <input
            id="filter-checkout"
            type="date"
            className="input-field"
            value={filterCheckOut}
            onChange={e => setFilterCheckOut(e.target.value)}
          />
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="rooms-grid">
        {displayRooms.length === 0 ? (
          <div className="empty-state">No rooms found matching your filters.</div>
        ) : (
          displayRooms.map(room => (
            <RoomCard key={room.id} room={room} onBook={onBook} />
          ))
        )}
      </div>
    </section>
  );
}

function RoomCard({ room, onBook }) {
  const statusClass = `status-${room.status.toLowerCase()}`;

  return (
    <div className="room-card">
      {/* Room Image */}
      <div className="room-img-wrapper">
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #0a1830, #0d2040)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '48px'
        }}>
          {room.roomType === 'SUITE' ? '🏰' : room.roomType === 'DELUXE' ? '🌟' : '🛏️'}
        </div>
        <div className="room-type-badge">{room.roomType}</div>
        <div className={`room-status-badge ${statusClass}`}>{room.status}</div>
      </div>

      {/* Room Info */}
      <div className="room-body">
        <div className="room-number">Room {room.roomNumber}</div>
        <div className="room-details">
          <span>👥 Capacity: {room.capacity} Guests</span>
          <span>✨ Deluxe Amenities</span>
        </div>
        <div className="room-price">
          ₹{Number(room.pricePerNight).toLocaleString('en-IN')} <span>/ night</span>
        </div>
        <button
          id={`book-room-${room.id}`}
          className="btn-primary"
          onClick={() => onBook(room)}
          disabled={room.status === 'MAINTENANCE'}
        >
          🏨 Book Room Now
        </button>
      </div>
    </div>
  );
}
