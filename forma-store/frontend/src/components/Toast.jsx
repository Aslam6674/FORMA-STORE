import { useState, useEffect } from 'react';

export default function Toast({ toasts, remove }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 8
    }}>
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={remove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const bg = toast.type === 'success' ? '#2d7a4f'
           : toast.type === 'error'   ? '#c8502a'
           : '#0e0e0e';

  return (
    <div
      onClick={() => onRemove(toast.id)}
      style={{
        background: bg, color: '#fff',
        padding: '12px 20px', borderRadius: 4,
        fontSize: 13.5, fontFamily: "'Syne', sans-serif",
        fontWeight: 600, letterSpacing: 0.3, cursor: 'pointer',
        maxWidth: 280, boxShadow: '0 4px 20px rgba(0,0,0,.2)',
        animation: 'slideDown .25s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity .3s ease, transform .3s ease'
      }}
    >
      {toast.msg}
    </div>
  );
}
