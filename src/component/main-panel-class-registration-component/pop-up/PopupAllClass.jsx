import {useEffect, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    // height: '80vh',
    bgcolor: "white",
    borderRadius: "5px",
    boxShadow: 24,
};

// eslint-disable-next-line react/prop-types
export const AllClassesPopup = ({onClosePopup, showPopup, data, semester}) => {


    const newData = data.map(e => {
        return {
            id: e.id,
            courseId: e.courseId,
            theoryClassId: e.theoryClassId,
            semester: e.semester,
            maxStudent: e.maxStudent,
            classType: e.classType,
            status: e.status,
            timetables: (e.timetables)
        }
    })

    const columns = [
        {field: "id", headerName: "Mã lớp", flex: 15},
        {field: "courseId", headerName: "Mã HP", flex: 20},
        {field: "theoryClassId", headerName: "Mã lớp kèm", flex: 20},
        {field: "semester", headerName: "Kì", flex: 20},
        {field: "maxStudent", headerName: "Max SV", flex: 10},
        {field: "classType", headerName: "Loại lớp", flex: 25},
        {field: "status", headerName: "Trạng thái lớp", flex: 20},
        {
            field: "timetables",
            headerName: "TKB",
            flex: 60,
            renderCell: ({row})=> {
                return  <Box sx={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center'}}>
                    {
                        row.timetables.map((timetable)=>{
                            return <Box sx ={{}}>
                                <Typography >
                                    Thứ {timetable.dayOfWeek}, {timetable.place}, {timetable.from} => {timetable.to}, tuần {timetable.week}
                                </Typography>
                            </Box>
                        })
                    }
                </Box>
            }

        }
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
                        style={{padding: "10px", justifyContent:"center",alignItems:"center"}}
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
                    sx={{height:'80vh'}}
                    getRowHeight={(params) => {
                        console.log(params)
                        if(params.model.timetables.length <=1) return 50
                        return params.model.timetables.length * 30
                    }}
                    rows={newData}
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
