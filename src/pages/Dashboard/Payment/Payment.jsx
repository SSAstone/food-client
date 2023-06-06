import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutFrom from "./CheckoutFrom";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_gateway)
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const price = parseFloat(total.toFixed(2));

    return (
        <div>
            <SectionTitle subHeading="Payment" heading={"please provide"}></SectionTitle>
            <h1>Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckoutFrom cart={cart} price={price}></CheckoutFrom>   
            </Elements>
        </div>
    );
};

export default Payment;