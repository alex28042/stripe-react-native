import express from "express";
import Stripe from "stripe";

const app = express();
const port = 3000;

const PUBLISHABLE_KEY =
  "pk_test_51LiOtxKEbbYpdkJ18XhgKkboyB14CkI4T5kXZUzyBEp44T6pJRFz66N1vIujoGBkFNppOXSQ8oGUIRwl4ZXq4LFN00R0flZlpg";
const SECRET_KEY =
  "sk_test_51LiOtxKEbbYpdkJ1bSGiqXTdl77TIx8QWA2iuY4Lt2MWOQxAzzITUVVh9SQ2WjDOANVFfDR6hzBjRU8A3PMSOiBC00MuCiyE4i";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-08-01" });

app.listen(port, () => {
  console.log(port);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: "usd",
        payment_method_types: ["card"]
    });

    const clientSecret = paymentIntent.clientSecret

    res.json({
        clientSecret: clientSecret
    })
  } catch (error) {
    console.log(error.message);
    res.json({error: error.message})
  }
});
