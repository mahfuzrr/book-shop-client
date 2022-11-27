import { useNavigate } from 'react-router-dom';
import notFoundImage from '../assets/notFound.svg';

export default function NotFound() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };
    return (
        <div className="container-fluid" id="q-404-body">
            <div className="container-fluid d-md-flex overflow-hidden">
                <div className="container" id="notFound-left">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p className="m-0">Your requested page is not found!</p>
                    <button
                        className="btn mt-4"
                        type="button"
                        id="notFound-button"
                        onClick={handleNavigate}
                    >
                        Back to home
                    </button>
                </div>
                <div className="container" id="notFound-right">
                    <img className="img-fluid" src={notFoundImage} alt="404" />
                </div>
            </div>
        </div>
    );
}
