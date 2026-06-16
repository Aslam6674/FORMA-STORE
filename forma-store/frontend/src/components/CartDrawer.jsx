export default function CartDrawer({ cart, onClose, onRemove, onQtyChange, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(14,14,14,.5)', zIndex: 900,
        backdropFilter: 'blur(2px)'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: 380, background: 'var(--card)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '-4px 0 32px rgba(0,0,0,.12)',
          animation: 'slideIn .25s ease'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 24px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>
            Cart{' '}
            <span style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 400 }}>
              ({cart.length} item{cart.length !== 1 ? 's' : ''})
            </span>
          </h2>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: 22, color: 'var(--muted)' }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>Your cart is empty</p>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex', gap: 14, padding: '14px 0',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{
                width: 56, height: 56,
                background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
                borderRadius: 2, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 26, flexShrink: 0,
                border: '1px solid var(--border)'
              }}>
                {item.img}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13.5,
                  marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {item.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    border: '1px solid var(--border)', borderRadius: 2, height: 28
                  }}>
                    <button onClick={() => onQtyChange(item.id, item.qty - 1)}
                      style={{ width: 28, background: 'none', border: 'none', fontSize: 16, color: 'var(--ink)' }}>−</button>
                    <span style={{ width: 24, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => onQtyChange(item.id, item.qty + 1)}
                      style={{ width: 28, background: 'none', border: 'none', fontSize: 16, color: 'var(--ink)' }}>+</button>
                  </div>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>
                    ${(item.price * item.qty).toFixed(0)}
                  </span>
                  <button onClick={() => onRemove(item.id)}
                    style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--muted)', fontSize: 16 }}>
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px 28px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--muted)', fontSize: 13 }}>
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--muted)', fontSize: 13 }}>
              <span>Shipping</span><span style={{ color: 'var(--success)' }}>Free</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginBottom: 20,
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18
            }}>
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              style={{
                width: '100%', background: 'var(--ink)', color: '#fff', border: 'none',
                borderRadius: 2, padding: '14px 0',
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 0.5
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
