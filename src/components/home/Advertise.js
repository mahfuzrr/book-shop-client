/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

export default function Advertise() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/get-advertise-items')
            .then((result) => {
                result.json().then((upResult) => {
                    if (upResult?.success) {
                        setData(upResult?.message);
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const convertDate = (date) => {
        const newDate = new Date(date);
        return newDate;
    };

    const getDiff = (date) => Math.floor(Math.abs(Date.now() - convertDate(date)));

    return (
        <div className="container overflow-hidden pb-5" id="advertise-section">
            <div className="container-fluid" id="advertise-contents">
                <h5>Advertise</h5>
                <div className="container row mt-5 gap-4" id="advertise-main-contents">
                    {data.map((elem) => (
                        <div
                            key={elem?._id}
                            className="container p-0 d-flex flex-column advertise-main-contents-single-card"
                        >
                            <div className="container-fluid p-0 advertise-contents-card-image">
                                <img className="img-fluid" src={elem?.photoURL} alt="book" />
                            </div>
                            <div className="container-fluid p-0 advertise-contents-texts">
                                <div className="container-fluid mt-3 advertise-upper-text ps-4">
                                    <p className="m-0 advertise-book-name">{elem?.productName}</p>
                                    <p className="m-0 advertise-location">
                                        Location: {elem?.location}
                                    </p>
                                </div>
                                <div className="container-fluid advertise-lower-text mt-3 pb-3 ps-4 pe-4">
                                    <p className="m-0 advertise-card-common-text">
                                        Original price: ${elem?.originalPrice}
                                    </p>
                                    <p className="m-0 advertise-card-common-text">
                                        Resale price: ${elem?.resalePrice}
                                    </p>
                                    <p className="m-0 advertise-card-common-text">
                                        Usage: {elem?.purchageYear} year
                                    </p>
                                    <p className="m-0 advertise-card-common-text">
                                        Seller: {elem?.sellerName}
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
                                    >
                                        Book Now
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
