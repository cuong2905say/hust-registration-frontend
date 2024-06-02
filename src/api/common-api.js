import {client} from "./axios.js";
import Class from "../model/class.js";
import {toast} from "react-toastify";

export const getClassesByCourseId = (semester, courseId)=>{
    return client.get('/common/classes/get-by-course-id',{
        params:{
            semester:semester,
            courseId:courseId
        }
    }).then(response => {
        const classData = response.data.data
        return classData.map((item) => {
            return new Class(item.id, item.semester, item.semesterType, item.maxStudent,item.currentRegisted, item.theoryClassId, item.classType, item.status, item.courseId, item.timetables)
        });
    }).catch(err => {
        console.log(err)
        toast.error("Không thể lấy dữ liệu học phần: "+courseId)
        throw err;
    })

}