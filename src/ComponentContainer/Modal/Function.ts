import * as Actions from './Actions/Actions';
import Store from '../../Store';
import eventEmitter from './EventEmitter';
import {MODAL_ID} from '../../CONSTANT';

export function showModal(modalId: MODAL_ID, callback: () => any = () => null)
{
    Store.dispatch(Actions.showModalAction(modalId));
    onModalShow(modalId, callback);
}

export function showModalAsync(modalId: MODAL_ID)
{
    return new Promise(resolve =>
    {
        showModal(modalId, () =>
        {
            resolve();
        });
    });
}

export function closeModal(modalId: MODAL_ID, callback: () => any = () => null)
{
    Store.dispatch(Actions.closeModalAction(modalId));
    afterModalClose(modalId, callback);
}

export function closeModalAsync(modalId: MODAL_ID)
{
    return new Promise(resolve =>
    {
        closeModal(modalId, () =>
        {
            resolve();
        });
    });
}

export function onModalShow(modalId: MODAL_ID, callback: () => any = () => null)
{
    eventEmitter.once(getModalShowEventName(modalId), callback);
}

export function afterModalClose(modalId: MODAL_ID, callback: () => any = () => null)
{
    eventEmitter.once(getModalCloseEventName(modalId), callback);
}

export function getModalShowEventName(modalId: MODAL_ID)
{
    return `${modalId}.show`;
}

export function getModalCloseEventName(modalId: MODAL_ID)
{
    return `${modalId}.close`;
}