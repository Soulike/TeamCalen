import Store from '../../../Store';
import * as Actions from './Actions/Actions';

export function changeCurrentModifyingScheduleId(scheduleId: number)
{
    Store.dispatch(Actions.changeCurrentModifyingScheduleIdAction(scheduleId));
}