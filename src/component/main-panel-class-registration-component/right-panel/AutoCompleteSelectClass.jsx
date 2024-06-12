import {Autocomplete, createFilterOptions, Stack, TextField} from "@mui/material";
import React from "react";

const defaultFilterOptions = createFilterOptions();

const filterOption = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, 50)
}

export const AutoCompleteSelectClass = ({handleChangeListClassIdSelected, dataAllClass}) => {
    return (
        <Stack spacing={3} sx={{width: 300}}>
            <Autocomplete
                multiple
                id="tags-filled"
                options={dataAllClass.filter(cl=>cl.theoryClassId!=null).map((option) => option.id)}
                freeSolo
                filterSelectedOptions
                filterOptions={filterOption}
                // value={value}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    handleChangeListClassIdSelected(newValue)
                }}
                // renderTags={(value, getTagProps) =>
                //     value.map((option, index) => {
                //         const { key, ...tagProps } = getTagProps({ index });
                //         return (
                //             <Chip variant="outlined" label={option} key={key} {...tagProps} />
                //         );
                //     })
                // }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        type="tel"
                        variant="filled"
                        label="Mã lớp"
                        placeholder="Nhập mã lớp"
                    />
                )}
            />
        </Stack>
    );
}

export const AutoCompleteSelectClassToChangeSimilar = ({selectedClass,handleChangeListClassIdSelected, dataAllClass}) => {
    console.log(selectedClass)
    if(!selectedClass){
        return <></>
    }
    return (
        <Stack spacing={3} sx={{width: 300}}>
            <Autocomplete
                id="tags-filled"
                options={dataAllClass.filter(cl=>cl.theoryClassId!=null).filter(cl=>cl.courseId===selectedClass.courseId && cl.classType === selectedClass.classType).map((option) => option.id)}
                filterOptions={filterOption}
                // value={value}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    // handleChangeListClassIdSelected(newValue)
                }}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        type="tel"
                        variant="filled"
                        label="Mã lớp"
                        placeholder="Nhập mã lớp"
                    />
                )}
            />
        </Stack>
    );
}