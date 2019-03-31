export function requestPrefix(url)
{
    url = removePrependSlashes(url);
    return `/server/${url}`;
}

export function removePrependSlashes(str)
{
    while (str.charAt(0) === '/')
    {
        str = str.substring(1);
    }
    return str;
}