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
            fetch(`http://localhost:5000/get-seller-products/${user?.uid}`)
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
        fetch(`http://localhost:5000/delete-product-seller/${id}`, {
            method: 'DELETE',
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
        fetch('http://localhost:5000/advertise-items', {
            method: 'PATCH',
            body: JSON.stringify(reqObject),
            headers: {
                'Content-Type': 'application/json',
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
                                <td>{product?.resalePrice}</td>
                                <td
                                    className={`text-center ${
                                        product?.isAvailable && !product?.isBooked
                                            ? 'available'
                                            : 'sold'
                                    }`}
                                >
                                    {product?.isAvailable && !product?.isBooked
                                        ? 'Available'
                                        : 'Sold'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn create-advirtise-btn"
                                        disabled={product?.isBooked}
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
