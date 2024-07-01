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

    const getFormatedDate = (isoDateString) =>{
        const date = new Date(isoDateString);

        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng được tính từ 0 nên cần +1
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${hours}:${minutes} ${year}-${month}-${day}`
    }

    const toIso8601AsUTC7 = (date)=>{
        date.setHours(date.getHours()+7);
        return date.toISOString()
    }

    const getCurrentStatusRegister = ()=>{
        const currentDateString = toIso8601AsUTC7(new Date());
        if(startOfficialElitech<=currentDateString&&currentDateString<=endOfficialElitech){
            return `ĐK chính thức: CT ELITECH ${getFormatedDate(startOfficialElitech)} -> ${getFormatedDate(endOfficialElitech)}`
        }else if(startOfficialStandard<=currentDateString && currentDateString<=endOfficialStandard){
            return `ĐK chính thức: CT Chuẩn ${getFormatedDate(startOfficialStandard)} -> ${getFormatedDate(endOfficialStandard)}`
        }else if(startUnofficialElitech<=currentDateString && currentDateString<=endUnofficialElitech){
            return `ĐK điều chỉnh: CT ELITECH ${getFormatedDate(startUnofficialElitech)} -> ${getFormatedDate(endUnofficialElitech)}`
        }else if(startUnofficialStandard<=currentDateString && currentDateString <= endUnofficialStandard){
            return `ĐK điều chỉnh: CT Chuẩn ${getFormatedDate(startUnofficialStandard)} -> ${getFormatedDate(endUnofficialStandard)}`
        }else if(startFree<=currentDateString && currentDateString<=endFree){
            return `ĐK tự do ${getFormatedDate(startFree)} -> ${getFormatedDate(endFree)}`
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
