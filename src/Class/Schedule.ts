class Schedule
{
    public year: string;
    public month: string;
    public day: string;
    public startHour: number;
    public startMinute: number;
    public endHour: number;
    public endMinute: number;
    public scheduleText: string;
    public hasReminder?: boolean;
    public scheduleState?: boolean;

    constructor(year: string, month: string, day: string,
                startHour: number, startMinute: number, endHour: number, endMinute: number,
                scheduleText: string, hasReminder?: boolean, scheduleState?: boolean)
    {
        this.year = year;
        this.month = month;
        this.day = day;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.scheduleText = scheduleText;
        this.hasReminder = hasReminder;
        this.scheduleState = scheduleState;
    }
}

export class RequestSchedule extends Schedule {}

export class ResponseSchedule extends Schedule
{
    public id: number;

    constructor(id: number,
                year: string, month: string, day: string,
                startHour: number, startMinute: number, endHour: number, endMinute: number,
                scheduleText: string, hasReminder?: boolean, scheduleState?: boolean)
    {
        super(year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, hasReminder, scheduleState);
        this.id = id;
    }
}