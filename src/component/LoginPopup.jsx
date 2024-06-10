import {useState} from "react";
import {login} from "../api/AuthApi.js";
import {useNavigate} from "react-router-dom";
import {Box, Button, Divider, Icon, Link, Modal, TextField, Typography,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "#AA1D2B",
    borderRadius: "5px",
    boxShadow: 24,
};

function LoginPopup({showPopup, closePopup}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const data = await login(email, password);
        if (data) {
            navigate("/register-class");
        }
    };

    return (
        <Modal
            open={showPopup}
            onClose={closePopup}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 20px 10px 20px",
                    }}
                >
                    <Typography color="white" fontSize={20}>
                        Đăng nhập
                    </Typography>
                    <Button>
                        <CloseIcon sx={{color: "white"}} onClick={closePopup}/>
                    </Button>
                </Box>
                <Divider color="white"/>
                <Typography
                    textAlign="center"
                    color="white"
                    fontSize={18}
                    marginTop="15px"
                >
                    Đăng nhập bằng tài khoản Office 365 (email trường)
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            margin: "20px 0 20px 0",
                            color: "red",
                            bgcolor: "white",
                            borderRadius: "20px",
                            fontWeight: "bold",
                        }}
                    >
                        <img src={"https://qldt.hust.edu.vn/images/office-365.svg"} style={{width:'15px', marginRight:'5px'}} alt={''}></img>
                        Office 365
                    </Button>
                </Box>
                <Link
                    href="/forgot-password"
                    sx={{
                        color: "white",
                        textDecorationColor: "white",
                    }}
                >
                    <Typography textAlign="center" fontSize={14}>
                        Quên mật khẩu?
                    </Typography>
                </Link>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                        type="email"
                        label="Tài khoản đăng nhập"
                        value={email}
                        size="small"
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                        margin="normal"
                        sx={{
                            backgroundColor: "inherit",
                            borderColor: 'white',
                            outlineColor:'white',
                            color: 'white',
                            borderRadius: "5px",
                            "& .MuiOutlinedInput-notchedOutline":{
                                borderColor:'white',
                                color:'white'
                            },

                            "& .MuiOutlinedInput-outlined":{
                                borderColor:'white',
                                color:'white'
                            },
                            input: {
                                color: 'white'
                            }
                        }}
                    />
                </Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                        type="password"
                        label="Mật khẩu đăng nhập"
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                        margin="normal"
                        sx={{
                            backgroundColor: "inherit",
                            borderColor: 'white',
                            outlineColor:'white',
                            color: 'white',
                            borderRadius: "5px",
                            "& .MuiOutlinedInput-notchedOutline":{
                                borderColor:'white',
                                color:'white'
                            },

                            "& .MuiOutlinedInput-outlined":{
                                borderColor:'white',
                                color:'white'
                            },
                            input: {
                                color: 'white'
                            }
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            marginRight: "15px",
                            backgroundColor: "white",
                        }}
                        onClick={handleLogin}
                    >
                        <Typography color="#AA1D2B" textTransform="none">
                            Đăng nhập
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        sx={{marginRight: "15px", backgroundColor: "white"}}
                        onClick={closePopup}
                    >
                        <Typography color="#AA1D2B" textTransform="none">
                            Huỷ
                        </Typography>
                    </Button>
                </Box>
                <Link
                    href="/forgot-password"
                    sx={{
                        color: "white",
                        textDecorationColor: "white",
                    }}
                >
                    <Typography
                        textAlign="center"
                        fontSize={14}
                        marginTop="20px"
                        marginBottom="40px"
                    >
                        Quên mật khẩu?
                    </Typography>
                </Link>
            </Box>
        </Modal>
    );
}

export default LoginPopup;
