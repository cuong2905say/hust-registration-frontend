import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {getRegistedCourses} from "../../../api/StudentApi.js";
import {getCourseStudentRegisted} from "../../../api/AdminApi.js";

const TableListCourseRegisted = ({studentInfo, semester}) => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchDataCourseRegisted = async () => {
            let data = {}
            if(localStorage.getItem('role')==='ROLE_ADMIN'){
                data = await getCourseStudentRegisted(studentInfo.email,semester)
            }else{
                data = await getRegistedCourses(semester)

            }
            const newData = data.map(item => {
                return {
                    id: item.courseId,
                    courseName: item.course.courseName || item.course.courseNameE,
                    credit: item.course.credit
                }
            })
            setData(newData)
        }
        if (studentInfo) {
            fetchDataCourseRegisted()

        }
    }, [studentInfo,semester]);

    const columns = [
        {field: "id", headerName: "Mã HP", flex: 120},
        {field: "courseName", headerName: "Tên học phần", flex: 240},
        {field: "credit", headerName: "TC", flex: 50}
    ];

    return (
        <DataGrid
            rows={data}
            columns={columns}
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
            disableRowSelectionOnClick
            disableColumnSorting
            onRowClick={(e) => {
                console.log(e);
            }}
        />
    )
}

export default TableListCourseRegisted;