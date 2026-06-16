export default function Navbar({ view, setView, cartCount, onCartOpen, ordersCount }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 800,
      background: 'rgba(245,242,235,.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 32px',
      display: 'flex', alignItems: 'center', height: 60
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: 20, letterSpacing: -0.3, flex: 1
      }}>
        <span style={{ color: 'var(--accent)' }}>●</span> FORMA
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {['shop', 'orders'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              background: view === v ? 'var(--ink)' : 'none',
              color: view === v ? '#fff' : 'var(--muted)',
              border: 'none', borderRadius: 2,
              padding: '7px 16px', fontSize: 13,
              fontFamily: "'Syne', sans-serif", fontWeight: 600,
              textTransform: 'capitalize', letterSpacing: 0.3,
              transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            {v}
            {v === 'orders' && ordersCount > 0 && (
              <span style={{
                background: 'var(--accent)', color: '#fff',
                borderRadius: '50%', padding: '0 5px',
                fontSize: 10, fontWeight: 800
              }}>{ordersCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Cart button */}
      <button
        onClick={onCartOpen}
        style={{
          marginLeft: 16, background: 'var(--ink)', color: '#fff',
          border: 'none', borderRadius: 2,
          padding: '8px 18px',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: 13, display: 'flex', alignItems: 'center',
          gap: 8, letterSpacing: 0.3, transition: 'background .15s'
        }}
      >
        🛒 Cart
        {cartCount > 0 && (
          <span style={{
            background: 'var(--accent)', borderRadius: 10,
            padding: '1px 7px', fontSize: 11, fontWeight: 800,
            animation: 'pop .2s ease'
          }}>
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}
