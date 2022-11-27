import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function AddProduct() {
    const [productName, setProductName] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [resalePrice, setResalePrice] = useState('');
    const [condition, setCondition] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState('');

    const { user } = useContext(AuthContext);

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const imgData = e.target.imgfile.files[0];
        const formData = new FormData();
        formData.append('image', imgData);

        const posted = Date.now();

        const reqObject = {
            productName,
            originalPrice,
            resalePrice,
            condition,
            phone,
            location,
            category,
            year,
            posted,
            uId: user?.uid,
        };

        const imgbbUrl = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imageHostKey}`;
        fetch(imgbbUrl, {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                res.json().then((upRes) => {
                    if (upRes?.success) {
                        reqObject.photoURL = upRes?.data?.url;

                        fetch('http://localhost:5000/add-products', {
                            method: 'POST',
                            body: JSON.stringify(reqObject),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }).then((result) => {
                            result.json().then((result1) => {
                                if (result1?.success) {
                                    toast.success('Product added!', {
                                        position: toast.POSITION.TOP_RIGHT,
                                        autoClose: 1000,
                                    });
                                } else {
                                    toast.error(result?.message, {
                                        position: toast.POSITION.TOP_RIGHT,
                                        autoClose: 1000,
                                    });
                                }
                            });
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

        setCategory('');
        setCondition('');
        setLocation('');
        setProductName('');
        setOriginalPrice('');
        setResalePrice('');
        setYear('');
        setPhone('');
    };

    return (
        <div
            className="tab-pane fade show active"
            id="v-pills-add-product"
            role="tabpanel"
            aria-labelledby="v-pills-add-product-tab"
        >
            <div className="container-fluid" id="add-products-content">
                <form onSubmit={handleOnSubmit} id="add-product-form">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            id="title"
                            required
                        />
                        <label className="form-label" htmlFor="title">
                            Product Name
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="originalPrice"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            id="originalPrice"
                            required
                        />
                        <label className="form-label" htmlFor="originalPrice">
                            Original Price
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="resalePrice"
                            value={resalePrice}
                            onChange={(e) => setResalePrice(e.target.value)}
                            id="resalePrice"
                            required
                        />
                        <label className="form-label" htmlFor="resalePrice">
                            Resale Price
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="condition"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            id="condition"
                            required
                        />
                        <label className="form-label" htmlFor="condition">
                            Condition
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            required
                        />
                        <label className="form-label" htmlFor="phone">
                            Phone number
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            id="location"
                            required
                        />
                        <label className="form-label" htmlFor="location">
                            Location
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            id="category"
                            required
                        />
                        <label className="form-label" htmlFor="category">
                            Category
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            id="year"
                            required
                        />
                        <label className="form-label" htmlFor="year">
                            Usage Year(eg. 1, 2)
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control"
                            name="imgfile"
                            id="imgfile"
                            required
                        />
                    </div>
                    <button type="submit" className="btn product-add-btn">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}
