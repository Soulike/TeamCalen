import Function from '../../Function';

export function schedulePrefix(url)
{
    url = Function.removePrependSlashes(url);
    return Function.requestPrefix(`/schedule/${url}`);
}