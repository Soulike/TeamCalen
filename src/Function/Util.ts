/**
 * @description prepend 0 when number (positive or 0) is less than 10
 * */
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