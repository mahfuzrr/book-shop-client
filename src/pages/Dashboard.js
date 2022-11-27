import { useContext } from 'react';
import DashBoardFull from '../components/dashboard/DashBoardFull';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import NavBar from '../components/navbar/NavBar';
import { AuthContext } from '../context/UserContext';

export default function Dasbord() {
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <NavBar />
            <DashBoardFull />
            <Footer />
        </>
    );
}
