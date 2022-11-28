/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function AllBuyers() {
    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch(`https://book-server-six.vercel.app/${user.uid}`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            })
                .then((result) => {
                    result.json().then((upResult) => {
                        if (upResult?.success) {
                            setData(upResult.message);
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [user, refetch]);

    const handleDeleteUser = (userid) => {
        const { uid } = user;

        fetch(`https://book-server-six.vercel.app/${uid}/${userid}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('token'),
            },
        })
            .then((res) => {
                res.json().then((upRes) => {
                    if (upRes?.success) {
                        setRefetch(true);
                        toast.success('Deleted Successful!', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    } else {
                        toast.error(upRes?.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                });
            })
            .catch((err) => {
                toast.error(err?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            });
    };

    const handleVerify = (uId) => {
        const obj = {
            uId,
        };
        fetch(`https://book-server-six.vercel.app/verify-user/${user.uid}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        }).then((res) => {
            res.json().then((upRes) => {
                if (upRes?.success) {
                    setRefetch(true);
                    toast.success('Verified successful!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                }
            });
        });
    };

    return (
        <div
            className="tab-pane fade"
            id="v-all-buyer"
            role="tabpanel"
            aria-labelledby="v-all-buyer-tab"
        >
            <div className="container-fluid" id="my-products-content">
                <table className="table" id="admin-buyer">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((elem) => (
                            <tr key={elem?._id}>
                                <td id="verified-img">
                                    <img
                                        referrerPolicy="no-referrer"
                                        src={elem?.photoURL}
                                        alt="user"
                                    />
                                    {elem?.isVarified && (
                                        <span>
                                            <MdVerified />
                                        </span>
                                    )}
                                </td>
                                <td>{elem?.name}</td>
                                <td>{elem?.email}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn verify  me-lg-3"
                                        onClick={() => handleVerify(elem?.userId)}
                                    >
                                        Verify
                                    </button>
                                    <button
                                        type="button"
                                        className="btn create-advirtise-btn"
                                        onClick={() => handleDeleteUser(elem?.userId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
