import Function from '../../Function';
import {
    CANCEL_SCHEDULE,
    CHANGE_SCHEDULE_STATE,
    CREATE_SCHEDULE,
    DELETE_SCHEDULE,
    GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH,
    GET_RECENT_SCHEDULES,
    GET_SCHEDULE_BY_ID,
    GET_SCHEDULES_BY_DAY,
    MODIFY_SCHEDULE,
    RESUME_SCHEDULE,
} from './ROUTE';
import {SCHEDULE_STATE} from '../../CONSTANT';
import message from 'antd/lib/message';
import {Schedule} from '../../Class';

export async function sendGetEveryDayScheduleAmountInAMonthRequestAsync(year: string, month: string): Promise<{ scheduleAmount: Array<number> } | null>
{
    try
    {
        const {isSuccessful, message: msg, data} = await Function.getAsync(GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH, false, {
            year,
            month,
        });

        if (isSuccessful)
        {
            return data;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendGetRecentSchedulesRequestAsync(amount: number): Promise<{ schedules: Array<Schedule> } | null>
{
    try
    {
        const {isSuccessful, message: msg, data} = await Function.getAsync(GET_RECENT_SCHEDULES, false, {amount});

        if (isSuccessful)
        {
            const scheduleArray: Array<Schedule> = [];
            data.schedules.forEach((serializedSchedule: any) =>
            {
                scheduleArray.push(Schedule.from(serializedSchedule));
            });
            return {schedules: scheduleArray};
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendGetSchedulesByDayRequestAsync(year: string, month: string, day: string): Promise<{ schedules: Array<Schedule> } | null>
{
    try
    {
        const {isSuccessful, message: msg, data} = await Function.getAsync(GET_SCHEDULES_BY_DAY, false, {
            year,
            month,
            day,
        });

        if (isSuccessful)
        {
            const scheduleArray: Array<Schedule> = [];
            data.schedules.forEach((serializedSchedule: any) =>
            {
                scheduleArray.push(Schedule.from(serializedSchedule));
            });
            return {schedules: scheduleArray};
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostChangeScheduleStateRequestAsync(scheduleId: number, state: SCHEDULE_STATE.FINISHED | SCHEDULE_STATE.UNFINISHED): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(CHANGE_SCHEDULE_STATE, {
            scheduleId,
            state,
        });

        if (isSuccessful)
        {
            message.success('日程状态切换成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostResumeScheduleRequestAsync(scheduleId: number): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(RESUME_SCHEDULE, {
            scheduleId,
        });

        if (isSuccessful)
        {
            message.success('日程恢复成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostCancelScheduleRequestAsync(scheduleId: number): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(CANCEL_SCHEDULE, {
            scheduleId,
        });

        if (isSuccessful)
        {
            message.success('日程取消成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostDeleteScheduleRequestAsync(scheduleId: number): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(DELETE_SCHEDULE, {
            scheduleId,
        });

        if (isSuccessful)
        {
            message.success('日程删除成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostModifyScheduleRequestAsync(scheduleId: number, schedule: Schedule): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(MODIFY_SCHEDULE, {
            scheduleId,
            schedule,
        });

        if (isSuccessful)
        {
            message.success('日程修改成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostCreateScheduleRequestAsync(schedule: Schedule): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(CREATE_SCHEDULE, {schedule});

        if (isSuccessful)
        {
            message.success('日程创建成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendGetScheduleByIdRequestAsync(scheduleId: number): Promise<Schedule | null>
{
    try
    {
        const {isSuccessful, message: msg, data} = await Function.getAsync(GET_SCHEDULE_BY_ID, false, {
            scheduleId,
        });

        if (isSuccessful)
        {
            return Schedule.from(data);
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}