import * as ACTION_TYPE from './Actions/ACTION_TYPE';
import redux from 'redux';

export default (state = {}, action: redux.Action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.GET_USER_INFO_SUCCESSFUL:
        {
            // @ts-ignore
            const {userInfo} = action;
            return {
                ...state,
                userInfo,
            };
        }
        case ACTION_TYPE.GET_USER_INFO_FAILED:
        default:
        {
            return state;
        }
    }
}