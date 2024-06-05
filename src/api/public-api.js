import {client} from "./axios.js";
import Class from "../model/class.js";
import {toast} from "react-toastify";

export const getAllClass = (semester) => {
    return client.get('/public/classes/get-all', {
        params: {
            semester: semester
        }
    }).then((response) => {
        const classData = response.data.data
        return classData.map((item) => {
            return new Class(item.id, item.semester, item.semesterType, item.maxStudent,item.currentRegisted, item.theoryClassId, item.classType, item.status, item.courseId, item.timetables)
        });
    }).catch(err => {
        console.log(err)
         toast.error('Lấy danh sách lớp thất bại')
    });
}

