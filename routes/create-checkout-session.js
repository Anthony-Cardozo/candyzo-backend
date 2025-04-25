const express = require('express');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-page', async (req, res) => {
    try {
        const {items} = req.body;

        if(!items || items.length === 0)
            return res.status(400).json({error: 'Cart is empty.'});

        const line_items = items.map(item => ({
            price: item.price, //Stripe Price ID
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/checkout/cancel`,
        });

        res.json({sessionID: session.id});
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({error: 'Failed to create checkout session.'});
    }
});

module.exports = router;