import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="container-fluid p-0">
            <section id="footer-main" className="d-flex">
                <div className="footer-main-item">
                    <h2 className="footer-text-1">Address</h2>
                    <ul>
                        <li>Street Address: 112 West Fork Drive</li>
                        <li>City: Deerfield Beach</li>
                        <li>State: FL</li>
                        <li>Telephone Number: 954-428-2622</li>
                    </ul>
                </div>
                <div className="footer-main-item">
                    <h2 className="footer-text-1">About</h2>
                    <ul>
                        <li>Services</li>
                        <li>Pricing</li>
                        <li>Customers</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div className="footer-main-item">
                    <h2 className="footer-text-1">Contact</h2>
                    <ul>
                        <li>Help</li>
                        <li>Sales</li>
                        <li>Advertise</li>
                    </ul>
                </div>
                <div className="footer-main-item">
                    <h2 className="footer-text-1">Stay Updated</h2>
                    <p>Subscribe to our newsletter to get our latest news.</p>
                    <form id="footer-form">
                        <input type="email" name="email" placeholder="Enter email address" />
                        <button type="button" className="btn subscribe-btn">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            <section id="footer-copyright" className="container-fluid">
                <ul>
                    <li className="copyt">&copy; 2022 Copyright BookShop</li>
                    <li>
                        <section id="footer-social">
                            <ul className="footer-social-list">
                                <li>
                                    <Link
                                        to="https://www.facebook.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-facebook" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="https://www.github.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-github" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="htttps://www.linkedin.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-linkedin" />
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </li>
                </ul>
            </section>
        </footer>
    );
}
