/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function AllBuyers() {
    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/get-all-buyer/${user.uid}`, {
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
                                <td>
                                    <img src={elem?.photoURL} alt="user" />
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
