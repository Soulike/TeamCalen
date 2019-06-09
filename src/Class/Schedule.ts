import {SCHEDULE_STATE} from '../CONSTANT';

/**
 * @class
 * @description 日程类，对应数据库的 Schedule 表
 * */
export class Schedule
{
    public id?: number;      // id
    public day?: Date;          // 所属日期
    public startTime?: Date | null;    // 开始时间，包括年月日时间
    public endTime?: Date | null;      // 结束时间
    public scheduleText?: string;   // 日程的具体内容
    public hasReminder?: boolean;   // 是否有提醒，默认值 false
    public scheduleState?: SCHEDULE_STATE;    // 枚举值，日程的状态，默认值 SCHEDULE_STATE.UNFINISHED'
    public username?: string | null;            // 日程所属的人

    constructor(id?: number, day?: Date, startTime?: Date | null, endTime?: Date | null, scheduleText?: string, hasReminder?: boolean, scheduleState?: SCHEDULE_STATE, username?: string | null)
    {
        this.id = id;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.scheduleText = scheduleText;
        this.hasReminder = hasReminder;
        this.scheduleState = scheduleState;
        this.username = username;
    }
}