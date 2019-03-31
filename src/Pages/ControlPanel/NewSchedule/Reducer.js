import * as ACTION_TYPE from './Actions/ACTION_TYPE';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH_SUCCESSFUL:
        {
            const {scheduleAmount} = action;
            return {
                ...state,
                scheduleAmount,
            };
        }
        case ACTION_TYPE.GET_RECENT_SCHEDULES_SUCCESSFUL:
        {
            const {recentSchedules} = action;
            return {
                ...state,
                recentSchedules,
            };
        }
        case ACTION_TYPE.GET_EVERY_DAY_SCHEDULE_AMOUNT_IN_A_MONTH_FAILED:
        case ACTION_TYPE.GET_RECENT_SCHEDULES_FAILED:
        default:
        {
            return state;
        }
    }
}