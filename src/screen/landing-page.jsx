import {MDBBtn, MDBContainer} from "mdb-react-ui-kit";
import LoginPopup from "../component/login-popup.jsx";
import {Popup} from 'reactjs-popup';
function LandingPage(){
    return (

        <MDBContainer >
            <h1>
                This is the landing page
            </h1>

            <Popup modal trigger={<MDBBtn>Đăng nhập</MDBBtn>}>
                <LoginPopup></LoginPopup>
            </Popup>

        </MDBContainer>
    )
}

export default LandingPage;