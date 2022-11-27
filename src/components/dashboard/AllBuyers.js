import userImage from '../../assets/user.png';

export default function AllBuyers() {
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
                        {/* <!-- First Row --> */}
                        <tr>
                            <td>
                                <img src={userImage} alt="user" />
                            </td>
                            <td>Mahfuz</td>
                            <td>mahfuz@gmail.com</td>
                            <td>
                                <button type="button" className="btn create-advirtise-btn">
                                    Delete
                                </button>
                            </td>
                        </tr>

                        {/* <!-- second row --> */}
                        <tr>
                            <td>
                                <img src={userImage} alt="user" />
                            </td>
                            <td>Mahfuz</td>
                            <td>mahfuz@gmail.com</td>
                            <td>
                                <button type="button" className="btn create-advirtise-btn">
                                    Delete
                                </button>
                            </td>
                        </tr>

                        {/* <!-- third row --> */}
                        <tr>
                            <td>
                                <img src={userImage} alt="user" />
                            </td>
                            <td>Mr. X</td>
                            <td>mahfuz@gmail.com</td>
                            <td>
                                <button type="button" className="btn admin-user-btn">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
