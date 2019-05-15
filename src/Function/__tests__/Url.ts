import {removePrependSlashes, removeRearSlashes, requestPrefix} from '../Url';

describe('removePrependSlashes', () =>
{
    it('should remove prepend slashs', function ()
    {
        const url = '/////hello';
        expect(removePrependSlashes(url)).toBe('hello');
    });

    it('should return empty string when the string consists of slashes ', function ()
    {
        const url = '///////';
        expect(removePrependSlashes(url)).toBe('');
    });

    it('should not change the string when there is no slash', function ()
    {
        const url = 'hello';
        expect(removePrependSlashes(url)).toBe('hello');
    });

    it('should not change the string which is empty', function ()
    {
        const url = '';
        expect(removePrependSlashes(url)).toBe('');
    });
});

describe('removeRearSlashes', () =>
{
    it('should remove rear slashs', function ()
    {
        const url = 'hello///////';
        expect(removeRearSlashes(url)).toBe('hello');
    });

    it('should return empty string when the string consists of slashes ', function ()
    {
        const url = '///////';
        expect(removeRearSlashes(url)).toBe('');
    });

    it('should not change the string when there is no slash', function ()
    {
        const url = 'hello';
        expect(removeRearSlashes(url)).toBe('hello');
    });

    it('should not change the string which is empty', function ()
    {
        const url = '';
        expect(removeRearSlashes(url)).toBe('');
    });
});

describe('requestPrefix', () =>
{
    it('should able to work when there is no slash', function ()
    {
        expect(requestPrefix('aaa', 'bbb')).toBe('/aaa/bbb');
    });

    it('should able to work when there are prepend slashes', function ()
    {
        expect(requestPrefix('/aaa', '/bbb')).toBe('/aaa/bbb');
    });

    it('should able to work when there are append slashes', function ()
    {
        expect(requestPrefix('aaa/', '/bbb')).toBe('/aaa/bbb');
    });

    it('should able to work when there are both slashes', function ()
    {
        expect(requestPrefix('/aaa/', '/bbb')).toBe('/aaa/bbb');
    });
});