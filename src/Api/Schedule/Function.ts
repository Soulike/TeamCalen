import Function from '../../Function';

export function schedulePrefix(url: string): string
{
    url = Function.removePrependSlashes(url);
    return Function.requestPrefix(`/schedule/${url}`);
}