import PropTypes from "prop-types";
import "../../css/HeaderPanel.css";
import {Button} from "@mui/material";
import {logout} from "../../api/AuthApi.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const HeaderPanel = ({className = ""}) => {
    const navigate = useNavigate()

    const handleClickLogout = () => {
        logout()
        toast.clearWaitingQueue()
        toast.success("Đăng xuất thành công")
        navigate('/')
    }


    return (
        <section className={`header-panel ${className}`}>
            <div className="logo-container">
                <img
                    className="logo-hust-icon"
                    loading="lazy"
                    alt=""
                    src="/image-4@2x.png"
                />
            </div>
            <div className="title-container">
        <pre className="title">
          <p className="blank-line">
            <b>
              <span className="blank-line1">&nbsp;</span>
            </b>
          </p>
          <p className="h-thng-qun-tr-i-hc-trc">
            <b>
              <span className="h-thng-qun">
                HỆ THỐNG QUẢN TRỊ ĐẠI HỌC TRỰC TUYẾN
              </span>
            </b>
          </p>
          <p className="i-hc-bch">ĐẠI HỌC BÁCH KHOA HÀ NỘI</p>
        </pre>
            </div>
            <div className="user-info">
                <div className="frame-parent">
                    <div className="user-field-wrapper">

                        <img
                            className="notification-icon"
                            loading="lazy"
                            alt=""
                            src="/image-5@2x.png"
                        />
                        <Button className="logout" onClick={handleClickLogout}>
                            <a>Thoát đăng nhập</a>
                        </Button>

                    </div>
                    <div className="week-info">
                        {`Tuần 38 (Tuần học thứ 39): `}
                        <span className="span">20/05 - 25/05</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

HeaderPanel.propTypes = {
    className: PropTypes.string,
};

export default HeaderPanel;
