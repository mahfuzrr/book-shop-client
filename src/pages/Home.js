import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Advertise from '../components/home/Advertise';
import Banner from '../components/home/Banner';
import Category from '../components/home/Category';
import ExtraSection from '../components/home/ExtraSection';
import Loader from '../components/Loader';
import NavBar from '../components/navbar/NavBar';
import { AuthContext } from '../context/UserContext';

export default function Home() {
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <NavBar />
            <ToastContainer />
            <Banner />
            <Category />
            <Advertise />
            <ExtraSection />
            <Footer />
        </>
    );
}
