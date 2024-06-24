import "./App.css";
import {Route, Routes} from "react-router-dom";
import Error from "./screen/Error.jsx";
import LandingPage from "./screen/LandingPage.jsx";
import MainPage from "./screen/MainPage.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/register-class" element={<MainPage/>}></Route>
                <Route path="/error" element={<Error/>}/>
                    {/*<Route path="/login" element={<LoginPopup/>}/>*/}
            </Routes>
            {/*<MessagePopup statusCode ='123' message = '123' >*/}

            {/*</MessagePopup>*/}
            <ToastContainer/>
        </>
    );
};

export default App;
