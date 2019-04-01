import * as Actions from './Actions/Actions';
import Store from '../../Store';

export function showModal(modalId)
{
    Store.dispatch(Actions.showModalAction(modalId));
}

export function hideModal(modalId)
{
    Store.dispatch(Actions.hideModalAction(modalId));
}