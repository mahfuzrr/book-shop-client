import { useContext } from 'react';
import CategoryAll from '../components/category/CatergoryAll';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import NavBar from '../components/navbar/NavBar';
import { AuthContext } from '../context/UserContext';

export default function Category() {
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <NavBar />
            <CategoryAll />
            <Footer />
        </>
    );
}
