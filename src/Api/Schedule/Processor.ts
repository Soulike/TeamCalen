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
import {SCHEDULE_STATE, STATUS_CODE} from '../../CONSTANT';
import message from 'antd/lib/message';
import {Function as AuthProcessorFunction} from '../../ComponentContainer/AuthProcessor';
import {Schedule} from '../../Class';

export async function sendGetEveryDayScheduleAmountInAMonthRequestAsync(year: string, month: string): Promise<any | null>
{
    try
    {
        const {code, data} = await Function.getAsync(GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH, false, {
            year,
            month,
        });

        switch (code)
        {
            case STATUS_CODE.OK:
            {
                return data;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('获取每日日程数量操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('每日日程数量不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的获取每日日程数量失败');
                return null;
            }
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
        const {code, data} = await Function.getAsync(GET_RECENT_SCHEDULES, false, {amount});
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                const scheduleArray: Array<Schedule> = [];
                data.schedules.forEach((serializedSchedule: any) =>
                {
                    scheduleArray.push(Schedule.from(serializedSchedule));
                });
                return {schedules: scheduleArray};
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('获取近期日程操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('近期日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的获取近期日程失败');
                return null;
            }
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
        const {code, data} = await Function.getAsync(GET_SCHEDULES_BY_DAY, false, {
            year,
            month,
            day,
        });

        switch (code)
        {
            case STATUS_CODE.OK:
            {
                const scheduleArray: Array<Schedule> = [];
                data.schedules.forEach((serializedSchedule: any) =>
                {
                    scheduleArray.push(Schedule.from(serializedSchedule));
                });
                return {schedules: scheduleArray};
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('获取日程操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的获取日程失败');
                return null;
            }
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
        const {code} = await Function.postAsync(CHANGE_SCHEDULE_STATE, {
            scheduleId,
            state,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('修改日程状态成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('修改日程状态操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的修改日程状态失败');
                return null;
            }
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
        const {code} = await Function.postAsync(RESUME_SCHEDULE, {
            scheduleId,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('恢复日程成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('恢复日程操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的恢复日程失败');
                return null;
            }
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
        const {code} = await Function.postAsync(CANCEL_SCHEDULE, {
            scheduleId,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('取消日程成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('取消日程操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的取消日程失败');
                return null;
            }
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
        const {code} = await Function.postAsync(DELETE_SCHEDULE, {
            scheduleId,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('删除日程成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('删除日程操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的删除日程失败');
                return null;
            }
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
        const {code} = await Function.postAsync(MODIFY_SCHEDULE, {
            scheduleId,
            schedule,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('修改日程成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('修改日程操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的修改日程失败');
                return null;
            }
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
        const {code} = await Function.postAsync(CREATE_SCHEDULE, {schedule});
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('创建日程成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('创建日程操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的创建日程失败');
                return null;
            }
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
        const {code, data} = await Function.getAsync(GET_SCHEDULE_BY_ID, false, {
            scheduleId,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                return data;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('获取日程信息操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的获取日程信息失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}