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
    if (!registedClass||registedClass.length === 0) return <></>
    console.log(getAllTimetable(registedClass))

    return (
        <Grid container spacing={2}>
            <Grid item >
                <TimeTableWeek registedClass={registedClass}/>
            </Grid>
        </Grid>
    )
}

// TODO: TEST
const getSchedulerData = ({dayStartWeek1,allTimeTable})=>{
    console.log(allTimeTable)
}

const schedulerData = [
    {startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting'},
    {startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym'},
];

export const TimeTableWeek = ({weekNumber,dayStartWeek1,timetables,registedClass}) => {
    getSchedulerData({dayStartWeek1:1,allTimeTable:getAllTimetable(registedClass)})
    return (
        <Scheduler
            data={schedulerData}
            title={'siuuuuuuu'}

        >
            <ViewState
                currentDate={'2018-11-01'}
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

