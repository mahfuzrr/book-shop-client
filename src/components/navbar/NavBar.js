import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userImage from '../../assets/user.png';
import { AuthContext } from '../../context/UserContext';

export default function NavBar() {
    const [url, setUrl] = useState('');

    const navigate = useNavigate();

    const { user, logOut } = useContext(AuthContext);

    useEffect(() => {
        setUrl(window.location.pathname);
    }, []);

    const location = useLocation();
    const from = location.state?.from?.pathaname || '/login';

    const handleLogNavigate = () => {
        navigate(from, { replace: true });
    };

    const handleLogOut = () => {
        logOut()
            // eslint-disable-next-line no-unused-vars
            .then((result) => {
                navigate('/');
            })
            .catch((err) => {
                toast.error(err.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    return (
        <nav className="navbar navbar-expand-lg" id="navbar">
            <div className="container mt-lg-4">
                <Link className="navbar-brand" to="/">
                    BookShop
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navToggler"
                    aria-controls="navToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa-solid fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navToggler">
                    <ul className="navbar-nav ms-auto me-md-3 mb-2 mb-lg-0" id="navItem">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${url === '/' && 'active'}`}
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        {user?.uid && (
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${url === '/dashboard' && 'active'}`}
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className={`nav-link ${url === '/blog' && 'active'}`} to="/blog">
                                Blog
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-lg-5 gap-lg-4" id="logInSection">
                        {user?.uid && (
                            <li className="nav-item" id="user-avatar">
                                <img
                                    className="img-fluid m-0 p-0"
                                    referrerPolicy="no-referrer"
                                    src={user?.photoURL ? user?.photoURL : userImage}
                                    alt="user"
                                />
                            </li>
                        )}
                        <li className="nav-item">
                            {user?.uid ? (
                                <button
                                    type="button"
                                    className="btn"
                                    id="login-nav"
                                    onClick={handleLogOut}
                                >
                                    LogOut
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn"
                                    id="login-nav"
                                    onClick={handleLogNavigate}
                                >
                                    LogIn
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}