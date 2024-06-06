import HeaderPanel from "../component/main-panel-class-registration-component/header-panel";
import LeftPanel from "../component/main-panel-class-registration-component/left-panel";
import Registration from "../component/main-panel-class-registration-component/registration";
import DeleteButton from "../component/main-panel-class-registration-component/delete-button";
import "../css/main-page.css";
import {useState} from "react";

const MainPage = () => {
    const [currentClassId, setCurrentClassId] = useState('');

    const handleOnChangeTextField = (e)=>{
        setCurrentClassId(e.target.value);
    }

    return (
        <div className="main-page">
            <HeaderPanel/>
            <section className="content">
                <LeftPanel/>
                <section className="right-panel">
                    <Registration onChangeTextField={handleOnChangeTextField}/>
                    <DeleteButton/>
                </section>
            </section>
        </div>
    );
};

export default MainPage;
