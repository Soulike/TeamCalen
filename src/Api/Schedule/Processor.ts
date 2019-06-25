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

export async function sendGetEveryDayScheduleAmountInAMonthRequestAsync(year: string, month: string): Promise<{ scheduleAmount: Array<number> } | null>
{
    try
    {
        const {status, data} = await Function.getAsync(GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH, false, {
            year,
            month,
        });

        switch (status)
        {
            case STATUS_CODE.OK:
            {
                return data;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status, data} = await Function.getAsync(GET_RECENT_SCHEDULES, false, {amount});
        switch (status)
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
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status, data} = await Function.getAsync(GET_SCHEDULES_BY_DAY, false, {
            year,
            month,
            day,
        });

        switch (status)
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
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status} = await Function.postAsync(CHANGE_SCHEDULE_STATE, {
            scheduleId,
            state,
        });
        switch (status)
        {
            case STATUS_CODE.OK:
            {
                message.success('日程状态切换成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status} = await Function.postAsync(RESUME_SCHEDULE, {
            scheduleId,
        });
        switch (status)
        {
            case STATUS_CODE.OK:
            {
                message.success('日程恢复成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status} = await Function.postAsync(CANCEL_SCHEDULE, {
            scheduleId,
        });
        switch (status)
        {
            case STATUS_CODE.OK:
            {
                message.success('日程取消成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status} = await Function.postAsync(DELETE_SCHEDULE, {
            scheduleId,
        });
        switch (status)
        {
            case STATUS_CODE.OK:
            {
                message.success('日程删除成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status} = await Function.postAsync(MODIFY_SCHEDULE, {
            scheduleId,
            schedule,
        });
        switch (status)
        {
            case STATUS_CODE.OK:
            {
                message.success('日程修改成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status} = await Function.postAsync(CREATE_SCHEDULE, {schedule});
        switch (status)
        {
            case STATUS_CODE.OK:
            {
                message.success('日程创建成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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
        const {status, data} = await Function.getAsync(GET_SCHEDULE_BY_ID, false, {
            scheduleId,
        });
        switch (status)
        {
            case STATUS_CODE.OK:
            {
                return Schedule.from(data);
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('请求解析失败');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                AuthProcessorFunction.setOffline();
                message.error('请先登录');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('日程不存在');
                return null;
            }
            case STATUS_CODE.UNPROCESSABLE_ENTITY:
            {
                message.error('请求参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器错误');
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