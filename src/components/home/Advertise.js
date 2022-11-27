import bookCover from '../../assets/book-cover.jpg';

export default function Advertise() {
    return (
        <div className="container overflow-hidden pb-5" id="advertise-section">
            <div className="container-fluid" id="advertise-contents">
                <h5>Advertise</h5>
                <div className="container row mt-5 gap-4" id="advertise-main-contents">
                    {/* <!-- Single card --> */}
                    <div className="container p-0 d-flex flex-column advertise-main-contents-single-card">
                        <div className="container-fluid p-0 advertise-contents-card-image">
                            <img className="img-fluid" src={bookCover} alt="book" />
                        </div>
                        <div className="container-fluid p-0 advertise-contents-texts">
                            <div className="container-fluid mt-3 advertise-upper-text ps-4">
                                <p className="m-0 advertise-book-name">Book Name</p>
                                <p className="m-0 advertise-location">
                                    Location: Dhaka, Bangladesh
                                </p>
                            </div>
                            <div className="container-fluid advertise-lower-text mt-3 pb-3 ps-4 pe-4">
                                <p className="m-0 advertise-card-common-text">
                                    Original price: $50
                                </p>
                                <p className="m-0 advertise-card-common-text">Resale price: $20</p>
                                <p className="m-0 advertise-card-common-text">Usage: 1 year</p>
                                <p className="m-0 advertise-card-common-text">Seller: Mr. X</p>
                                <p className="m-0 advertise-card-posted">Posted: 2 days ago</p>
                                <button
                                    type="button"
                                    className="btn advertise-card-btn mt-3 text-center"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single card --> */}
                    <div className="container p-0 d-flex flex-column advertise-main-contents-single-card">
                        <div className="container-fluid p-0 advertise-contents-card-image">
                            <img className="img-fluid" src={bookCover} alt="book" />
                        </div>
                        <div className="container-fluid p-0 advertise-contents-texts">
                            <div className="container-fluid mt-3 advertise-upper-text ps-4">
                                <p className="m-0 advertise-book-name">Book Name</p>
                                <p className="m-0 advertise-location">
                                    Location: Dhaka, Bangladesh
                                </p>
                            </div>
                            <div className="container-fluid advertise-lower-text mt-3 pb-3 ps-4 pe-4">
                                <p className="m-0 advertise-card-common-text">
                                    Original price: $50
                                </p>
                                <p className="m-0 advertise-card-common-text">Resale price: $20</p>
                                <p className="m-0 advertise-card-common-text">Usage: 1 year</p>
                                <p className="m-0 advertise-card-common-text">Seller: Mr. X</p>
                                <p className="m-0 advertise-card-posted">Posted: 2 days ago</p>
                                <button
                                    type="button"
                                    className="btn advertise-card-btn mt-3 text-center"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single card --> */}
                    <div className="container p-0 d-flex flex-column advertise-main-contents-single-card">
                        <div className="container-fluid p-0 advertise-contents-card-image">
                            <img className="img-fluid" src={bookCover} alt="book" />
                        </div>
                        <div className="container-fluid p-0 advertise-contents-texts">
                            <div className="container-fluid mt-3 advertise-upper-text ps-4">
                                <p className="m-0 advertise-book-name">Book Name</p>
                                <p className="m-0 advertise-location">
                                    Location: Dhaka, Bangladesh
                                </p>
                            </div>
                            <div className="container-fluid advertise-lower-text mt-3 pb-3 ps-4 pe-4">
                                <p className="m-0 advertise-card-common-text">
                                    Original price: $50
                                </p>
                                <p className="m-0 advertise-card-common-text">Resale price: $20</p>
                                <p className="m-0 advertise-card-common-text">Usage: 1 year</p>
                                <p className="m-0 advertise-card-common-text">Seller: Mr. X</p>
                                <p className="m-0 advertise-card-posted">Posted: 2 days ago</p>
                                <button
                                    type="button"
                                    className="btn advertise-card-btn mt-3 text-center"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
