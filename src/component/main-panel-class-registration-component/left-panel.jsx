import PropTypes from "prop-types";
import "../../css/left-panel.css";

const LeftPanel = ({ className = "" }) => {
  return (
    <div className={`left-panel ${className}`}>
      <div className="student-info">
          <img
            className="arrow-up-1"
            loading="lazy"
            alt=""
            src="/star.svg"
          />
        <div className="m-sinh-vin-container">
          <span>{`Mã sinh viên : `}</span>
          <b>20202024</b>
        </div>
      </div>
      <div className="student-info1">
        <div className="arrow-up-1-container">
          <img
            className="arrow-up-11"
            loading="lazy"
            alt=""
            src="/star.svg"
          />
        </div>
        <div className="h-v-tn-container">
          <span>{`Họ và tên sinh viên: `}</span>
          <b>Nguyễn Mạnh Cường</b>
        </div>
      </div>
      <div className="class-info">
        <div className="class-info-inner">
          <div className="frame-group">
            <div className="arrow-up-1-parent">
              <img
                className="arrow-up-12"
                loading="lazy"
                alt=""
                src="/star.svg"
              />
              <img
                className="arrow-up-13"
                loading="lazy"
                alt=""
                src="/star.svg"
              />
            </div>
            <img
              className="arrow-up-14"
              loading="lazy"
              alt=""
              src="/star.svg"
            />
          </div>
        </div>
        <div className="class-details">
          <div className="lp-cng-ngh-container">
            <span>{`Lớp: `}</span>
            <b>Công nghệ thông tin 01 K65</b>
          </div>
          <div className="chng-trnh-cng-container">
            <span>{`Chương trình: `}</span>
            <b>Công nghệ thông tin</b>
          </div>
          <div className="s-tn-ch-container">
            <span>{`Số tín chỉ tối đa: `}</span>
            <b>24</b>
          </div>
        </div>
      </div>
      <div className="registration-info">
        <div className="registration-header">
          <div className="arrow-up-1-frame">
            <img
              className="arrow-up-15"
              loading="lazy"
              alt=""
              src="/star.svg"
            />
          </div>
          <u className="thng-tin-danh">Thông tin danh sách lớp mở</u>
        </div>
        <div className="registration-header1">
          <div className="arrow-up-2-wrapper">
            <img
              className="arrow-up-2"
              loading="lazy"
              alt=""
              src="/star.svg"
            />
          </div>
          <u className="thng-tin-danh1">Danh sách học phần đã đăng kí</u>
        </div>
      </div>
    </div>
  );
};

LeftPanel.propTypes = {
  className: PropTypes.string,
};

export default LeftPanel;
