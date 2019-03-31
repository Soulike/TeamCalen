import * as ACTION_TYPE from './ACTION_TYPE';
import Api from '../../../../Api';

export function getEveryDayScheduleAmountInAMonthAction(year, month)
{
    return async dispatch =>
    {
        const scheduleAmountWrapper = await Api.sendGetEveryDayScheduleAmountInAMonthRequestAsync(year, month);
        if (scheduleAmountWrapper)
        {
            const {scheduleAmount} = scheduleAmountWrapper;
            dispatch(getEveryDayScheduleAmountInAMonthSuccessfulAction(scheduleAmount));
        }
        else
        {
            dispatch(getEveryDayScheduleAmountInAMonthFailedAction());
        }
    };
}

function getEveryDayScheduleAmountInAMonthSuccessfulAction(scheduleAmount)
{
    return {
        type: ACTION_TYPE.GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH_SUCCESSFUL,
        scheduleAmount,
    };
}

function getEveryDayScheduleAmountInAMonthFailedAction()
{
    return {
        type: ACTION_TYPE.GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH_FAILED,
    };
}

export function getRecentSchedulesAction(amount)
{
    return async dispatch =>
    {
        const recentSchedulesWrapper = await Api.sendGetRecentSchedulesRequestAsync(amount);
        if (recentSchedulesWrapper)
        {
            const {schedules} = recentSchedulesWrapper;
            dispatch(getRecentSchedulesSuccessfulAction(schedules));
        }
        else
        {
            dispatch(getRecentSchedulesFailedAction());
        }
    };
}

function getRecentSchedulesSuccessfulAction(recentSchedules)
{
    return {
        type: ACTION_TYPE.GET_RECENT_SCHEDULES_SUCCESSFUL,
        recentSchedules,
    };
}

function getRecentSchedulesFailedAction()
{
    return {
        type: ACTION_TYPE.GET_RECENT_SCHEDULES_FAILED,
    };
}