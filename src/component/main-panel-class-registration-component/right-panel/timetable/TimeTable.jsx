import {Grid} from "@mui/material";
import {ViewState} from '@devexpress/dx-react-scheduler';
import {Appointments, Scheduler, WeekView,} from '@devexpress/dx-react-scheduler-material-ui';

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
    registedClass.forEach(cl => {
        let classTimetable = JSON.parse(cl.timetables)
        classTimetable.forEach(ttb => {
            result.push({
                classId: cl.classId,
                timetable: {
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
                    week: parseWeekToArray(ttb.week),
                    place: ttb.place,
                    dayOfWeek: ttb.dayOfWeek
                }
            })
        })
    })
    return result
}

export const TimeTable = ({registedClass}) => {
    if (!registedClass || registedClass.length === 0) return <></>

    return (
        <Grid container spacing={2}>
            <Grid item>
                <TimeTableWeek weekNumber={3} registedClass={registedClass} dayStartWeek1={new Date(2024, 7, 9)}/>
            </Grid>
        </Grid>
    )
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
    dateTmp.setDate(date.getDate() + dayOfWeek - 1 + (weekNumber - 1) * 7)
    const year = dateTmp.getFullYear();
    const month = pad(dateTmp.getMonth() + 1);
    const day = pad(dateTmp.getDate());
    console.log(dateTmp)
    return `${year}-${month}-${day}T${pad(hour)}:${pad(minute)}`;
}

const getSchedulerWeek = (week, allTimeTable, dayStartWeek1) => {
    console.log(allTimeTable)
    const resultWeek = []
    allTimeTable.forEach(item => {
        if (item.timetable.week.includes(week)) {
            resultWeek.push({
                title: item.classId,
                startDate: getDateStringData(dayStartWeek1, week, item.timetable.dayOfWeek, item.timetable.from.hour, item.timetable.from.minute),
                endDate: getDateStringData(dayStartWeek1, week, item.timetable.dayOfWeek, item.timetable.to.hour, item.timetable.to.minute),
            })
        }
    })
    return resultWeek
}

const simpleData = [
    {startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym'},
];

export const TimeTableWeek = ({weekNumber, dayStartWeek1, registedClass}) => {

    const weekSchedulerData = getSchedulerWeek(weekNumber, getAllTimetable(registedClass), dayStartWeek1)
    console.log(weekSchedulerData)
    return (
        <Scheduler
            data={weekSchedulerData}
            title={'siuuuuuuu'}

        >
            <ViewState
                currentDate={'2024-08-26'}
            />
            <WeekView
                startDayHour={6}
                endDayHour={18}
                cellDuration={120}
                name='Tuần 1'
            />
            <Appointments/>
        </Scheduler>
    )
}

