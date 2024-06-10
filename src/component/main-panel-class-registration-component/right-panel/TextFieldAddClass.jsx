import {Autocomplete, createFilterOptions, Stack, TextField} from "@mui/material";
import React from "react";

const defaultFilterOptions = createFilterOptions();

const filterOption = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, 50)
}

export const TextFieldAddClass = ({value,handleChangeListClassIdSelected, dataAllClass}) => {
    return (
        <Stack spacing={3} sx={{width: 500}}>
            <Autocomplete
                multiple

                id="tags-filled"
                options={dataAllClass.map((option) => option.id)}
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
                        type="number"
                        variant="filled"
                        label="Mã lớp"
                        placeholder="Nhập mã lớp"
                    />
                )}
            />
        </Stack>
    );
}