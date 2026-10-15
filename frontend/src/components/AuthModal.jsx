import { useState } from 'react';
import { loginUser, registerUser } from '../api/hotelApi';

export default function AuthModal({ isOpen, onClose, onLogin, showToast }) {
  const [tab, setTab]           = useState('login');
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName]     = useState('');
  const [regEmail, setRegEmail]   = useState('');
  const [regPass, setRegPass]     = useState('');
  const [regPhone, setRegPhone]   = useState('');
  const [regRole, setRegRole]     = useState('CUSTOMER');
  const [regAddr, setRegAddr]     = useState('');

  function quickFill(email, password) {
    setLoginEmail(email);
    setLoginPassword(password);
    setTab('login');
  }

  async function handleLogin() {
    if (!loginEmail || !loginPassword) { showToast('Please enter email and password', 'error'); return; }
    const { ok, data } = await loginUser(loginEmail, loginPassword);
    if (ok) {
      const user = { name: data.name, email: data.email, role: data.role, token: data.token };
      localStorage.setItem('hotel_user', JSON.stringify(user));
      localStorage.setItem('hotel_token', data.token);
      onLogin(user);
      onClose();
      showToast(`Welcome back, ${data.name}! (${data.role})`, 'success');
    } else {
      showToast(data.message || 'Login failed', 'error');
    }
  }

  async function handleRegister() {
    if (!regName || !regEmail || !regPass) { showToast('Name, email, and password are required', 'error'); return; }
    const { ok, data } = await registerUser({ name: regName, email: regEmail, password: regPass, phone: regPhone, role: regRole, address: regAddr });
    if (ok) {
      const user = { name: data.name, email: data.email, role: data.role, token: data.token };
      localStorage.setItem('hotel_user', JSON.stringify(user));
      localStorage.setItem('hotel_token', data.token);
      onLogin(user);
      onClose();
      showToast(`Account Created! Welcome ${data.name}!`, 'success');
    } else {
      showToast(data.message || 'Registration failed', 'error');
    }
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title" id="auth-modal-title">
            {tab === 'login' ? '🔐 Sign In to Hotel Portal' : '✨ Register New Account'}
          </h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Tab Switcher */}
        <div className="nav-tabs" style={{ marginBottom: '20px' }}>
          <button id="tab-login" className={`tab-btn ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
          <button id="tab-register" className={`tab-btn ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</button>
        </div>

        {/* Login Form */}
        {tab === 'login' && (
          <div className="form-grid" id="auth-login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input id="login-email" type="email" className="input-field" placeholder="e.g. yashashveni@gmail.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input id="login-password" type="password" className="input-field" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>

            {/* Quick Fill Demo Buttons */}
            <div className="quick-login-btns">
              <button className="btn-secondary" onClick={() => quickFill('yashashveni@gmail.com', 'customer123')}>👤 Yashashveni</button>
              <button className="btn-secondary" onClick={() => quickFill('admin@hotel.com', 'admin123')}>👑 Admin</button>
              <button className="btn-secondary" onClick={() => quickFill('receptionist@hotel.com', 'receptionist123')}>🏨 Receptionist</button>
            </div>

            <button id="login-submit-btn" className="btn-primary" onClick={handleLogin}>🚀 Sign In Now</button>
          </div>
        )}

        {/* Register Form */}
        {tab === 'register' && (
          <div className="form-grid" id="auth-register-form">
            <div className="form-group">
              <label>Full Name</label>
              <input id="reg-name" type="text" className="input-field" placeholder="e.g. Yashashveni" value={regName} onChange={e => setRegName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input id="reg-email" type="email" className="input-field" placeholder="name@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input id="reg-password" type="password" className="input-field" placeholder="••••••••" value={regPass} onChange={e => setRegPass(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input id="reg-phone" type="text" className="input-field" placeholder="9876543210" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Account Role</label>
                <select id="reg-role" className="select-field" value={regRole} onChange={e => setRegRole(e.target.value)}>
                  <option value="CUSTOMER">Customer</option>
                  <option value="RECEPTIONIST">Receptionist</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input id="reg-address" type="text" className="input-field" placeholder="City, Country" value={regAddr} onChange={e => setRegAddr(e.target.value)} />
            </div>
            <button id="register-submit-btn" className="btn-primary" onClick={handleRegister}>✨ Create New Account</button>
          </div>
        )}
      </div>
    </div>
  );
}
