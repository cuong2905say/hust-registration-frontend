import './App.css'
import {Route, Routes} from "react-router-dom";
import Error from "./screen/error.jsx";
import LandingPage from "./screen/landing-page.jsx";
// import MessagePopup from "./component/message_popup.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route path="/error" element={<Error/>}/>
                {/*<Route path="/login" element={<LoginPopup/>}/>*/}


            </Routes>
            {/*<MessagePopup statusCode ='123' message = '123' >*/}

            {/*</MessagePopup>*/}
            <ToastContainer/>
        </>
    )
}

export default App
