export default function HeroBanner() {
  return (
    <div className="hero-banner">
      {/* Gradient fallback if image not available */}
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(135deg, #050810 0%, #0a1830 50%, #050810 100%)',
        position: 'absolute', inset: 0,
      }} />

      <div className="hero-overlay">
        <div className="hero-badge">✨ 5-STAR LUXURY SUITES</div>
        <h2 className="hero-title">Experience Unmatched Elegance</h2>
        <p className="hero-desc">
          Manage room reservations, date-availability checks, automated billing, and live guest
          check-ins in real-time with our interactive hotel portal.
        </p>
      </div>
    </div>
  );
}
