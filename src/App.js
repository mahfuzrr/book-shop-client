import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Blog from './pages/Blog';
import Category from './pages/Category';
import Dasbord from './pages/Dashboard';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Payment from './pages/Payment';
import SignUp from './pages/SignUp';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dasbord />
                        </PrivateRoute>
                    }
                />
                <Route path="/blog" element={<Blog />} />
                <Route
                    path="/category/:id"
                    element={
                        <PrivateRoute>
                            <Category />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/payment/:bookid"
                    element={
                        <PrivateRoute>
                            <Payment />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
