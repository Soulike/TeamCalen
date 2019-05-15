export function requestPrefix(prefix: string, url: string): string
{
    url = removePrependSlashes(url);
    prefix = removePrependSlashes(prefix);
    prefix = removeRearSlashes(prefix);
    return `/${prefix}/${url}`;
}

/**
 * @description remove prepend slashes from specific str
 * */
export function removePrependSlashes(str: string): string
{
    let slashAmount = 0;
    for (let i = 0; i < str.length && str.charAt(i) === '/'; i++)
    {
        slashAmount++;
    }
    return str.slice(slashAmount);
}

export function removeRearSlashes(str: string): string
{
    let slashAmount = 0;
    for (let i = str.length - 1; i >= 0 && str.charAt(i) === '/'; i--)
    {
        slashAmount++;
    }

    if (slashAmount !== 0)
    {
        return str.slice(0, -1 * slashAmount);
    }
    else
    {
        return str;
    }
}