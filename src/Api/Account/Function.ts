import Function from '../../Function';

export function accountPrefix(url: string): string
{
    url = Function.removePrependSlashes(url);
    return Function.requestPrefix(`/account/${url}`);
}