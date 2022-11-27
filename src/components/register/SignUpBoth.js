import { ToastContainer } from 'react-toastify';
import SignUpImage from '../../assets/Sign up-pana.svg';
import SignUpLeft from './SignUpLeft';

export default function SignUpBoth() {
    return (
        <div className="container-fluid overflow-hidden" id="signup-content">
            <ToastContainer />
            <div className="container d-flex" id="full-signup">
                <SignUpLeft />
                <div className="container" id="right-signup">
                    <img className="img-fluid" src={SignUpImage} alt="signup" />
                </div>
            </div>
        </div>
    );
}
