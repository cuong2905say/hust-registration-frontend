import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {getRegistedCourses} from "../../../api/StudentApi.js";

const TableListCourseRegisted = ({studentInfo,semester}) => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistedCourses(semester)
            const newData = data.map(item => {
                return {
                    id: item.courseId,
                    courseName: item.course.courseName||item.course.courseNameE,
                    credit:item.course.credit
                }
            })
            setData(newData)
        }
        fetchData()
    }, [semester]);

    const columns = [
        {field: "id", headerName: "Mã HP", flex: 80},
        {field: "courseName", headerName: "Tên học phần", flex: 240},
        {field:"credit",headerName: "Số TC",flex: 70}
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