const API_BASE = 'https://hotelmanagement-backend-w953.onrender.com';

function getToken() {
  return localStorage.getItem('hotel_token');
}

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── Auth ──────────────────────────────────────────────
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok, data: await res.json() };
}

// ── Stats ─────────────────────────────────────────────
export async function fetchStats() {
  const res = await fetch(`${API_BASE}/admin/stats`);
  return res.ok ? res.json() : null;
}

// ── Rooms ─────────────────────────────────────────────
export async function fetchRooms() {
  const res = await fetch(`${API_BASE}/rooms`);
  return res.ok ? res.json() : [];
}

export async function fetchAvailableRooms(roomType, checkIn, checkOut) {
  let url = `${API_BASE}/rooms/available?`;
  if (roomType) url += `roomType=${roomType}&`;
  if (checkIn) url += `checkInDate=${checkIn}&`;
  if (checkOut) url += `checkOutDate=${checkOut}&`;
  const res = await fetch(url);
  return res.ok ? res.json() : [];
}

// ── Bookings ──────────────────────────────────────────
export async function fetchBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  return res.ok ? res.json() : [];
}

export async function createBooking(payload) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function checkIn(id) {
  const res = await fetch(`${API_BASE}/bookings/${id}/checkin`, { method: 'PUT', headers: authHeaders() });
  return res.ok;
}

export async function checkOut(id) {
  const res = await fetch(`${API_BASE}/bookings/${id}/checkout`, { method: 'PUT', headers: authHeaders() });
  return res.ok;
}

export async function cancelBooking(id) {
  const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, { method: 'PUT', headers: authHeaders() });
  return res.ok;
}

// ── Customers ─────────────────────────────────────────
export async function fetchCustomers() {
  const res = await fetch(`${API_BASE}/customers`);
  return res.ok ? res.json() : [];
}

// ── Payments ──────────────────────────────────────────
export async function fetchPayments() {
  const res = await fetch(`${API_BASE}/payments`);
  return res.ok ? res.json() : [];
}
