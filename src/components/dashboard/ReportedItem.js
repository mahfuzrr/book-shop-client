/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function ReportedItem() {
    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch(`https://book-server-six.vercel.app/get-reported-items/${user.uid}`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            }).then((res) => {
                res.json()
                    .then((upRes) => {
                        if (upRes?.success) {
                            setData(upRes?.message);
                        } else {
                            console.log(upRes);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        }
    }, [user, refetch]);

    const handleDelete = (id) => {
        fetch(`https://book-server-six.vercel.app/delete-product-seller/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('token'),
            },
        }).then((res) => {
            res.json().then((upRes) => {
                if (upRes?.success) {
                    setRefetch(true);
                    toast.success('Deleted Successful!', {
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
            id="v-reported-item"
            role="tabpanel"
            aria-labelledby="v-reported-item-tab"
        >
            <div className="container-fluid" id="reported-item">
                {data.map((elem) => (
                    <div key={elem._id} className="container p-0 single-report">
                        <div className="container-fluid p-0 report-upper-image">
                            <img className="img-fluid" src={elem?.photoURL} alt="book" />
                        </div>
                        <div className="container-fluid report-lower">
                            <div className="container-fluid mt-3 report-upper-text ps-4">
                                <p className="m-0 report-book-name">{elem?.productName}</p>
                                <p className="m-0 report-location">Location: {elem?.location}</p>
                            </div>
                            <div className="container-fluid p-0 report-lower-text mt-3 pb-3 ps-4 pe-4">
                                <p className="m-0 report-card-common-text">
                                    Original price: ${elem?.originalPrice}
                                </p>
                                <p className="m-0 report-card-common-text">
                                    Resale price: ${elem?.resalePrice}
                                </p>
                                <p className="m-0 report-card-common-text">
                                    Usage: {elem?.purchageYear}year
                                </p>
                                <p className="m-0 report-card-common-text">
                                    Seller: {elem?.sellerName}
                                </p>
                                <button
                                    type="button"
                                    className="btn report-card-btn mt-3 text-center"
                                    onClick={() => handleDelete(elem._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
