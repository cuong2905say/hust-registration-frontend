import React from "react";
import LoginPopup from "./login-popup.jsx";
import '../css/login-button-landing-page.css'
import {getAllClass} from "../api/public-api.js";
import {getRegistedClass, getRegistedCourse, registerClass} from "../api/student-api.js";
import {getClassesByCourseId} from "../api/common-api.js";
import {getClassStudentRegisted, getCourseStudentRegisted} from "../api/admin-api.js";

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
        console.log(await getClassesByCourseId('20231', 'TE3050'))
    }

    handleGetClassByStudentEmailOfAdmin = async() => {
        console.log(await getClassStudentRegisted('a','20231'))
    }

    handleGetCourseByStudentEmailOfAdmin = async() => {
        console.log(await getCourseStudentRegisted('a','20231'))
    }

    render() {
        const css = {
            backgroundImage: `url(assets/background.jpeg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height:"100vh",
            width:"100vw"
        };

        return (
            <div style={css}>
                <button onClick={this.handleOnClick} className='button'>Đăng nhập</button>
                <button onClick={this.handleGetAllClass}>Get All Classes</button>
                <button onClick={this.handleGetRegistedCourse}>Get Registed Course</button>
                <button onClick={this.handleGetRegistedClass}>Get Registed Class</button>
                <button onClick={this.handleRegisterclass}>Register Class</button>
                <button onClick={this.handleGetClassByCourseId}>Get Classes By Course Id</button>
                <button onClick={this.handleGetClassByStudentEmailOfAdmin}>Get Classes Registed By Student</button>
                <button onClick={this.handleGetCourseByStudentEmailOfAdmin}>Get Courses Registed By Student</button>
                {this.state.showPopup ? <LoginPopup closePopup={this.closePopup}/> : <></>}
            </div>
        );
    }
}

export default LandingPage;