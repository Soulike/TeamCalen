import * as ACTION_TYPE from './Actions/ACTION_TYPE';

export default (state = {}, action: any) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.CHANGE_CURRENT_MODIFYING_SCHEDULE_ID:
        {
            const {scheduleId} = action;
            return {
                ...state,
                currentModifyingScheduleId: scheduleId,
            };
        }
        default:
        {
            return state;
        }
    }
}