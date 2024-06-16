import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Box} from "@mui/material";


const TableListClassRegisted = ({dataClassRegisted, setSelectedRowTableClassRegisted,studentInfo}) => {

    const isRowSelectable= ({row})=>{
        if(row.classType==='LT'){
            return false
        }
        if(localStorage.getItem('role')==='ROLE_ADMIN'){
            return true
        }
        return row.updatedById === studentInfo.email;

    }

    const columns = [
        {
            field: "courseId",
            headerName: "Mã HP",
            width: 120,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: "courseName",
            headerName: "Tên HP",
            width: 200,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: "credit",
            headerName: "Số TC",
            width: 70,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: "need",
            headerName: "Cần TN",
            width: 120,
            renderCell: (params) => params.value,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: "classId",
            headerName: "Mã lớp",
            width: 120,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "theoryClassId",
            headerName: "Mã lớp kèm",
            width: 120,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "classType",
            headerName: "Loại lớp",
            width: 150,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "updatedTime",
            headerName: "Ngày ĐK",
            width: 200,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "status",
            headerName: "Trạng thái lớp",
            width: 120,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "updatedById",
            headerName: "Người đăng ký",
            width: 120,
            headerClassName: 'super-app-theme--header',
        },
    ];

    return (
        <Box sx = {{
            '& .super-app-theme--header':{
                backgroundColor: 'rgba(200, 244, 244, 0.238)',
                fontWeight:'bold'
            },
            minHeight:'250px'
        }}>
            <DataGrid
                // slots={}
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
                disableColumnSorting
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                    const selectedRowData = dataClassRegisted.filter(row => ids.includes(row.id))
                    setSelectedRowTableClassRegisted(selectedRowData);
                }}
                isRowSelectable={isRowSelectable}
            />
        </Box>
    );
};
export default TableListClassRegisted;
