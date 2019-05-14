export function prefixZero(number: string | number): string
{
    if (typeof number === 'string')
    {
        number = Number.parseInt(number);
    }

    if (number >= 0 && number < 10)
    {
        return `0${number}`;
    }
    else
    {
        return number.toString(10);
    }
}

export function isSetsEqual(a: Set<any>, b: Set<any>): boolean
{
    if (a.size !== b.size)
    {
        return false;
    }
    else
    {
        a.forEach(value =>
        {
            if (!b.has(value))
            {
                return false;
            }
        });
        return true;
    }
}