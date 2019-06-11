import * as ACTION_TYPE from './ACTION_TYPE';
import eventEmitter from '../EventEmitter';
import {getModalCloseEventName, getModalShowEventName} from '../Function';
import {MODAL_ID} from '../../../CONSTANT';

export function showModalAction(modalId: MODAL_ID)
{
    eventEmitter.emit(getModalShowEventName(modalId));
    return {
        type: ACTION_TYPE.SHOW_MODAL,
        modalId,
    };
}

export function closeModalAction(modalId: MODAL_ID)
{
    eventEmitter.emit(getModalCloseEventName(modalId));
    return {
        type: ACTION_TYPE.CLOSE_MODAL,
        modalId,
    };
}