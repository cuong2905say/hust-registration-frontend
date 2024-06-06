import PropTypes from "prop-types";
import "../../css/header-panel.css";

const HeaderPanel = ({ className = "" }) => {
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
            <div className="user-field">
              <img
                className="notification-icon"
                loading="lazy"
                alt=""
                src="/image-5@2x.png"
              />
              <div className="textbox-6">
                <a className="user">user</a>
              </div>
            </div>
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
