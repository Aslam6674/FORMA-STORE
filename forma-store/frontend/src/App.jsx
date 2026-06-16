import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrdersView from './components/OrdersView';
import Toast from './components/Toast';
import PRODUCTS, { CATEGORIES } from './data/products';

export default function App() {
  const [view, setView]             = useState('shop');
  const [cart, setCart]             = useState([]);
  const [orders, setOrders]         = useState([]);
  const [cartOpen, setCartOpen]     = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selected, setSelected]     = useState(null);
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('All');
  const [sortBy, setSortBy]         = useState('default');
  const [toasts, setToasts]         = useState([]);

  // ── Toast helpers ──────────────────────────────────────────────────────────
  const toast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };
  const removeToast = id => setToasts(t => t.filter(x => x.id !== id));

  // ── Cart helpers ───────────────────────────────────────────────────────────
  const addToCart = (product, qty = 1) => {
    setCart(c => {
      const existing = c.find(x => x.id === product.id);
      if (existing) return c.map(x => x.id === product.id ? { ...x, qty: x.qty + qty } : x);
      return [...c, { ...product, qty }];
    });
    toast(`${product.name} added to cart`);
  };
  const removeFromCart = id => setCart(c => c.filter(x => x.id !== id));
  const changeQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(c => c.map(x => x.id === id ? { ...x, qty } : x));
  };

  // ── Order ──────────────────────────────────────────────────────────────────
  const placeOrder = (orderData) => {
    setOrders(o => [orderData, ...o]);
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    toast('Order placed successfully! 🎉');
    setView('orders');
  };

  // ── Filter + Sort ──────────────────────────────────────────────────────────
  let products = PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    return (
      (category === 'All' || p.category === category) &&
      (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
  });
  if (sortBy === 'price-asc')  products = [...products].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') products = [...products].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating')     products = [...products].sort((a, b) => b.rating - a.rating);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <Navbar
        view={view}
        setView={setView}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        ordersCount={orders.length}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      {view === 'shop' && (
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2520 100%)',
          padding: '56px 32px 52px', marginBottom: 48,
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Dot pattern overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
          <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
            <p style={{
              color: 'rgba(255,255,255,.5)', fontFamily: "'Syne', sans-serif",
              fontWeight: 600, fontSize: 11, textTransform: 'uppercase',
              letterSpacing: 2, marginBottom: 12
            }}>
              Curated Objects for Living
            </p>
            <h1 style={{
              color: '#fff', fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: 42, lineHeight: 1.15, marginBottom: 16
            }}>
              Things Made Well,<br />
              <span style={{ color: '#c8502a' }}>Built to Last.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.55)', maxWidth: 440, lineHeight: 1.7, fontSize: 15 }}>
              A careful edit of functional objects — lighting, kitchen, furniture, and everyday essentials. No noise, just craft.
            </p>
          </div>
        </div>
      )}

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>

        {view === 'shop' && (
          <>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Search */}
              <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 300 }}>
                <span style={{
                  position: 'absolute', left: 12, top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14
                }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products…"
                  style={{
                    width: '100%', border: '1px solid var(--border)', borderRadius: 2,
                    padding: '10px 14px 10px 36px', fontSize: 13.5,
                    background: 'var(--card)', color: 'var(--ink)', outline: 'none'
                  }}
                />
              </div>

              {/* Category tabs */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    style={{
                      background: category === c ? 'var(--ink)' : 'var(--card)',
                      color: category === c ? '#fff' : 'var(--muted)',
                      border: `1px solid ${category === c ? 'var(--ink)' : 'var(--border)'}`,
                      borderRadius: 2, padding: '7px 14px',
                      fontSize: 12.5, fontFamily: "'Syne', sans-serif",
                      fontWeight: 600, letterSpacing: 0.2, transition: 'all .15s'
                    }}
                  >{c}</button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  border: '1px solid var(--border)', borderRadius: 2,
                  padding: '8px 14px', fontSize: 13,
                  background: 'var(--card)', color: 'var(--ink)', marginLeft: 'auto'
                }}
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low–High</option>
                <option value="price-desc">Price: High–Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Count */}
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 22
            }}>
              {products.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${i * 0.04}s` }}>
                  <ProductCard product={p} onAdd={addToCart} onView={setSelected} />
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 8 }}>
                  Nothing found
                </h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        )}

        {view === 'orders' && <OrdersView orders={orders} />}
      </main>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={(p, qty) => addToCart(p, qty)}
        />
      )}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={changeQty}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}
      {checkoutOpen && cart.length > 0 && (
        <CheckoutModal
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onOrder={placeOrder}
        />
      )}

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      <Toast toasts={toasts} remove={removeToast} />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '28px 32px', textAlign: 'center',
        color: 'var(--muted)', fontSize: 12, background: 'var(--cream)'
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginRight: 8 }}>
          ● FORMA
        </span>
        Thoughtfully made objects · Stripe-secured checkout · Free shipping worldwide
      </footer>
    </>
  );
}
