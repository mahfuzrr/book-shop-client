/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/get-my-orders/${user.uid}`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            })
                .then((result) => {
                    result.json().then((data) => {
                        if (data?.success) {
                            console.log(data?.message);
                            setOrders(data?.message);
                        } else {
                            toast.error(data?.message, {
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
    }, [user]);

    const convertDate = (date) => {
        const newDate = new Date(date);
        return newDate;
    };

    const getDiff = (date) => Math.floor(Math.abs(Date.now() - convertDate(date)));

    const handleNavigate = (prodId) => {
        navigate(`/payment/${prodId}`);
    };

    return (
        <div
            className="tab-pane fade show active"
            id="v-pills-myorders"
            role="tabpanel"
            aria-labelledby="v-pills-myorders-tab"
        >
            <div className="container-fluid row gap-4" id="my-order">
                {/* <!-- Single card --> */}
                {orders.map((data) => (
                    <div
                        key={data._id}
                        className="container p-0 d-flex flex-column advertise-main-contents-single-card"
                    >
                        <div className="container-fluid p-0 advertise-contents-card-image">
                            <img className="img-fluid" src={data?.photoURL} alt="book" />
                        </div>
                        <div className="container-fluid p-0 advertise-contents-texts">
                            <div className="container-fluid mt-3 advertise-upper-text ps-4">
                                <p className="m-0 advertise-book-name">{data?.productName}</p>
                                <p className="m-0 advertise-location">Location: {data?.location}</p>
                            </div>
                            <div className="container-fluid advertise-lower-text mt-3 pb-3 ps-4 pe-4">
                                <p className="m-0 advertise-card-common-text">
                                    Original price: ${data?.originalPrice}
                                </p>
                                <p className="m-0 advertise-card-common-text">
                                    Resale price: ${data?.resalePrice}
                                </p>
                                <p className="m-0 advertise-card-common-text">
                                    Usage: {data?.purchageYear} year
                                </p>
                                <p className="m-0 advertise-card-common-text">
                                    Seller: {data?.sellerName}
                                </p>
                                <p className="m-0 advertise-card-posted">
                                    Posted:{' '}
                                    {Math.floor(getDiff(data?.posted) / 36e5) > 0
                                        ? `${Math.floor(getDiff(data?.posted) / 36e5)} hours`
                                        : `${Math.floor(
                                              getDiff(data?.posted) / 1000 / 60
                                          )} minutes`}{' '}
                                    ago
                                </p>
                                <button
                                    type="button"
                                    className="btn advertise-card-btn mt-3 text-center"
                                    disabled={!!data?.paymentDetails}
                                    onClick={() => handleNavigate(data._id)}
                                >
                                    {data?.paymentDetails ? 'Paid' : 'Pay'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
