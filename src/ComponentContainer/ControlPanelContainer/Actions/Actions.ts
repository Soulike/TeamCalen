import * as ACTION_TYPE from './ACTION_TYPE';
import Api from '../../../Api';
import redux from 'redux';
import {UserProfile} from '../../../Class';

export function getUserProfileAction()
{
    return async (dispatch: redux.Dispatch) =>
    {
        const userProfile = await Api.sendGetUserProfileRequestAsync();
        if (userProfile)
        {
            dispatch(getUserProfileSuccessfulAction(userProfile));
        }
        else
        {
            dispatch(getUserProfileFailedAction());
        }
    };
}

function getUserProfileSuccessfulAction(userProfile: UserProfile)
{
    return {
        type: ACTION_TYPE.GET_USER_PROFILE_SUCCESSFUL,
        userProfile,
    };
}

function getUserProfileFailedAction()
{
    return {
        type: ACTION_TYPE.GET_USER_PROFILE_FAILED,
    };
}