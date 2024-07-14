import {useEffect, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1300,
    // height: '80vh',
    bgcolor: "white",
    borderRadius: "5px",
    boxShadow: 24,
};

// eslint-disable-next-line react/prop-types
export const AllClassesPopup = ({
                                    onClosePopup,
                                    showPopup,
                                    data,
                                    semester,
                                }) => {
    // const newData = data.map((e) => {
    //     return {
    //         id: e.id,
    //         courseId: e.courseId,
    //         theoryClassId: e.theoryClassId,
    //         semester: e.semester,
    //         maxStudent: e.maxStudent,
    //         classType: e.classType,
    //         status: e.status,
    //         timetables: e.timetables,
    //     };
    // });

    const columns = [
        {
            field: "id",
            headerName: "Mã lớp",
            flex: 20,
        },
        {field: "theoryClassId", headerName: "Mã lớp kèm", flex: 20},
        {field: "courseId", headerName: "Mã HP", flex: 22},
        {field: "courseName",headerName: "Tên HP",flex: 50},
        {field: "semester", headerName: "Kì", flex: 25},
        {field: "currentStudent",headerName: "SL ĐK",flex:15},
        {field: "maxStudent", headerName: "Max SV", flex: 10},
        {field: "classType", headerName: "Loại lớp", flex: 25},
        {field: "status", headerName: "Trạng thái lớp", flex: 20},
        {
            field: "timetables",
            headerName: "TKB",
            flex: 110,
            renderCell: ({row}) => {
                return (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        {row.timetables.map((timetable) => {
                            return (
                                <Box
                                    sx={{
                                        // pb: 1,
                                    }}
                                >
                                    <Typography>
                                        Thứ {timetable.dayOfWeek}, {timetable.place},{" "}
                                        {timetable.from} =&gt; {timetable.to}, tuần {timetable.week}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                );
            },
        },
    ];

    return (
        <Modal
            open={showPopup}
            onClose={onClosePopup}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        color="black"
                        fontSize={20}
                        style={{
                            padding: "10px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        fontWeight="bold"
                    >
                        Danh sách lớp mở trong kì {semester}
                    </Typography>
                    <Button
                        variant="text"
                        style={{paddingTop: "15px", paddingBottom: "15px"}}
                        onClick={onClosePopup}
                    >
                        <FaTimes fontSize="18px" color="black"/>
                    </Button>
                </Box>

                <DataGrid
                    sx={{height: "80vh"}}
                    getRowHeight={(params) => {
                        return (50 < params.model.timetables.length * 30) ? params.model.timetables.length * 30 : 50
                    }}
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    autoPageSize
                    // pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    // onPageChange={page => {
                    //     // console.log(page)}
                    // }
                    // onPaginationModelChange={(e)=>{console.log(e)}}
                />
            </Box>
        </Modal>
    );
};
