const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {

    console.log("📦 Incoming checkout request:");
    console.log("Body:", req.body); // ← Log what frontend sends

    try {
        const {items} = req.body;

        if(!items || items.length === 0){
            console.log("❌ Cart is empty or items missing");
            return res.status(400).json({error: 'Cart is empty.'});}

        const line_items = items.map(item => ({
            price: item.price, //Stripe Price ID
            quantity: item.quantity,
        }));

        console.log("📤 Sending to Stripe:", line_items);

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/checkout/cancel`,

            shipping_address_collection: {
                allowed_countries: ['US', 'CA'], // Add country codes you want to allow
              },

            shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 500, // $5.00 shipping
                      currency: 'usd',
                    },
                    display_name: 'Standard Shipping',
                    delivery_estimate: {
                      minimum: { unit: 'business_day', value: 3 },
                      maximum: { unit: 'business_day', value: 5 },
                    },
                  },
                }
            ]
        });

         console.log("✅ Stripe session created:", session.id);

        res.json({sessionID: session.id});
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({error: 'Failed to create checkout session.'});
    }
});

module.exports = router;
