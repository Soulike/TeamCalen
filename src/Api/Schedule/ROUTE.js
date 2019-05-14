import {schedulePrefix} from './Function';

export const GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH = schedulePrefix('/getEveryDayScheduleAmountInAMonth');

export const GET_RECENT_SCHEDULES = schedulePrefix('/getRecentSchedules');

export const GET_SCHEDULES_BY_DAY = schedulePrefix('/getSchedulesByDay');

export const CHANGE_SCHEDULE_STATE = schedulePrefix('/changeScheduleState');

export const RESUME_SCHEDULE = schedulePrefix('/resumeSchedule');

export const CANCEL_SCHEDULE = schedulePrefix('/cancelSchedule');

export const DELETE_SCHEDULE = schedulePrefix('/deleteSchedule');

export const MODIFY_SCHEDULE = schedulePrefix('/modifySchedule');

export const CREATE_SCHEDULE = schedulePrefix('/createSchedule');

export const GET_SCHEDULE_BY_ID = schedulePrefix('/getScheduleById');