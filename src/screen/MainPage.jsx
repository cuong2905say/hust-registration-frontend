import HeaderPanel from "../component/main-panel-class-registration-component/HeaderPanel.jsx";
import LeftPanel from "../component/main-panel-class-registration-component/LeftPanel.jsx";
import RightPanel from "../component/main-panel-class-registration-component/RightPanel.jsx";
import {useEffect, useState} from "react";
import {AllClassesPopup} from "../component/main-panel-class-registration-component/pop-up/PopupAllClass.jsx";
import {Box, Grid} from "@mui/material";
import {getAllClass} from "../api/PublicApi.js";
import {getMyInfo} from "../api/UserApi.js";
import {getStudentInfo} from "../api/AdminApi.js";

const MainPage = () => {
    const [isOpenAllClasses, setOpenAllClasses] = useState(false);

    const [studentInfo, setStudentInfo] = useState(undefined);

    const closeAllClassesPopup = () => setOpenAllClasses(false);
    const openAllClassesPopup = () => setOpenAllClasses(true);

    const [dataAllClass, setDataAllClass] = useState([]);

    const [semester, setSemester] = useState(
        localStorage.getItem("semester") || "20231"
    );
    const getInfo = async () => {
        const data = await getMyInfo()
        console.log(data)
        if (data.role === 'ROLE_STUDENT') setStudentInfo(data)
    }

    const getStudentInfoByAdmin = async (studentId)=>{
        const data = await getStudentInfo(studentId);
        setStudentInfo(data)
    }

    const fetchDataAllClasses = async () => {
        const data = await getAllClass(semester);

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

        const newData = data.map(item => {
            return {
                id: item.id,
                semester: item.semester + "-" + item.semesterType,
                maxStudent: item.maxStudent,
                theoryClassId: item.theoryClassId,
                classType: getClassTypeVietnamese(item.classType),
                status: item.status,
                courseId: item.courseId,
                timetables: item.timetables
            }
        })
        setDataAllClass(newData)
    }

    const fetchMetadataSemester = () => {
        // TODO: fetch semester
    }

    useEffect(() => {
        fetchMetadataSemester()
        getInfo()
        fetchDataAllClasses()
    }, [semester]);


    const handleChangeSemesterValue = (semester) => {
        setSemester(semester);
        localStorage.setItem("semester", semester);
    };

    return (
        <Box sx={{width: "100%"}}>
            <HeaderPanel name={studentInfo?studentInfo.name:'???'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <LeftPanel
                        openListClassPopup={openAllClassesPopup}
                        studentInfo={studentInfo}
                        fetchStudentDataByAdmin={getStudentInfoByAdmin}
                        semester={semester}
                    />
                </Grid>
                <Grid item xs={9}>
                    <RightPanel
                        handleChangeSemesterValue={handleChangeSemesterValue}
                        semester={semester}
                        dataAllClass={dataAllClass}
                        studentInfo={studentInfo}
                    />
                </Grid>
            </Grid>
            <AllClassesPopup
                onClosePopup={closeAllClassesPopup}
                showPopup={isOpenAllClasses}
                data={dataAllClass}
            />
        </Box>
    );
};

export default MainPage;
