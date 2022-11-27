import bannerImage from '../../assets/bgImage.jpeg';

export default function Banner() {
    return (
        <div className="container overflow-hidden" id="banner-section">
            <div className="container-fluid" id="main-banner">
                <img className="img-fluid" src={bannerImage} alt="bg" />
                <div className="container" id="banner-text">
                    <h1>Book-Shop</h1>
                    <p className="m-0 text-center">Sell your book and</p>
                    <p className="m-0 text-center">spread the knowledges</p>
                </div>
            </div>
        </div>
    );
}
