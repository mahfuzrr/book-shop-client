/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function AllSeller() {
    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/get-all-seller/${user.uid}`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            })
                .then((result) => {
                    result.json().then((upResult) => {
                        if (upResult?.success) {
                            console.log(upResult.message);
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

        fetch(`http://localhost:5000/delete-user/${uid}/${userid}`, {
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

    return (
        <div
            className="tab-pane fade show active"
            id="v-pills-all-seller"
            role="tabpanel"
            aria-labelledby="v-pills-all-seller-tab"
        >
            <div className="container-fluid" id="add-products-content">
                <table className="table" id="admin-seller">
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
                                <td>
                                    <img
                                        referrerPolicy="no-referrer"
                                        src={elem?.photoURL}
                                        alt="user"
                                    />
                                </td>
                                <td>{elem?.name}</td>
                                <td>{elem?.email}</td>
                                <td>
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
