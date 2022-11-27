/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function SignUpLeft() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoUrl] = useState('');
    const [role, setRole] = useState('buyer');

    const { createUserUsingEmail, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleJWT = (uId) => {
        const obj = {
            uId,
        };

        fetch('http://localhost:5000/jwt-token', {
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

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (name && password && email) {
            const reqObject = {
                email,
                name,
                photoURL,
                role,
            };
            createUserUsingEmail(email, password)
                .then((user) => {
                    updateUser(name, photoURL)
                        // eslint-disable-next-line no-unused-vars
                        .then((updatedUser) => {
                            reqObject.userId = user.user.uid;
                            fetch('http://localhost:5000/register', {
                                method: 'POST',
                                body: JSON.stringify(reqObject),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })
                                .then((result) => {
                                    result.json().then((upRes) => {
                                        handleJWT(user.user.uid);
                                    });
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                            navigate('/');
                        })
                        .catch((err) => {
                            setName('');
                            setEmail('');
                            setPassword('');
                            setPhotoUrl('');
                            const str = err.message.substring(err.message.indexOf(':') + 1);
                            toast.warning(str, {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                        });
                })
                .catch((er) => {
                    setName('');
                    setEmail('');
                    setPassword('');
                    setPhotoUrl('');
                    setRole('buyer');
                    const str = er.message.substring(er.message.indexOf(':') + 1);
                    toast.warning(str, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                });

            setName('');
            setEmail('');
            setPassword('');
            setPhotoUrl('');
            setRole('buyer');
        }
    };

    return (
        <div className="container me-lg-5 ps-5 pe-5 pt-4" id="left-signup">
            <div className="container" id="upper-signup">
                <h4 className="text-center">Register your account</h4>
            </div>
            <div className="container" id="below-signup">
                <form onSubmit={handleOnSubmit} id="signup-form">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="signup-name"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="signup-email"
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
                            name="signup-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="signup-dp"
                            value={photoURL}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="Photo Url"
                            required
                        />
                    </div>
                    <div className="container mb-3">
                        <p className="mb-1">Select your role</p>
                        <div className="form-check">
                            <input
                                className="form-check-input me-3"
                                type="radio"
                                name="user-role"
                                id="user-role1"
                                value="buyer"
                                onChange={(e) => setRole(e.target.value)}
                                checked={role === 'buyer'}
                            />
                            <label
                                className="form-check-label user-role-label"
                                htmlFor="user-role1"
                            >
                                Buyer
                            </label>
                        </div>
                        <div className="form-check m-0">
                            <input
                                className="form-check-input me-3"
                                type="radio"
                                name="user-role"
                                value="seller"
                                onChange={(e) => setRole(e.target.value)}
                                id="user-role2"
                                checked={role === 'seller'}
                            />
                            <label
                                className="form-check-label user-role-label"
                                htmlFor="user-role2"
                            >
                                Seller
                            </label>
                        </div>
                    </div>
                    <button className="btn submit-btn" type="submit">
                        SignUp
                    </button>
                </form>
                <p className="mt-4 text-center" id="logInLink">
                    Already have an account?{' '}
                    <Link to="/login" className="link-sign">
                        LogIn
                    </Link>
                </p>
            </div>
        </div>
    );
}
