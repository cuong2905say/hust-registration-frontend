import HeaderPanel from "../component/main-panel-class-registration-component/HeaderPanel.jsx";
import LeftPanel from "../component/main-panel-class-registration-component/LeftPanel.jsx";
import RightPanel from "../component/main-panel-class-registration-component/RightPanel.jsx";
import "../css/MainPage.css";
import {useState} from "react";
import {AllClassesPopup} from "../component/right-panel/PopupAllClass.jsx";

const MainPage = () => {
    const [currentClassId, setCurrentClassId] = useState('');
    const [isOpenAllClasses, setOpenAllClasses] = useState(false);

    const [studentId,setStudentId] = useState('20204524')

    const closeAllClassesPopup = ()=>setOpenAllClasses(false)
    const openAllClassesPopup =()=> setOpenAllClasses(true)

    const [semester, setSemester] = useState(localStorage.getItem('semester')||'20231');

    const handleOnChangeTextField = (e) => {
        setCurrentClassId(e.target.value);
    }

    const handleChangeSemesterValue = (e) => {
        setSemester(e.target.value);
        localStorage.setItem('semester', e.target.value);
    }

    const handleChangeStudentId = (e)=>{
        // setStudentId(e.target.value);
    }

    return (
        <div className="main-page">
            <HeaderPanel/>
            <section className="content">
                <LeftPanel
                    openListClassPopup={openAllClassesPopup}
                    onChangeStudentId={handleChangeStudentId}
                />
                <section className="right-panel">
                    <RightPanel
                        onChangeTextField={handleOnChangeTextField}
                        globalOnChangeSemesterValue={handleChangeSemesterValue}
                        semesterValue={semester}
                    />
                </section>
            </section>
            {isOpenAllClasses?<AllClassesPopup onClosePopup={closeAllClassesPopup}/>:null}
        </div>
    );
};

export default MainPage;
