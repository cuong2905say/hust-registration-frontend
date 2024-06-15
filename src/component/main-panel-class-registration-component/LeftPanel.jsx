import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import TableListCourseRegisted from "./left-panel/TableListCourseRegisted.jsx";


const LeftPanel = (props) => {
    const {
        openListClassPopup = null,
        studentInfo = null,
        fetchStudentData = null,
        semester = '20231'
    } = props

    const [studentId, setChangeStudentId] = useState("20204524");
    const handleChangeStudentId = (e) => {
        setChangeStudentId(e.target.value);
    };

    if (studentInfo === null)
        return (<></>)
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
                                    fetchStudentData(studentId)
                                }
                            }}
                            size="small"
                            style={{padding: "0px", marginLeft: "10px"}}
                        />
                        :
                        <Typography fontSize="14px" fontWeight={"bold"}>
                            {'20' + studentInfo.email.split('@')[0].slice(-6)}
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
                    {studentInfo.name || 'Nguyễn Mạnh Cường'}
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
                >{`Lớp sinh viên : `}</Typography>

                <Typography
                    fontSize="14px"
                    fontWeight="bold"
                >{studentInfo.studentClassName || ` Khoa học máy tính 04 - K65`}</Typography>
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
                >{`Số tín chỉ tối đa :`}</Typography>

                <Typography
                    fontSize="14px"
                    fontWeight="bold"
                >{studentInfo.maxCredit || `24`}</Typography>
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
