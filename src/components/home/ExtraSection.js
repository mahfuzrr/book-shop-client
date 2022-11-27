import onlinePaymentImage from '../../assets/online-payment.svg';
import paymentImage from '../../assets/payment.png';

export default function ExtraSection() {
    return (
        <div className="container pb-5" id="extra-section">
            <div className="container-fluid mt-5" id="extra-section-content">
                <h5>Payment Methods</h5>
                <div className="container-fluid d-flex" id="home-payment-allside">
                    <div className="container" id="home-payment-left">
                        <img className="img-fluid" src={onlinePaymentImage} alt="online-payment" />
                    </div>
                    <div
                        className="container d-flex flex-column justify-content-center"
                        id="home-payment-right"
                    >
                        <p className="text-center">
                            Online payment is now secure. You can pay use using these methods
                        </p>
                        <img className="img-fluid" src={paymentImage} alt="payment" />
                    </div>
                </div>
            </div>
        </div>
    );
}
