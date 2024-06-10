import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {getRegistedCourses} from "../../../api/StudentApi.js";

const TableListCourseRegisted = ({studentEmail}) => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistedCourses('20231')
            console.log(data)
            const newData = data.map(item => {
                return {
                    id: item.courseId,
                    courseName: item.course.courseName||item.course.courseNameE
                }
            })
            setData(newData)
        }
        fetchData()
    }, []);

    const columns = [
        {field: "id", headerName: "Mã HP", flex: 80},
        {field: "courseName", headerName: "Tên học phần", flex: 240},
    ];

    return (
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 10},
                },
            }}

            pageSizeOptions={[5,10,20,50, 100]}
            disableColumnFilter
            disableColumnSelector
            // disableAutosize
            disableColumnMenu
            disableColumnSorting
            onRowClick={(e) => {
                console.log(e);
            }}
        />
    )
}

export default TableListCourseRegisted;