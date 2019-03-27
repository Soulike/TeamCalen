import * as ACTION_TYPE from './ACTION_TYPE';
import Api from '../../../Api';

export function loginAcion(username, password)
{
    return async dispatch =>
    {
        const requestIsSuccessful = await Api.sendPostLoginRequestAsync(username, password);
        if (requestIsSuccessful)
        {
            dispatch(loginSuccessfulAction());
        }
        else
        {
            dispatch(loginFailedAction());
        }
    };
}

function loginSuccessfulAction()
{
    return {
        type: ACTION_TYPE.LOGIN_SUCCESSFUL,
    };
}

function loginFailedAction()
{
    return {
        type: ACTION_TYPE.LOGIN_FAILED,
    };
}

export function setOnlineAction()
{
    return {
        type: ACTION_TYPE.SET_ONLINE,
    };
}

export function setOfflineAction()
{
    return {
        type: ACTION_TYPE.SET_OFFLINE,
    };
}