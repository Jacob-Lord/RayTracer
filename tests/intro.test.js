import {describe, test, it, expect} from "vitest";
import { isVector, point, vector, equal, areTuplesEqual } from "../src/libs/intro";

describe('isVector', () => {
    it('should return false if w is equal to 1 (a point)', () => {
        expect(isVector(4.3, -4.2, 3.1, 1.0)).toBe(false)
    });
    it('should return true if w is equal to 0 (a vector)', () => {
        expect(isVector(4.3, -4.2, 3.1, 0.0)).toBe(true)
    });
})

describe('point', () => {
    it('should return a point where w = 1.0', () => {
        expect(point(4, -4, 3)).toStrictEqual([4, -4, 3, 1])
    });
})

describe('vector', () => {
    it('should return a vector where w = 0', () => {
        expect(vector(4, -4, 3)).toStrictEqual([4, -4, 3, 0])
    });
})

describe('equal', () => {
    it('should return true if floating point numbers are equal', () => {
        expect(equal(3.14597, 3.14597)).toBe(true)
    });
    it('should return false if floating point numbers are not equal', () => {
        expect(equal(1.24124, 1.24125)).toBe(false)
    });
})

describe('areTuplesEqual', () => {
    it('should return true if args are equal', () => {
        expect(areTuplesEqual([4.0, -4.0, 3.0, 1.0], [4.0, -4.0, 3.0, 1.0])).toBe(true)
    })
})