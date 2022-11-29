import { ToastContainer } from 'react-toastify';
import LogImage from '../../assets/Mobile login-cuate.svg';
import LogLeft from './LogLeft';

export default function LogInBoth() {
    return (
        <div className="container-fluid overflow-hidden mt-1" id="login-content">
            <ToastContainer />
            <div className="container d-flex" id="full-login">
                <LogLeft />
                <div className="container" id="right-login">
                    <img className="img-fluid" src={LogImage} alt="logIn" />
                </div>
            </div>
        </div>
    );
}
