import Function from '../../Function';

export function controlPanelPrefix(url)
{
    url = Function.removePrependSlashes(url);
    return Function.requestPrefix(`/controlPanel/${url}`);
}