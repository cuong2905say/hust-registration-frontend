import PropTypes from "prop-types";
import "../../css/registration.css";
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import TableTest from "./table-list-class-registed.jsx";
import {getRegistedClass} from "../../api/student-api.js";

const Registration = (props) => {
    const [text, setText] = useState("");


    const handleChangeTextClassId = (e) => {
        props.onChangeTextField(e)
        setText(e.target.value);
    };


    const [dataClassRegisted, setDataClassRegisted] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setDataClassRegisted(await getRegistedClass('20231'))
        }
        fetchData();
    }, []);

    return (
        <div className={`registration`}>
            <button className="container-trang-dang-ki-sv">
                <b className="registration-input">TRANG ĐĂNG KÝ SINH VIÊN</b>
            </button>
            <div className="class-input">
                <div className="registered-classes">
                    <div className="table-title">Đăng ký mã lớp</div>
                </div>
                <div className="textfield-class-id">
                    <input className="text" type="number" onChange={e => handleChangeTextClassId(e)} required/>
                </div>
                <Button disabled={!text}>
                    <div className="button-register-class">
                        <div className="k-lp"> Đăng ký lớp</div>
                    </div>
                </Button>
            </div>
            <div className="registered-classes1">
                <TableTest jsonData={dataClassRegisted}/>
            </div>
        </div>
    );
};

Registration.propTypes = {
    className: PropTypes.string,
};

export default Registration;
