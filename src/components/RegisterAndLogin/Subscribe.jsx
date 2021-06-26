import { loadStripe } from "@stripe/stripe-js";
import { frontendBaseURL } from "../../utils/misc";
const stripe = loadStripe(
  "pk_live_51IVkZmKTCPPfBqGfvbueZ3JhuMC2GEqQF03GzuB6QpEvKXMADUXUloJUTRO53wkrJUoZjA5MWgNuLohABaOa5HYu00BukJoCoi"
);

export default function Subscribe(input) {
  let price = "price_1Iu2poKTCPPfBqGfssmKcuWW";
  let id;
  let token;
  console.log(input);
  if (typeof input === "string") {
    id = input;
  } else {
    id = input.data.id;
    token = input.token;
  }
  async function startCheckout() {
    const result = await (
      await stripe
    ).redirectToCheckout({
      lineItems: [{ price, quantity: 1 }],

      successUrl: `${frontendBaseURL}/subscribed/${id}/${token}`,
      cancelUrl: `${frontendBaseURL}/dashboard`,
      mode: "subscription",
    });
    if (result.error) {
      alert("Our payment system is broke please try again at a later time");
    }
  }

  return startCheckout();
}
