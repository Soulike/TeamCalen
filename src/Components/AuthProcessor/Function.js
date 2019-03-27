import Store from '../../Store';
import * as Actions from './Actions/Actions';
import {browserHistory} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../Router';

export function setOnline()
{
    Store.dispatch(Actions.setOnlineAction());
}

export function setOffline()
{
    Store.dispatch(Actions.setOfflineAction());
}

export function requireLogin()
{
    const {AuthProcessor: {hasLoggedIn}} = Store.getState();
    if (!hasLoggedIn)
    {
        browserHistory.push(PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]);
    }
}