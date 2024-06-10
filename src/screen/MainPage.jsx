import HeaderPanel from "../component/main-panel-class-registration-component/HeaderPanel.jsx";
import LeftPanel from "../component/main-panel-class-registration-component/LeftPanel.jsx";
import RightPanel from "../component/main-panel-class-registration-component/RightPanel.jsx";
import {useEffect, useState} from "react";
import { AllClassesPopup } from "../component/main-panel-class-registration-component/pop-up/PopupAllClass.jsx";
import { Box, Grid } from "@mui/material";
import {getAllClass} from "../api/PublicApi.js";

const MainPage = () => {
  const [isOpenAllClasses, setOpenAllClasses] = useState(false);

  const [currentStudent,setCurrentStudent] = useState(null);

  const closeAllClassesPopup = () => setOpenAllClasses(false);
  const openAllClassesPopup = () => setOpenAllClasses(true);

  const [dataAllClass, setDataAllClass] = useState([]);


  const [semester, setSemester] = useState(
    localStorage.getItem("semester") || "20231"
  );

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

    const newData = data.map(item=>{
      return {
        id:item.id,
        semester:item.semester+"-"+item.semesterType,
        maxStudent:item.maxStudent,
        theoryClassId:item.theoryClassId,
        classType:getClassTypeVietnamese(item.classType),
        status:item.status,
        courseId:item.courseId,
        timetables:item.timetables
      }
    })
    setDataAllClass(newData)
  }

  useEffect(() => {
    fetchDataAllClasses()
  }, []);


  const handleChangeSemesterValue = (e) => {
    setSemester(e.target.value);
    localStorage.setItem("semester", e.target.value);
  };

  const handleChangeStudentId = (e)=>{
    console.log(e)
  }


  return (
    <Box sx={{ width: "100%" }}>
      <HeaderPanel />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <LeftPanel
            openListClassPopup={openAllClassesPopup}
            onChangeStudentId={handleChangeStudentId}
          />
        </Grid>
        <Grid item xs={9}>
          <RightPanel
            globalOnChangeSemesterValue={handleChangeSemesterValue}
            semester={semester}
            dataAllClass={dataAllClass}
          />
        </Grid>
      </Grid>
      <AllClassesPopup
        onClosePopup={closeAllClassesPopup}
        showPopup={isOpenAllClasses}
        data = {dataAllClass}
      />
    </Box>
  );
};

export default MainPage;
