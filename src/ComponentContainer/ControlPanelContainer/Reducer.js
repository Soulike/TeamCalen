import * as ACTION_TYPE from './Actions/ACTION_TYPE';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.GET_USER_INFO_SUCCESSFUL:
        {
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