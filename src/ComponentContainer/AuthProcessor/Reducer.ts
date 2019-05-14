import * as ACTION_TYPE from './Actions/ACTION_TYPE';
import redux from 'redux';

export default (state = {}, action: redux.Action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.LOGIN_SUCCESSFUL:
        case ACTION_TYPE.SET_ONLINE:
        {
            return {
                ...state,
                hasLoggedIn: true,
            };
        }
        case ACTION_TYPE.LOGIN_FAILED:
        case ACTION_TYPE.SET_OFFLINE:
        {
            return {
                ...state,
                hasLoggedIn: false,
            };
        }
        default:
        {
            return state;
        }
    }

}