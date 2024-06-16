import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const TableListSchedule = ({ semester }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = React.useState([]);
  const handleCheckboxChange = (rowId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
      console.log(selectedRows);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getRegistedClass("20231");
  //     const newData = data.map((item) => {
  //       return {
  //         id: item.class.course.id,
  //         courseName: item.class.course.courseName,
  //         need: item.class.course.needExperiment ? "Yes" : "",
  //         classId: item.classId,
  //         theoryClassId: item.class.theoryClassId,
  //         classType: item.class.classType,
  //         createdTime: item.createdTime,
  //         status: item.class.status,
  //         semester: item.semester,
  //         createdById: item.createdById,
  //       };
  //     });
  //
  //     setData(newData);
  //   };
  //   fetchData();
  // }, []);

  const columns = [
    {
      field: "id",
      headerName: "Mã HP",
      width: 120,
    },
    {
      field: "courseName",
      headerName: "Tên HP",
      width: 200,
    },
    {
      field: "need",
      headerName: "Cần TN",
      width: 120,
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
      field: "semester",
      headerName: "Kỳ",
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
        rows={data}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 10 },
        //   },
        // }}
        pageSizeOptions={[5,10,20,50, 100]}
        disableColumnFilter
      />
    </Box>
  );
};
export default TableListSchedule;
