import HeaderPanel from "../component/main-panel-class-registration-component/HeaderPanel.jsx";
import LeftPanel from "../component/main-panel-class-registration-component/LeftPanel.jsx";
import RightPanel from "../component/main-panel-class-registration-component/RightPanel.jsx";
import {useEffect, useState} from "react";
import {AllClassesPopup} from "../component/main-panel-class-registration-component/pop-up/PopupAllClass.jsx";
import {Box, Grid} from "@mui/material";
import {getAllClass} from "../api/CommonApi.js";
import {getMyInfo} from "../api/UserApi.js";
import {getStudentInfo} from "../api/AdminApi.js";
import {getCurrentSemester, getMetadataSemester} from "../api/MetadataApi.js";
import * as Constant from "../util/constants/Constant.js";

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

    const fetchCurrentSemester = async ()=>{
        setSemester(await getCurrentSemester())
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

    const [startYear, setStartYear] = useState(null)
    const [startOfficialElitech, setStartOfficialElitech] = useState()
    const [endOfficialElitech, setEndOfficialElitech] = useState(null)
    const [startOfficialStandard, setStartOfficialStandard] = useState(null)
    const [endOfficialStandard, setEndOfficialStandard] = useState(null)
    const [startUnofficialElitech, setStartUnofficialElitech] = useState(null)
    const [endUnofficialElitech, setEndUnofficialElitech] = useState(null)
    const [startUnofficialStandard, setStartUnofficialStandard] = useState(null)
    const [endUnofficialStandard, setEndUnofficialStandard] = useState(null)
    const [startFree, setStartFree] = useState(null)
    const [endFree, setEndFree] = useState(null)

    const getCurrentStatusRegister = ()=>{
        const currentDate = new Date().toISOString()
        if(startOfficialElitech<=currentDate&&currentDate<=endOfficialElitech){
            return `ĐK chính thức: CT ELITECH ${startOfficialElitech} -> ${endOfficialElitech}`
        }else if(startOfficialStandard<=currentDate && currentDate<=endOfficialStandard){
            return `ĐK chính thức: CT Chuẩn ${startOfficialStandard} -> ${endOfficialStandard}`
        }else if(startUnofficialElitech<=currentDate && currentDate<=endUnofficialElitech){
            return `ĐK điều chỉnh: CT ELITECH ${startUnofficialElitech} -> ${endUnofficialElitech}`
        }else if(startUnofficialStandard<=currentDate && currentDate <= endUnofficialStandard){
            return `ĐK điều chỉnh: CT Chuẩn ${startUnofficialStandard} -> ${endUnofficialStandard}`
        }else if(startFree<=currentDate && currentDate<=endFree){
            return `ĐK tự do ${startFree} -> ${endFree}`
        }
        return 'Chưa đến giờ đăng kí'
    }

    const fetchMetadataSemester = async (currentSemester) => {
        const data = await getMetadataSemester(currentSemester)
        const jsonData = data.reduce((obj, item) => {
            obj[item.metadataPk.metadataKey] = item.value;
            return obj;
        }, {});
        setStartYear(jsonData[Constant.START_WEEK_1])
        setStartOfficialElitech(jsonData[Constant.START_REGISTER_CLASS_OFFICIAL_ELITECH])
        setEndOfficialElitech(jsonData[Constant.END_REGISTER_CLASS_OFFICIAL_ELITECH])
        setStartOfficialStandard(jsonData[Constant.START_REGISTER_CLASS_OFFICIAL_STANDARD])
        setEndOfficialStandard(jsonData[Constant.END_REGISTER_CLASS_OFFICIAL_STANDARD])
        setStartUnofficialElitech(jsonData[Constant.START_REGISTER_CLASS_UNOFFICIAL_ELITECH])
        setEndUnofficialElitech(jsonData[Constant.END_REGISTER_CLASS_UNOFFICIAL_ELITECH])
        setStartUnofficialStandard(jsonData[Constant.START_REGISTER_CLASS_UNOFFICIAL_STANDARD])
        setEndUnofficialStandard(jsonData[Constant.END_REGISTER_CLASS_UNOFFICIAL_STANDARD])
        setStartFree(jsonData[Constant.START_REGISTER_FREE])
        setEndFree(jsonData[Constant.END_REGISTER_FREE])
    }
    useEffect(() => {
        fetchCurrentSemester()
    }, []);

    useEffect(() => {
        fetchMetadataSemester(semester)
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
                        registerLabel = {getCurrentStatusRegister()}
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
