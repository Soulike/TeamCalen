import Store from '../../../Store';
import * as Actions from './Actions/Actions';

export function getRecentSchedules()
{
    Store.dispatch(Actions.getRecentSchedulesAction());
}