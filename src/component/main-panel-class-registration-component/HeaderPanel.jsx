import {Box, Button, Typography} from "@mui/material";
import {logout} from "../../api/AuthApi.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const HeaderPanel = ({name}) => {
    const navigate = useNavigate();

    const handleClickLogout = () => {
        logout();
        toast.clearWaitingQueue();
        toast.success("Đăng xuất thành công");
        navigate("/");
    };

    return (
        <Box
            sx={{
                bgcolor: "#AA1D2B",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                padding: "10px 20px 10px 20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <img
                        alt=""
                        src="/image-4@2x.png"
                        width="50px"
                        height="50px"
                    />
                </Box>
                <Box sx={{marginLeft: "10px"}}>
                    <Typography fontWeight="bold" fontSize="18px">
                        ĐẠI HỌC BÁCH KHOA HÀ NỘI
                    </Typography>
                    <Typography textAlign="left">HỆ THỐNG QUẢN TRỊ ĐẠI HỌC TRỰC TUYẾN</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                }}
            >
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Typography sx = {{marginRight:'20px'}}>{name}</Typography>
                    <Button
                        style={{
                            backgroundColor: "white",
                            color: "#AA1D2B",
                            // marginLeft: "20px",
                            // marginBottom: "20px",
                        }}
                        onClick={handleClickLogout}
                    >
                        Đăng xuất
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
export default HeaderPanel;
