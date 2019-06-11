import Function from '../../Function';
import {SERVER_PREFIX} from '../../CONFIG';

export function accountPrefix(url: string): string
{
    url = Function.removePrependSlashes(url);
    return Function.requestPrefix(SERVER_PREFIX, `/account/${url}`);
}