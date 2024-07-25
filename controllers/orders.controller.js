const stripe = require('stripe')(process.env.STRIPE_KEY); // Use environment variable for secret key
const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', { orders });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  try {
    // Find the user document
    const userDocument = await User.findById(res.locals.uid);
    if (!userDocument) {
      throw new Error('User not found.');
    }

    // Create a new order instance
    const order = new Order(cart, userDocument);
    await order.save();

    // Clear the cart
    req.session.cart = null;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.product.title },
          unit_amount: Math.round(item.product.price*100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      // success_url: 'http://localhost:4000/orders/success', // Replace with your actual success URL
      // cancel_url: 'http://localhost:4000/orders/failure', // Replace with your actual cancel URL
      success_url: 'https://urban-cart.vercel.app/orders/success', // Replace with your actual success URL
      cancel_url: 'https://urban-cart.vercel.app/orders/failure', // Replace with your actual cancel URL
    });

    res.redirect(303, session.url);
  } catch (error) {
    next(error);
  }
}

function getSuccess(req, res) {
  res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/failure');
}

module.exports = {
  addOrder,
  getOrders,
  getSuccess,
  getFailure,
};
