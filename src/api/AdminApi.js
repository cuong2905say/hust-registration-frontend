import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getClassStudentRegisted = async (studentEmail, semester) => {
    try {
        const {data} = await client.get('/admin/students/get-class-student-registed', {
            params: {
                studentEmail: studentEmail,
                semester: semester
            }
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message);
        throw err
    }
}

export const getCourseStudentRegisted = async (studentEmail, semester) => {
    try {
        const {data} = await client.get('/admin/students/get-course-student-registed', {
            params: {
                semester: semester,
                studentEmail: studentEmail
            }
        })
        return data.data
    } catch
        (err) {
        toast.error(err.response.data.message)
        throw err
    }

}

export const getStudentInfo = async (studentId) => {
    try {
        const {data} = await client.get('/admin/students/get-student-info', {
            params:{
                studentId:studentId
            }
        })
        toast.success(data.data.email)
        console.log(data.data)
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}