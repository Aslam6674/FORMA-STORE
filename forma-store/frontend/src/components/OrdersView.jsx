export default function OrdersView({ orders }) {
  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
          No orders yet
        </h3>
        <p>Your completed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, marginBottom: 28 }}>
        My Orders
      </h2>
      {orders.map(o => (
        <div key={o.orderId} style={{
          background: 'var(--card)',
          border: '1px solid var(--border)', borderRadius: 2,
          padding: '22px 24px', marginBottom: 16, boxShadow: 'var(--shadow)',
          animation: 'fadeUp .3s ease'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: 14
          }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15 }}>
                {String(o.orderId).slice(0, 20)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                {o.email} · {o.city}
              </div>
            </div>
            <span style={{
              background: 'var(--success)', color: '#fff',
              fontSize: 10, fontWeight: 700,
              fontFamily: "'Syne', sans-serif", letterSpacing: 0.8,
              padding: '3px 10px', borderRadius: 2, textTransform: 'uppercase'
            }}>
              Confirmed
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            {o.items.map(i => (
              <div key={i.id || i.productId} style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 13.5, marginBottom: 4
              }}>
                <span>{i.img ? `${i.img} ` : ''}{i.name} ×{i.qty}</span>
                <span style={{ fontWeight: 600 }}>${(i.price * i.qty).toFixed(0)}</span>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid var(--border)', marginTop: 10, paddingTop: 10,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17
          }}>
            <span>Total</span><span>${o.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
