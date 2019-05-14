import * as ACTION_TYPE from './Actions/ACTION_TYPE';
import redux from 'redux';

export default (state = {}, action: redux.Action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.CHANGE_CURRENT_MODIFYING_SCHEDULE_ID:
        {
            // @ts-ignore
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