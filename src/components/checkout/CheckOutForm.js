/* eslint-disable no-underscore-dangle */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function CheckOutForm({ data }) {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { resalePrice } = data;

    const { user } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        // eslint-disable-next-line no-unused-vars
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName,
                    },
                },
            }
        );

        if (confirmError) {
            setCardError(confirmError.message);
        }

        if (paymentIntent?.status === 'succeeded') {
            const payment = {
                price: paymentIntent.amount,
                paymentId: paymentIntent.id,
                user: user?.uid,
                id: data._id,
            };

            fetch('http://localhost:5000/update-payment', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify(payment),
            })
                .then((res) => {
                    res.json().then((upRes) => {
                        if (upRes?.success) {
                            toast.success('Payment Successfull!', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 1000,
                            });
                        } else {
                            console.log(upRes);
                            toast.error('Server Error!', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 1000,
                            });
                        }
                    });
                })
                .catch((err) => {
                    toast.error(err.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                });
        }

        setProcessing(false);
    };

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (resalePrice > 0) {
            const obj = {
                price: parseInt(resalePrice, 10),
            };
            console.log(obj);

            fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify(obj),
            })
                .then((res) => res.json())
                .then((upData) => setClientSecret(upData.clientSecret));
        }
    }, [resalePrice]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#5E5E5E',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className="btn"
                    id="payment-btn"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-danger mt-2 mb-0">{cardError}</p>}
        </>
    );
}
