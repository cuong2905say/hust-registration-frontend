import { useState } from "react";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";

export const SemesterSelector = ({ onChangeValue, value }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <InputLabel id="demo-simple-select-label">Kì học</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onChangeValue}
        size="small"
      >
        <MenuItem value={"20233"}>20233</MenuItem>
        <MenuItem value={"20232"}>20232</MenuItem>
        <MenuItem value={"20231"}>20231</MenuItem>
      </Select>
    </Box>
  );
};
