import {Grid} from "@mui/material";
import {ViewState} from '@devexpress/dx-react-scheduler';
import {Appointments, Scheduler, WeekView,} from '@devexpress/dx-react-scheduler-material-ui';
import {useEffect, useState} from "react";
import {getDayStartYear} from "../../../../api/MetadataApi.js";
import {DataGrid} from "@mui/x-data-grid";

/**
 * @param week example '3-10, 12-19, 20, 24-26'
 */
const parseWeekToArray = (week) => {
    let result = []
    let weekParts = week.split(",")
    weekParts.forEach(weekPart => {
        if (weekPart.includes("-")) {
            let [start, end] = weekPart.split("-").map(Number);
            for (let i = start; i <= end; i++) {
                result.push(i)
            }
        } else {
            result.push(Number(weekPart))
        }
    })
    return result
}

const getAllTimetable = (registedClass) => {
    let result = []
    let startWeek = 100
    let endWeek = 0
    registedClass.forEach(cl => {
        let classTimetable = JSON.parse(cl.timetables)
        classTimetable.forEach(ttb => {
            const week = parseWeekToArray(ttb.week)
            result.push({
                id: cl.classId + ttb.week + ttb.from + ttb.to,
                classId: cl.classId,
                courseName: cl.courseName,
                credit: cl.credit,
                classType: cl.classType,
                courseId: cl.courseId,
                from:
                    {
                        hour: parseInt(ttb.from.slice(0, 2), 10),
                        minute: parseInt(ttb.from.slice(2, 4), 10),
                    },
                to:
                    {
                        hour: parseInt(ttb.to.slice(0, 2), 10),
                        minute: parseInt(ttb.to.slice(2, 4), 10),
                    },
                timeNotParse: ttb.from + '-' + ttb.to,
                week: week,
                weekNotParse: ttb.week,
                place: ttb.place,
                dayOfWeek: ttb.dayOfWeek
            })
            startWeek = Math.min(...week, startWeek)
            endWeek = Math.max(...week, endWeek)
        })
    })
    return {
        startWeek: startWeek,
        endWeek: endWeek,
        allTimeTable: result
    }
}


function pad(number) {
    return number < 10 ? '0' + number : number;
}

/**
 * @param date
 * @param weekNumber
 * @param dayOfWeek
 * @param hour
 * @param minute
 * @return (yyyy-mm-ddThh:mm)
 */
const getDateStringData = (date, weekNumber, dayOfWeek, hour, minute) => {
    const dateTmp = new Date(date)
    dateTmp.setDate(dateTmp.getDate() + dayOfWeek - 1 + (weekNumber - 1) * 7)
    const year = dateTmp.getFullYear();
    const month = pad(dateTmp.getMonth() + 1);
    const day = pad(dateTmp.getDate());
    return `${year}-${month}-${day}T${pad(hour)}:${pad(minute)}`;
}

const getDataSchedulerForTimetable = (startWeek, endWeek, allTimeTable, dayStartYear) => {
    const result = []
    for (let week = startWeek; week <= endWeek; week++) {
        allTimeTable.forEach(item => {
            if (item.week.includes(week)) {
                result.push({
                    title: item.classId,
                    startDate: getDateStringData(dayStartYear, week, item.dayOfWeek, item.from.hour, item.from.minute),
                    endDate: getDateStringData(dayStartYear, week, item.dayOfWeek, item.to.hour, item.to.minute),
                })
            }
        })
    }
    return result

}

const offSetWeek = (dayStartYear, weekNumber) => {
    let date = new Date(dayStartYear);
    date.setDate(date.getDate() + (weekNumber - 1) * 7)
    return date
}


const TimeTableWeek = (props) => {

    // DEFAULT
    const {weekNumber = '1', dayStartYear = '', data = []} = props
    return (
        <Scheduler
            data={data}
            title={'siuuuuuuu'}

        >
            <ViewState
                currentDate={offSetWeek(dayStartYear, weekNumber)}
            />

            <WeekView
                startDayHour={5.75}
                endDayHour={18.25}
                cellDuration={120}
                name='Tuần 1'
            />
            <Appointments/>
        </Scheduler>
    )
}

