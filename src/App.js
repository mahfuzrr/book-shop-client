import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';
import Dasbord from './pages/Dashboard';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
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
                <Route path="/blog" element={<div>Blog</div>} />
                <Route
                    path="/category/:id"
                    element={
                        <PrivateRoute>
                            <Category />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<div>Error page</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
