import * as ACTION_TYPE from './ACTION_TYPE';
import Api from '../../../Api';
import redux from 'redux';
import {UserInfo} from '../../../Class';

export function getUserInfoAction()
{
    return async (dispatch: redux.Dispatch) =>
    {
        const userInfo = await Api.sendGetUserInfoRequestAsync();
        if (userInfo)
        {
            dispatch(getUserInfoSuccessfulAction(userInfo));
        }
        else
        {
            dispatch(getUserInfoFailedAction());
        }
    };
}

function getUserInfoSuccessfulAction(userInfo: UserInfo)
{
    return {
        type: ACTION_TYPE.GET_USER_INFO_SUCCESSFUL,
        userInfo,
    };
}

function getUserInfoFailedAction()
{
    return {
        type: ACTION_TYPE.GET_USER_INFO_FAILED,
    };
}