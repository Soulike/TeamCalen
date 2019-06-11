import {SCHEDULE_STATE} from '../../../../../../../CONSTANT';
import {ClickParam} from 'antd/lib/menu';

export class TimelineItem
{
    public scheduleId: number;
    public month: string;
    public day: string;
    public startHour: number;
    public startMinute: number;
    public endHour: number;
    public endMinute: number;
    public scheduleText: string;
    public scheduleState: SCHEDULE_STATE;
    public onSwitchChange: (checked: boolean, event: MouseEvent) => any;
    public onResumeClick: (param: ClickParam) => void;
    public onCancelClick: (param: ClickParam) => void;
    public onDeleteClick: (param: ClickParam) => void;
    public onModifyClick: (param: ClickParam) => void;


    constructor(scheduleId: number, month: string, day: string, startHour: number, startMinute: number, endHour: number, endMinute: number,
                scheduleText: string, scheduleState: SCHEDULE_STATE,
                onSwitchChange: (checked: boolean, event: MouseEvent) => any,
                onResumeClick: (param: ClickParam) => void,
                onCancelClick: (param: ClickParam) => void,
                onDeleteClick: (param: ClickParam) => void,
                onModifyClick: (param: ClickParam) => void)
    {
        this.scheduleId = scheduleId;
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