const getMonthsOfData = (dataScheduleForTimetable) => {
    if(!dataScheduleForTimetable){
        return null
    }
    let months = []
    dataScheduleForTimetable.forEach(scheduler => {
        const tmpDate = new Date(scheduler.startDate)
        let date = new Date(tmpDate.getFullYear(),tmpDate.getMonth())
        const month = date.getMonth()+1
        if(!months.includes(month)){
            months.push(month)
        }
    })
    return months
}

export const TimetableViewByWeek = (props) => {
    const {registedClass = [], semester = ''} = props

    const [dayStartYear, setDayStartYear] = useState(null)

    const fetchDayStartYear = async (semester) => {
        const data = await getDayStartYear(semester.slice(0, 4))
        setDayStartYear(new Date(data))
    }

    useEffect(() => {
        fetchDayStartYear(semester)
    }, [semester]);

    if (!registedClass || registedClass.length === 0) return <></>
    const {startWeek, endWeek, allTimeTable} = getAllTimetable(registedClass)

    const data = getDataSchedulerForTimetable(startWeek,endWeek,allTimeTable,dayStartYear)

    return (
        <Grid container spacing={2}>
            {Array.from({length:10},(_,index)=>(
                <Grid item key={index}>
                    <Scheduler
                        data={data}
                        title={'siuuuuuuu'}

                    >
                        <ViewState
                            currentDate={offSetWeek(dayStartYear, index+startWeek)}
                        />

                        <WeekView
                            startDayHour={5.75}
                            endDayHour={18.25}
                            cellDuration={120}
                            name='Tuần 1'
                        />
                        <Appointments/>
                    </Scheduler>
                </Grid>
            ))}
        </Grid>
    )
}

export const TimetableViewByMonth = (props)=>{
    const {registedClass = [], semester = ''} = props
    const [dayStartYear, setDayStartYear] = useState(null)
    const fetchDayStartYear = async (semester) => {
        const data = await getDayStartYear(semester.slice(0, 4))
        setDayStartYear(new Date(data))
    }

    useEffect(() => {
        fetchDayStartYear(semester)
    }, [semester]);

    if (!registedClass || registedClass.length === 0) return <></>
    const {startWeek, endWeek, allTimeTable} = getAllTimetable(registedClass)

    const data = getDataSchedulerForTimetable(startWeek,endWeek,allTimeTable,dayStartYear)

    const months = getMonthsOfData (data)
    console.log(months)
    return (
        <Grid container spacing={2}>
            <Grid item>
                <Scheduler
                    data={data}
                    title={'siuuuuuuu'}

                >
                    <ViewState
                        currentDate={'2024-07-16'}
                        currentViewName={'month'}
                    />

                    <WeekView
                        startDayHour={5.75}
                        endDayHour={18.25}
                        cellDuration={120}
                        name='Tuần 1'
                    />
                    <Appointments/>
                </Scheduler>
            </Grid>
        </Grid>
    )
}

export const DefaultTimetable = (props) => {
    const {registedClass = [], semester = ''} = props

    const {allTimeTable} = getAllTimetable(registedClass)
    const columns = [
        {field: 'classId', headerName: 'Mã lớp', flex: 90},
        {field: 'courseId', headerName: 'Mã HP', flex: 100},
        {field: 'courseName', headerName: 'Tên HP', flex: 300},
        {field: 'classType', headerName: 'Loại lớp', flex: 100},
        {field: 'dayOfWeek', headerName: 'Thứ', flex: 50},
        {field: 'timeNotParse', headerName: 'Thời gian', flex: 150},
        {field: 'weekNotParse', headerName: 'Tuần học', flex: 150},
        {field: 'place', headerName: 'Phòng học', flex: 100},
    ]

    return (
        <DataGrid
            columns={columns}
            rows={allTimeTable}
            disableRowSelectionOnClick
            disableColumnSorting
            disableColumnMenu

            initialState={{
                sorting: {
                    sortModel: [
                        {field: 'dayOfWeek', sort: 'asc'}
                    ]
                }
            }}
        />
    )
}