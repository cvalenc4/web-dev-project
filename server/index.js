const express = require('express');
const stripe = require('stripe')('sk_test_51OK6gkK6rCvUQZI1Nx9aiIuOHlB1m2ps1p2XnO97VbaF1CtW929vIZozz9SrMoyxYc0DXHzKorGAqMh1l1baEArn004tSbc5e0');
const Parse = require('parse/node');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

Parse.serverURL = 'https://parseapi.back4app.com'; 
Parse.initialize(
  '8s5HtEE4TCs3Eai05y0lHPMlL7kBPP1daPu9pL5i', 
  'J5IkXss5RKPsBqaM6lzHJxFmgMtbB2NWOqVxHJ58' 
);

app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body; 
    
    try {
        const lineItems = await Promise.all(items.map(async (cartItem) => {
            const productPointer = cartItem.product.objectId; 
            const Product = Parse.Object.extend("Products");
            const query = new Parse.Query(Product);
            query.equalTo("objectId", productPointer);
            const product = await query.first(); 
            const stripePrice = Math.round(parseFloat(product.get('actual_price')) * 100);
            return {
                price_data: {
                    currency: 'usd',
                    unit_amount: stripePrice, 
                    product_data: {
                        name: product.get('name'),
                    },
                },
                quantity: cartItem.quantity,
            };
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success', // URL to redirect to after successful payment
            cancel_url: 'http://localhost:3000/cancel', // URL to redirect to if the customer cancels
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).send('Stripe Error: ' + error.message);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});