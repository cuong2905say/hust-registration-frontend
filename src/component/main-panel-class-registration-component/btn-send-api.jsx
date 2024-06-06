import PropTypes from "prop-types";
import "../../css/btn-send-api.css";

const BtnSendApi = ({ className = "" }) => {
  return (
    <button className={`btn-send-api ${className}`}>
      <div className="text-gui-dang-ki">{`Gửi đăng ký `}</div>
      <div className="loading-icon">
        <img className="confirmation-icon" alt="" src="/mailicon.svg" />
      </div>
    </button>
  );
};

BtnSendApi.propTypes = {
  className: PropTypes.string,
};

export default BtnSendApi;
