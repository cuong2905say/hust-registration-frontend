import PropTypes from "prop-types";
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import TableTest from "./TableListClassRegisted.jsx";
import {SemesterSelector} from "../right-panel/SemesterSelector.jsx";

const RightPanel = ({
                        onChangeTextField,
                        globalOnChangeSemesterValue,
                        semesterValue}) => {
    const [text, setText] = useState("");

    const handleChangeTextClassId = (e) => {
        onChangeTextField(e)
        setText(e.target.value);
    };

    const onChangeSemesterValue = (e) => {
        globalOnChangeSemesterValue(e)
    }
    return (
        <div className={`registration`}>
            <SemesterSelector value = {semesterValue} onChangeValue={onChangeSemesterValue} className={'selector-semester'}/>
            <div className="container-trang-dang-ki-sv">
                <b className="text-trang-dk-sv">TRANG ĐĂNG KÝ SINH VIÊN</b>
            </div>
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
                <TableTest semester={'20231'}/>
            </div>
        </div>
    );
};

RightPanel.propTypes = {
    className: PropTypes.string,
};

export default RightPanel;
