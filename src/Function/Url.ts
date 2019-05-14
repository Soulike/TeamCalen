export function requestPrefix(url: string): string
{
    url = removePrependSlashes(url);
    return `/server/${url}`;
}

export function removePrependSlashes(str: string): string
{
    while (str.charAt(0) === '/')
    {
        str = str.substring(1);
    }
    return str;
}