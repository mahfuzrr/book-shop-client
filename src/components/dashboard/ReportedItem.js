import bookCover from '../../assets/book-cover.jpg';

export default function ReportedItem() {
    return (
        <div
            className="tab-pane fade"
            id="v-reported-item"
            role="tabpanel"
            aria-labelledby="v-reported-item-tab"
        >
            <div className="container-fluid" id="reported-item">
                <div className="container p-0 single-report">
                    <div className="container-fluid p-0 report-upper-image">
                        <img className="img-fluid" src={bookCover} alt="book" />
                    </div>
                    <div className="container-fluid report-lower">
                        <div className="container-fluid mt-3 report-upper-text ps-4">
                            <p className="m-0 report-book-name">Book Name</p>
                            <p className="m-0 report-location">Location: Dhaka, Bangladesh</p>
                        </div>
                        <div className="container-fluid p-0 report-lower-text mt-3 pb-3 ps-4 pe-4">
                            <p className="m-0 report-card-common-text">Original price: $50</p>
                            <p className="m-0 report-card-common-text">Resale price: $20</p>
                            <p className="m-0 report-card-common-text">Usage: 1 year</p>
                            <p className="m-0 report-card-common-text">Seller: Mr. X</p>
                            <p className="m-0 report-card-posted">Posted: 2 days ago</p>
                            <button type="button" className="btn report-card-btn mt-3 text-center">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
