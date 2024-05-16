import {describe, test, it, expect} from "vitest";
import { isVector, point, vector, equal, areTuplesEqual, addTuples, subtractTuples, negateTuple } from "../src/libs/intro";

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
    });

    it('should return false if args are not equal due to small floating point diff', () => {
        expect(areTuplesEqual([4.0, -4.0, 3.0, 1.0], [4.0001, -4.0, 3.0, 1.0])).toBe(false)
    });
})

describe('addTuples', () => {
    it('should return a point if args are point and vector', () => {
        expect(addTuples([3, -2, 5, 1], [-2, 3, 1, 0])).toStrictEqual([1, 1, 6, 1])
    });

    it('should return a vector if args are both vectors', () => {
        expect(addTuples([3.001, -2, 5, 0], [-2.001, 3, 1, 0])).toStrictEqual([1, 1, 6, 0])
    });

    it('should return undefined if args are both points', () => {
        expect(addTuples([3.001, -2, 5, 1], [-2.001, 3, 1, 1])).toBe(undefined)
    });
})

describe('subtractTuples', () => {
    it('should return a vector if args are two points', () => {
        expect(subtractTuples([3, 2, 1, 1], [5, 6, 7, 1])).toStrictEqual([-2, -4, -6, 0])
    });

    it('should return a point if args are point and vector', () => {
        expect(subtractTuples([3, 2, 1, 1], [5, 6, 7, 0])).toStrictEqual([-2, -4, -6, 1])
    });

    it('should return a vector if args are two vectors', () => {
        expect(subtractTuples([3, 2, 1, 0], [5, 6, 7, 0])).toStrictEqual([-2, -4, -6, 0])
    });
})

describe('negateTuple', () => {
    it('should return the opposite of the tuple', () => {
        expect(negateTuple([1, -2, 3, 0])).toStrictEqual([-1, 2, -3, 0])
    });

    it('should return an error message if arg is a point', () => {
        expect(negateTuple([1, -2, 3, 1])).toBe(undefined)
    });
})