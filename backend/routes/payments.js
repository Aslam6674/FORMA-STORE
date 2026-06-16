const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// Lazy-load Stripe so the server starts even without a key
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in .env');
  }
  return require('stripe')(process.env.STRIPE_SECRET_KEY);
};

// POST /api/payments/create-intent
// Creates a Stripe PaymentIntent and returns the clientSecret to the frontend
router.post('/create-intent', async (req, res) => {
  try {
    const { amount } = req.body;  // amount in cents

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Amount must be at least 50 cents' });
    }

    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payments/webhook
// Stripe calls this endpoint when payment events occur
router.post('/webhook', async (req, res) => {
  const sig     = req.headers['stripe-signature'];
  const secret  = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object;
      // Update order status if stripePaymentId matches
      await Order.findOneAndUpdate(
        { stripePaymentId: pi.id },
        { status: 'confirmed' }
      );
      console.log(`✅ Payment succeeded: ${pi.id}`);
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object;
      await Order.findOneAndUpdate(
        { stripePaymentId: pi.id },
        { status: 'cancelled' }
      );
      console.log(`❌ Payment failed: ${pi.id}`);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
