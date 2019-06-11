import * as ACTION_TYPE from './Actions/ACTION_TYPE';
import redux from 'redux';

export default (state = {}, action: redux.Action & any) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.GET_USER_PROFILE_SUCCESSFUL:
        {
            const {userProfile} = action;
            return {
                ...state,
                userProfile,
            };
        }
        case ACTION_TYPE.GET_USER_PROFILE_FAILED:
        default:
        {
            return state;
        }
    }
}