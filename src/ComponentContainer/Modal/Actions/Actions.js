import * as ACTION_TYPE from './ACTION_TYPE';
import eventEmitter from '../EventEmitter';
import {getModalCloseEventName, getModalShowEventName} from '../Function';

export function showModalAction(modalId)
{
    eventEmitter.emit(getModalShowEventName(modalId));
    return {
        type: ACTION_TYPE.SHOW_MODAL,
        modalId,
    };
}

export function closeModalAction(modalId)
{
    eventEmitter.emit(getModalCloseEventName(modalId));
    return {
        type: ACTION_TYPE.CLOSE_MODAL,
        modalId,
    };
}