import { useState } from 'react';
import { Badge } from './ProductCard';

function Stars({ rating }) {
  return (
    <span style={{ color: 'var(--accent)', fontSize: 13, letterSpacing: 1 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

export default function ProductModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(14,14,14,.6)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, backdropFilter: 'blur(4px)'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--card)', borderRadius: 4,
          maxWidth: 560, width: '100%', overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)', animation: 'fadeUp .25s ease'
        }}
      >
        {/* Image */}
        <div style={{
          height: 220,
          background: `linear-gradient(135deg, ${product.color}33 0%, ${product.color}66 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 88, borderBottom: '1px solid var(--border)'
        }}>
          {product.img}
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <span style={{
              fontSize: 11, color: 'var(--muted)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: 1
            }}>
              {product.category}
            </span>
            {product.badge && <Badge label={product.badge} />}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
            {product.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Stars rating={product.rating} />
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 24, lineHeight: 1.65 }}>
            {product.desc}
          </p>

          {/* Qty + Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '1px solid var(--border)', borderRadius: 2
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ width: 36, height: 36, background: 'none', border: 'none', fontSize: 18, color: 'var(--ink)' }}>−</button>
              <span style={{ width: 40, textAlign: 'center', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                style={{ width: 36, height: 36, background: 'none', border: 'none', fontSize: 18, color: 'var(--ink)' }}>+</button>
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24 }}>
              ${(product.price * qty).toFixed(0)}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => { onAdd(product, qty); onClose(); }}
              style={{
                flex: 1, background: 'var(--ink)', color: '#fff', border: 'none',
                borderRadius: 2, padding: '13px 0',
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 0.4
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              style={{
                width: 48, background: 'none',
                border: '1px solid var(--border)', borderRadius: 2,
                fontSize: 20, color: 'var(--muted)'
              }}
            >×</button>
          </div>
        </div>
      </div>
    </div>
  );
}
