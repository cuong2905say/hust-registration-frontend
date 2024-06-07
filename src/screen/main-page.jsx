import HeaderPanel from "../component/main-panel-class-registration-component/header-panel";
import LeftPanel from "../component/main-panel-class-registration-component/left-panel";
import Registration from "../component/main-panel-class-registration-component/registration";
import "../css/main-page.css";
import {useState} from "react";
import {AllClassesPopup} from "../component/popup-all-classes.jsx";

const MainPage = () => {
    const [currentClassId, setCurrentClassId] = useState('');
    const [isOpenAllClasses, setOpenAllClasses] = useState(false);

    const closeAllClassesPopup = ()=>setOpenAllClasses(false)
    const openAllClassesPopup =()=> setOpenAllClasses(true)


    const handleOnChangeTextField = (e) => {
        setCurrentClassId(e.target.value);
    }

    return (
        <div className="main-page">
            <HeaderPanel/>
            <section className="content">
                <LeftPanel closePopup = {closeAllClassesPopup} openPopup ={openAllClassesPopup}/>
                <section className="right-panel">
                    <Registration onChangeTextField={handleOnChangeTextField}/>
                </section>
            </section>
            {isOpenAllClasses?<AllClassesPopup />:null}
        </div>
    );
};

export default MainPage;
