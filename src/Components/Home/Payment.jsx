import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSub from "./PaymentSub";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentSub />
    </Elements>
  );
};

export default Payment;
