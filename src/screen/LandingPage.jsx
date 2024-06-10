import React from "react";
import LoginPopup from "../component/LoginPopup.jsx";
import {Box, Button} from "@mui/material";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
        };
    }

    openPopup = () => {
        this.setState({showPopup: true});
    };

    closePopup = () => {
        this.setState({showPopup: false});
    };

    handleOnClick = () => {
        this.openPopup();
    };

    render() {
        const css = {
            backgroundImage: `url(assets/background.jpeg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
        };

        return (
            <Box style={css}>
                <Box sx={{display: "flex", justifyContent: "flex-end" ,padding:5}}>
                    <Button onClick={this.handleOnClick} variant={"outlined"} sx={{color:'white', borderColor: 'white',}}>
                        Đăng nhập
                    </Button>
                </Box>

                <LoginPopup
                    closePopup={this.closePopup}
                    showPopup={this.state.showPopup}
                />
            </Box>
        );
    }
}

export default LandingPage;
