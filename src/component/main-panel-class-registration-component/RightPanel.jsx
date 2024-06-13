import {Box, Button, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {SemesterSelector} from "./right-panel/SemesterSelector.jsx";
import TableListSchedule from "./right-panel/TableListSchedule.jsx";
import {
    AutoCompleteSelectClass,
    AutoCompleteSelectClassToChangeSimilar
} from "./right-panel/AutoCompleteSelectClass.jsx";
import {changeClassToSimilar, getRegistedClass, registerClass, unRegisterClass} from "../../api/StudentApi.js";
import TableListClassRegisted from "./right-panel/TableListClassRegisted.jsx";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from "@mui/icons-material/CheckCircle.js";
import {ToolTipChangeSimilarClass, ToolTipDeleteClass, ToolTipRegister} from "./pop-up/ToolTipText.jsx";
import {toast} from "react-toastify";

const RightPanel = ({
                        handleChangeSemesterValue,
                        semester,
                        dataAllClass,
                        studentInfo
                    }) => {
    const [selectedRowTableClassRegisted, setSelectedRowTableClassRegisted] = useState([])

    const [selectedClassIdToRegister, setSelectedClassIdToRegister] = useState([]);

    const [isOpenDialogChangeClassSimilar, setIsOpenDialogChangeClassSimilar] = useState(false);

    const [classIdToChangeToSimilar, setClassIdToChangeToSimilarClass] = useState(null);

    const [dataClassRegisted, setDataClassRegisted] = useState([])
    const handleClickButtonOpenBoxForChangeToSimilar = () => {
        setIsOpenDialogChangeClassSimilar(!isOpenDialogChangeClassSimilar)
    }

    const handleClickButtonChangeToSimilarClass = async ()=>{
        await changeClassToSimilar(semester,selectedRowTableClassRegisted[0].classId,classIdToChangeToSimilar)
        setIsOpenDialogChangeClassSimilar(!isOpenDialogChangeClassSimilar)
        toast.success('Thay đổi thành công lớp: ' + selectedRowTableClassRegisted[0].classId + ' -> ' + classIdToChangeToSimilar)
        await fetchDataClassRegisted(semester)
    }

    const onChangeSemesterValue = (e) => {
        handleChangeSemesterValue(e);
    };
    const fetchDataClassRegisted = async (semester) => {
        const data = await getRegistedClass(semester);

        const getClassTypeVietnamese = (type) => {
            switch (type) {
                case 'THEORY_EXERCISE':
                    return 'LT+BT'
                case 'EXERCISE':
                    return 'BT'
                case 'THEORY':
                    return 'LT'
                case 'EXPERIMENT':
                    return 'TN/TH'
            }
        }
        const newData = data.map((item) => {
            return {
                id: item.class.course.id + "-" + item.classId,
                courseId: item.class.course.id,
                courseName: item.class.course.courseName || item.class.course.courseNameE,
                credit: item.class.course.credit,
                need: item.class.course.needExperiment ? <CheckCircleIcon color="success"/> : "",
                classId: item.classId,
                theoryClassId: item.class.theoryClassId,
                classType: getClassTypeVietnamese(item.class.classType),
                updatedTime: item.updatedTime,
                status: item.class.status,
                updatedById: item.updatedById,
            };
        });
        setDataClassRegisted([])
        setDataClassRegisted(newData);
    };

    useEffect(() => {
        fetchDataClassRegisted(semester)
    }, [semester]);

    useEffect(() => {
        // Đóng text nếu có bất kì thay đổi nào
        setIsOpenDialogChangeClassSimilar(false)
        setClassIdToChangeToSimilarClass(null)
    }, [selectedRowTableClassRegisted,semester,studentInfo]);

    const handleClickButtonRegistedClass = async () => {
        await registerClass(semester, selectedClassIdToRegister)
        await fetchDataClassRegisted(semester)
    }

    const handleClickButtonDeleteClass = async () => {
        await unRegisterClass(semester, selectedRowTableClassRegisted.map(cl => cl.classId))
        await fetchDataClassRegisted(semester)
    }

    return (
        <Box sx={{marginTop: "10px", paddingRight: "15px"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography textAlign="left" fontWeight="bold" fontSize="20px">
                    TRANG ĐĂNG KÝ SINH VIÊN
                </Typography>
                <SemesterSelector
                    value={semester}
                    onChangeValue={e => onChangeSemesterValue(e.target.value)}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>

                <Typography marginRight="10px">Đăng ký mã lớp</Typography>
                <AutoCompleteSelectClass
                    value={selectedClassIdToRegister}
                    handleChangeListClassIdSelected={setSelectedClassIdToRegister}
                    dataAllClass={dataAllClass}
                />
                <Button
                    variant="text"
                    disabled={selectedClassIdToRegister.length === 0}
                    onClick={handleClickButtonRegistedClass}
                >
                    Đăng ký lớp
                </Button>
                <ToolTipRegister/>
            </Box>
            <TableListClassRegisted
                dataClassRegisted={dataClassRegisted}
                setSelectedRowTableClassRegisted={setSelectedRowTableClassRegisted}
                studentInfo={studentInfo}
            />
            <Box
                sx={{
                    margin: "20px auto",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <Box>

                    <Button
                        disabled={selectedRowTableClassRegisted.length === 0}
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleClickButtonDeleteClass}>
                        Xoá các lớp đã chọn
                    </Button>
                    <ToolTipDeleteClass/>
                </Box>
                <Box sx={{justifyContent:"center"}}>
                    {isOpenDialogChangeClassSimilar ?
                        <Box
                            sx={{display:"flex"}}
                            open={isOpenDialogChangeClassSimilar&& selectedRowTableClassRegisted.length===1}>
                            <AutoCompleteSelectClassToChangeSimilar
                                selectedClassInRegistedTable={selectedRowTableClassRegisted[0]}
                                dataAllClass={dataAllClass}
                                onChangeClassId={setClassIdToChangeToSimilarClass}
                            />
                            <Button
                                onClick={handleClickButtonChangeToSimilarClass}
                            >
                                Thay đổi lớp
                            </Button>
                        </Box>:<></>
                    }
                    <Button
                        onClick={handleClickButtonOpenBoxForChangeToSimilar}
                        sx={{marginLeft: 1}}
                        size='small'
                        disabled={selectedRowTableClassRegisted.length !== 1 || selectedRowTableClassRegisted[0].classType === 'LT'}
                        variant="contained"
                        color='secondary'>
                        Thay đổi lớp đã chọn
                    </Button>
                    <ToolTipChangeSimilarClass/>
                </Box>
            </Box>
            <Typography
                textAlign="left"
                fontWeight="bold"
                fontSize="20px"
                marginBottom="20px"
            >
                Thời khóa biểu các lớp đã đăng ký
                <Button>
                    <ChangeCircleIcon/>
                </Button>
            </Typography>
            <Box></Box>
        </Box>
    )
        ;
};

export default RightPanel;
