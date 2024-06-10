import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Box} from "@mui/material";


const TableListClassRegisted = ({dataClassRegisted, setSelectedRowTableClassRegisted}) => {
    const columns = [
        {
            field: "courseId",
            headerName: "Mã HP",
            width: 120,
        },
        {
            field: "courseName",
            headerName: "Tên HP",
            width: 200,
        },
        {
            field: "credit",
            headerName: "Số TC",
            width: 70,
        },
        {
            field: "need",
            headerName: "Cần TN",
            width: 120,
            renderCell: (params) => params.value
        },
        {
            field: "classId",
            headerName: "Mã lớp",
            width: 120,
        },
        {
            field: "theoryClassId",
            headerName: "Mã lớp kèm",
            width: 120,
        },
        {
            field: "classType",
            headerName: "Loại lớp",
            width: 150,
        },
        {
            field: "createdTime",
            headerName: "Ngày ĐK",
            width: 200,
        },
        {
            field: "status",
            headerName: "Trạng thái lớp",
            width: 120,
        },
        {
            field: "createdById",
            headerName: "Người đăng ký",
            width: 120,
        },
    ];

    return (
        <Box>
            <DataGrid
                sx={{
                    m: 2,
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}
                rows={dataClassRegisted}
                columns={columns}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                disableColumnFilter
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                    const selectedRowData = dataClassRegisted.filter(row => ids.includes(row.id))
                    setSelectedRowTableClassRegisted(selectedRowData);
                }}

            />
        </Box>
    );
};
export default TableListClassRegisted;
