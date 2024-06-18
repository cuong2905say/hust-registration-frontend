import {useEffect, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button, Modal, Typography} from "@mui/material";
import {getAllClass} from "../../../api/PublicApi.js";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "white",
    borderRadius: "5px",
    boxShadow: 24,
};

export const AllClassesPopup = ({onClosePopup, showPopup, data,initialFilter}) => {


    const columns = [
        {field: "id", headerName: "Mã lớp", flex: 15},
        {field: "courseId", headerName: "Mã HP", flex: 20},
        {field: "theoryClassId", headerName: "Mã lớp kèm", flex: 20},
        {field: "semester", headerName: "Kì", flex: 20},
        {field: "maxStudent", headerName: "Max SV", flex: 10},
        {field: "classType", headerName: "Loại lớp", flex: 25},
        {field: "status", headerName: "Trạng thái lớp", flex: 20},
        {field: "timetables",headerName: "TKB",flex: 30}
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
                        style={{padding: "10px", marginLeft: "40%"}}
                        fontWeight="bold"
                    >
                        Danh sách lớp mở
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
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>
        </Modal>
    );
};
