import {Grid, Paper} from "@mui/material";
import {ViewState} from "@devexpress/dx-react-scheduler";
import {
    Appointments,
    DateNavigator,
    MonthView,
    Scheduler,
    Toolbar,
    WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {useEffect, useState} from "react";
import {getDayStartYear} from "../../../../api/MetadataApi.js";
import {DataGrid} from "@mui/x-data-grid";

/**
 * @param week example '3-10, 12-19, 20, 24-26'
 */
const parseWeekToArray = (week) => {
    let result = [];
    let weekParts = week.split(",");
    weekParts.forEach((weekPart) => {
        if (weekPart.includes("-")) {
            let [start, end] = weekPart.split("-").map(Number);
            for (let i = start; i <= end; i++) {
                result.push(i);
            }
        } else {
            result.push(Number(weekPart));
        }
    });
    return result;
};

const getAllTimetable = (registedClass) => {
    let result = [];
    let startWeek = 100;
    let endWeek = 0;
    registedClass.forEach((cl) => {
        let classTimetable = JSON.parse(cl.timetables);
        classTimetable.forEach((ttb) => {
            const week = parseWeekToArray(ttb.week);
            result.push({
                id: cl.classId + ttb.week + ttb.from + ttb.to,
                classId: cl.classId,
                courseName: cl.courseName,
                credit: cl.credit,
                classType: cl.classType,
                courseId: cl.courseId,
                from: {
                    hour: parseInt(ttb.from.slice(0, 2), 10),
                    minute: parseInt(ttb.from.slice(2, 4), 10),
                },
                to: {
                    hour: parseInt(ttb.to.slice(0, 2), 10),
                    minute: parseInt(ttb.to.slice(2, 4), 10),
                },
                timeNotParse: ttb.from + "-" + ttb.to,
                week: week,
                weekNotParse: ttb.week,
                place: ttb.place,
                dayOfWeek: ttb.dayOfWeek, // -1 because mon is 1 , tue is 2
            });
            startWeek = Math.min(...week, startWeek);
            endWeek = Math.max(...week, endWeek);
        });
    });
    return {
        startWeek: startWeek,
        endWeek: endWeek,
        allTimeTable: result,
    };
};

function pad(number) {
    return number < 10 ? "0" + number : number;
}

/**
 * @param date
 * @param weekNumber
 * @param dayOfWeek
 * @param hour
 * @param minute
 * @return String
 */
const getDateStringData = (date, weekNumber, dayOfWeek, hour, minute) => {
    const dateTmp = new Date(date);
    dateTmp.setDate(dateTmp.getDate() + dayOfWeek - 2 + (weekNumber - 1) * 7);
    const year = dateTmp.getFullYear();
    const month = pad(dateTmp.getMonth() + 1);
    const day = pad(dateTmp.getDate());
    return `${year}-${month}-${day}T${pad(hour)}:${pad(minute)}`;
};

const getDataSchedulerForTimetable = (
    startWeek,
    endWeek,
    allTimeTable,
    dayStartYear
) => {
    const result = [];
    for (let week = startWeek; week <= endWeek; week++) {
        allTimeTable.forEach((item) => {
            if (item.week.includes(week)) {
                result.push({
                    title: '('+item.classType+') '+(item.courseName||item.courseNameE ),
                    startDate: getDateStringData(
                        dayStartYear,
                        week,
                        item.dayOfWeek,
                        item.from.hour,
                        item.from.minute
                    ),
                    endDate: getDateStringData(
                        dayStartYear,
                        week,
                        item.dayOfWeek,
                        item.to.hour,
                        item.to.minute
                    ),
                });
            }
        });
    }
    return result;
};

const offSetWeek = (dayStartYear, weekNumber) => {
    let date = new Date(dayStartYear);
    date.setDate(date.getDate() + (weekNumber - 1) * 7);
    return date;
};


export const TimetableViewByWeek = (props) => {
    const {registedClass = [], semester = ""} = props;

    const [dayStartYear, setDayStartYear] = useState(null);

    const fetchDayStartYear = async (semester) => {
        const data = await getDayStartYear(semester.slice(0, 4));
        setDayStartYear(new Date(data));
    };

    useEffect(() => {
        fetchDayStartYear(semester);
    }, [semester]);

    if (!registedClass || registedClass.length === 0) return <></>;
    const {startWeek, endWeek, allTimeTable} = getAllTimetable(registedClass);

    const data = getDataSchedulerForTimetable(
        startWeek,
        endWeek,
        allTimeTable,
        dayStartYear
    );

    return (
        <Grid container spacing={3}>
            {Array.from({length: endWeek-startWeek+1}, (_, index) => (
                <Grid item key={index}>
                    <Scheduler data={data} title={"siuuuuuuu"}>
                        <ViewState
                            currentDate={offSetWeek(dayStartYear, index + startWeek)}
                        />

                        <WeekView
                            startDayHour={5.75}
                            endDayHour={18.25}
                            cellDuration={120}
                            name="Tuần 1"
                            dayScaleCellComponent={(props) => {
                                return (
                                    <WeekView.DayScaleCell
                                        {...props}
                                        hasRightBorder={true}
                                        style={{
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    />
                                );
                            }}
                            dayScaleEmptyCellComponent={(props) => {
                                return (
                                    <WeekView.DayScaleEmptyCell
                                        {...props}
                                        style={{padding: 0, margin: 0}}>
                                        <div
                                            style={{
                                                paddingTop: 10,
                                                margin: 0,
                                                backgroundColor: "white",
                                                color: "black",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Tuần {index + startWeek}
                                        </div>
                                    </WeekView.DayScaleEmptyCell>
                                );
                            }}
                            timeTableCellComponent={(props) => {
                                return (
                                    <WeekView.TimeTableCell
                                        {...props}
                                        style={{padding: 0, margin: 0}}
                                    />
                                );
                            }}
                        />
                        <Appointments
                            appointmentContentComponent={(props) => {
                                return (
                                    <Appointments.AppointmentContent
                                        {...props}
                                        style={{color: "white"}}>
                                        {props.data.title}
                                    </Appointments.AppointmentContent>
                                );
                            }}
                        />
                    </Scheduler>
                </Grid>
            ))}
        </Grid>
    );
};

export const TimetableViewBySingleWeek = (props) => {
    const {registedClass = [], semester = ""} = props;

    const [dayStartYear, setDayStartYear] = useState(null);

    const [currentDate, setCurrentDate] = useState(undefined)

    const [data, setData] = useState([])
    const {startWeek, endWeek, allTimeTable} = getAllTimetable(registedClass);

    useEffect(() => {
        setData(getDataSchedulerForTimetable(
            startWeek,
            endWeek,
            allTimeTable,
            dayStartYear
        ))
    }, [allTimeTable, dayStartYear, endWeek, registedClass, startWeek]);


    useEffect(() => {
        const fetchDayStartYear = async (semester) => {
            setDayStartYear(new Date(await getDayStartYear(semester.slice(0, 4))));
        };
        fetchDayStartYear(semester);
    }, [semester]);
    const [currentWeek,setCurrentWeek] = useState(startWeek);

    const handleDateChange = (date) => {
        const dateDiffirent = (date-dayStartYear)/86400000
        const weekDiffirent = dateDiffirent/7
        setCurrentWeek(weekDiffirent+1)
        setCurrentDate(date)
    }


    if (!registedClass || registedClass.length === 0) return <></>;
    return (
        <Paper>
            <Scheduler data={data} title={"siuuuuuuu"}>
                <ViewState
                    // currentViewName={"Week"}
                    currentDate={currentDate || offSetWeek(dayStartYear, startWeek)}
                    onCurrentDateChange={handleDateChange}
                />
                <Toolbar/>
                <DateNavigator/>

                <WeekView
                    startDayHour={6}
                    endDayHour={18}
                    cellDuration={120}
                    name="Tuần 1"
                    dayScaleCellComponent={(props) => {
                        return (
                            <WeekView.DayScaleCell
                                {...props}
                                hasRightBorder={true}
                                style={{
                                    padding: 0,
                                    margin: 0,
                                }}
                            />
                        );
                    }}
                    dayScaleEmptyCellComponent={(props) => {
                        return (
                            <WeekView.DayScaleEmptyCell
                                {...props}
                                style={{padding: 0, margin: 0}}>
                                <div
                                    style={{
                                        paddingTop: 10,
                                        margin: 0,
                                        backgroundColor: "white",
                                        color: "black",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Tuần {currentWeek}
                                </div>
                            </WeekView.DayScaleEmptyCell>
                        )
                    }}
                    timeTableCellComponent={(props) => {
                        return (
                            <WeekView.TimeTableCell
                                {...props}
                                style={{padding: 0, margin: 0}}
                            />
                        );
                    }}
                />
                <Appointments
                    appointmentContentComponent={(props) => {
                        return (
                            <Appointments.AppointmentContent
                                {...props}
                                style={{color: "white"}}
                                children={props.data.title}
                            />
                        );
                    }}
                />
            </Scheduler>
        </Paper>
    )
}

export const TimetableViewBySingleMonth = (props) => {
    const {registedClass = [], semester = ""} = props;
    const [dayStartYear, setDayStartYear] = useState(null);

    const {startWeek, endWeek, allTimeTable} = getAllTimetable(registedClass);

    const [data, setData] = useState([])

    useEffect(() => {
        setData(getDataSchedulerForTimetable(
            startWeek,
            endWeek,
            allTimeTable,
            dayStartYear
        ))
    }, [allTimeTable, dayStartYear, endWeek, registedClass, startWeek]);

    const [currentDate, setCurrentDate] = useState(undefined)

    useEffect(() => {
        const fetchDayStartYear = async (semester) => {
            setDayStartYear(new Date(await getDayStartYear(semester.slice(0, 4))));
        };
        fetchDayStartYear(semester);
    }, [semester]);

    const handleDateChange = (date) => {
        setCurrentDate(date)
    }


    return (
        <Paper>
            <Scheduler data={data} title={"siuuuuuuu"}>
                <ViewState
                    currentViewName={"Month"}
                    currentDate={currentDate || offSetWeek(dayStartYear, startWeek)}
                    onCurrentDateChange={handleDateChange}
                />
                <Toolbar/>
                <DateNavigator/>
                <MonthView/>
                <Appointments/>
            </Scheduler>
        </Paper>
    )
};

export const DefaultTimetable = (props) => {
    const {registedClass = [], semester = ""} = props;

    const {allTimeTable} = getAllTimetable(registedClass);
    const columns = [
        {field: "classId", headerName: "Mã lớp", flex: 90},
        {field: "courseId", headerName: "Mã HP", flex: 100},
        {field: "courseName", headerName: "Tên HP", flex: 300},
        {field: "classType", headerName: "Loại lớp", flex: 100},
        {field: "dayOfWeek", headerName: "Thứ", flex: 50},
        {field: "timeNotParse", headerName: "Thời gian", flex: 150},
        {field: "weekNotParse", headerName: "Tuần học", flex: 150},
        {field: "place", headerName: "Phòng học", flex: 100},
    ];

    return (
        <DataGrid
            columns={columns}
            rows={allTimeTable}
            disableRowSelectionOnClick
            disableColumnSorting
            disableColumnMenu
            initialState={{
                sorting: {
                    sortModel: [{field: "dayOfWeek", sort: "asc"}],
                },
            }}
        />
    );
};
