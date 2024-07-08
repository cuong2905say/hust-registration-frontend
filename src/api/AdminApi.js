import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getClassStudentRegisted = async (studentEmail, semester) => {
    try {
        const {data} = await client.get('/api/admin/students/get-class-student-registed', {
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
        const {data} = await client.get('/api/admin/students/get-course-student-registed', {
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
        const {data} = await client.get('/api/admin/students/get-student-info', {
            params: {
                studentId: studentId
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

export const unRegisterClassByAdmin = async (studentEmail, semester, classIds = []) => {
    try {
        const {data} = await client.delete('/api/admin/students/un-register-by-admin', {
            data: {
                studentEmail: studentEmail,
                semester: semester,
                classIds: classIds
            }
        })
        toast.success('Xóa lớp thành công: ' + classIds)
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const registerClassByAdmin = async (studentEmail, semester, classIds = []) => {
    try {
        console.log(classIds)
        const {data} = await client.post('/api/admin/students/register-by-admin', {
            studentEmail: studentEmail,
            semester: semester,
            classIds: classIds
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}