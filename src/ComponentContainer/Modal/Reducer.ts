import * as ACTION_TYPE from './Actions/ACTION_TYPE';
import redux from 'redux';

export default (state = {}, action: redux.Action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.SHOW_MODAL:
        {
            // @ts-ignore
            const {currentVisibleModalIdSet} = state;
            // @ts-ignore
            const {modalId} = action;
            currentVisibleModalIdSet.add(modalId);
            return {
                ...state,
                currentVisibleModalIdSet: new Set(currentVisibleModalIdSet),
            };
        }
        case ACTION_TYPE.CLOSE_MODAL:
        {
            // @ts-ignore
            const {currentVisibleModalIdSet} = state;
            // @ts-ignore
            const {modalId} = action;
            currentVisibleModalIdSet.delete(modalId);
            return {
                ...state,
                currentVisibleModalIdSet: new Set(currentVisibleModalIdSet),
            };
        }
        default:
        {
            return state;
        }
    }
}