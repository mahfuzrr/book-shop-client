import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function LogLeft() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signInUsingEmail, signInGoogle } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleJWT = (uId) => {
        const obj = {
            uId,
        };

        fetch('https://dream-travel.vercel.app/jwt-token', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                res.json()
                    .then((upRes) => {
                        localStorage.setItem('token', upRes?.token);
                    })
                    .catch(() => {
                        toast.error('Server Error', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        signInUsingEmail(email, password)
            // eslint-disable-next-line no-unused-vars
            .then((user) => {
                // handleJWT(user?.user?.uid);
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setEmail('');
                setPassword('');
                const str = err.message.substring(err.message.indexOf(':') + 1);
                toast.error(str, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });

        setEmail('');
        setPassword('');
    };

    const handleSignInUsingGoogle = () => {
        signInGoogle()
            // eslint-disable-next-line no-unused-vars
            .then((user) => {
                // handleJWT(user?.user?.uid);

                const reqObject = {
                    userId: user?.user?.uid,
                    email: user?.user?.email,
                    name: user?.user?.displayName,
                    photoURL: user?.user?.photoURL,
                    role: 'buyer',
                };

                fetch('http://localhost:5000/register', {
                    method: 'POST',
                    body: JSON.stringify(reqObject),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((result) => {
                        result.json().then((upRes) => {
                            console.log(upRes);
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

                navigate(from, { replace: true });
            })
            .catch((err) => {
                const str = err.message.substring(err.message.indexOf(':') + 1);
                toast.error(str, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    return (
        <div className="container me-lg-5 p-5" id="left-login">
            <div className="container d-flex flex-column justify-content-center" id="upper-logIn">
                <h4>Log In</h4>
            </div>
            <div className="container" id="below-logIn">
                <form onSubmit={handleSubmit} id="logIn-form">
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="login-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button className="btn submit-btn" type="submit">
                        LogIn
                    </button>
                </form>
                <p className="mt-4 text-center" id="signUpLink">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="link-sign">
                        SignUp
                    </Link>
                </p>
            </div>
            <div className="container d-flex flex-column justify-content-center" id="social-logIn">
                <div className="container-fluid mt-4" id="google-login">
                    <button
                        type="button"
                        className="btn custom-google-login"
                        onClick={handleSignInUsingGoogle}
                    >
                        <span className="me-5">
                            <i className="fa-brands fa-google" />
                        </span>{' '}
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
