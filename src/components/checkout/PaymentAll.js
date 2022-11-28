import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(
    'pk_test_51M96csL27rePm2jj5n2uBz9Nh2cVAZVyabwpHn2qVvZt24CJKUxkjL0Zp9i174mlVrVIqixmyxFoIZ5urv8L7EUS00l551mw36'
);

export default function PaymentAll() {
    const [data, setData] = useState({});
    const { bookid } = useParams();

    useEffect(() => {
        console.log(bookid);
        if (bookid) {
            fetch(`https://book-server-six.vercel.app/get-product-info/${bookid}`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            })
                .then((res) => {
                    res.json().then((upRes) => {
                        if (upRes?.success) {
                            console.log(upRes);
                            setData(upRes?.message);
                        } else {
                            console.log(upRes);
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [bookid]);
    return (
        <div className="container overflow-hidden min-vh-100" id="payment">
            <ToastContainer />
            <div className="container-fluid d-flex" id="payment-contents">
                <div className="container p-0" id="payment-left">
                    {/* <!-- payment card --> */}
                    <div className="container p-0 payment-card">
                        <div className="container p-0 payment-card-image">
                            <img src={data?.photoURL} alt="book" className="img-fluid" />
                        </div>
                        <div className="container pt-4 payment-card-all-text">
                            <div className="container-fluid payment-card-upper-text">
                                <h5 className="m-0">{data?.productName}</h5>
                                <p>Location: {data?.location}</p>
                            </div>
                            <div className="container payment-card-lower-text">
                                <p className="m-0">Original price: ${data?.originalPrice}</p>
                                <p className="m-0">Resale price: ${data?.resalePrice}</p>
                                <p className="m-0">Usage: {data?.purchageYear} year</p>
                                <p>Seller: {data?.sellerName}</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- payment card --> */}
                </div>
                <div
                    className="container d-flex flex-column justify-content-center"
                    id="payment-right"
                >
                    <p>Payment</p>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm data={data} />
                    </Elements>
                </div>
            </div>
        </div>
    );
}
