import {Box, Button, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {SemesterSelector} from "./right-panel/SemesterSelector.jsx";
import TableListSchedule from "./right-panel/TableListSchedule.jsx";
import {TextFieldAddClass} from "./right-panel/TextFieldAddClass.jsx";
import {getRegistedClass, registerClass, unRegisterClass} from "../../api/StudentApi.js";
import TableListClassRegisted from "./right-panel/TableListClassRegisted.jsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle.js";

const RightPanel = ({
                        globalOnChangeSemesterValue,
                        semester,
                        dataAllClass
                    }) => {
    const [selectedRowTableClassRegisted,setSelectedRowTableClassRegisted] = useState([])

    const [selectedClassIdToRegister, setSelectedClassIdToRegister] = useState([]);

    const [dataClassRegisted, setDataClassRegisted] = useState([])

    const onChangeSemesterValue = (e) => {
        globalOnChangeSemesterValue(e);
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
                createdTime: item.createdTime,
                status: item.class.status,
                createdById: item.createdById,
            };
        });

        setDataClassRegisted(newData);
    };

    useEffect(() => {
        console.log(dataClassRegisted)
        fetchDataClassRegisted(semester)
    }, []);

    const handleClickButtonRegistedClass = async () => {
        await registerClass(semester, selectedClassIdToRegister)

        await fetchDataClassRegisted(semester)
        // setSelectedClassIdToRegister([])
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
                    onChangeValue={onChangeSemesterValue}
                    className={"selector-semester"}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>

                <Typography marginRight="10px">Đăng ký mã lớp</Typography>
                <TextFieldAddClass
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
            </Box>
            <TableListClassRegisted
                dataClassRegisted={dataClassRegisted}
                setSelectedRowTableClassRegisted={setSelectedRowTableClassRegisted}
            />
            <Box
                sx={{
                    margin: "20px auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button disabled={selectedRowTableClassRegisted.length===0} variant="contained" color="error" size="small" onClick={handleClickButtonDeleteClass}>
                    Xoá các lớp đã chọn
                </Button>
            </Box>
            <Typography
                textAlign="left"
                fontWeight="bold"
                fontSize="20px"
                marginBottom="20px"
            >
                Thời khóa biểu các lớp đã đăng ký
            </Typography>
            <TableListSchedule semester={"20231"}/>
        </Box>
    );
};

export default RightPanel;
