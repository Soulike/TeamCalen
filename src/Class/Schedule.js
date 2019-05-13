class Schedule
{
    constructor(year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, scheduleState)
    {
        this.year = year;
        this.month = month;
        this.day = day;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.scheduleText = scheduleText;
        this.scheduleState = scheduleState;
    }
}

export class RequestSchedule extends Schedule
{
    constructor(year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, scheduleState)
    {
        super(year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, scheduleState);
    }
}

export class ResponseSchedule extends Schedule
{
    constructor(id, year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, scheduleState)
    {
        super(year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, scheduleState);
        this.id = id;
    }
}