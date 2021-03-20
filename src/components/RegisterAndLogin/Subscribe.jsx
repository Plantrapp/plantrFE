import { loadStripe } from "@stripe/stripe-js";

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
    console.log("here");
    const result = await (await stripe).redirectToCheckout({
      lineItems: [{ price, quantity: 1 }],

      successUrl: `deployed-plantr-fe-sambrown0322.vercel.app/subscribed/${id}`,
      cancelUrl: "deployed-plantr-fe-sambrown0322.vercel.app/dashboard",
      mode: "subscription",
    });
    if (result.error) {
      alert("Our payment system is broke please try again at a later time");
    } else {
      console.log(result);
    }
  }

  return startCheckout();
}
