/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';
import useRole from '../useRole';

export default function Advertise() {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bookName, setBookName] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [bookId, setBookId] = useState('');

    const { user } = useContext(AuthContext);
    const [role] = useRole(user?.uid);

    const convertDate = (date) => {
        const newDate = new Date(date);
        return newDate;
    };

    const getDiff = (date) => Math.floor(Math.abs(Date.now() - convertDate(date)));

    const setModalValue = (bName, bPrice, bId) => {
        setToggle(true);
        setName(user?.displayName);
        setEmail(user?.email);
        setBookName(bName);
        setPrice(bPrice);
        setBookId(bId);
    };

    const closeModal = () => {
        setToggle(false);
        setName('');
        setEmail('');
        setPhone('');
        setLocation('');
        setPrice('');
        setBookName('');
    };

    const updateBooked = (e) => {
        e.preventDefault();
        const obj = { id: bookId, phone, location, uid: user?.uid };

        fetch('https://book-server-six.vercel.app/update-booked-product', {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        })
            .then((result) => {
                result.json().then((upResult) => {
                    if (upResult?.success) {
                        toast.success('Booked Successful!\n', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    } else {
                        console.log(upResult);
                        toast.error(upResult?.message, {
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
        setToggle(false);
    };

    const handleReport = (bookId1) => {
        const reqObj = { id: bookId1, uid: user.uid };

        fetch('https://book-server-six.vercel.app/report-to-admin', {
            method: 'PATCH',
            body: JSON.stringify(reqObj),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        })
            .then((data1) => {
                data1.json().then((res) => {
                    if (res?.success) {
                        toast.success('Reported!', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                });
            })
            .catch((err) => {
                toast.success(err.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            });
    };

    useEffect(() => {
        // fetch('https://book-server-six.vercel.app/get-advertise-items', {
        //     method: 'GET',
        //     headers: {
        //         authorization: localStorage.getItem('token'),
        //     },
        // })
        //     .then((result) => {
        //         result.json().then((upResult) => {
        //             if (upResult?.success) {
        //                 setData(upResult?.message);
        //             }
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });

        axios
            .get('https://book-server-six.vercel.app/get-advertise-items', {
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            })
            .then((result) => {
                if (result.data?.success) {
                    setData(result.data?.message);
                }
            })
            .catch((err) => console.log(err.message));
    }, []);

    if (data.length === 0) {
        return <div />;
    }

    return (
        <div className="container overflow-hidden pb-5" id="advertise-section">
            <div className="container-fluid" id="advertise-contents">
                <h5>Advertise</h5>
                <div
                    className={`container ${toggle === true ? 'open' : 'close'}`}
                    id="advertise-modal"
                >
                    <span role="presentation" onClick={closeModal}>
                        <i className="fa-solid fa-circle-xmark" />
                    </span>
                    <form onSubmit={updateBooked}>
                        <input className="form-control" type="text" value={name} readOnly />
                        <input className="form-control mt-2" type="text" value={email} readOnly />
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={bookName}
                            readOnly
                        />
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={`$${price || 0}`}
                            readOnly
                        />
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone number"
                            required
                        />
                        <input
                            className="form-control mt-2"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                            required
                        />
                        <button type="submit" className="btn modal-btn">
                            Book
                        </button>
                    </form>
                </div>
                <div className="container row mt-5 gap-4" id="advertise-main-contents">
                    {data.map((elem) => (
                        <div
                            key={elem._id}
                            className="container p-0 d-flex flex-column advertise-main-contents-single-card"
                        >
                            <div className="container-fluid p-0 advertise-contents-card-image">
                                <img className="img-fluid" src={elem?.photoURL} alt="book" />
                            </div>
                            <div className="container-fluid p-0 advertise-contents-texts">
                                <div className="container-fluid mt-3 advertise-upper-text ps-4">
                                    <div className="container-fluid p-0 d-flex justify-content-between align-items-center upper-section">
                                        <p className="m-0 advertise-book-name">
                                            {elem?.productName}
                                        </p>
                                        <button
                                            type="button"
                                            className="btn report-btn"
                                            onClick={() => handleReport(elem._id)}
                                        >
                                            Report to admin
                                        </button>
                                    </div>
                                    <p className="m-0 advertise-location">
                                        Location: {elem?.location}
                                    </p>
                                </div>
                                <div className="container-fluid advertise-lower-text mt-3 pb-3 ps-4 pe-4">
                                    <p className="m-0 advertise-card-common-text">
                                        Original price: {`$${elem?.originalPrice}`}
                                    </p>
                                    <p className="m-0 advertise-card-common-text">
                                        Resale price: {`$${elem.resalePrice}`}
                                    </p>
                                    <p className="m-0 advertise-card-common-text">
                                        Usage: {`${elem?.purchageYear} year`}
                                    </p>
                                    <p className="m-0 advertise-card-common-text">
                                        Seller: {elem?.sellerName}
                                    </p>
                                    <p className="m-0 advertise-card-posted">
                                        Posted:{' '}
                                        {Math.floor(getDiff(elem?.posted) / 36e5) > 0
                                            ? `${Math.floor(getDiff(elem?.posted) / 36e5)} hours`
                                            : `${Math.floor(
                                                  getDiff(elem?.posted) / 1000 / 60
                                              )} minutes`}{' '}
                                        ago
                                    </p>
                                    <button
                                        type="button"
                                        className="btn advertise-card-btn mt-3 text-center"
                                        disabled={role !== 'buyer'}
                                        onClick={() =>
                                            setModalValue(
                                                elem?.productName,
                                                elem?.resalePrice,
                                                elem?._id
                                            )
                                        }
                                    >
                                        {role === 'buyer'
                                            ? 'Book Now'
                                            : 'Only Buyer are allowed to buy'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
