import * as ACTION_TYPE from './ACTION_TYPE';
import Api from '../../../Api';
import {eventEmitter} from '../../../Singleton';
import EVENT from '../../../CONSTANT/EVENT';

export function getUserInfoAction()
{
    return async dispatch =>
    {
        const userInfo = await Api.sendGetUserInfoRequestAsync();
        eventEmitter.emit(EVENT.CONTROL_PANEL.USER_INFO_UPDATE_COMPLETED);
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

function getUserInfoSuccessfulAction(userInfo)
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