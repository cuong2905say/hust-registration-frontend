import './App.css'
import LoginPopup from "./component/login-popup.jsx";
import {Route, Routes} from "react-router-dom";
import Error from "./screen/error.jsx";
import LandingPage from "./screen/landing-page.jsx";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route path="/error" element={<Error/>}/>
            <Route path="/login" element={<LoginPopup/>}/>
        </Routes>
    )
}

export default App
