import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getRegistedCourse = async (semester) => {
    try {
        const {data} = await client.get('/students/courses/register-courses', {
            params: {
                semester: semester
            }
        })
        return data.data
    } catch (err) {
        toast.error("Lấy danh sách học phần thất bại: " + err.response.data.message)
        throw err
    }
}

export const getRegistedClass = async (semester) => {
    try {
        const {data} = await client.get('/students/classes/register-class', {
            params: {
                semester: semester
            }
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }

}

export const unRegisterClass = async (semester, classIds = []) => {
    try {
        const {data} = await client.delete('/students/classes/register-class', {
            data: {
                semester: semester,
                classIds: classIds
            }
        })
        toast.success("Hủy lớp thành công, mã lớp: " + classIds)
        return data.data
    } catch (err) {
        toast.error(err.response.data.message);
        throw err
    }

}

export const registerClass = async (semester, classIds = []) => {
    try {
        const {data} = await client.post('/students/classes/register-class',
            {
                semester: semester,
                classIds: classIds
            }
        )
        toast.success("Đăng ký thành công, mã lớp: " + classIds)
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err;
    }
}


export const registerCourse = async (semester, courseIds = []) => {
    try {
        const {data} = await client.post('/students/courses/register-courses', {
            semester: semester,
            courseIds: courseIds
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        return undefined
    }
}

export const getRegistedCourses = async (semester) => {
    try {
        const {data} = await client.get('/students/courses/register-courses', {
            params: {
                semester: semester
            }
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const unRegisterCourse = async (semester, courseIds = []) => {
    try {
        const {data} = client.delete('/students/courses/register-courses', {
            data: {
                semester: semester,
                courseIds: courseIds
            }
        })
        return data.data
    } catch (err) {
        toast.error('Không thể xóa học phần: ', err.response.data.message)
        throw err
    }
}