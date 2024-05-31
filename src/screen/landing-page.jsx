import {useNavigate} from "react-router-dom";
import React from "react";
import LoginPopup from "./login-popup.jsx";
import '../css/login-button-landing-page.css'

class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        };
    }
    openPopup = ()=>{
        this.setState({showPopup: true});
    }

    closePopup = ()=>{
        this.setState({showPopup: false});
    }


    handleOnClick = () =>{
        this.openPopup();
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
                {this.state.showPopup?<LoginPopup closePopup={this.closePopup}/>:<></>}
            </div>
        );
    }
}

export default LandingPage;