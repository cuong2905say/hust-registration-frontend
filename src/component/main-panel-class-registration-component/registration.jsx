import PropTypes from "prop-types";
import "../../css/registration.css";
import {Button} from "@mui/material";
import {useState} from "react";
import TableTest from "./table-list-class-registed.jsx";

const Registration = (props) => {
    console.log(props)
    const [text, setText] = useState("");


    const handleChangeTextClassId = (e) =>{
        props.onChangeTextField(e)
        setText(e.target.value);
    };
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
                <Button disabled = {!text} >
                    <div className="button-register-class">
                        <div className="k-lp"> Đăng ký lớp</div>
                    </div>
                </Button>
            </div>
            <div className="registered-classes1">

                <TableTest/>
                {/*<div className="table-class-registed">*/}
                {/*    <div className="action-button">*/}
                {/*        <div className="header-ma-hp">Mã HP</div>*/}
                {/*    </div>*/}
                {/*    <div className="time-type">*/}
                {/*        <div className="header-ten-hp">Tên HP</div>*/}
                {/*    </div>*/}
                {/*    <div className="class-location">*/}
                {/*        <div className="header-class-id">Mã lớp</div>*/}
                {/*    </div>*/}
                {/*    <div className="frame">*/}
                {/*        <div className="header-class-theory-id">Mã lớp kèm</div>*/}
                {/*    </div>*/}
                {/*    <div className="frame1">*/}
                {/*        <div className="header-class-type">Loại lớp</div>*/}
                {/*    </div>*/}
                {/*    <input className="class-info-row" placeholder="Cần TN" type="text"/>*/}
                {/*    <div className="frame2">*/}
                {/*        <div className="header-register-status">Trạng thái ĐK</div>*/}
                {/*    </div>*/}
                {/*    <div className="frame3">*/}
                {/*        <div className="header-created-by">Người đăng ký</div>*/}
                {/*    </div>*/}
                {/*    <div className="frame4">*/}
                {/*        <div className="header-created-time">Ngày ĐK</div>*/}
                {/*    </div>*/}
                {/*    <div className="frame5">*/}
                {/*        <div className="header-next-action">Hành động</div>*/}
                {/*    </div>*/}
                {/*    <div className="frame6">*/}
                {/*        <div className="header-credit-count">Tín chỉ</div>*/}
                {/*    </div>*/}
                {/*    <img*/}
                {/*        className="frame-icon"*/}
                {/*        loading="lazy"*/}
                {/*        alt=""*/}
                {/*        src="/frame-2.svg"*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

Registration.propTypes = {
    className: PropTypes.string,
};

export default Registration;
