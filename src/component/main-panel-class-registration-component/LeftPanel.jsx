import {Box, Link, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import TableListCourseRegisted from "./left-panel/TableListCourseRegisted.jsx";

const LeftPanel = ({openListClassPopup, onChangeStudentId}) => {
    const [studentId, setChangeStudentId] = useState("20204524");

    const handleChangeStudentId = (e) => {
        setChangeStudentId(e.target.value);
    };

    return (
        <Box sx={{marginTop: "20px", paddingLeft: "15px"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <StarOutlineIcon/>
                <Typography fontSize="14px">
                    Mã sinh viên :
                </Typography>
                {
                    localStorage.getItem('ROLE') === 'ROLE_ADMIN' ?
                        <TextField
                            onChange={handleChangeStudentId}
                            type="number"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onChangeStudentId(studentId);
                                }
                            }}
                            size="small"
                            style={{padding: "0px", marginLeft: "10px"}}
                        />
                        :
                        <Typography fontSize="14px" fontWeight={"bold"}>
                            {'20' + localStorage.getItem('email').split('@')[0].slice(-6)}
                        </Typography>
                }
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <StarOutlineIcon/>
                <Typography
                    fontSize="14px"
                >{`Họ và tên sinh viên: `}
                </Typography>

                <Typography fontSize="14px" fontWeight={"bold"}>
                    {localStorage.getItem('')}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <StarOutlineIcon/>
                <Typography
                    fontSize="14px"
                    fontWeight="bold"
                >{`Lớp sinh viên:  Khoa học máy tính 04 - K65`}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <StarOutlineIcon/>
                <Typography
                    fontSize="14px"
                    fontWeight="bold"
                >{`Số tín chỉ tối đa: 20`}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <StarOutlineIcon/>
                <Link fontSize="14px" fontWeight="bold" onClick={openListClassPopup}>
                    Thông tin danh sách lớp mở
                </Link>
            </Box>
            <TableListCourseRegisted studentEmail='a'/>
        </Box>
    );
};
export default LeftPanel;
