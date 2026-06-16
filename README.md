# 🛍️ FORMA — Full-Stack E-Commerce Store

A modern, fully functional e-commerce platform built with **React**, **Node.js/Express**, **MongoDB**, and **Stripe**. Browse products, manage a cart, complete checkout, and track orders — all in a clean, editorial-style UI.

![Status](https://img.shields.io/badge/status-active-2d7a4f)
![Frontend](https://img.shields.io/badge/frontend-React-2a5fc8)
![Backend](https://img.shields.io/badge/backend-Express.js-c8502a)
![Database](https://img.shields.io/badge/database-MongoDB-7a3fc8)

---

## ✨ Features

- 🛒 **Shopping Cart** — slide-in drawer, live quantity controls, auto-calculated totals
- 📄 **Product Details** — modal view with ratings, reviews, description, quantity selector
- 🔍 **Search & Filter** — live search, category tabs, sort by price/rating
- 💳 **Checkout** — 2-step flow (shipping → payment) with Stripe integration
- 📦 **Order Tracking** — order history with item breakdown and status
- 🔔 **Toast Notifications** — instant feedback on cart and order actions
- 📱 **Responsive Design** — works across desktop, tablet, and mobile

---

## 📁 Project Structure

```
forma-store/
├── frontend/                  # React app
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ProductCard.jsx
│       │   ├── ProductModal.jsx
│       │   ├── CartDrawer.jsx
│       │   ├── CheckoutModal.jsx
│       │   ├── OrdersView.jsx
│       │   └── Toast.jsx
│       ├── data/
│       │   └── products.js
│       ├── App.jsx
│       ├── index.js
│       └── index.css
│
├── backend/                   # Express API
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── payments.js
│   ├── server.js
│   └── .env.example
│
├── forma-store.code-workspace # multi-root VS Code workspace
├── .gitignore
└── README.md
```

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React 18, CSS Variables, vanilla JS  |
| Backend    | Node.js, Express 4                   |
| Database   | MongoDB, Mongoose                    |
| Payments   | Stripe (Payment Intents API)         |
| Auth       | JWT-ready User model                 |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) (local) or a free [Atlas](https://cloud.mongodb.com/) cluster
- A [Stripe](https://dashboard.stripe.com/register) account (test mode is fine)

### 1. Clone the repo
```bash
git clone https://github.com/Aslam6674/Forma-Store.git
cd Forma-Store
```

### 2. Set up the backend
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and fill in your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/forma
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
JWT_SECRET=generate_a_long_random_string
CLIENT_URL=http://localhost:3000
```
Generate a strong `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Start the server:
```bash
npm run dev
# → http://localhost:5000
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
npm start
# → http://localhost:3000
```

---

## 💳 Testing Payments

Use these Stripe test cards (any future expiry date, any 3-digit CVV):

| Card Number         | Result               |
|----------------------|----------------------|
| 4242 4242 4242 4242 | ✅ Success             |
| 4000 0000 0000 9995 | ❌ Declined            |
| 4000 0025 0000 3155 | 🔐 3D Secure required  |
| 4000 0000 0000 0069 | ⏰ Expired card        |

---

## 📡 API Reference

### Products
| Method | Endpoint              | Description           |
|--------|------------------------|------------------------|
| GET    | `/api/products`        | List all products      |
| GET    | `/api/products/:id`    | Get a single product   |
| POST   | `/api/products`        | Create a product       |

### Orders
| Method | Endpoint                  | Description              |
|--------|----------------------------|---------------------------|
| POST   | `/api/orders`               | Create a new order        |
| GET    | `/api/orders/:email`        | Get orders by customer    |
| GET    | `/api/orders`               | List all orders (admin)   |
| PATCH  | `/api/orders/:id/status`    | Update order status       |

### Payments
| Method | Endpoint                        | Description                  |
|--------|-----------------------------------|--------------------------------|
| POST   | `/api/payments/create-intent`     | Create a Stripe PaymentIntent |
| POST   | `/api/payments/webhook`           | Stripe webhook listener       |

---

## 🗺 Roadmap

- [ ] User registration & login (JWT auth)
- [ ] Admin dashboard for managing products/orders
- [ ] Product image uploads
- [ ] Email order confirmations
- [ ] Wishlist / saved items

---

## 📄 License

MIT — free to use, modify, and build on.

---

## 🙌 Acknowledgements

Built with React, Express, MongoDB, and Stripe. Fonts via Google Fonts (Syne + DM Sans).
