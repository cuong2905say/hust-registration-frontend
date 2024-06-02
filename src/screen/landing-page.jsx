import React from "react";
import LoginPopup from "./login-popup.jsx";
import '../css/login-button-landing-page.css'
import {getAllClass} from "../api/public-api.js";
import {getRegistedClass, getRegistedCourse, registerClass} from "../api/student-api.js";
import {getClassesByCourseId} from "../api/common-api.js";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        };
    }

    openPopup = () => {
        this.setState({showPopup: true});
    }

    closePopup = () => {
        this.setState({showPopup: false});
    }


    handleOnClick = () => {
        this.openPopup();
    }

    handleGetAllClass = async () => {
        console.log(await getAllClass('20231'))
    }

    handleGetRegistedCourse = async () => {
        console.log(await getRegistedCourse('20231'));
    }
    handleGetRegistedClass = async () => {
        console.log(await getRegistedClass('20231'));
    }
    handleRegisterclass = async () => {
        console.log(await registerClass('20231', '144999'));
    }
    handleGetClassByCourseId = async () => {
        console.log(await getClassesByCourseId('20231','TE3050'))
    }

    render() {
        const css = {
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(src/assets/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: 0,
            padding: 0
        };

        return (
            <div style={css}>
                <button onClick={this.handleOnClick} className='button'>Đăng nhập</button>
                <button onClick={this.handleGetAllClass}>Get All Classes</button>
                <button onClick={this.handleGetRegistedCourse}>Get Registed Course</button>
                <button onClick={this.handleGetRegistedClass}>Get Registed Class</button>
                <button onClick={this.handleRegisterclass}>Register Class</button>
                <button onClick={this.handleGetClassByCourseId}>Get Classes By Course Id</button>

                {this.state.showPopup ? <LoginPopup closePopup={this.closePopup}/> : <></>}
            </div>
        );
    }
}

export default LandingPage;