import * as ACTION_TYPE from './ACTION_TYPE';

export function changeCurrentModifyingScheduleIdAction(scheduleId)
{
    return {
        type: ACTION_TYPE.CHANGE_CURRENT_MODIFYING_SCHEDULE_ID,
        scheduleId,
    };
}