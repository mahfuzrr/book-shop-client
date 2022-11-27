/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../../context/UserContext';
import useRole from '../useRole';
import AddProduct from './AddProduct';
import AllBuyers from './AllBuyers';
import AllSeller from './AllSeller';
import MyOrders from './MyOrders';
import MyProduct from './MyProduct';
import ReportedItem from './ReportedItem';

export default function DashBoardFull() {
    const { user } = useContext(AuthContext);
    const [role] = useRole(user.uid);

    let mainComp = '';
    let buttonComp = '';

    if (role === 'buyer') {
        buttonComp = (
            <button
                className="nav-link active"
                id="v-pills-myorders-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-myorders"
                type="button"
                role="tab"
                aria-controls="v-pills-myorders"
                aria-selected="false"
            >
                My Orders
            </button>
        );
        mainComp = <MyOrders />;
    } else if (role === 'seller') {
        buttonComp = (
            <>
                <button
                    className="nav-link active"
                    id="v-pills-add-product-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-add-product"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-add-product"
                    aria-selected="true"
                >
                    Add a product
                </button>
                <button
                    className="nav-link"
                    id="v-pills-my-product-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-my-product"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-my-product"
                    aria-selected="false"
                >
                    My products
                </button>
                <button
                    className="nav-link"
                    id="v-pills-change-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-change"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-change"
                    aria-selected="false"
                >
                    My buyers
                </button>
            </>
        );

        mainComp = (
            <>
                <AddProduct />
                <MyProduct />
            </>
        );
    } else if (role === 'admin') {
        buttonComp = (
            <>
                <button
                    className="nav-link active"
                    id="v-pills-all-seller-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-all-seller"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-all-seller"
                    aria-selected="true"
                >
                    All Sellers
                </button>
                <button
                    className="nav-link"
                    id="v-all-buyer-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-all-buyer"
                    type="button"
                    role="tab"
                    aria-controls="v-all-buyer"
                    aria-selected="false"
                >
                    All Buyers
                </button>
                <button
                    className="nav-link"
                    id="v-reported-item-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-reported-item"
                    type="button"
                    role="tab"
                    aria-controls="v-reported-item"
                    aria-selected="false"
                >
                    Reported Items
                </button>
            </>
        );

        mainComp = (
            <>
                <AllSeller />
                <AllBuyers />
                <ReportedItem />
            </>
        );
    }

    return (
        <div className="conatiner min-vh-100 overflow-hidden" id="dashboard">
            <ToastContainer />
            <div className="container" id="dashboard-all-content">
                <div className="d-flex align-items-start" id="dashboard-responsive">
                    <div
                        className="nav flex-column nav-pills me-3"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                    >
                        {buttonComp}
                    </div>
                    <div className="tab-content" id="v-pills-tabContent">
                        {mainComp}
                    </div>
                </div>
            </div>
        </div>
    );
}
