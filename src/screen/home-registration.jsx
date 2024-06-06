import React from "react";
import StudentInfoPanel from "../component/sutdentInfoPanel/studentInfoPanel.jsx";

class HomeStudentRegistration extends React.Component {
    render() {
        return (
            <div>
                <StudentInfoPanel/>
            </div>
        )
    }
}

class HomeAdminRegistration extends React.Component {
    render() {
        return (
            <div>
                <StudentInfoPanel/>
            </div>
        )
    }
}

export {HomeStudentRegistration,HomeAdminRegistration}