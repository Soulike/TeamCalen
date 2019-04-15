import Store from '../../../Store';
import * as Actions from './Actions/Actions';
import {EVENT, eventEmitter} from './Event';

export function getRecentSchedules()
{
    Store.dispatch(Actions.getRecentSchedulesAction());
}

export function changeCurrentModifyingScheduleId(scheduleId)
{
    Store.dispatch(Actions.changeCurrentModifyingScheduleIdAction(scheduleId));
}

export function updateScheduleInfo()
{
    eventEmitter.emit(EVENT.SCHEDULE_CHANGED);
}