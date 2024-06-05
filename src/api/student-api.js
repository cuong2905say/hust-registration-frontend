import {client} from "./axios.js";
import {toast} from "react-toastify";
import error from "../screen/error.jsx";

export const getRegistedCourse = (semester) => {
    return client.get('/students/courses/register-courses', {
        params: {
            semester: semester
        }
    })
        .then((response) => {
            console.log(response)
            return response.data.data;
        })
        .catch(err => {
            toast.error("Lấy danh sách học phần thất bại: " + err.response.data.message)
            console.log(err)
            throw (err)
        });
}

export const getRegistedClass = (semester) => {
    return client.get('/students/classes/register-class', {
        params: {
            semester: semester
        }
    })
        .then((response) => {
            return response.data.data;
        })
        .catch(err => {
            toast.error(err.response.data.message)
            console.log(err)
        })
}

export const registerClass = (semester, classId) => {
    const classPK = {
        semester: semester,
        id: classId
    }
    return client.post('/students/classes/register-class', classPK)
        .then((response) => {
            console.log(response)
            return response.data.data
        })
        .catch(err => {
            console.log(err)
            toast.error("Không thể đăng ký lớp này: " + err.response.data.message)
        })
}

export const unRegisterClass = (semester, classId = []) => {
    // todo
}

export const registerMultipleClass = (semester, classId = []) => {
    // todo
}

export const registerCourse = (semester, courseIds = []) => {
    return client.post('/students/courses/register-courses', {
        semester: semester,
        courseIds: courseIds
    })
        .then(response => {
            return response.data.data
        })
        .catch(err => {
            toast.error(err.response.data.message)
            return undefined
        })
}

export const getRegistedCourses = (semester) => {
    return client.get('/register-courses', {
        params: {
            semester: semester
        }
    })
        .then(response => {
            return response.data.data
        })
        .catch(err => {
            toast.error(err.response.data.message)
            return undefined
        })
}

export const unRegisterCourse = (semester, courseIds = []) => {
    return client.delete('/students/courses/register-courses', {
        data: {
            semester: semester,
            courseIds: courseIds
        }
    }).then(response => {
        return response.data.data
    }).catch(err => {
        toast.error('Không thể xóa học phần: ', err.response.data.message)
        return undefined
    })
}