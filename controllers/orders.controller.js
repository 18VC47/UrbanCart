const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');

const Order = require('../models/order.model');
const User = require('../models/user.model');


async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ['card'],

    line_items: cart.items.map(function(item) {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title
          },
          unit_amount: +item.product.price.toFixed(2) * 100 
        },
        quantity: item.quantity,
      } 
    }),
    mode: 'payment',
    // shipping_address_collection: {
    //   allowed_countries: ['US'],
    // },
    // custom_text: {
    //   shipping_address: {
    //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
    //   },
    //   submit: {
    //     message: 'We\'ll email you instructions on how to get started.',
    //   },
    //   after_submit: {
    //     message: 'Learn more about **your purchase** on our [product page](https://www.stripe.com/).',
    //   },
    // },
    success_url: 'http://localhost:3000/orders/success',
    cancel_url: 'http://localhost:3000/orders/failure',
  });
     
  res.redirect(303, session.url);

  // res.redirect('/orders');
}

function getSuccess(req,res){
  res.render('customer/orders/success');
}

function getFailure(req,res){
  res.render('customer/orders/failure');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getFailure: getFailure,
  getSuccess: getSuccess
};
