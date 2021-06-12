import { loadStripe } from "@stripe/stripe-js";
import { frontendBaseURL } from "../../utils/misc";
const stripe = loadStripe(
  "pk_test_51IRhn8AADF3RmXMdfMxV11xuAmFcQPSI6SRX829bgO4AHf8ovgnRTXFu8I9LwDQHjBOPxcbv4mwEQ7ST35F6oUX100oGm3mAkZ"
);

export default function Subscribe(input) {
  let price = "price_1IRjIRAADF3RmXMdtXis20CT";
  let id;
  if (typeof input === "string") {
    id = input;
  } else {
    id = input.data.id;
  }
  async function startCheckout() {
    const result = await (await stripe).redirectToCheckout({
      lineItems: [{ price, quantity: 1 }],

      successUrl: `${frontendBaseURL}/subscribed/${id}`,
      cancelUrl: `${frontendBaseURL}/dashboard`,
      mode: "subscription",
    });
    if (result.error) {
      alert("Our payment system is broke please try again at a later time");
    }
  }

  return startCheckout();
}
