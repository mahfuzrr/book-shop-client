/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import noDataImage from '../../assets/NoData.svg';
import { AuthContext } from '../../context/UserContext';
import useRole from '../useRole';

export default function CategoryAll() {
    const [toggle, setToggle] = useState(false);
    const [allData, setAllData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bookName, setBookName] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [bookId, setBookId] = useState('');
    const [refetch, setRefetch] = useState(false);

    const { id } = useParams();

    const { user } = useContext(AuthContext);
    const [role] = useRole(user?.uid);

    useEffect(() => {
        fetch(`http://localhost:5000/get-specific-products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        })
            .then((result) => {
                result.json().then((upResult) => {
                    if (upResult?.success) {
                        setAllData(upResult?.message);
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id, refetch]);

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

        fetch('http://localhost:5000/update-booked-product', {
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
        setRefetch(true);
    };

    return (
        <div className="container pb-5 min-vh-100" id="all-category">
            <ToastContainer />
            <div className={`container ${toggle === true ? 'open' : 'close'}`} id="category-modal">
                <span role="presentation" onClick={closeModal}>
                    <i className="fa-solid fa-circle-xmark" />
                </span>
                <form onSubmit={updateBooked}>
                    <input className="form-control" type="text" value={name} readOnly />
                    <input className="form-control mt-2" type="text" value={email} readOnly />
                    <input className="form-control mt-2" type="text" value={bookName} readOnly />
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
            <div className="container-fluid row gap-4 p-0" id="all-category-content">
                {/* <!-- single --> */}
                {allData.length > 0 ? (
                    allData.map(
                        (data) =>
                            !data?.isBooked && (
                                <div
                                    key={data._id}
                                    className="container p-0 d-flex flex-column advertise-main-contents-single-card"
                                >
                                    <div className="container-fluid p-0 advertise-contents-card-image">
                                        <img
                                            className="img-fluid"
                                            src={data?.photoURL}
                                            alt="book"
                                        />
                                    </div>
                                    <div className="container-fluid p-0 advertise-contents-texts">
                                        <div className="container-fluid mt-3 advertise-upper-text ps-4">
                                            <div className="container-fluid p-0 d-flex justify-content-between align-items-center upper-section">
                                                <p className="m-0 advertise-book-name">
                                                    {data?.productName}
                                                </p>
                                                <button type="button" className="btn report-btn">
                                                    Report to admin
                                                </button>
                                            </div>
                                            <p className="m-0 advertise-location">
                                                Location: {data?.location}
                                            </p>
                                        </div>
                                        <div className="container-fluid advertise-lower-text mt-3 pb-3 ps-4 pe-4">
                                            <p className="m-0 advertise-card-common-text">
                                                Original price: {`$${data?.originalPrice}`}
                                            </p>
                                            <p className="m-0 advertise-card-common-text">
                                                Resale price: {`$${data.resalePrice}`}
                                            </p>
                                            <p className="m-0 advertise-card-common-text">
                                                Usage: {`${data?.purchageYear} year`}
                                            </p>
                                            <p className="m-0 advertise-card-common-text">
                                                Seller: {data?.sellerName}
                                            </p>
                                            <p className="m-0 advertise-card-posted">
                                                Posted:{' '}
                                                {Math.floor(getDiff(data?.posted) / 36e5) > 0
                                                    ? `${Math.floor(
                                                          getDiff(data?.posted) / 36e5
                                                      )} hours`
                                                    : `${Math.floor(
                                                          getDiff(data?.posted) / 1000 / 60
                                                      )} minutes`}{' '}
                                                ago
                                            </p>
                                            <button
                                                type="button"
                                                className="btn advertise-card-btn mt-3 text-center"
                                                disabled={role !== 'buyer'}
                                                onClick={() =>
                                                    setModalValue(
                                                        data?.productName,
                                                        data?.resalePrice,
                                                        data?._id
                                                    )
                                                }
                                            >
                                                {role === 'buyer'
                                                    ? 'Book Now'
                                                    : 'Buyer are allowed to buy'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                    )
                ) : (
                    <div
                        className="container-fluid d-flex flex-column justify-content-center align-items-center"
                        id="nodata"
                    >
                        <div
                            className="container-fluid d-flex justify-content-center"
                            id="nodata-image"
                        >
                            <img src={noDataImage} alt="nodata" />
                        </div>
                        <p>No item available!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
