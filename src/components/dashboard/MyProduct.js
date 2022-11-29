/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

export default function MyProduct({ fetchh }) {
    const [products, setProducts] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch(`https://book-server-six.vercel.app/get-seller-products/${user?.uid}`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            })
                .then((result) => {
                    result.json().then((upResult) => {
                        if (upResult?.success) {
                            setProducts(upResult?.message);
                        } else {
                            toast.error(upResult?.message, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 1000,
                            });
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [user, refetch, fetchh]);

    const deleteProduct = (id) => {
        fetch(`https://book-server-six.vercel.app/delete-product-seller/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('token'),
            },
        })
            .then((res) => {
                res.json().then((upRes) => {
                    if (upRes.success) {
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
                toast.error(err.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            });
    };

    const handleAdvertise = (productId) => {
        const reqObject = { id: productId };
        fetch('https://book-server-six.vercel.app/advertise-items', {
            method: 'PATCH',
            body: JSON.stringify(reqObject),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        })
            .then((res) => {
                res.json().then((upRes) => {
                    if (upRes?.success) {
                        setRefetch(true);
                        toast.success('Advertised successfully!', {
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
                toast.error(err.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            });
    };

    return (
        <div
            className="tab-pane fade"
            id="v-pills-my-product"
            role="tabpanel"
            aria-labelledby="v-pills-my-product-tab"
        >
            <div className="container-fluid" id="my-products-content">
                <table className="table" id="my-product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Original Price</th>
                            <th>Resale Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product?._id}>
                                <td>{product?.productName}</td>
                                <td>{product?.originalPrice}$</td>
                                <td>{product?.resalePrice}$</td>
                                <td
                                    className={`text-center ${
                                        product?.isAvailable && !product?.isPaid
                                            ? 'available'
                                            : 'sold'
                                    }`}
                                >
                                    {product?.isAvailable && !product?.isPaid
                                        ? 'Available'
                                        : 'Sold'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn create-advirtise-btn"
                                        disabled={product?.isPaid}
                                        onClick={() => handleAdvertise(product?._id)}
                                    >
                                        Advertise
                                    </button>
                                    <button
                                        type="button"
                                        className="btn delete-prod ms-2 bg-danger"
                                        onClick={() => deleteProduct(product?._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* <!-- sold class for sold products --> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
