import {prefixZero} from '../Util';

describe('prefixZero', () =>
{
    it('should return without modification when number >= 10 or number < 0', function ()
    {
        expect(prefixZero(55)).toBe('55');
        expect(prefixZero(-55)).toBe('-55');
        expect(prefixZero('55')).toBe('55');
        expect(prefixZero('-55')).toBe('-55');
    });

    it('should prepend 0 when 0 <= number < 10', function ()
    {
        expect(prefixZero(0)).toBe('00');
        expect(prefixZero(5)).toBe('05');
        expect(prefixZero(9)).toBe('09');
        expect(prefixZero(10)).toBe('10');
        expect(prefixZero('0')).toBe('00');
        expect(prefixZero('5')).toBe('05');
        expect(prefixZero('9')).toBe('09');
        expect(prefixZero('10')).toBe('10');
    });
});