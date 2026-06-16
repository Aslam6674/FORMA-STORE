import { useState } from 'react';

function Stars({ rating }) {
  return (
    <span style={{ color: 'var(--accent)', fontSize: 13, letterSpacing: 1 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

export function Badge({ label }) {
  const colors = {
    Bestseller: '#2a5fc8', New: '#2d7a4f',
    Popular: '#7a3fc8', Sale: '#c8502a', Limited: '#c87a2a'
  };
  return (
    <span style={{
      background: colors[label] || '#555', color: '#fff',
      fontSize: 10, fontWeight: 700,
      fontFamily: "'Syne', sans-serif", letterSpacing: 0.8,
      padding: '2px 8px', borderRadius: 2, textTransform: 'uppercase'
    }}>{label}</span>
  );
}

export default function ProductCard({ product, onAdd, onView }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onView(product)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--card)',
        border: `1px solid ${hover ? '#bbb5aa' : 'var(--border)'}`,
        borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer',
        transition: 'transform .18s ease, box-shadow .18s ease',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow)',
        animation: 'fadeUp .4s ease both'
      }}
    >
      {/* Image area */}
      <div style={{
        height: 180,
        background: `linear-gradient(135deg, ${product.color}22 0%, ${product.color}44 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 64, position: 'relative',
        borderBottom: '1px solid var(--border)'
      }}>
        <span style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.15))',
          transition: 'transform .2s',
          transform: hover ? 'scale(1.08)' : 'scale(1)',
          display: 'block'
        }}>
          {product.img}
        </span>
        {product.badge && (
          <span style={{ position: 'absolute', top: 12, left: 12 }}>
            <Badge label={product.badge} />
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{
          fontSize: 10, color: 'var(--muted)', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4
        }}>
          {product.category}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>({product.reviews})</span>
        </div>
        <p style={{
          fontSize: 13, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {product.desc}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>
            ${product.price}
          </span>
          <button
            onClick={handleAdd}
            style={{
              background: added ? 'var(--success)' : 'var(--ink)',
              color: '#fff', border: 'none', borderRadius: 2,
              padding: '9px 16px', fontSize: 12, fontWeight: 600,
              fontFamily: "'Syne', sans-serif", letterSpacing: 0.4,
              transition: 'background .2s, transform .1s',
              transform: added ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
