import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(
  "pk_test_51IRhn8AADF3RmXMdfMxV11xuAmFcQPSI6SRX829bgO4AHf8ovgnRTXFu8I9LwDQHjBOPxcbv4mwEQ7ST35F6oUX100oGm3mAkZ"
);

export default function Subscribe() {
  let price = "price_1IRjIRAADF3RmXMdtXis20CT";

  async function startCheckout() {
    console.log("here");
    const result = await (await stripe).redirectToCheckout({
      lineItems: [{ price, quantity: 1 }],

      successUrl: "http://localhost:3000/dashboard",
      cancelUrl: "http://localhost:3000/canceled",
      mode: "subscription",
    });
    if (result.error) {
      alert("Our payment system is broke please try again at a later time");
    } else {
      console.log(result);
    }
  }

  return <button onClick={startCheckout}>Subscribe</button>;
}
