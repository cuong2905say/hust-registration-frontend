import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getClassesByCourseId = async (semester, courseId) => {
    try {
        const {data} = client.get('/api/common/classes/get-by-course-id', {
            params: {
                semester: semester,
                courseId: courseId
            }
        })
        return data.data
    } catch (err) {
        toast.error("Không thể lấy dữ liệu học phần: " + courseId)
        throw err;
    }
}

export const getAllClass = async (semester) => {
    try {
        const {data} = await client.get('/api/classes/get-by-semester', {
            params: {
                semester: semester
            }
        })
        return data.data
    } catch (err) {
        toast.error('Lấy danh sách lớp thất bại' + err.response.data.message)
        throw err
    }
}
export const getCountAllClass = async (semester) => {
    try {
        const {data} = await client.get('/api/classes/count-all', {
            params:{
                semester: semester,
            }
        })
        return data.data
    }catch (err){
        toast.error('Không thể lấy danh sách đăng kí '+err.response.data.message)
        throw err
    }
}


