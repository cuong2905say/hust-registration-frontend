import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import TableListCourseRegisted from "./left-panel/TableListCourseRegisted.jsx";


const LeftPanel = (props) => {
    const {
        openListClassPopup = null,
        studentInfo = undefined,
        fetchStudentDataByAdmin = null,
        semester = '20231'
    } = props

    const [studentId, setChangeStudentId] = useState('');
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
                    Mã SV
                </Typography>
                {
                    localStorage.getItem('role') === 'ROLE_ADMIN' ?
                        <TextField
                            onChange={handleChangeStudentId}
                            type="tel"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    fetchStudentDataByAdmin(studentId)
                                }
                            }}
                            size="small"
                            style={{padding: "0px", marginLeft: "5px"}}
                        />
                        :
                        <Typography
                            fontSize="14px"
                            fontWeight={"bold"}
                            sx={{ml:'5px'}}
                        >
                            {studentInfo ? '20' + studentInfo.email.split('@')[0].slice(-6) : '???'}
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
                >{`Họ và tên `}
                </Typography>

                <Typography
                    fontSize="14px"
                    fontWeight={"bold"}
                    sx={{ml:'5px'}}
                >
                    {studentInfo ? studentInfo.name : '???'}
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
                >{`Lớp sinh viên  `}</Typography>

                <Typography
                    sx={{ml:'5px'}}
                    fontSize="14px"
                    fontWeight="bold"
                >{studentInfo ? studentInfo.studentClassName : '???'}</Typography>
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
                >{`Số tín chỉ tối đa `}</Typography>

                <Typography
                    fontSize="14px"
                    fontWeight="bold"
                    sx={{ml:'5px'}}
                >{studentInfo ? studentInfo.maxCredit : '???'}</Typography>
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
                <Button fontSize="14px" fontWeight="bold" onClick={openListClassPopup}>
                    Thông tin danh sách lớp mở
                </Button>
            </Box>
            <TableListCourseRegisted studentInfo={studentInfo} semester={semester}/>
        </Box>
    );
};
export default LeftPanel;
