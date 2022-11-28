/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookImage from '../../assets/bookImage.jpg';

export default function Category() {
    const [category, setCategory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://book-server-six.vercel.app/get-all-category', {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token'),
            },
        })
            .then((data) => {
                data.json().then((result) => {
                    if (result?.success) {
                        setCategory(result?.message);
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleNavigate = (id) => {
        navigate(`/category/${id}`);
    };

    return (
        <div className="container overflow-auto pb-5" id="category-section">
            <div className="container" id="category-section-all">
                <h5 className="mb-5">Categories</h5>
                <div className="container row gap-4" id="category-section-contents">
                    {category.map((data) => (
                        <div
                            key={data._id}
                            className="container p-0 d-flex flex-column category-section-single-card"
                            role="presentation"
                            onClick={() => handleNavigate(data._id)}
                        >
                            <div className="container-fluid p-0 category-section-card-image">
                                <img className="img-fluid" src={bookImage} alt="book" />
                            </div>
                            <div className="container category-section-card-text">
                                <p className="m-0">{capitalizeFirstLetter(data?.categoryName)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
