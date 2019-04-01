export class TimelineItem
{
    constructor(month, day, startHour, startMinute, endHour, endMinute,
                scheduleText, scheduleState,
                onSwitchChange, onResumeClick, onCancelClick, onDeleteClick, onModifyClick)
    {
        this.month = month;
        this.day = day;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.scheduleText = scheduleText;
        this.scheduleState = scheduleState;
        this.onSwitchChange = onSwitchChange;
        this.onResumeClick = onResumeClick;
        this.onCancelClick = onCancelClick;
        this.onDeleteClick = onDeleteClick;
        this.onModifyClick = onModifyClick;
    }
}