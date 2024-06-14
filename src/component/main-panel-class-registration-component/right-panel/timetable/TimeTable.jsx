import {Grid} from "@mui/material";

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

const getAllTimetable = (registedClass)=>{
    let result = []
    registedClass.forEach(cl=>{
        let classTimetable = JSON.parse(cl.timetables)
        classTimetable.forEach(ttb => {
            result.push({
                classId:cl.classId,
                timetable:{
                    from:
                        {
                            hour:parseInt(ttb.from.slice(0,2),10),
                            minute:parseInt(ttb.from.slice(2,4),10),
                        },
                    to:
                        {
                            hour:parseInt(ttb.to.slice(0,2),10),
                            minute:parseInt(ttb.to.slice(2,4),10),
                        },
                    week:parseWeekToArray(ttb.week),
                    place:ttb.place,
                    dayOfWeek:ttb.dayOfWeek
                }
            })
        })
    })
    return result
}

const getTimeTableWeek = ({week})=>{

}

export const TimeTable = ({registedClass}) => {
    // TODO: line for developer
    if (registedClass.length === 0) return <></>
    console.log(getAllTimetable(registedClass))

    return (
        <Grid container spacing={2}>
            {/*{Array.from(Array(50).keys()).map((_, index) => (*/}
            {/*    <Grid item key={index}>*/}
            {/*        <Typography>*/}
            {/*            Siuu*/}
            {/*        </Typography>*/}
            {/*    </Grid>*/}
            {/*))}*/}
            <TimeTableWeek week={1}/>
        </Grid>
    )
}

export const TimeTableWeek = ({week,}) => {
    return <></>
}