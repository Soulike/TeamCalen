import Store from '../../Store';
import * as Actions from './Actions/Actions';

export function setOnline()
{
    Store.dispatch(Actions.setOnlineAction());
}

export function setOffline()
{
    Store.dispatch(Actions.setOfflineAction());
}