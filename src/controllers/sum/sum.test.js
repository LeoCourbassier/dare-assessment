import { describe, expect, test } from '@jest/globals';
import sum from './sum';

describe('test sum function', () => {
    test('1 + 1 == 2', () => {
        expect(sum(1, 1)).toEqual(2);
    })
});