import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import '../../../CSS/checkout.css';

const CheckoutFrom = ({ cart, price}) => {
    const [cartError, setCartError] = useState('');
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if(price) {
            axiosSecure.post("/create-payment-intent", {price})
            .then((res) => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        
        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log(error);
            setCartError(error.message);
        }
        else {
            setCartError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email || 'Guest',
                        name: user.displayName || 'Guest',
                    },
                },
            },
        );

        if(confirmError) {
            console.log(confirmError);
        }
        
        setProcessing(false);

        if(paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                status: 'Processing',
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),

                itemNames: cart.map(item => item.name),
            }
            axiosSecure.post("/payments", payment)
            .then((res) => {
                console.log(res.data);
                if(res.data.insertedId) {
                    console.log(res.data.insertedId)
                }
            })
        }
    }

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cartError && <p className="text-red-500 m-8">{cartError}</p>}
            {transactionId && <p className="text-green-500 m-8">TransactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutFrom;