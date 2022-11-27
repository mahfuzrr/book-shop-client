import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import Loader from './Loader';

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (user && user?.uid) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;

    // from logIn navigate => const from = location.state?.from?.pathaname || "/"; navigate(from, {replace: true});
}
