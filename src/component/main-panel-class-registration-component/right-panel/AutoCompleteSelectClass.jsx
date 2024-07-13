import {
    Autocomplete,
    createFilterOptions,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";

const defaultFilterOptions = createFilterOptions();

const filterOption = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, 100);
};

export const AutoCompleteSelectClass = ({
                                            value,
                                            handleChangeListClassIdSelected,
                                            dataAllClass,
                                        }) => {
    return (
        <Stack spacing={3} sx={{width: 450}}>
            <Autocomplete
                multiple
                id="tags-filled"
                options={dataAllClass
                    .filter((cl) => {
                        return cl.theoryClassId !== null && cl.theoryClassId !==''})
                    .map((option) => {
                        return `${option.id} - ${option.classType} - ${option.courseName}`;
                    })}
                freeSolo
                filterSelectedOptions
                filterOptions={filterOption}
                value={value}
                onChange={(event, newValue) => {
                    handleChangeListClassIdSelected(newValue);
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
};

export const AutoCompleteSelectClassToChangeSimilar = ({
                                                           selectedClassInRegistedTable,
                                                           onChangeClassId,
                                                           dataAllClass,
                                                       }) => {
    if (!selectedClassInRegistedTable) {
        return <></>;
    }
    return (
        <Stack spacing={3} sx={{width: 300}}>
            <Autocomplete
                id="tags-filled"
                options={dataAllClass
                    .filter((cl) => cl.theoryClassId != null)
                    .filter(
                        (cl) =>
                            cl.courseId === selectedClassInRegistedTable.courseId &&
                            cl.classType === selectedClassInRegistedTable.classType
                    )
                    .map((option) => option.id)}
                filterOptions={filterOption}
                // value={value}
                onChange={(event, newValue) => {
                    onChangeClassId(newValue);
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
};
