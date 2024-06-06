import BtnSendApi from "./btn-send-api.jsx";
import PropTypes from "prop-types";
import "../../css/delete-button.css";

const DeleteButton = ({ className = "" }) => {
  return (
    <div className={`delete-button ${className}`}>
      <div className="delete-class">
        <div className="button-delete-selected-class">
          <div className="xa-cc-lp">Xóa các lớp chọn</div>
        </div>
      </div>
      <div className="timetable">
        <BtnSendApi />
      </div>
      <div className="timetable1">
        <div className="registered-course-info-wrapper">
          <b className="registered-course-info">
            Thời khóa biểu các lớp đăng ký
          </b>
        </div>
        <div className="table-time-table-registed">
          <div className="timetable-headers">
            <div className="weekday-header">
              <div className="th">Thứ</div>
            </div>
            <div className="time-row">
              <div className="room-header">
                <div className="thi-gian">Thời gian</div>
              </div>
              <div className="week-column">
                <div className="tun-hc">Tuần học</div>
              </div>
              <div className="building-column">
                <div className="phng-hc">Phòng học</div>
              </div>
            </div>
            <div className="class-column">
              <div className="lp-hc">Lớp học</div>
            </div>
          </div>
          <div className="row">
            <div className="frame7">
              <div className="div">2</div>
            </div>
            <div className="frame-container">
              <div className="frame8">
                <div className="div1">14:00-17:00</div>
              </div>
              <div className="frame9">
                <div className="div2">26,29,33</div>
              </div>
              <div className="frame10">
                <div className="tc-307">TC-307</div>
              </div>
            </div>
            <div className="frame11">
              <div className="div3">94738</div>
            </div>
          </div>
          <div className="row1">
            <div className="frame12">
              <div className="div4">4</div>
            </div>
            <div className="frame-div">
              <div className="frame13">
                <div className="div5">08:30-11:50</div>
              </div>
              <div className="frame14">
                <div className="div6">22,25-31,33-40</div>
              </div>
              <div className="frame15">
                <div className="tc-513">TC-513</div>
              </div>
            </div>
            <div className="frame16">
              <div className="div7">94738</div>
            </div>
          </div>
          <div className="row2">
            <div className="frame17">
              <div className="div8">6</div>
            </div>
            <div className="frame-parent1">
              <div className="frame18">
                <div className="div9">06:45:09:15</div>
              </div>
              <div className="frame19">
                <div className="div10">22,25-31,33-40</div>
              </div>
              <div className="frame20">
                <div className="c7-212">C7-212</div>
              </div>
            </div>
            <div className="frame21">
              <div className="div11">94739</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteButton.propTypes = {
  className: PropTypes.string,
};

export default DeleteButton;
