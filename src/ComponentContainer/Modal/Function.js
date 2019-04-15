import * as Actions from './Actions/Actions';
import Store from '../../Store';
import eventEmitter from './EventEmitter';

export function showModal(modalId, callback = () => null)
{
    Store.dispatch(Actions.showModalAction(modalId));
    onModalShow(modalId, callback);
}

export function showModalAsync(modalId)
{
    return new Promise(resolve =>
    {
        showModal(modalId, () =>
        {
            resolve();
        });
    });
}

export function closeModal(modalId, callback = () => null)
{
    Store.dispatch(Actions.closeModalAction(modalId));
    afterModalClose(modalId, callback);
}

export function closeModalAsync(modalId)
{
    return new Promise(resolve =>
    {
        closeModal(modalId, () =>
        {
            resolve();
        });
    });
}

export function onModalShow(modalId, callback)
{
    eventEmitter.on(getModalShowEventName(modalId), callback);
}

export function afterModalClose(modalId, callback)
{
    eventEmitter.on(getModalCloseEventName(modalId), callback);
}

export function getModalShowEventName(modalId)
{
    return `${modalId.description}.show`;
}

export function getModalCloseEventName(modalId)
{
    return `${modalId.description}.close`;
}