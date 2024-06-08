import {useState} from "react";
import {InputLabel, MenuItem, Select} from "@mui/material";

export const SemesterSelector = ({onChangeValue,value}) => {
    return (
        <div className={"semester-selector-container"} style={{display:"flex", flexDirection:"column",maxWidth:'200px',alignItems:'flex-end'}}>
            <InputLabel id="demo-simple-select-label" >Kì học</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                // label="Kì học"
                onChange={onChangeValue}
            >
                <MenuItem value={'20233'}>20233</MenuItem>
                <MenuItem value={'20232'}>20232</MenuItem>
                <MenuItem value={'20231'}>20231</MenuItem>
            </Select>
        </div>
    )
}