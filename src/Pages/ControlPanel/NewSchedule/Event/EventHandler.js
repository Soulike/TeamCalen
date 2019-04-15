import * as EVENT from './EVENT';
import * as Actions from '../Actions/Actions';
import Store from '../../../../Store';
import eventEmitter from '../Event/EventEmitter';

eventEmitter.on(EVENT.SCHEDULE_CHANGED, () =>
{
    const {NewSchedule: {selectedYear, selectedMonth}} = Store.getState();
    Store.dispatch(Actions.getEveryDayScheduleAmountInAMonthAction(selectedYear, selectedMonth));
    Store.dispatch(Actions.getRecentSchedulesAction(10));
});