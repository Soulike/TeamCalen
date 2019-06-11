import Function from '../../Function';
import {SERVER_PREFIX} from '../../CONFIG';

export function schedulePrefix(url: string): string
{
    url = Function.removePrependSlashes(url);
    return Function.requestPrefix(SERVER_PREFIX, `/schedule/${url}`);
}