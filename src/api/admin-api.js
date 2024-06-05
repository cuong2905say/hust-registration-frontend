import {client} from "./axios.js";
import {toast} from "react-toastify";

export const getClassStudentRegisted = (studentEmail, semester) => {
    return client.get('/admin/students/get-class-student-registed', {
        params: {
            studentEmail: studentEmail,
            semester: semester
        }
    }).then(response => {
        return response.data.data
    }).catch(err => {
        toast.error(err.response.data.message);
    })
}

export const getCourseStudentRegisted = (studentEmail, semester) => {
    return client.get('/admin/students/get-course-student-registed', {
        params: {
            semester: semester,
            studentEmail: studentEmail
        }
    }).then(response => {
        return response.data.data
    }).catch(err => toast.error(err.response.data.message)
)
}
