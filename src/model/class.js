class Class {
    constructor(id, semester, semesterType, maxStudent, currentRegisted, theoryClassId, classType, status, courseId, timetables = []) {
        this.id = id;
        this.semester = semester;
        this.semesterType = semesterType;
        this.maxStudent = maxStudent;
        this.currentRegisted = currentRegisted !== undefined ? currentRegisted : -1;
        this.theoryClassId = theoryClassId;
        this.classType = classType;
        this.status = status;
        this.courseId = courseId;
        this.timetables = timetables.map(t => new TimeTable(t.week, t.from, t.to, t.place, t.dayOfWeek));
    }
}

class TimeTable {
    constructor(week, from, to, place, dayOfWeek) {
        this.week = week;
        this.from = from;
        this.to = to;
        this.place = place;
        this.dayOfWeek = dayOfWeek;
    }
}

export default Class